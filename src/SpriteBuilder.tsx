import React, { useState } from "react";
import { Position } from "./types";
import { defaultSpriteBoard } from "./constants";
import ToolBox from "./ToolBox";
import Sprite from "./Sprite";
import "./SpriteBuilder.scss";
import gql from "graphql-tag";
import { query } from "./db";

const saveQuery = gql`
  mutation saveSpriteBoard($name: String, $board: Board!) {
    create(name: $name, board: $board) {
      id
      name
      board
    }
  }
`;

const SpriteBuilder = () => {
  const [spriteBoard, setSpriteBoard] = useState(defaultSpriteBoard);

  function updateBoard(position: Position, color: string) {
    // need to store history here as well, some how?
    const { x, y } = position;

    const nextSpriteBoard = spriteBoard.map((row, rowIndex) => {
      return rowIndex !== y
        ? row
        : row.map((col, colIndex) => {
            if (colIndex === x) {
              return color;
            }

            return col;
          });
    });

    setSpriteBoard(nextSpriteBoard);
  }

  return (
    <div className="container">
      <Sprite board={spriteBoard} updateSprite={updateBoard} />
      <ToolBox
        save={() => {
          console.log("save clicked");
        }}
        load={() => {
          console.log("load clicked");
        }}
        reset={() => {
          setSpriteBoard(defaultSpriteBoard);
        }}
      />
    </div>
  );
};

export default SpriteBuilder;
