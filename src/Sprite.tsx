// import React, {
//   useEffect,
//   FunctionComponent,
//   MouseEventHandler,
//   useCallback,
//   useState
// } from "react";
// import { CanvasOffset } from "./App";
// import {
//   cellSize,
//   SpriteBoard,
//   canvasWidth,
//   canvasHeight,
//   colorMap
// } from "./common";

// const Sprite: FunctionComponent<SpriteProps> = ({ board, paintCell }) => {
//   const [canvas, setCanvas] = useState(document.createElement("canvas"));

//   const canvasRef = useCallback(node => {
//     if (node !== null) {
//       setCanvas(node);
//     }
//   }, []);

//   useEffect(() => {
//     if (canvas) {
//       const ctx = (canvas as HTMLCanvasElement).getContext("2d");
//       if (ctx) {
//         reset(ctx);
//         drawSprite(ctx, board);
//         drawGrid(ctx, canvasWidth, canvasHeight, cellSize);
//       }
//     }
//   }, [board, canvas]);

//   return (
//     <>
//       <canvas
//         width={canvasWidth}
//         height={canvasHeight}
//         ref={canvasRef}
//         onClick={paintCell(getCanvasOffset(canvas))}
//       />
//     </>
//   );
// };

// export default Sprite;

import React, { FunctionComponent } from "react";
import { SpriteBoard, Position } from "./types";
import { getColor } from "./utils";
import { cellSize, canvasHeight, canvasWidth } from "./constants";

export interface SpriteProps {
  board: SpriteBoard;
  updateSprite: (position: Position, color: number) => void;
}

const drawSprite = (ctx: CanvasRenderingContext2D, sprite: SpriteBoard) => {
  sprite.forEach((row, i) => {
    row.forEach((cell, j) => {
      ctx.beginPath();
      ctx.fillStyle = getColor(cell);
      const x = j * cellSize;
      const y = i * cellSize;
      ctx.fillRect(x, y, cellSize, cellSize);
      ctx.closePath();
    });
  });
};

const Sprite: FunctionComponent<SpriteProps> = () => {
  return <canvas height={canvasHeight} width={canvasWidth} />;
};

export default Sprite;
