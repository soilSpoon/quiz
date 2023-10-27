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

  if (questions === undefined) return null;

  const { question, answers, correctAnswer } = questions[questionNumber];

  return (
    <div className="flex flex-col items-center gap-3">
      <Timer isRunning={true} className="text-2xl font-bold" />
      <div className="flex flex-col items-center gap-1">
        <p
          dangerouslySetInnerHTML={{
            __html: [questionNumber + 1, question].join(". "),
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
