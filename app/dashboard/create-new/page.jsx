"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import Duration from "./_components/Duration";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";

const CreateNew = () => {
  const [formdata, setFormData] = useState({});
  const [videoScript, setVideoScript] = useState([]);
  const [videoData, setVideoData] = useState([]); // scenes combined with audio
  const [loading, setLoading] = useState(false);

  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

  const getVideoScript = async () => {
    const { topic, imageStyle, duration } = formdata;
    if (!topic || !imageStyle || !duration) {
      alert("Missing required fields. Please select topic, style and duration first.");
      return;
    }

    setLoading(true);
    try {
      // Fetch video script scenes
      const res = await axios.post("/api/get-video-script", formdata);
      console.log("Received video script:", res.data.result);
      if (res.data.error) throw new Error(res.data.error);

      const scriptScenes = res.data.result;
      setVideoScript(scriptScenes);

      // Generate audio for scenes
      await GenerateAudioFile(scriptScenes);
    } catch (error) {
      console.error("Error calling API:", error);
      alert("Could not generate the script or audio.");
    } finally {
      setLoading(false);
    }
  };

  const GenerateAudioFile = async (videoScriptData) => {
    try {
      // Extract narration texts
      const texts = videoScriptData.map((item) => item.contentText);

      // Call TTS backend with texts array
      const { data } = await axios.post("/api/get-audio-file", { texts });
      console.log("Received audio results:", data.audioResults);
      if (data.error) throw new Error(data.error);

      const audioResults = data.audioResults;

      // Combine scenes with their audio base64 strings
      const scenesWithAudio = videoScriptData.map((scene, idx) => ({
        ...scene,
        audioBase64: audioResults[idx]?.audioContent || null,
      }));
      console.log("Scenes combined with audio:", scenesWithAudio);

      setVideoData(scenesWithAudio);
    } catch (error) {
      console.error("Error generating audio:", error);
      alert(`Error generating audio: ${error.message}`);
    }
  };

  const onCreateClickHandler = async () => {
    await getVideoScript();
  };

  return (
    <div className="md:px-20">
      <div className="shadow-md p-10">
        <SelectTopic onUserSelect={onHandleInputChange} />
        <SelectStyle onUserSelect={onHandleInputChange} />
        <Duration onUserSelect={onHandleInputChange} />
        <Button
          className="mt-10 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:shadow-[0_0_25px_rgba(34,211,238,0.9)] transition-all duration-300"
          onClick={onCreateClickHandler}
        >
          🚀 Create Short Video
        </Button>
      </div>
      <CustomLoading loading={loading} />

      {videoData.length > 0 && (
        <div className="mt-10">
          {videoData.map((scene, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <p>
                <strong>Scene {index + 1} Content:</strong> {scene.contentText}
              </p>
              <audio controls src={`data:audio/mp3;base64,${scene.audioBase64}`} />
              <p>
                <em>Image Prompt:</em> {scene.imagePrompt}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CreateNew;
