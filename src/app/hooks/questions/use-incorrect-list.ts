import { resultAtom } from "~/app/atoms";
import { useQuestions } from "./use-questions";
import { useAtomValue } from "jotai";

export function useIncorrectList() {
  const questions = useQuestions();
  const result = useAtomValue(resultAtom);

  if (questions === undefined || result === null) return null;

  return questions.filter(
    ({ correctAnswer }, index) => result[index] !== correctAnswer
  );
}
