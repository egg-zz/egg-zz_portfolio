export type EggAnimationHandle = {
  play: () => void;
  reverse: () => void;
};

export type HatchAnimationHandle = {
  play: () => void;
  reverse: () => void;
  /** Permanently hatch into a chick — hover-out no longer reverses it. */
  lock: () => void;
};
