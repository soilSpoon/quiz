import { useQuery } from "@tanstack/react-query";
import { persistQueryClientSave } from "@tanstack/react-query-persist-client";
import { useEffect } from "react";
import { queryClient } from "../../utils/query-client";
import { persister } from "../../providers";

type API_RESPONSE = {
  response_code: number;
  results: {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
  }[];
};

export function useQuestions() {
  const { data } = useQuery({
    queryKey: ["questions"],
    queryFn: async () => {
      const response = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple"
      );
      const { results } = (await response.json()) as API_RESPONSE;

      return results.map((result) => {
        const { question, correct_answer, incorrect_answers } = result;
        return {
          question,
          correctAnswer: correct_answer,
          answers: [...incorrect_answers, correct_answer]
            .map((text) => ({
              text,
            }))
            .sort(() => Math.random() - 0.5),
        };
      });
    },
    staleTime: Infinity,
  });

  useEffect(() => {
    persistQueryClientSave({
      queryClient,
      persister,
    });
  }, [data]);

  return data;
}
