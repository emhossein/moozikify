import React from "react";
import formatTime from "@/utils/formatTime ";
import { useDataStore } from "@/zustand/store";

const PlayerSlider = ({ currentTime, handleSeek }) => {
  const { songData } = useDataStore((state) => state);

  return (
    <div className="flex flex-col">
      <input
        type="range"
        min={0}
        max={Math.floor(songData.result.duration)}
        value={currentTime}
        step={1}
        onChange={handleSeek}
        className=""
      />
      <div className="mt-1 flex justify-between text-[10px] lg:text-xs">
        <p>{formatTime(currentTime)}</p>
        <p>{formatTime(songData.result.duration)}</p>
      </div>
    </div>
  );
};

export default PlayerSlider;
