import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle } from '@/components/ui/alert-dialog';
import React from 'react';

const CustomLoading = ({ loading }) => {
return (
    <AlertDialog open={loading}>
        <AlertDialogContent className="backdrop-blur-md bg-white/10 border border-cyan-500 rounded-2xl shadow-lg max-w-sm mx-auto p-8">
            <AlertDialogTitle className="text-white text-2xl font-semibold mb-4 text-center">
                Generating Video
            </AlertDialogTitle>
            <AlertDialogDescription className="text-cyan-300 mb-6 text-center">
                Please wait while we generate your video content.
            </AlertDialogDescription>
            <div className="flex flex-col items-center justify-center space-y-4">
                <div
                className="animate-spin h-16 w-16 rounded-full border-4 border-t-cyan-400 border-b-transparent"
                aria-label="Loading spinner"
                />
                <h2 className="text-lg font-semibold text-white">Generating your video...</h2>
                <p className="text-sm text-gray-300 text-center">
                    Please wait, this may take a few moments.
                </p>
                </div>
        </AlertDialogContent>
    </AlertDialog>
);
};

export default CustomLoading;
