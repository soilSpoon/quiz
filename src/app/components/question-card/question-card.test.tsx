import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import { QuestionCard } from "./question-card";
import Providers from "~/app/providers";
import { FormProvider, useForm } from "react-hook-form";
import { PropsWithChildren } from "react";
import { useQuestions } from "~/app/hooks/questions/use-questions";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        results: [
          {
            question: "test-question",
            correct_answer: "test-answer",
            incorrect_answers: ["wrong1", "wrong2", "wrong3"],
          },
        ],
      }),
  })
) as unknown as jest.MockedFunction<typeof fetch>;

const queryClient = new QueryClient();

describe("<QuestionCard />", () => {
  const {
    result: { current: form },
  } = renderHook(() => useForm());
  const wrapper = ({ children }: PropsWithChildren) => (
    <QueryClientProvider client={queryClient}>
      <FormProvider {...form}>{children}</FormProvider>
    </QueryClientProvider>
  );

  beforeEach(async () => {
    const { result } = renderHook(() => useQuestions(), { wrapper });

    await waitFor(() => expect(result.current !== undefined).toBe(true));
  });

  it("renders without crashing", () => {
    render(<QuestionCard />, { wrapper });
  });

  it("displays the question", () => {
    render(<QuestionCard />, { wrapper });
    expect(screen.getByText("1. test-question")).toBeInTheDocument();
  });

  it("displays all answers", () => {
    render(<QuestionCard />, { wrapper });
    expect(screen.getByText("test-answer")).toBeInTheDocument();
    expect(screen.getByText("wrong1")).toBeInTheDocument();
    expect(screen.getByText("wrong2")).toBeInTheDocument();
    expect(screen.getByText("wrong3")).toBeInTheDocument();
  });
});
