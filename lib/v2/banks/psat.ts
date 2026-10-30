import { registerBank, plainBank } from "../bank";
import psatRwM1 from "@/data/v2/psat/rw-m1.json";
import psatRwM2Upper from "@/data/v2/psat/rw-m2-upper.json";
import psatRwM2Lower from "@/data/v2/psat/rw-m2-lower.json";
import psatMaM1 from "@/data/v2/psat/ma-m1.json";
import psatMaM2Upper from "@/data/v2/psat/ma-m2-upper.json";
import psatMaM2Lower from "@/data/v2/psat/ma-m2-lower.json";
import psatRwDrill from "@/data/v2/psat/rw-drill.json";
import psatMaDrill from "@/data/v2/psat/ma-drill.json";

registerBank("psat", plainBank([psatRwM1, psatRwM2Upper, psatRwM2Lower, psatMaM1, psatMaM2Upper, psatMaM2Lower, psatRwDrill, psatMaDrill]));
