import React, { useState } from "react";
import { SpriteBoard } from "./types";
import { defaultSpriteBoard } from "./constants";
import ToolBox from "./ToolBox";

const SpriteBuilder = () => {
  const [spriteBoard, setSpriteBoard] = useState(defaultSpriteBoard);

  return (
    <div>
      <div></div>
      {/* <ColorBuilderProvider / */}
      <ToolBox />
    </div>
  );
};

export default SpriteBuilder;
