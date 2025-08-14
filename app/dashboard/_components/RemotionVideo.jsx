"use client";
import React from "react";
import { AbsoluteFill, Img, Sequence, Audio, useCurrentFrame } from "remotion";

const RemotionVideo = ({ scenes = [] }) => {
  const fps = 30;
  const frame = useCurrentFrame();

  // Safe frame range calculation
  let cumulativeFrames = 0;
  const sceneFrameRanges = scenes.map((scene) => {
    let durationSeconds = 3; // default 3 seconds
    if (scene?.captions?.length > 0) {
      let endVal = scene.captions[scene.captions.length - 1]?.end ?? 3;
      if (typeof endVal !== "number" || isNaN(endVal)) endVal = 3;
      if (endVal > 50) endVal = endVal / 1000; // assume ms if large
      durationSeconds = Math.max(endVal, 0.1); // at least 0.1s
    }
    const durationInFrames = Math.max(Math.ceil(durationSeconds * fps), 1);
    const start = cumulativeFrames;
    cumulativeFrames += durationInFrames;
    return { start, durationInFrames };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black", color: "white" }}>
      {scenes.map((scene, index) => {
        const { start, durationInFrames } = sceneFrameRanges[index] || { start: 0, durationInFrames: 90 };
        const currentSceneFrame = frame - start;
        
        return (
          <Sequence key={index} from={start} durationInFrames={durationInFrames}>
            {scene?.imageUrl ? (
              <Img
                src={scene.imageUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #15192c, #134e5e 80%)",
                }}
              />
            )}

            {scene?.audioUrl && <Audio src={scene.audioUrl} />}

            {scene?.captions?.length > 0 && (
              <div
                style={{
                  position: "absolute",
                  bottom: 60,
                  width: "100%",
                  textAlign: "center",
                  fontSize: 30,
                  color: "white",
                  textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
                }}
              >
                {scene.captions
                  .filter((cap) => {
                    let capStart = typeof cap.start === "number" ? cap.start : 0;
                    let capEnd = typeof cap.end === "number" ? cap.end : 0;
                    if (capStart > 50) capStart = capStart / 1000;
                    if (capEnd > 50) capEnd = capEnd / 1000;
                    const startF = Math.floor(capStart * fps);
                    const endF = Math.ceil(capEnd * fps);
                    return currentSceneFrame >= startF && currentSceneFrame <= endF;
                  })
                  .map((cap, idx) => (
                    <span key={idx}>{cap.text} </span>
                  ))}
              </div>
            )}
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export default RemotionVideo;










// "use client"
// import React, { useState, useEffect } from "react";
// import { AbsoluteFill, Img, Sequence, Audio, useCurrentFrame } from "remotion";

// const RemotionVideo = ({ scenes, durationInFrames }) => {
//   const fps = 30;
//   const frame = useCurrentFrame();

//   // Track loaded state for each scene
//   const [loadedScenes, setLoadedScenes] = useState(() =>
//     new Array(scenes.length).fill(false)
//   );

//   // Mark scene as loaded when image loads
//   const onImageLoad = (index) => {
//     setLoadedScenes((prev) => {
//       const copy = [...prev];
//       copy[index] = true;
//       return copy;
//     });
//   };

//   // Compute scene frame ranges
//   let cumulativeFrames = 0;
//   const sceneFrameRanges = scenes.map(scene => {
//     let durationSeconds = 0;
//     if (scene.captions?.length > 0) {
//       durationSeconds = scene.captions[scene.captions.length - 1].end;
//     } else {
//       durationSeconds = 3;
//     }
//     if (durationSeconds > 50) durationSeconds /= 1000;
//     const durationInFrames = Math.ceil(durationSeconds * fps);
//     const start = cumulativeFrames;
//     cumulativeFrames += durationInFrames;
//     return { start, durationInFrames };
//   });

//   const totalFramesNeeded = sceneFrameRanges.length
//   ? sceneFrameRanges[sceneFrameRanges.length - 1].start +
//     sceneFrameRanges[sceneFrameRanges.length - 1].durationInFrames
//   : 0;
// console.log("Total frames needed for scenes:", totalFramesNeeded);

//   return (
//     <AbsoluteFill style={{ backgroundColor: "black", color: "white" }}>
//       {scenes.map((scene, index) => {
//         const { start, durationInFrames } = sceneFrameRanges[index];
//         const currentSceneFrame = frame - start;
//         const isActive = frame >= start && frame < start + durationInFrames;
//         const imageLoaded = loadedScenes[index];

//         return (
//           <Sequence key={index} from={start} durationInFrames={durationInFrames}>
//             {scene.imageUrl ? (
//               <>
//                 <Img
//                   src={scene.imageUrl}
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     objectFit: "cover",
//                     display: imageLoaded ? "block" : "none",
//                   }}
//                   onLoad={() => onImageLoad(index)}
//                 />
//                 {!imageLoaded && (
//                   <div
//                     style={{
//                       width: "100%",
//                       height: "100%",
//                       display: "flex",
//                       justifyContent: "center",
//                       alignItems: "center",
//                       background: "linear-gradient(135deg, #15192c, #134e5e 80%)",
//                       color: "white",
//                       fontSize: 24,
//                       fontWeight: "bold",
//                     }}
//                   >
//                     Loading...
//                   </div>
//                 )}
//               </>
//             ) : (
//               <div
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   background: "linear-gradient(135deg, #15192c, #134e5e 80%)",
//                 }}
//               />
//             )}
//             {scene.audioUrl && imageLoaded && <Audio src={scene.audioUrl} />}
//             {imageLoaded && (
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: 60,
//                   width: "100%",
//                   textAlign: "center",
//                   fontSize: 30,
//                   color: "white",
//                   textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
//                 }}
//               >
//                 {scene.captions
//                   ?.filter((cap) => {
//                     let capStart = cap.start;
//                     let capEnd = cap.end;
//                     if (cap.start > 50) capStart = cap.start / 1000;
//                     if (cap.end > 50) capEnd = cap.end / 1000;
//                     const startF = Math.floor(capStart * fps);
//                     const endF = Math.ceil(capEnd * fps);
//                     return currentSceneFrame >= startF && currentSceneFrame <= endF;
//                   })
//                   .map((cap, idx) => (
//                     <span key={idx}>{cap.text} </span>
//                   ))}
//               </div>
//             )}
//           </Sequence>
//         );
//       })}
//     </AbsoluteFill>
//   );
// };

// export default RemotionVideo;






// import React from "react";
// import { AbsoluteFill, Img, Sequence, Audio, useCurrentFrame } from "remotion";

// const RemotionVideo = ({ scenes }) => {
//   const fps = 30;
//   const frame = useCurrentFrame();

//   // Compute start frame for each scene once (outside render for efficiency)
//   let cumulativeFrames = 0;
//   const sceneFrameRanges = scenes.map(scene => {
//     // Use audio duration if possible, else captions, else fallback
//     // Here we use captions, but you can enhance later with audio metadata
//     let durationSeconds = 0;
//     if (scene.captions?.length > 0) {
//       durationSeconds = scene.captions[scene.captions.length - 1].end;
//     } else {
//       durationSeconds = 3; // fallback 3 seconds
//     }
//     // If duration is >50, probably in ms, convert to sec!
//     if (durationSeconds > 50) durationSeconds = durationSeconds / 1000;
//     const durationInFrames = Math.ceil(durationSeconds * fps);
//     const start = cumulativeFrames;
//     const end = start + durationInFrames - 1;
//     cumulativeFrames += durationInFrames;
//     return { start, end, durationInFrames };
//   });

//   return (
//     <AbsoluteFill style={{ backgroundColor: "black", color: "white" }}>
//       {scenes.map((scene, index) => {
//         const { start, durationInFrames } = sceneFrameRanges[index];
//         const currentSceneFrame = frame - start;
//         const isActive =
//           frame >= start && frame < start + durationInFrames;

//         // Only render scene if active for perf, but not necessary for Remotion
//         return (
//           <Sequence
//             key={index}
//             from={start}
//             durationInFrames={durationInFrames}
//           >
//             {scene.imageUrl ? (
//               <Img
//                 src={scene.imageUrl}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//               />
//             ) : (
//                 <div style={{
//                   width: "100%",
//                   height: "100%",
//                   background: "linear-gradient(135deg, #15192c, #134e5e 80%)",
//                 }} />
//             ) }
//             {scene.audioUrl && <Audio src={scene.audioUrl} />}
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 60,
//                 width: "100%",
//                 textAlign: "center",
//                 fontSize: 30,
//                 color: "white",
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
//               }}
//             >
//               {scene.captions
//                 ?.filter(cap => {
//                   // Use seconds for start/end, frames for compare
//                   // If start/end > 50, it's ms, convert
//                   let capStart = cap.start;
//                   let capEnd = cap.end;
//                   if (cap.start > 50) capStart = cap.start / 1000;
//                   if (cap.end > 50) capEnd = cap.end / 1000;
//                   const startF = Math.floor(capStart * fps);
//                   const endF = Math.ceil(capEnd * fps);
//                   return (
//                     currentSceneFrame >= startF &&
//                     currentSceneFrame <= endF
//                   );
//                 })
//                 .map((cap, idx) => (
//                   <span key={idx}>{cap.text} </span>
//                 ))}
//             </div>
//           </Sequence>
//         );
//       })}
//     </AbsoluteFill>
//   );
// };

// export default RemotionVideo;








