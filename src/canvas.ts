import { canvasHeight, canvasWidth } from "./constants";

export const reset = (ctx: CanvasRenderingContext2D) => {
  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  ctx.closePath();
};

export const drawGrid = (
  ctx: CanvasRenderingContext2D,
  canvasWidth: number,
  canvasHeight: number,
  cellSize: number
) => {
  ctx.beginPath();
  for (let x = 0; x <= canvasWidth; x += cellSize) {
    ctx.moveTo(0.5 + x, 0);
    ctx.lineTo(0.5 + x, canvasHeight);
  }

  for (let x = 0; x <= canvasHeight; x += cellSize) {
    ctx.moveTo(0, 0.5 + x);
    ctx.lineTo(canvasWidth, 0.5 + x);
  }

  ctx.strokeStyle = "#585858";
  ctx.closePath();
  ctx.stroke();
};

export const getCanvasOffset = (canvas: HTMLCanvasElement | null) => {
  return {
    x: canvas ? canvas.offsetLeft : 0,
    y: canvas ? canvas.offsetTop : 0
  };
};
