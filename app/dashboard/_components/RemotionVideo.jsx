import React from "react";
import { AbsoluteFill, Img, Sequence, Audio, useCurrentFrame } from "remotion";

const RemotionVideo = ({ scenes }) => {
  const fps = 30;
  const frame = useCurrentFrame();

  // Compute start frame for each scene once (outside render for efficiency)
  let cumulativeFrames = 0;
  const sceneFrameRanges = scenes.map(scene => {
    // Use audio duration if possible, else captions, else fallback
    // Here we use captions, but you can enhance later with audio metadata
    let durationSeconds = 0;
    if (scene.captions?.length > 0) {
      durationSeconds = scene.captions[scene.captions.length - 1].end;
    } else {
      durationSeconds = 3; // fallback 3 seconds
    }
    // If duration is >50, probably in ms, convert to sec!
    if (durationSeconds > 50) durationSeconds = durationSeconds / 1000;
    const durationInFrames = Math.ceil(durationSeconds * fps);
    const start = cumulativeFrames;
    const end = start + durationInFrames - 1;
    cumulativeFrames += durationInFrames;
    return { start, end, durationInFrames };
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "black", color: "white" }}>
      {scenes.map((scene, index) => {
        const { start, durationInFrames } = sceneFrameRanges[index];
        const currentSceneFrame = frame - start;
        const isActive =
          frame >= start && frame < start + durationInFrames;

        // Only render scene if active for perf, but not necessary for Remotion
        return (
          <Sequence
            key={index}
            from={start}
            durationInFrames={durationInFrames}
          >
            {scene.imageUrl ? (
              <Img
                src={scene.imageUrl}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            ) : (
                <div style={{
                  width: "100%",
                  height: "100%",
                  background: "linear-gradient(135deg, #15192c, #134e5e 80%)",
                }} />
            ) }
            {scene.audioUrl && <Audio src={scene.audioUrl} />}
            <div
              style={{
                position: "absolute",
                bottom: 60,
                width: "100%",
                textAlign: "center",
                fontSize: 30,
                color: "white",
                textShadow: "2px 2px 4px rgba(0,0,0,0.8)"
              }}
            >
              {scene.captions
                ?.filter(cap => {
                  // Use seconds for start/end, frames for compare
                  // If start/end > 50, it's ms, convert
                  let capStart = cap.start;
                  let capEnd = cap.end;
                  if (cap.start > 50) capStart = cap.start / 1000;
                  if (cap.end > 50) capEnd = cap.end / 1000;
                  const startF = Math.floor(capStart * fps);
                  const endF = Math.ceil(capEnd * fps);
                  return (
                    currentSceneFrame >= startF &&
                    currentSceneFrame <= endF
                  );
                })
                .map((cap, idx) => (
                  <span key={idx}>{cap.text} </span>
                ))}
            </div>
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};

export default RemotionVideo;








// import React from "react";
// import { AbsoluteFill, Img, Sequence, Audio, useCurrentFrame } from "remotion";

// const RemotionVideo = ({ scenes }) => {
//   const fps = 30;
//   const frame = useCurrentFrame();

//   return (
//     <AbsoluteFill style={{ backgroundColor: "black", color: "white" }}>
//       {scenes.map((scene, index) => {
//         // Calculate the starting frame of this scene by summing durations of previous scenes
//         const startFrame = scenes
//           .slice(0, index)
//           .reduce(
//             (total, s) =>
//               total +
//               (s.captions?.length > 0
//                 ? Math.ceil(s.captions[s.captions.length - 1].end / (1000 / fps))
//                 : fps * 3), // fallback 3 seconds if no captions
//             0
//           );

//         // Calculate scene duration based on last caption end time or fallback
//         const durationInFrames =
//           scene.captions?.length > 0
//             ? Math.ceil(scene.captions[scene.captions.length - 1].end / (1000 / fps))
//             : fps * 3;

//         // Calculate current frame relative to start of this scene
//         const currentSceneFrame = frame - startFrame;

//         return (
//           <Sequence key={index} from={startFrame} durationInFrames={durationInFrames}>
//             {/* Background Image */}
//             {scene.imageUrl && (
//               <Img
//                 src={scene.imageUrl}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//               />
//             )}

//             {/* Audio track */}
//             {scene.audioUrl && <Audio src={scene.audioUrl} />}

//             {/* Captions displayed only if currentSceneFrame is within caption start and end */}
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 60,
//                 width: "100%",
//                 textAlign: "center",
//                 fontSize: 36,
//                 color: "white",
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
//               }}
//             >
//               {scene.captions
//                 ?.filter(
//                   (cap) =>
//                     currentSceneFrame >= cap.start * (fps / 1000) &&
//                     currentSceneFrame <= cap.end * (fps / 1000)
//                 )
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








// // dashboard/_components/RemotionVideo.jsx
// import React from "react";
// import { AbsoluteFill, Img, Sequence, Audio , useCurrentFrame } from "remotion";

// const RemotionVideo = ({ scenes }) => {
//   // Get the duration per scene in frames (e.g., assuming each scene lasts as long as its audio)
//   const fps = 30;

//   return (
//     <AbsoluteFill style={{ backgroundColor: "black", color: "white" }}>
//       {scenes.map((scene, index) => {
//         const sceneDuration =
//           scene.captions?.length > 0
//             ? Math.ceil(scene.captions[scene.captions.length - 1].end / (1000 / fps))
//             : fps * 3; // fallback 3 seconds

//         return (
//           <Sequence
//             key={index}
//             from={scenes
//               .slice(0, index)
//               .reduce(
//                 (total, s) =>
//                   total +
//                   (s.captions?.length > 0
//                     ? Math.ceil(s.captions[s.captions.length - 1].end / (1000 / fps))
//                     : fps * 3),
//                 0
//               )}
//             durationInFrames={sceneDuration}
//           >
//             {/* Background Image */}
//             {scene.imageUrl && (
//               <Img
//                 src={scene.imageUrl}
//                 style={{
//                   width: "100%",
//                   height: "100%",
//                   objectFit: "cover",
//                 }}
//               />
//             )}

//             {/* Audio for the scene */}
//             {scene.audioUrl && <Audio src={scene.audioUrl} />}

//             {/* Overlay Captions */}
//             <div
//               style={{
//                 position: "absolute",
//                 bottom: 60,
//                 width: "100%",
//                 textAlign: "center",
//                 fontSize: 36,
//                 color: "white",
//                 textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
//               }}
//             >
//               {/* Show all captions for now, you can refine to show per frame */}
//               {/* {scene.captions && scene.captions.map((cap) => cap.text).join(" ")} */}
//               {scene.captions
//                 ?.filter(
//                   (cap) =>
//                     currentSceneFrame >= cap.start * (fps / 1000) &&
//                     currentSceneFrame <= cap.end * (fps / 1000)
//                 )
//                 .map((cap, idx) => (
//                   <span key={idx}>{cap.text} </span>
//               ))}
//             </div>
//           </Sequence>
//         );
//       })}
//     </AbsoluteFill>
//   );
// };

// export default RemotionVideo;
