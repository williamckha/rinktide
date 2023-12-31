import {
  Modal,
  ModalDialog,
  ModalClose,
  Stack,
  Card,
} from "@mui/joy";
import { VideoPlayer } from "../video-player/video-player";
import { GoalPlayersDetail } from "./goal-players-detail";
import { Goal } from "@/lib/models/goal";
import { GoalScoringDetail } from "./goal-scoring-detail";

interface GoalModalProps {
  open: boolean;
  onClose: () => void;
  goal: Goal;
}

export const GoalModal = ({ open, onClose, goal }: GoalModalProps) => {
  return (
    <Modal open={open} onClose={onClose}>
      <ModalDialog>
        <ModalClose />
        <Stack spacing={2}>
          <GoalPlayersDetail
            scorer={goal.scoringPlayer}
            primaryAssist={goal.primaryAssistPlayer}
            secondaryAssist={goal.secondaryAssistPlayer}
          />
          <Card variant="soft" sx={{ padding: 1 }}>
            <GoalScoringDetail goal={goal} />
          </Card>
          {goal.highlightClip && (
            <VideoPlayer videoId={goal.highlightClip.toString()} />
          )}
        </Stack>
      </ModalDialog>
    </Modal>
  );
};
