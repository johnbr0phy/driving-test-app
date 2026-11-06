import type { ReactNode } from "react";
import type { SceneProps } from "../Stage";
import { DoubleArrowScene } from "./DoubleArrow";
import { PennantScene } from "./Pennant";
import { ClassBScene } from "./ClassB";
import { MetarScene } from "./Metar";

/** Each explainer's drawing, by explainer id (lib/mistakeExplainers). */
export const SCENES: Record<string, (p: SceneProps) => ReactNode> = {
  "dmv-double-arrow": DoubleArrowScene,
  "dmv-pennant": PennantScene,
  "part107-class-b": ClassBScene,
  "part107-metar": MetarScene,
};
