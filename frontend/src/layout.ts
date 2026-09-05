// Single source of truth for the repository card geometry.
// RepositoryCard renders at CARD_HEIGHT and VirtualizedRepoGrid reserves
// ROW_HEIGHT per row — keep them coupled here, not duplicated.

export const CARD_HEIGHT = 265;
export const ROW_GAP = 12.8;
export const ROW_HEIGHT = CARD_HEIGHT + ROW_GAP;
