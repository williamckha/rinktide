export type GameState =
  | "FUT"
  | "OFF"
  | "OVER"
  | "FINAL"
  | "LIVE"
  | "PRE"
  | "CRIT";
  
export type GameScheduleState = "OK" | "TBD" | "PPD" | "SUSP" | "CNCL";

// 1 - Pre season
// 2 - Regular season
// 3 - Playoff
export type GameType = 1 | 2 | 3;

export interface GameWeek {
  readonly date: string;
  readonly dayAbbrev: string;
  readonly numberOfGames: number;
  readonly games: Game[];
}

export interface Name {
  readonly default: string;
}

export interface Team {
  readonly id: number;
  readonly name?: Name;
  readonly placeName?: Name;
  readonly abbrev: string;
  readonly logo: string;
}

export interface LiveTeam extends Team {
  readonly score: number;
  readonly sog?: number;
}

export interface FinishedTeam extends LiveTeam {
  readonly score: number;
  readonly sog: number;
}

export interface RosterSpot {
  readonly teamId: number;
  readonly playerId: number;
  readonly firstName: Name;
  readonly lastName: Name;
  readonly sweaterNumber: number;
  readonly positionCode: string;
  readonly headshot: string;
}

export type PeriodType = "REG" | "SO" | "OT";

export interface PeriodDescriptor {
  readonly number: number;
  readonly periodType: PeriodType;
}

export interface GameClock {
  readonly timeRemaining: string;
  readonly secondsRemaining: number;
  readonly running: boolean;
  readonly inIntermission: boolean;
}

export type ShotTypeDescKey =
  | "wrist"
  | "backhand"
  | "snap"
  | "slap"
  | "wrap-around"
  | "tip-in";

export type PenaltyTypeDescKey =
  | "tripping"
  | "hooking"
  | "roughing"
  | "fighting"
  | "interference"
  | "interference-goalie"
  | "slashing"
  | "holding"
  | "high-sticking"
  | "cross-checking"
  | "delaying-game-puck-over-glass"
  | "delaying-game-unsuccessful-challenge"
  | "elbowing"
  | "charging"
  | "boarding"
  | "misconduct"
  | "unsportsmanlike-conduct"
  | "embellishment"
  | "instigating"
  | "diving";

export interface Game {
  readonly id: number;
  readonly season: number;
  readonly gameType: GameType;
  readonly gameDate: string;
  readonly venue: Name;
  readonly startTimeUTC: string;
  readonly easternUTCOffset: string;
  readonly venueUTCOffset: string;
  readonly tvBroadcasts: object[];
  readonly gameState: GameState;
  readonly gameScheduleState: GameScheduleState;
  readonly awayTeam: Team;
  readonly homeTeam: Team;
}

export interface FutureGame extends Game {
  readonly gameState: "FUT" | "PRE";
  readonly homeTeam: Team;
  readonly awayTeam: Team;
}

export interface LiveGame extends Game {
  readonly gameState: "LIVE" | "CRIT";
  readonly homeTeam: LiveTeam;
  readonly awayTeam: LiveTeam;
  readonly clock: GameClock;
}

export interface FinishedGame extends Game {
  readonly gameState: "OFF" | "FINAL";
  readonly homeTeam: FinishedTeam;
  readonly awayTeam: FinishedTeam;
}

export const isFutureGame = (game: Game): game is FutureGame =>
  game.gameState === "FUT" || game.gameState === "PRE";

export const isLiveGame = (game: Game): game is LiveGame =>
  game.gameState === "LIVE" || game.gameState === "CRIT";

export const isFinishedGame = (game: Game): game is FinishedGame =>
  game.gameState === "OFF" ||
  game.gameState === "FINAL" ||
  game.gameState === "OVER";
