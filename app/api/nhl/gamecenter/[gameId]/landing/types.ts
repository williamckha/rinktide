import {
  FinishedGame,
  FutureGame,
  LiveGame,
  PeriodDescriptor,
  isFinishedGame,
  isFutureGame,
  isLiveGame,
} from "../../../types";

export type GameLanding =
  | FutureGameLanding
  | LiveGameLanding
  | FinishedGameLanding;

export interface FutureGameLanding extends FutureGame {
  readonly summary: GameLandingSummary;
}

export interface LiveGameLanding extends LiveGame {
  readonly summary: GameLandingSummary;
}

export interface FinishedGameLanding extends FinishedGame {
  readonly summary: GameLandingSummary;
}

export interface GameLandingSummary {
  readonly linescore: GameLandingSummaryLinescore;
  readonly scoring: GameLandingSummaryScoring[];
  readonly shootout: object[];
  readonly threeStars: object[];
  readonly teamGameStats: object[];
  readonly shotsByPeriod: object[];
  readonly penalties: object[];
  readonly seasonSeries: object[];
  readonly gameVideo: {
    readonly threeMinRecap: number;
    readonly condensedGame: number;
  };
}

export interface GameLandingSummaryLinescore {
  readonly byPeriod: GameLandingSummaryLinescorePeriod[];
  readonly totals: {
    readonly away: number;
    readonly home: number;
  };
}

export interface GameLandingSummaryLinescorePeriod {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly away: number;
  readonly home: number;
}

export interface GameLandingSummaryScoring {
  readonly period: number;
  readonly periodDescriptor: PeriodDescriptor;
  readonly goals: GameLandingSummaryScoringGoal[];
}

export interface GameLandingSummaryScoringGoal {
  readonly situationCode: string;
  readonly strength: "ev" | "pp" | "sh";
  readonly playerId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly name: string;
  readonly teamAbbrev: string;
  readonly headshot: string;
  readonly highlightClip?: number;
  readonly goalsToDate: number;
  readonly awayScore: number;
  readonly homeScore: number;
  readonly leadingTeamAbbrev?: string;
  readonly timeInPeriod: string;
  readonly shotType: string;
  readonly goalModifier: string;
  readonly assists: GameLandingSummaryScoringGoalAssist[];
}

export interface GameLandingSummaryScoringGoalAssist {
  readonly playerId: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly assistsToDate: number;
}

export const isFutureGameLanding = (
  game: GameLanding,
): game is FutureGameLanding => isFutureGame(game);

export const isLiveGameLanding = (
  game: GameLanding,
): game is LiveGameLanding => isLiveGame(game);

export const isFinishedGameLanding = (
  game: GameLanding,
): game is FinishedGameLanding => isFinishedGame(game);
