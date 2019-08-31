import React, { FunctionComponent } from "react";
import Thumbnail from "./Thumbnail";
import { useQuery } from "./useQuery";
import { SpriteBoard } from "./types";

const getBoardsQuery = `
  {
    boards {
      name
      board
      id
    }
  }
`;

interface GalleryProps {
  load: (i: number) => void;
}

const Gallery: FunctionComponent<GalleryProps> = ({ load }) => {
  const { loading, data, errors } = useQuery(getBoardsQuery, {});

  const mapToThumbnails = (boards: any) => {
    // @ts-ignore
    return boards.map(({ board, name, id }) => (
      <div style={{ display: "inline-block" }} onClick={() => load(id)}>
        <Thumbnail key={name} board={board} />
      </div>
    ));
  };

  return (
    <div
      style={{
        width: 700,
        paddingTop: 24,
        paddingBottom: 24
      }}
    >
      {!loading && mapToThumbnails(data.boards)}
    </div>
  );
};

export default Gallery;
