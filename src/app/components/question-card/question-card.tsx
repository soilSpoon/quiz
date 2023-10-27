import { useAtomValue } from "jotai";
import { questionNumberAtom } from "~/app/atoms";
import { useQuestions } from "~/app/hooks/questions/use-questions";
import { Timer } from "../timer";
import { Radio } from "./radio";
import { Actions } from "./actions";

export function QuestionCard() {
  const questions = useQuestions();
  const questionNumber = useAtomValue(questionNumberAtom);

  if (questions === undefined) return null;

  const { question, answers, correctAnswer } = questions[questionNumber];

  return (
    <div className="flex flex-col items-end gap-1">
      <Timer isRunning={true} />
      <div className="flex flex-col items-center gap-1">
        <p
          dangerouslySetInnerHTML={{
            __html: [questionNumber + 1, question].join(". "),
          }}
        />
        <div className="grid grid-cols-[auto_1fr] gap-1">
          {answers.map(({ text }) => {
            return (
              <Radio
                key={text}
                name={questionNumber.toString()}
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
