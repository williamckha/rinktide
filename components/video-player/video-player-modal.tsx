import {
  AspectRatio,
  Box,
  Modal,
  ModalClose,
  ModalDialog,
  Sheet,
  Stack,
} from "@mui/joy";
import { VideoPlayer } from "./video-player";

interface VideoPlayerModalProps {
  videoId: string;
  open: boolean;
  onClose: () => void;
}

export const VideoPlayerModal = ({
  videoId,
  open,
  onClose,
}: VideoPlayerModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog
        sx={{
          width: "100vw",
          maxWidth: 1000,
        }}
      >
        <ModalClose />
        <VideoPlayer videoId={videoId} />
      </ModalDialog>
    </Modal>
  );
};
