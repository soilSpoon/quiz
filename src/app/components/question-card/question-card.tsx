import { useAtomValue } from "jotai";
import { questionNumberAtom } from "~/app/atoms";
import { useQuestions } from "~/app/hooks/questions/use-questions";
import { Timer } from "../timer";
import { Radio } from "./radio";
import { Actions } from "./actions";
import { useFormContext } from "react-hook-form";
import { FormPayload } from "~/app/types";

export function QuestionCard() {
  const { control } = useFormContext<FormPayload>();

  const questions = useQuestions();
  const questionNumber = useAtomValue(questionNumberAtom);
  // 사용자가 보기 편하도록 1부터 시작하도록 하였습니다.
  const questionUserNumber = questionNumber + 1;

  if (questions === undefined) return null;

  const { question, answers, correctAnswer } = questions[questionNumber];

  return (
    <div className="flex flex-col items-center gap-3">
      <Timer isRunning={true} className="text-2xl font-bold" />
      <div className="flex flex-col items-center gap-1">
        <p
          // 문제 텍스트에는 HTML 특수문자 코드가 포함되어 있어 dangerouslySetInnerHTML을 사용하였습니다.
          dangerouslySetInnerHTML={{
            __html: [questionUserNumber, question].join(". "),
          }}
        />
        <div className="flex flex-col">
          {answers.map(({ text }) => {
            return (
              <Radio
                key={text}
                control={control}
                name={`${questionNumber}`}
                text={text}
                correctAnswer={correctAnswer}
              />
            );
          })}
        </div>
        <Actions />
      </div>
    </div>
  );
}
