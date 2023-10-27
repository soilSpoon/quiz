import { useAtomValue, useSetAtom, useAtom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const questionNumberAtom = atomWithStorage<number>("questionNumber", 0);
export const isSolvingAtom = atomWithStorage("isStarted", false);
export const timeAtom = atomWithStorage("time", 0);
