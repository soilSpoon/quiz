import { useAtom } from "jotai";
import { useFormContext } from "react-hook-form";
import { questionNumberAtom } from "~/app/atoms";
import { FormPayload } from "~/app/types";

export function Actions() {
  const { getValues } = useFormContext<FormPayload>();
  const [questionNumber, setQuestionNumber] = useAtom(questionNumberAtom);
  const isFirst = questionNumber === 0;
  const isLast = questionNumber === 9;

  const value = getValues(`${questionNumber}`);

  const nextQuestion = () => {
    setQuestionNumber((prev) => Math.min(prev + 1, 9));
  };
  const prevQuestion = () => {
    setQuestionNumber((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div className="flex gap-1">
      <button
        type="button"
        className="btn"
        onClick={prevQuestion}
        disabled={isFirst}
      >
        이전
      </button>
      <button
        type={isLast ? "submit" : "button"}
        className="btn"
        onClick={isLast ? undefined : nextQuestion}
        disabled={value == null}
      >
        {isLast ? "제출" : "다음"}
      </button>
    </div>
  );
}
