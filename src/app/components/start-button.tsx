import { useQuiz } from "../hooks/actions/use-quiz";

export function StartButton() {
  const { start } = useQuiz();

  return (
    <button className="btn" onClick={start}>
      퀴즈 풀기
    </button>
  );
}
