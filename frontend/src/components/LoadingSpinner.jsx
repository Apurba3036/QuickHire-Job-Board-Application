import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

export default function LoadingSpinner({ size = "3rem", fullScreen = false, color = "#4640DE", sx, ...props }) {
  const spinnerProps = {
    enableTrackSlot: true,
    size: size,
    sx: { color: color, ...sx },
    ...props
  };

  if (fullScreen) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#F8FAFC]">
        <CircularProgress {...spinnerProps} />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-4 w-full h-full">
      <CircularProgress {...spinnerProps} />
    </div>
  );
}
