import type { Theme } from "./types";

/** Default card background theme when not specified. */
export const DEFAULT_THEME: Theme = "dark";

/** Default number of icons per row in combined output. */
export const ICONS_PER_LINE = 15;

/** Maximum icons allowed per request. */
export const MAX_ICONS = 100;

export const TOO_MANY_ICONS_ERROR = `Too many icons requested (max ${MAX_ICONS})`;
