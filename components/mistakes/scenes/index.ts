import type { ReactNode } from "react";
import type { SceneProps } from "../Stage";
import { DoubleArrowScene2 } from "./DoubleArrow2";
import { PennantScene2 } from "./Pennant2";
import { ClassBScene2 } from "./ClassB2";
import { MetarScene2 } from "./Metar2";

/** Each explainer's drawing (Stage2 design), by explainer id (lib/mistakeExplainers). */
export const SCENES2: Record<string, (p: SceneProps) => ReactNode> = {
  "dmv-double-arrow": DoubleArrowScene2,
  "dmv-pennant": PennantScene2,
  "part107-class-b": ClassBScene2,
  "part107-metar": MetarScene2,
};
