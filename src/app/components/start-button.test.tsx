import { render, screen, fireEvent, renderHook } from "@testing-library/react";
import { Provider, useAtomValue } from "jotai";
import { StartButton } from "./start-button";
import { isSolvingAtom } from "../atoms";

describe("<StartButton />", () => {
  it("아무 동작도 안 했을 때 상태 확인", () => {
    render(
      <Provider>
        <StartButton />
      </Provider>
    );

    const { result } = renderHook(() => useAtomValue(isSolvingAtom));

    expect(result.current).toBe(false);
  });

  it("시작 버튼을 눌렀을 때 상태 확인", () => {
    render(
      <Provider>
        <StartButton />
      </Provider>
    );

    fireEvent.click(screen.getByText("퀴즈 풀기"));

    const { result } = renderHook(() => useAtomValue(isSolvingAtom));

    expect(result.current).toBe(true);
  });
});
