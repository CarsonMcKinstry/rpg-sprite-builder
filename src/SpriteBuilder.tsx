import React, { useState } from "react";
import { Position } from "./types";
import { defaultSpriteBoard } from "./constants";
import ToolBox from "./ToolBox";
import Sprite from "./Sprite";
import "./SpriteBuilder.scss";

const SpriteBuilder = () => {
  const [spriteBoard, setSpriteBoard] = useState(defaultSpriteBoard);

  function updateBoard(position: Position, color: number) {
    // need to store history here as well, some how?
    const { x, y } = position;

    const nextSpriteBoard = spriteBoard.map((row, rowIndex) => {
      return rowIndex !== y
        ? row
        : row.map((col, colIndex) => {
            return colIndex !== x ? col : col === color ? 0 : color;
          });
    });

    setSpriteBoard(nextSpriteBoard);
  }

  return (
    <div className="container">
      <Sprite board={spriteBoard} updateSprite={updateBoard} />
      <ToolBox />
    </div>
  );
};

export default SpriteBuilder;
