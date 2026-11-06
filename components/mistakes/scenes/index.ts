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

/** Second design (Stage2): scenes rebuilt with real sign art. */
export { DoubleArrowScene2 } from "./DoubleArrow2";
import { DoubleArrowScene2 } from "./DoubleArrow2";
export const SCENES2: Record<string, (p: SceneProps) => ReactNode> = {
  "dmv-double-arrow": DoubleArrowScene2,
};
