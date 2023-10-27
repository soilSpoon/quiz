import { renderHook, waitFor } from "@testing-library/react";
import { useQuestions } from "./use-questions";
import { persistQueryClientSave } from "@tanstack/react-query-persist-client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

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
const wrapper = ({ children }: PropsWithChildren) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

jest.mock("@tanstack/react-query-persist-client");
(persistQueryClientSave as jest.Mock).mockImplementation(() => {});

describe("useQuestions", () => {
  it("fetches and formats the questions correctly", async () => {
    const { result } = renderHook(() => useQuestions(), { wrapper });

    await waitFor(() => expect(result.current !== undefined).toBe(true));

    expect(result.current?.[0]).toEqual({
      question: "test-question",
      correctAnswer: "test-answer",
      answers: expect.arrayContaining([
        { text: "test-answer" },
        { text: "wrong1" },
        { text: "wrong2" },
      ]),
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://opentdb.com/api.php?amount=10&type=multiple"
    );
    expect(persistQueryClientSave).toHaveBeenCalled();
  });
});
