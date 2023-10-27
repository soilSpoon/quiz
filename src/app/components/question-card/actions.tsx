import { useAtom } from "jotai";
import { useFormContext, useWatch } from "react-hook-form";
import { questionNumberAtom } from "~/app/atoms";
import { FormPayload } from "~/app/types";

const MIN_QUESTION_NUMBER = 0;
const MAX_QUESTION_NUMBER = 9;

export function Actions() {
  const { control, getValues } = useFormContext<FormPayload>();

  const [questionNumber, setQuestionNumber] = useAtom(questionNumberAtom);
  const isFirst = questionNumber === MIN_QUESTION_NUMBER;
  const isLast = questionNumber === MAX_QUESTION_NUMBER;

  // 값이 업데이트 된 다음에 useWatch가 실행되면 올바르지 않은 값이 반환될 수 있어
  // getValues를 함께 사용하였습니다.
  // 참고: https://react-hook-form.com/docs/usewatch
  useWatch({
    control,
    name: `${questionNumber}`,
  });
  const value = getValues(`${questionNumber}`);

  const [buttonText, buttonType] = isLast
    ? (["제출", "submit"] as const)
    : (["다음", "button"] as const);

  const prevQuestion = () => {
    setQuestionNumber((prev) => Math.max(prev - 1, 0));
  };
  const nextQuestion = () => {
    setQuestionNumber((prev) => Math.min(prev + 1, 9));
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
        type={buttonType}
        className="btn"
        onClick={isLast ? undefined : nextQuestion}
        disabled={value == null}
      >
        {buttonText}
      </button>
    </div>
  );
}
