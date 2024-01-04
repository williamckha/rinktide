import {
  GameLanding,
  isFutureGameLanding,
} from "@/app/api/nhl/gamecenter/[gameId]/landing/types";
import { Time } from "./time";
import { RosterSpot } from "@/app/api/nhl/types";
import { GamePlayByPlay } from "@/app/api/nhl/gamecenter/[gameId]/play-by-play/types";

export interface Goal {
  id: string;
  gameId: number;
  scoringPlayer: RosterSpot;
  primaryAssistPlayer?: RosterSpot;
  secondaryAssistPlayer?: RosterSpot;
  scoringTeam: "away" | "home";
  scoringTeamAbbrev: string;
  awayScore: number;
  homeScore: number;
  time: Time;
  strength: "ev" | "pp" | "sh";
  shotType: string;
  goalModifier: string;
  highlightClip?: number;
}

export const goalsFromGame = (
  gameLanding: GameLanding,
  gamePlayByPlay: GamePlayByPlay,
): Goal[] => {
  if (isFutureGameLanding(gameLanding)) {
    return [];
  }

  const getRosterSpot = (playerId?: number) => {
    if (playerId == undefined) {
      return undefined;
    }
    return gamePlayByPlay.rosterSpots.find(
      (rosterSpot) => rosterSpot.playerId === playerId,
    );
  };

  return gameLanding.summary.scoring.flatMap((period) =>
    period.goals.map((goal) => ({
      id: `goal-${goal.awayScore}-${goal.homeScore}`,
      gameId: gameLanding.id,
      scoringPlayer: getRosterSpot(goal.playerId) ?? ({} as RosterSpot),
      primaryAssistPlayer: getRosterSpot(goal.assists[0]?.playerId),
      secondaryAssistPlayer: getRosterSpot(goal.assists[1]?.playerId),
      scoringTeam:
        goal.teamAbbrev.default === gameLanding.awayTeam.abbrev ? "away" : "home",
      scoringTeamAbbrev: goal.teamAbbrev.default,
      awayScore: goal.awayScore,
      homeScore: goal.homeScore,
      time: {
        period: period.periodDescriptor.number,
        periodType: period.periodDescriptor.periodType,
        timeInPeriod: goal.timeInPeriod,
      },
      strength: goal.strength,
      shotType: goal.shotType,
      goalModifier: goal.goalModifier,
      highlightClip: goal.highlightClip,
    })),
  );
};
