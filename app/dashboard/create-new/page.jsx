"use client";

import React, { useState } from "react";
import SelectTopic from "./_components/SelectTopic";
import SelectStyle from "./_components/SelectStyle";
import Duration from "./_components/Duration";
import { Button } from "../../../components/ui/button";
import axios from "axios";
import CustomLoading from "./_components/CustomLoading";
import { v4 as uuid } from "uuid";

const CreateNew = () => {
  const [formdata, setFormData] = useState({});
  const [videoData, setVideoData] = useState([]); 
  const [loading, setLoading] = useState(false);

  //Function that handles the change in form data in frontend
  const onHandleInputChange = (fieldName, fieldValue) => {
    setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
  };

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

        console.log(`[Scene ${i + 1}] Audio URL:`, audioUrl)

        const audioBase64 = audioResults[i]?.audioContent || null;

        const captions = audioUrl ? await getCaptionFile(audioUrl,i) : [];

        updatedScenes.push({
          ...scene,
          audioUrl,
          audioBase64,
          captions,
        });
      }

      console.log("[Final Combined Data] Scenes with audio + captions:", updatedScenes);

      setVideoData(updatedScenes);
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
        <Button
          onClick={getVideoScript}
          disabled={loading}
          className="mt-10 bg-gradient-to-r from-cyan-500 to-purple-500 text-white px-6 py-3 rounded-lg"
        >
          🚀 Create Short Video
        </Button>
      </div>

      <CustomLoading loading={loading} />

      {videoData.length > 0 && (
        <div className="mt-10">
          {videoData.map((scene, index) => (
            <div key={index} className="mb-6 p-4 border rounded">
              <p><strong>Scene {index + 1}:</strong> {scene.contentText}</p>

              {scene.audioUrl && <audio controls src={scene.audioUrl} />}
              
              <p><em>Image Prompt:</em> {scene.imagePrompt}</p>

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
      )}
    </div>
  );
};

export default CreateNew;








// "use client";

// import React, { useState } from "react";
// import SelectTopic from "./_components/SelectTopic";
// import SelectStyle from "./_components/SelectStyle";
// import Duration from "./_components/Duration";
// import { Button } from "../../../components/ui/button";
// import axios from "axios";
// import CustomLoading from "./_components/CustomLoading";
// import { v4 as uuid } from uuid;

// const CreateNew = () => {
//   const [formdata, setFormData] = useState({});
//   const [videoScript, setVideoScript] = useState([]);
//   const [videoData, setVideoData] = useState([]); // scenes combined with audio
//   const [loading, setLoading] = useState(false);

//   const onHandleInputChange = (fieldName, fieldValue) => {
//     setFormData((prev) => ({ ...prev, [fieldName]: fieldValue }));
//   };

//   const getVideoScript = async () => {
//     const { topic, imageStyle, duration } = formdata;
//     if (!topic || !imageStyle || !duration) {
//       alert("Missing required fields. Please select topic, style and duration first.");
//       return;
//     }

//     setLoading(true);
//     try {
//       // Fetch video script scenes
//       const res = await axios.post("/api/get-video-script", formdata);
//       console.log("Received video script:", res.data.result);
//       if (res.data.error) throw new Error(res.data.error);

//       const scriptScenes = res.data.result;
//       setVideoScript(scriptScenes);

//       // Generate audio for scenes
//       await GenerateAudioFile(scriptScenes);
//     } catch (error) {
//       console.error("Error calling API:", error);
//       alert("Could not generate the script or audio.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const GenerateAudioFile = async (videoScriptData) => {
//     try {
//       // Extract narration texts
//       const texts = videoScriptData.map((item) => item.contentText);
//       const id = uuid();
//       // Call TTS backend with texts array
//       const { data } = await axios.post("/api/get-audio-file", { texts , id });
//       console.log("Received audio results:", data.audioResults);
//       if (data.error) throw new Error(data.error);

//       const audioResults = data.audioResults;

//       // Combine scenes with their audio base64 strings
//       const scenesWithAudio = videoScriptData.map((scene, idx) => ({
//         ...scene,
//         audioBase64: audioResults[idx]?.audioContent || null,
//       }));
//       console.log("Scenes combined with audio:", scenesWithAudio);

//       setVideoData(scenesWithAudio);
//     } catch (error) {
//       console.error("Error generating audio:", error);
//       alert(`Error generating audio: ${error.message}`);
//     }
//   };

//   const onCreateClickHandler = async () => {
//     await getVideoScript();
//   };

//   return (
//     <div className="md:px-20">
//       <div className="shadow-md p-10">
//         <SelectTopic onUserSelect={onHandleInputChange} />
//         <SelectStyle onUserSelect={onHandleInputChange} />
//         <Duration onUserSelect={onHandleInputChange} />
//         <Button
//           className="mt-10 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-white font-semibold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:shadow-[0_0_25px_rgba(34,211,238,0.9)] transition-all duration-300"
//           onClick={onCreateClickHandler}
//         >
//           🚀 Create Short Video
//         </Button>
//       </div>
//       <CustomLoading loading={loading} />

//       {videoData.length > 0 && (
//         <div className="mt-10">
//           {videoData.map((scene, index) => (
//             <div key={index} className="mb-6 p-4 border rounded">
//               <p>
//                 <strong>Scene {index + 1} Content:</strong> {scene.contentText}
//               </p>
//               <audio controls src={`data:audio/mp3;base64,${scene.audioBase64}`} />
//               <p>
//                 <em>Image Prompt:</em> {scene.imagePrompt}
//               </p>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default CreateNew;
