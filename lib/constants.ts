export const PROJECT_STATUS = {
  LIVE: "LIVE",
  ARCHIVED: "ARCHIVED",
  PRIVATE: "PRIVATE",
  BETA: "BETA",
} as const;

export const STATUS_COLORS = {
  [PROJECT_STATUS.LIVE]: "bg-green-400",
  [PROJECT_STATUS.ARCHIVED]: "bg-red-400",
  [PROJECT_STATUS.PRIVATE]: "bg-yellow-400",
  [PROJECT_STATUS.BETA]: "bg-cyan-400",
} as const;