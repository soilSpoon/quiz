import { useAtomValue } from "jotai";
import { timeAtom } from "~/app/atoms";

export function useTimeString() {
  const time = useAtomValue(timeAtom);
  const seconds = String(time % 60).padStart(2, "0");
  const minutes = String(~~(time / 60)).padStart(2, "0");

  return `${minutes}:${seconds}`;
}
