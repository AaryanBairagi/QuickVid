"use client";

import React, { useState , useEffect } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import Duration from "./_components/Duration";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuid } from "uuid";
import PlayerDialog from "../_components/PlayerDialog";


const CreateNew = () => {
  const [formdata, setFormData] = useState({});
  const [videoData, setVideoData] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [isPreviewOpen, setPreviewOpen] = useState(false);

  //Function that handles the change in form data in frontend
  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const deductCredits = async()=>{
    try{
      await axios.post('/api/update-user-credits',
        {creditsUsed:1}, 
        {withCredentials:true}
      );
    window.dispatchEvent(new Event("credits-updated"));
    }catch(error){
      console.log('Error Deducting the credits: ' , error);
    }
  }


  const preloadAllImages = (scenes) => {
  return Promise.all(
    scenes.map(scene => {
      return new Promise((resolve) => {
        if (!scene.imageUrl) resolve();
          const img = new Image();
          img.src = scene.imageUrl;
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Resolve even if error to avoid blocking
        });
      })
    );
  };

  const onPreviewClick = async () => {
  setLoading(true);
  try {
    await preloadAllImages(videoData);
      setLoading(false);
      setPreviewOpen(true);
    } catch {
      setLoading(false);
      alert("Failed to load images for preview.");
    }
  };



  const saveVideoToDB = async (scenes) => {
    try{
      setSaving(true);
      const { data } = await axios.post('/api/save-video',{scenes});

      if(data.error) throw new Error(data.error);
      console.log("✅ Saved to DB:", data);
      alert("Video data saved successfully!");

    }catch(error){
      console.log("❌ Error saving video:", error);
      alert('Failed to save the video');
    }finally{
      setSaving(false);
    }
  }

  const generateSceneImage = async(prompt,sceneIndex) => {
    try{
      const { data } = await axios.post("/api/generate-image" , {prompt});
      if(data.error) throw new Error(data.error);
      console.log(`Generated image for scene ${sceneIndex+1}:`, data.imageUrl);
      return data.imageUrl;
    }catch(error){
      console.log(`Error getting image for scene ${sceneIndex+1}`,error);
      return null;
    }
  }

  //Function that handles Caption generation needs audio url which is recieved from firebase
  const getCaptionFile = async (audioUrl , sceneIndex) => {
    console.log(`Fetching captions for scene ${sceneIndex + 1} →`, audioUrl);
    try {
      const { data } = await axios.post("/api/get-caption-file", { audioUrl });
      if (data.error) throw new Error(data.error);
      console.log(`Received captions for scene ${sceneIndex + 1}:`, data.captions);
      return data.captions || [];
    } catch (error) {
      console.error(`Error getting captions for scene ${sceneIndex + 1}:`, error);      
      return [];
    }
  };

  //Function that handles Audio generation fetches the array of video script and sends it to firebase
  const GenerateAudioFile = async (videoScriptData) => {
    try {
      console.log("Generating audio for scenes:", videoScriptData);
      const texts = videoScriptData.map((item) => item.contentText);
      const id = uuid();

      const { data } = await axios.post("/api/get-audio-file", { texts, id });
      if (data.error) throw new Error(data.error);
      console.log("Audio generation complete. Results:", data.audioResults);
      const audioResults = data.audioResults;

      const updatedScenes = [];

      for (let i = 0; i < videoScriptData.length; i++) {
        const scene = videoScriptData[i];
        const audioUrl = audioResults[i]?.audioUrl || null;
        const audioBase64 = audioResults[i]?.audioContent || null;

        console.log(`[Scene ${i + 1}] Audio URL:`, audioUrl);

        const imageUrl = await generateSceneImage(scene.imagePrompt,i);
        console.log(`[Scene ${i + 1}] Image URL:`, imageUrl);

        const captions = audioUrl ? await getCaptionFile(audioUrl,i) : [];

        updatedScenes.push({
          ...scene,
          audioUrl,
          audioBase64,
          captions,
          imageUrl
        });
      }

      console.log("[Final Combined Data] Scenes with audio + captions + images:", updatedScenes);

      setVideoData(updatedScenes);
      await saveVideoToDB(updatedScenes);
      await deductCredits();
    } catch (error) {
      console.error("Error generating audio/captions:", error);
      alert(`Error: ${error.message}`);
    }
  };

  //Function that generates the video script , api call made to gemini 
  const getVideoScript = async () => {
    const { topic, imageStyle, duration } = formdata;
    if (!topic || !imageStyle || !duration) {
      alert("Missing required fields.");
      return;
    }

    setLoading(true);
    try {
      console.log("Requesting video script for:", formdata);
      const res = await axios.post("/api/get-video-script", formdata);

      if (res.data.error) throw new Error(res.data.error);
      console.log("Received video script:", res.data.result);

      const scriptScenes = res.data.result;
      await GenerateAudioFile(scriptScenes);
    } catch (error) {
      console.error("Error generating script:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="md:px-20">
      <div className="shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <Duration onUserSelect={onHandleInputChange} />
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            onClick={getVideoScript}
            disabled={loading}
            // className="mt-10 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg"
            className={`
                        px-6 py-3
                        rounded-lg
                        font-semibold
                        flex items-center justify-center gap-2
                        bg-gradient-to-r from-cyan-500 to-purple-500
                        hover:from-cyan-400 hover:to-purple-400
                        text-white
                        shadow-[0_0_15px_rgba(67,56,202,0.7)]
                        hover:shadow-[0_0_25px_rgba(67,56,202,0.9)]
                        transition-all duration-300
                        disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            🚀 Create Short Video
          </Button>

          <Button
            // onClick={() => setPreviewOpen(true)}
            // disabled={videoData.length === 0}
            
            onClick={onPreviewClick}
            disabled={videoData.length === 0 || loading}
            className={`
                      px-6 py-3
                      rounded-lg
                      font-semibold
                      flex items-center justify-center gap-2
                      bg-gradient-to-r from-cyan-500 to-purple-500
                      hover:from-cyan-400 hover:to-purple-400
                      text-white
                      shadow-[0_0_15px_rgba(67,56,202,0.7)]
                      hover:shadow-[0_0_25px_rgba(67,56,202,0.9)]
                      transition-all duration-300
                      disabled:opacity-50 disabled:cursor-not-allowed
                      `} >
            🎬 Preview Video
          </Button>
        </div>
      </div>

      <CustomLoading loading={loading} />

      {/* PlayerDialog for Remotion Video Preview */}
      <PlayerDialog
        isOpen={isPreviewOpen}
        onClose={() => setPreviewOpen(false)}
        scenes={videoData}
      />

      {/* {videoData.length > 0 && (
        <div className="mt-10">
          {videoData.map((scene, index) => (
          <div key={index} className="mb-6 p-4 border rounded">
          <p><strong>Scene {index + 1}:</strong> {scene.contentText}</p>

          {/* Show AI-generated image */}
          {/* {scene.imageUrl && (
            <img
            src={scene.imageUrl}
            alt={`Scene ${index + 1} image`}
            className="my-4 rounded-lg max-w-full"
            loading="lazy"
            />
        )}

          {scene.audioUrl && <audio controls src={scene.audioUrl} />}

          <p><em>Image Prompt:</em> {scene.imagePrompt}</p> */}
{/* 
          {scene.captions.length > 0 && (
            <div className="mt-2 p-2 bg-gray-100 rounded">
              <h4 className="font-semibold mb-1">Captions:</h4>
                {scene.captions.map((cap, idx) => (
                <div key={idx} className="text-sm">
                  [{cap.start?.toFixed(2)}s - {cap.end?.toFixed(2)}s] {cap.text}
                </div>
              ))}
            </div>
          )}
          </div>
          ))}
        </div>
      )} */} 

    </div>
  );
};

export default CreateNew;

