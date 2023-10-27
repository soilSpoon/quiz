import { useSetAtom } from "jotai";
import { isSolvingAtom } from "~/app/atoms";

export function useQuiz() {
  const setIsSolving = useSetAtom(isSolvingAtom);

  return {
    start: () => setIsSolving(true),
    stop: () => setIsSolving(false),
  };
}
