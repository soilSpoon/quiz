"use client";

import { useAtomValue } from "jotai";
import { FormProvider, useForm } from "react-hook-form";
import useFormPersist from "react-hook-form-persist";
import { isSolvingAtom } from "./atoms";
import { useQuiz } from "./hooks/actions/use-quiz";
import { QuestionCard } from "./components/question-card/question-card";

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
  const form = useForm();

  useFormPersist("values", {
    watch: form.watch,
    setValue: form.setValue,
    storage: window.localStorage,
  });

  return (
    <main className="flex justify-center items-center w-screen h-screen">
      <FormProvider {...form}>
        <form>{isSolving ? <QuestionCard /> : <StartButton />}</form>
      </FormProvider>
    </main>
  );
}
