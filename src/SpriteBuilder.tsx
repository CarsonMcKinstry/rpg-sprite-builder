import React, { useState } from "react";
import { Position } from "./types";
import { defaultSpriteBoard } from "./constants";
import ToolBox from "./ToolBox";
import Sprite from "./Sprite";
import "./SpriteBuilder.scss";
import gql from "graphql-tag";
import { query } from "./db";
import faker from "faker";
import Gallery from "./Gallery";

const saveQuery = `
  mutation saveSpriteBoard($name: String, $board: Board!) {
    createBoard(name: $name, board: $board) {
      id
      name
      board
    }
  }
`;

const updateQuery = `
  mutation updateSpriteBoard($name: String, $board: Board!, $id: ID!) {
    updateBoard(name: $name, board: $board, id: $id) {
      board
      id
      name
    }
  }
`;

const getBoard = `
  query getBoard ($id: ID!) {
    board(id: $id) {
      id
      board
      name
    }
  }
`;

const SpriteBuilder = () => {
  const [spriteBoard, setSpriteBoard] = useState(defaultSpriteBoard);
  const [currentBoard, setCurrentBoard] = useState<number | undefined>(
    undefined
  );

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
    if (currentBoard) {
      query(updateQuery, {
        board: spriteBoard,
        id: currentBoard
      });
    } else {
      query(saveQuery, {
        board: spriteBoard,
        name: faker.fake("{{random.word}}-{{random.word}}-{{random.word}}")
      });
    }
  }

  function loadBoard(id: number) {
    query(getBoard, {
      id
      // @ts-ignore
    }).then(({ board: { board } }) => {
      setCurrentBoard(id);
      setSpriteBoard(board);
    });
  }

  return (
    <>
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
      <Gallery load={loadBoard} />
    </>
  );
};

export default SpriteBuilder;
