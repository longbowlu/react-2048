import { ArrowKeyType, DirectionType, Vector } from './types';

export const DIRECTION_MAP: Record<ArrowKeyType | DirectionType, Vector> = {
  ArrowLeft: { r: 0, c: -1 },
  ArrowRight: { r: 0, c: 1 },
  ArrowUp: { r: -1, c: 0 },
  ArrowDown: { r: 1, c: 0 },
  Left: { r: 0, c: -1 },
  Right: { r: 0, c: 1 },
  Up: { r: -1, c: 0 },
  Down: { r: 1, c: 0 },
};

export const TILE_MAPPING = new Map<number, string>([
  [2, "H"],
  [4, "H2"],
  [8, "H2O"],
  [16, "drop"],
  [32, "SUI"],
  [64, "brook"],
  [128, "stream"],
  [256, "waterfall"],
  [512, "river"],
  [1024, "sea"],
  [2048, "ocean"],
]);

export const GRID_SIZE = 360;
export const MIN_SCALE = 4;
export const MAX_SCALE = 8;
export const SPACING = 8;
