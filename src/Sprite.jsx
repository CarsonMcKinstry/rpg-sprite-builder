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

// const getColor = (n: number): string => {
//   const color = colorMap[n];
//   return color ? color : "white";
// };

// const drawSprite = (ctx: CanvasRenderingContext2D, sprite: SpriteBoard) => {
//   sprite.forEach((row, i) => {
//     row.forEach((cell, j) => {
//       ctx.beginPath();
//       ctx.fillStyle = getColor(cell);
//       const x = j * cellSize;
//       const y = i * cellSize;
//       ctx.fillRect(x, y, cellSize, cellSize);
//       ctx.closePath();
//     });
//   });
// };

// const reset = (ctx: CanvasRenderingContext2D) => {
//   ctx.beginPath();
//   ctx.fillStyle = "white";
//   ctx.fillRect(0, 0, canvasWidth, canvasHeight);
//   ctx.closePath();
// };

// const drawGrid = (
//   ctx: CanvasRenderingContext2D,
//   canvasWidth: number,
//   canvasHeight: number,
//   cellSize: number
// ) => {
//   ctx.beginPath();
//   for (let x = 0; x <= canvasWidth; x += cellSize) {
//     ctx.moveTo(0.5 + x, 0);
//     ctx.lineTo(0.5 + x, canvasHeight);
//   }

//   for (let x = 0; x <= canvasHeight; x += cellSize) {
//     ctx.moveTo(0, 0.5 + x);
//     ctx.lineTo(canvasWidth, 0.5 + x);
//   }

//   ctx.strokeStyle = "#585858";
//   ctx.closePath();
//   ctx.stroke();
// };

// const getCanvasOffset = (canvas: HTMLCanvasElement | null) => {
//   return {
//     x: canvas ? canvas.offsetLeft : 0,
//     y: canvas ? canvas.offsetTop : 0
//   };
// };

// interface SpriteProps {
//   board: SpriteBoard;
//   paintCell: (offset: CanvasOffset) => MouseEventHandler;
// }

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
