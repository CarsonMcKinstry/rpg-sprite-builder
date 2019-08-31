import React, {
  FunctionComponent,
  useState,
  useCallback,
  useEffect
} from "react";
import { SpriteBoard } from "./types";

interface ThumbnailProps {
  board: SpriteBoard;
}

const drawSprite = (ctx: CanvasRenderingContext2D, board: SpriteBoard) => {
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      ctx.beginPath();
      ctx.fillStyle = cell;
      const x = j * 2;
      const y = i * 2;
      ctx.fillRect(x, y, 2, 2);
      ctx.closePath();
    });
  });
};

const Thumbnail: FunctionComponent<ThumbnailProps> = ({ board }) => {
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
        drawSprite(ctx, board);
      }
    }
  }, [board, canvas]);

  return <canvas style={{ border: '1px solid black', marginRight: 12}} height={52 * 2} width={52 * 2} ref={canvasRef} />;
};

export default Thumbnail;
