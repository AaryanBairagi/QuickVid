"use client"
import React, { useState, useContext, useEffect } from 'react';
import SelectTopic from './_components/SelectTopic';
import SelectStyle from './_components/SelectStyle';
import Duration from './_components/Duration';
import { Button } from '../../../components/ui/button';
import axios from 'axios';
// import { storage } from '@/configs/FireBaseConfig';
// import { v4 as uuidv4 } from 'uuid';
import CustomLoading from './_components/CustomLoading';
// import { VideoDataContext } from '@/app/_context/VideoDataContext';

const CreateNew = () => {
  const [formdata, setFormData] = useState({});
//   const [videoScript, setVideoScript] = useState();
//   const [loading, setLoading] = useState(false);
//   const [audioFileUrl, setAudioFileUrl] = useState();
//   const [captions, setCaptions] = useState();
//   const [imageList, setImageList] = useState();
//   const { videoData, setVideoData } = useContext(VideoDataContext);
//   const [videoUrl, setVideoUrl] = useState(null);
//   const [isGeneratingVideo, setIsGeneratingVideo] = useState(false);

  const onHandleInputChange = (fieldName, fieldValue) => {
      console.log("Updating form data:", fieldName, fieldValue);
      setFormData(prev => ({ ...prev, [fieldName]: fieldValue }));
  }


  const getVideoScript = async () => {
    const { topic, imageStyle, duration } = formdata; 
    if(!topic || !imageStyle || !duration){
        alert("Missing required fields. Please select topic, style and duration first.");
        return;
      }
    console.log("Final form data before API call:", formdata);
  
  try {
    const res = await axios.post("/api/get-video-script", formdata);
    console.log("API Response:", res.data);
  } catch (error) {
    console.error("Error calling API:", error);
    alert('Could not generate the script');
  }
};

const onCreateClickHandler = async () => {
  await getVideoScript();
};

return (
    <div className='md:px-20'>
            <div className='shadow-md p-10'>
              <SelectTopic onUserSelect={onHandleInputChange} />
              <SelectStyle onUserSelect={onHandleInputChange} />
              <Duration onUserSelect={onHandleInputChange} />
              <Button className="mt-10 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400
                text-white font-semibold px-6 py-3 rounded-lg shadow-[0_0_15px_rgba(34,211,238,0.7)] hover:shadow-[0_0_25px_rgba(34,211,238,0.9)] transition-all duration-300"
                onClick={onCreateClickHandler}>
                  🚀 Create Short Video
              </Button>
            </div>
            <CustomLoading loading={false} />


    </div>
  )
}

export default CreateNew















//   const GetVideoScript = async () => {
//     try {
//     setLoading(true);
//       console.log("Starting video script generation...");
      
//     const { topic, imageStyle, duration } = formdata;
//       console.log("Form data:", { topic, imageStyle, duration });

//     if (!topic || !imageStyle || !duration) {
//         const missingFields = [];
//         if (!topic) missingFields.push("topic");
//         if (!imageStyle) missingFields.push("style");
//         if (!duration) missingFields.push("duration");
        
//         alert(`Please fill out all fields: ${missingFields.join(", ")}`);
//         setLoading(false);
//       return;
//     }
  
//     const prompt = `Write a video script for a short ${duration} video on the topic "${topic}". The video should follow a "${imageStyle}" style. Break the video down into multiple scenes. 
  //   For each scene, provide the following in JSON format:
  // - imagePrompt: A visual prompt to generate a realistic AI image for the scene
  // - contentText: The narration or content for that scene.
  
  //     Make the tone engaging and visually descriptive. Output only a JSON array of scenes`;

//       console.log("Sending request to API...");
//       const response = await axios.post('/api/get-video-script', {
//       prompt: prompt,
//       });

//       console.log("API Response:", response.data);

//       if (response.data.error) {
//         throw new Error(`API Error: ${response.data.error}${response.data.details ? ` - ${response.data.details}` : ''}`);
//       }

//       if (!response.data.result) {
//         throw new Error("No result received from the server");
//       }

//       console.log("Successfully generated video script:", response.data.result);
//       setVideoData(prev => ({
//         ...prev, 
//         'videoScript': response.data.result
//       }));
//       setVideoScript(response.data.result);
//       await GenerateAudioFile(response.data.result);
//     } catch (error) {
//       console.error("Error in GetVideoScript:", error);
//       alert(`Error generating video script: ${error.message}`);
//       setLoading(false);
//     }    
//   };
  
//   const GenerateAudioFile = async (videoScript) => {
//     try {
//     let script = '';
//     const id = uuidv4();
//       videoScript.forEach(item => {
//         script = script + item.contentText + ' ';
//       });

//       console.log("Generating audio for script:", script);

//       const { data } = await axios.post('/api/generate-audio', {
//         text: script,
//         id: id
//       });

//       if (data.error) {
//         throw new Error(data.error + (data.details ? `: ${data.details}` : ''));
//       }

//       if (!data.result) {
//         throw new Error("No audio URL received from the server");
//       }

//       console.log("Audio generated successfully:", data.result);
//       setVideoData(prev => ({
//         ...prev, 
//         'audioFileUrl': data.result
//       }));
//       setAudioFileUrl(data.result);
//       await GenerateAudioCaption(data.result, videoScript);
//     } catch (error) {
//       console.error("Error in GenerateAudioFile:", error);
//       alert(`Error generating audio: ${error.message}`);
//       setLoading(false);
//     }
//   }

//   const GenerateAudioCaption = async (fileUrl, videoScript) => {
//     try {
//       console.log("Generating captions for audio:", fileUrl);
//       const { data } = await axios.post('/api/generate-caption', {
//         audioFileUrl: fileUrl
//       });
      
//       if (data.result) {
//         console.log("Captions generated successfully:", data.result);
//         setCaptions(data.result);
//         setVideoData(prev => ({
//         ...prev, 
//           'captions': data.result
//         }));
//         await GenerateImage(videoScript);
//       } else {
//         throw new Error("Failed to generate captions");
//       }
//     } catch (error) {
//       console.error("Error in GenerateAudioCaption:", error);
//       alert(`Error generating captions: ${error.message}`);
//       setLoading(false);
//     }
//   }

//   const GenerateImage = async (videoScript) => {
//     try {
//       console.log("Generating images for script:", videoScript);
//       let images = [];
//       for (const element of videoScript) {
//         console.log("Generating image for prompt:", element.imagePrompt);
//         const { data } = await axios.post('/api/generate-image', {
//           imagePrompt: element.imagePrompt
//         });
//         if (data.result) {
//           console.log("Image generated successfully:", data.result);
//           images.push(data.result);
//         } else {
//           throw new Error("Failed to generate image");
//         }
//       }
//       setVideoData(prev => ({
//       ...prev, 
//         'imageList': images
//     }));
//     setImageList(images);
//     } catch (error) {
//       console.error("Error in GenerateImage:", error);
//       alert(`Error generating images: ${error.message}`);
//     } finally {
//     setLoading(false);
//     }
//   }

//   const GenerateFinalVideo = async () => {
//     try {
//       setIsGeneratingVideo(true);
//       console.log("Generating final video with data:", videoData);

//       const { data } = await axios.post('/api/generate-video', {
//         images: videoData.imageList,
//         audio: videoData.audioFileUrl,
//         captions: videoData.captions,
//         script: videoData.videoScript
//       });

//       if (data.result) {
//         console.log("Video generated successfully:", data.result);
//         setVideoUrl(data.result);
//       } else {
//         throw new Error("Failed to generate video");
//       }
//     } catch (error) {
//       console.error("Error in GenerateFinalVideo:", error);
//       alert(`Error generating video: ${error.message}`);
//     } finally {
//       setIsGeneratingVideo(false);
//     }
//   };

//   useEffect(() => {
//     console.log("Video data updated:", videoData);
//   }, [videoData]);
















///////////////////////////----------------------------------------//////////////////////////


      {/* Video Preview Section
      {videoData && videoData.imageList && videoData.imageList.length > 0 && (
        <div className="mt-10 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-4">Video Preview</h3>
          
          {/* Video Player */}
          {/* {videoUrl ? (
            <div className="w-full aspect-video">
              <video 
                controls 
                className="w-full h-full rounded-lg"
                src={videoUrl}
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden"> */}
              {/* Image Slideshow */}
              {/* <div className="absolute inset-0">
                {videoData.imageList.map((imageUrl, index) => (
                  <div 
                    key={index}
                    className="absolute inset-0 transition-opacity duration-1000"
                    style={{ 
                      opacity: index === 0 ? 1 : 0,
                      backgroundImage: `url(${imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  />
                ))}
              </div> */}
              
              {/* Audio Player */}
              {/* {videoData.audioFileUrl && (
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
                  <audio 
                    controls 
                    className="w-full"
                    src={videoData.audioFileUrl}
                  />
                </div>
              )}
            </div>
          )} */}
{/* 
          Generate Final Video Button */}
          {/* {!videoUrl && videoData.imageList && videoData.audioFileUrl && (
            <div className="mt-4 flex justify-center">
              <Button 
                onClick={GenerateFinalVideo}
                disabled={isGeneratingVideo}
                className="bg-cyan-500 hover:bg-cyan-600 text-white">
                {isGeneratingVideo ? 'Generating Video...' : 'Generate Final Video'}
                </Button>
              </div>
          {/* // )} */} 

          {/* Captions */}
          {/* {videoData.captions && videoData.captions.length > 0 && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold mb-2">Captions</h4>
              <div className="space-y-2">
                {videoData.captions.map((caption, index) => (
                  <div key={index} className="text-sm">
                    <span className="text-gray-500">[{caption.start}s - {caption.end}s]</span>
                    <span className="ml-2">{caption.text}</span>
                  </div>
                ))}
              </div>
            </div>
          )} */}

          {/* Video Script
          {videoData.videoScript && (
            <div className="mt-4 p-4 bg-gray-100 rounded-lg">
              <h4 className="font-semibold mb-2">Video Script</h4>
              <div className="space-y-4">
                {videoData.videoScript.map((scene, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <p className="font-medium">Scene {index + 1}</p>
                    <p className="text-gray-600">{scene.contentText}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Image Prompt: {scene.imagePrompt}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )} */}