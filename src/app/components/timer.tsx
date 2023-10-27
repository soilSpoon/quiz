import { useIncrementTime } from "../hooks/time/use-increment-time";
import { useTimeString } from "../hooks/time/use-time-string";

export function Timer({ isRunning }: { isRunning: boolean }) {
  const timeString = useTimeString();

  useIncrementTime({ isRunning });

  return <p>{timeString}</p>;
}
