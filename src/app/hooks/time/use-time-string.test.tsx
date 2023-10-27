import { renderHook } from "@testing-library/react";
import { timeAtom } from "~/app/atoms";
import { useHydrateAtoms } from "jotai/utils";
import { useTimeString } from "./use-time-string";
import { Provider } from "jotai";
import { PropsWithChildren } from "react";

describe("useTimeString", () => {
  it("현재 값에 따른 반환 값 확인", async () => {
    const scenarios = [
      { time: 0, expected: "00:00" },
      { time: 59, expected: "00:59" },
      { time: 60, expected: "01:00" },
      { time: 610, expected: "10:10" },
    ];

    scenarios.forEach((scenario) => {
      const wrapper = ({ children }: PropsWithChildren) => (
        <Provider>{children}</Provider>
      );

      const { result } = renderHook(
        () => {
          useHydrateAtoms([[timeAtom, scenario.time]]);

          return useTimeString();
        },
        { wrapper }
      );

      expect(result.current).toBe(scenario.expected);
    });
  });
});
