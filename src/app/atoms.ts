import { atomWithStorage } from "jotai/utils";
import { FormPayload } from "./types";

export const questionNumberAtom = atomWithStorage<number>("questionNumber", 0);
export const isSolvingAtom = atomWithStorage("isStarted", false);
export const timeAtom = atomWithStorage("time", 0);
export const resultAtom = atomWithStorage<FormPayload | null>("result", null);
