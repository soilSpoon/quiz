import { act, renderHook, waitFor } from "@testing-library/react";
import { useIncrementTime } from "./use-increment-time";
import { useAtomValue } from "jotai";
import { timeAtom } from "~/app/atoms";
import { useHydrateAtoms } from "jotai/utils";

beforeEach(() => {
  jest.useFakeTimers();
});

afterEach(() => {
  jest.useRealTimers();

  renderHook(() => useHydrateAtoms([[timeAtom, 0]]));
});

describe("useIncrementTime", () => {
  it("실행 중일 경우에 값이 증가하는지 확인", async () => {
    const { result } = renderHook(
      ({ isRunning }) => {
        useIncrementTime({ isRunning });
        return useAtomValue(timeAtom);
      },
      {
        initialProps: { isRunning: true },
      }
    );

    expect(result.current).toBe(0);

    act(() => jest.advanceTimersByTime(3000));

    expect(result.current).toBe(3);
  });

  it("실행 중이 아닐 경우에 값이 증가하지 않는지 확인", async () => {
    const { result } = renderHook(
      ({ isRunning }) => {
        useIncrementTime({ isRunning });
        return useAtomValue(timeAtom);
      },
      {
        initialProps: { isRunning: false },
      }
    );

    expect(result.current).toBe(0);

    act(() => jest.advanceTimersByTime(5000));

    expect(result.current).toBe(0);
  });
});
