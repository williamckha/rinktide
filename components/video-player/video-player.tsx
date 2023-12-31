import { AspectRatio } from "@mui/joy";
import React from "react";

interface VideoPlayerProps {
  readonly videoId: string;
}

export const HIGHLIGHT_CLIP_URL =
  "https://players.brightcove.net/6415718365001/EXtG1xJ7H_default/index.html?videoId=";

const Player = ({ videoId }: VideoPlayerProps) => {
  return (
    <AspectRatio>
      <iframe
        style={{ border: 0, userSelect: "none" }}
        src={HIGHLIGHT_CLIP_URL + videoId + "&autoplay=false"}
        allowFullScreen={true}
        allow="encrypted-media *;"
      />
    </AspectRatio>
  );
};

export const VideoPlayer = React.memo(Player);
