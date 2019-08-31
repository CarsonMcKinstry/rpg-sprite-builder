import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect,
  MouseEvent,
  useContext
} from "react";
import { SpriteBoard, Position } from "./types";

import { cellSize, canvasHeight, canvasWidth } from "./constants";
import { drawGrid, reset, getCanvasOffset } from "./canvas";
import { ColorPickerContext } from "./ColorPickerContext";

export interface SpriteProps {
  board: SpriteBoard;
  updateSprite: (position: Position, color: string) => void;
}

const drawSprite = (ctx: CanvasRenderingContext2D, board: SpriteBoard) => {
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      ctx.beginPath();
      ctx.fillStyle = cell;
      const x = j * cellSize;
      const y = i * cellSize;
      ctx.fillRect(x, y, cellSize, cellSize);
      ctx.closePath();
    });
  });
};

const Sprite: FunctionComponent<SpriteProps> = ({ board, updateSprite }) => {
  const { currentColor } = useContext(ColorPickerContext);
  const [canvas, setCanvas] = useState(document.createElement("canvas"));

  const canvasRef = useCallback(node => {
    if (node !== null) {
      setCanvas(node);
    }
  }, []);

  useEffect(() => {
    if (canvas) {
      const ctx = (canvas as HTMLCanvasElement).getContext("2d");
      if (ctx) {
        reset(ctx);
        drawSprite(ctx, board);
        drawGrid(ctx, canvasWidth, canvasHeight, cellSize);
      }
    }
  }, [board, canvas]);

  function paintCell(e: MouseEvent<HTMLElement>) {
    const offset = getCanvasOffset(canvas);
    const cellPosition = {
      x: Math.floor((e.pageX - offset.x) / cellSize),
      y: Math.floor((e.pageY - offset.y) / cellSize)
    };

    updateSprite(cellPosition, currentColor);
  }

  return (
    <canvas
      ref={canvasRef}
      height={canvasHeight}
      width={canvasWidth}
      onClick={paintCell}
    />
  );
};

export default Sprite;
