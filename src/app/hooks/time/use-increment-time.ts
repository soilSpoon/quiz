import { useSetAtom } from "jotai";
import { useEffect } from "react";
import { timeAtom } from "~/app/atoms";

export function useIncrementTime({ isRunning }: { isRunning: boolean }) {
  const setTime = useSetAtom(timeAtom);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
  }, [isRunning, setTime]);
}
