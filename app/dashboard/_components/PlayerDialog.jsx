import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../../components/ui/dialog"
import React from 'react'
import { Player } from "@remotion/player";
import RemotionVideo from "./RemotionVideo";

const PlayerDialog = ({isOpen,onClose,scenes}) => {
return (
    <>
    <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[90vw] md:max-w-[80vw] bg-gradient-to-r from-[#15192c] via-[#21243b] to-[#134e5e]/80 border border-white/10 backdrop-blur-md rounded-2xl shadow-lg p-6">
            <DialogHeader>
                <DialogTitle className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">📽 Preview Your Video</DialogTitle>
                <DialogDescription>This is a live preview of your generated video.</DialogDescription>
            </DialogHeader>
                <div className="flex justify-center">
                    <Player
                        component={RemotionVideo}
                        inputProps={{scenes}}
                        durationInFrames={scenes.length*90}
                        compositionWidth={390}
                        compositionHeight={720}
                        fps={30}
                        controls
                        style={{
                            borderRadius: "12px",
                            overflow: "hidden",
                            border: "2px solid rgba(255,255,255,0.1)",
                            boxShadow: "0 0 20px rgba(34,211,238,0.4)",
                            width: "100%",
                            height: "100%",
                        }}
                    />  
                </div>
            
        </DialogContent>
    </Dialog>
    </>
)
}

export default PlayerDialog