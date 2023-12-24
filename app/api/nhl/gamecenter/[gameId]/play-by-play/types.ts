import {
  FinishedGame,
  FutureGame,
  LiveGame,
  PenaltyTypeDescKey,
  PeriodDescriptor,
  PeriodType,
  RosterSpot,
  ShotTypeDescKey,
  isFinishedGame,
  isFutureGame,
  isLiveGame,
} from "../../../types";

export type GamePlayByPlay =
  | FutureGamePlayByPlay
  | LiveGamePlayByPlay
  | FinishedGamePlayByPlay;

export interface FutureGamePlayByPlay extends FutureGame {
  readonly rosterSpots: RosterSpot[];
}

export interface LiveGamePlayByPlay extends LiveGame {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly situation?: GameSituation;
  readonly rosterSpots: RosterSpot[];
  readonly plays: Play[];
}

export interface FinishedGamePlayByPlay extends FinishedGame {
  readonly threeMinRecap: string;
  readonly gameOutcome: GameOutcome;
  readonly rosterSpots: RosterSpot[];
  readonly plays: Play[];
}

export interface GameOutcome {
  readonly lastPeriodType: PeriodType;
  readonly otPeriods?: number;
}

export interface GameSituation {
  readonly homeTeam: {
    readonly abbrev: string;
    readonly situationDescriptions?: string[];
    readonly strength: number;
  };
  readonly awayTeam: {
    readonly abbrev: string;
    readonly situationDescriptions?: string[];
    readonly strength: number;
  };
  readonly situationCode: string;
  readonly timeRemaining: string;
  readonly secondsRemaining: number;
}

export interface Play {
  readonly eventId: number;
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly timeInPeriod: string;
  readonly timeRemaining: string;
  readonly situationCode: string;
  readonly homeTeamDefendingSide: "left" | "right";
  readonly typeCode: number;
  readonly typeDescKey: PlayTypeDescKey;
  readonly sortOrder: number;
  readonly details?: PlayDetail;
}

export interface ShotPlay extends Play {
  readonly typeDescKey:
    | "blocked-shot"
    | "shot-on-goal"
    | "missed-shot"
    | "goal";
  readonly details:
    | BlockedShotPlayDetail
    | MissedShotPlayDetail
    | ShotOnGoalPlayDetail
    | GoalPlayDetail;
}

export interface GoalPlay extends Play {
  readonly typeDescKey: "goal";
  readonly details: GoalPlayDetail;
}

export interface StoppagePlayDetail {
  readonly reason: string;
  readonly secondaryReason?: string;
}

export interface LocationPlayDetail {
  readonly xCoord: number;
  readonly yCoord: number;
  readonly zoneCode: "O" | "N" | "D";
  readonly eventOwnerTeamId: number;
}

export interface FaceoffPlayDetail extends LocationPlayDetail {
  readonly losingPlayerId: number;
  readonly winningPlayerId: number;
}

export interface BlockedShotPlayDetail extends LocationPlayDetail {
  readonly blockingPlayerId: number;
  readonly shootingPlayerId: number;
}

export interface MissedShotPlayDetail extends LocationPlayDetail {
  readonly reason: string;
  readonly shotType: ShotTypeDescKey;
  readonly shootingPlayerId: number;
  readonly goalieInNetId: number;
}

export interface ShotOnGoalPlayDetail extends LocationPlayDetail {
  readonly shotType: ShotTypeDescKey;
  readonly shootingPlayerId: number;
  readonly goalieInNetId: number;
  readonly awaySOG: number;
  readonly homeSOG: number;
}

export interface GoalPlayDetail extends LocationPlayDetail {
  readonly shotType: ShotTypeDescKey;
  readonly scoringPlayerId: number;
  readonly scoringPlayerTotal: number;
  readonly assist1PlayerId?: number;
  readonly assist1PlayerTotal?: number;
  readonly assist2PlayerId?: number;
  readonly assist2PlayerTotal?: number;
  readonly goalieInNetId: number;
  readonly awayScore: number;
  readonly homeScore: number;
}

export interface TakeawayPlayDetail extends LocationPlayDetail {
  readonly playerId: number;
}

export interface GiveawayPlayDetail extends LocationPlayDetail {
  readonly playerId: number;
}

export interface HitPlayDetail extends LocationPlayDetail {
  readonly hittingPlayerId: number;
  readonly hitteePlayerId: number;
}

export interface PenaltyPlayDetail extends LocationPlayDetail {
  readonly typeCode: string;
  readonly descKey: PenaltyTypeDescKey | string;
  readonly duration: number;
  readonly committedByPlayerId: number;
  readonly drawnByPlayerId: number;
}

export type PlayDetail = StoppagePlayDetail | LocationPlayDetail;

export type PlayTypeDescKey =
  | "game-end"
  | "period-start"
  | "period-end"
  | "shootout-complete"
  | "stoppage"
  | "faceoff"
  | "blocked-shot"
  | "missed-shot"
  | "shot-on-goal"
  | "failed-shot-attempt"
  | "goal"
  | "takeaway"
  | "giveaway"
  | "hit"
  | "penalty"
  | "delayed-penalty";

export const isFutureGamePlayByPlay = (
  game: GamePlayByPlay,
): game is FutureGamePlayByPlay => isFutureGame(game);

export const isLiveGamePlayByPlay = (
  game: GamePlayByPlay,
): game is LiveGamePlayByPlay => isLiveGame(game);

export const isFinishedGamePlayByPlay = (
  game: GamePlayByPlay,
): game is FinishedGamePlayByPlay => isFinishedGame(game);

export const isShotPlay = (play: Play): play is ShotPlay =>
  play.typeDescKey === "blocked-shot" ||
  play.typeDescKey === "shot-on-goal" ||
  play.typeDescKey === "missed-shot" ||
  play.typeDescKey === "goal";
