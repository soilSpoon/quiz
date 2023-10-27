"use client";

import { useAtomValue, useSetAtom } from "jotai";
import { useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import {
  isSolvingAtom,
  questionNumberAtom,
  resultAtom,
  timeAtom,
} from "./atoms";
import { useQuiz } from "./hooks/actions/use-quiz";
import { ResultModal } from "./components/result-modal";
import { QuestionCard } from "./components/question-card/question-card";
import { FormPayload } from "./types";
import { IncorrectNote } from "./components/incorrect-note";

function StartButton() {
  const { start } = useQuiz();

  return (
    <button className="btn" onClick={start}>
      퀴즈 풀기
    </button>
  );
}

export default function Home() {
  const isSolving = useAtomValue(isSolvingAtom);
  const form = useForm<FormPayload>();
  const ref = useRef<HTMLDialogElement>(null);
  const setResult = useSetAtom(resultAtom);
  const { stop } = useQuiz();

  useFormPersist("values", {
    watch: form.watch,
    setValue: form.setValue,
    storage: window.localStorage,
  });

  const setQuestionNumber = useSetAtom(questionNumberAtom);
  const setTime = useSetAtom(timeAtom);

  const onSubmit = form.handleSubmit((data) => {
    stop();
    setResult(data);
    ref.current?.showModal();
  });

  const onCloseDialog = () => {
    form.reset();
    setTime(0);
    setQuestionNumber(0);
  };

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <div className="flex flex-col items-center gap-2">
        <FormProvider {...form}>
          <form onSubmit={onSubmit}>
            {isSolving ? <QuestionCard /> : <StartButton />}
          </form>
        </FormProvider>
        {!isSolving && <IncorrectNote />}
      </div>
      <ResultModal ref={ref} onClose={onCloseDialog} />
    </main>
  );
}
