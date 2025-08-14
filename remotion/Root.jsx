import RemotionVideo from 'app/dashboard/_components/RemotionVideo'
import React from 'react'
import { Composition } from 'remotion'

const RemotionRoot = () => {
return (
    <>
    {/* <Composition
        // id="Empty"
        id="MainComposition" 
        component={RemotionVideo}
        durationInFrames={784}
        fps={30}
        width={1280}
        height={720}/> */}

    <Composition
        id="MainComposition"
        component={RemotionVideo}
        // This is just the fallback if API doesn't pass anything
        durationInFrames={300} 
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
            scenes: [],
            durationInFrames: 300
        }}
    />
    </>
)
}

export default RemotionRoot