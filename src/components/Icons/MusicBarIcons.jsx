import React from "react";

const MusicBarIcons = ({ isPLaying }) => {
  return (
    <div className={`now playing ${isPLaying && "paused"}`} id="music">
      <span className="bar n1">A</span>
      <span className="bar n2">B</span>
      <span className="bar n3">c</span>
      <span className="bar n4">D</span>
    </div>
  );
};

export default MusicBarIcons;
