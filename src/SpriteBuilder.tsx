import React, { useState } from "react";
import { Position } from "./types";
import { defaultSpriteBoard } from "./constants";
import ToolBox from "./ToolBox";
import Sprite from "./Sprite";
import "./SpriteBuilder.scss";
import gql from "graphql-tag";
import { query } from "./db";
import faker from "faker";

const saveQuery = `
  mutation saveSpriteBoard($name: String, $board: Board!) {
    createBoard(name: $name, board: $board) {
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

  function saveBoard() {
    query(saveQuery, {
      board: spriteBoard,
      name: faker.fake("{{random.word}}-{{random.word}}-{{random.word}}")
    });
  }

  return (
    <div className="container">
      <Sprite board={spriteBoard} updateSprite={updateBoard} />
      <ToolBox
        save={() => {
          saveBoard();
        }}
        print={() => {
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
