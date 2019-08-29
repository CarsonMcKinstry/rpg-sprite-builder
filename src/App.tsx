// import React, { useReducer, useState, MouseEvent } from "react";
// import logo from "./logo.svg";

// import Sprite from "./Sprite";
// import ColorPicker from "./ColorPicker";

// import { SpriteBoard, cellSize, numCols, numRows } from "./common";

// const intialSpriteBoard: SpriteBoard = [
//   ...Array(numRows).fill([...Array(numCols).fill(0)])
// ];

// interface Action {
//   type: string;
//   payload?: any | SpriteUpdate;
// }

// interface SpriteUpdate {
//   position: {
//     x: number;
//     y: number;
//   };
//   color: number;
// }

// export interface CanvasOffset {
//   x: number;
//   y: number;
// }

// function spriteBoardReducer(board: SpriteBoard, { type, payload }: Action) {
//   switch (type) {
//     case "LOAD":
//       return payload;
//     case "PAINT":
//       const {
//         position: { x, y },
//         color
//       } = payload as SpriteUpdate;
//       return board.map((row, rowIndex) => {
//         return rowIndex !== y
//           ? row
//           : row.map((cell, cellIndex) => {
//               return cellIndex !== x ? cell : cell === color ? 0 : color;
//             });
//       });
//     case "RESET":
//       return intialSpriteBoard;
//     default:
//       return board;
//   }
// }

// const App: React.FC = () => {
//   const [spriteBoard, dispatch] = useReducer(
//     spriteBoardReducer,
//     intialSpriteBoard
//   );
//   const [currentColor, setCurrentColor] = useState(1);

//   const chooseColor = (i: number) => () => {
//     setCurrentColor(i);
//   };

//   const paintCell = (offset: CanvasOffset) => (e: MouseEvent<HTMLElement>) => {
//     const cellPosition = {
//       x: Math.floor((e.pageX - offset.x) / cellSize),
//       y: Math.floor((e.pageY - offset.y) / cellSize)
//     };

//     dispatch({
//       type: "PAINT",
//       payload: {
//         position: cellPosition,
//         color: currentColor
//       }
//     });
//   };

//   const save = () => {
//     const spriteString = spriteBoard
//       .map((row: Array<number>) => {
//         return row.toString();
//       })
//       .join("\n");
//     localStorage.setItem("saved", spriteString);
//   };

//   const load = () => {
//     const spriteString = localStorage.getItem("saved");

//     if (spriteString) {
//       const spriteBoard = spriteString.split("\n").map(row => row.split(","));
//       dispatch({
//         type: "LOAD",
//         payload: spriteBoard
//       });
//     }
//   };

//   return (
//     <div>
//       <button onClick={load}>Load</button>
//       <button onClick={save}>Save</button>
//       <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
//       <Sprite board={spriteBoard} paintCell={paintCell} />
//       <ColorPicker chooseColor={chooseColor} currentColor={currentColor} />
//     </div>
//   );
// };

// export default App;

import React from "react";
import SpriteBuilder from "./SpriteBuilder";
import "./App.scss";

import ColorBuilderProvider from "./ColorPickerContext";

const App = () => {
  return (
    <ColorBuilderProvider>
      <SpriteBuilder />
    </ColorBuilderProvider>
  );
};

export default App;
