import { useIncrementTime } from "../hooks/time/use-increment-time";
import { useTimeString } from "../hooks/time/use-time-string";

type TimerProps = {
  isRunning: boolean;
};

export function Timer({ isRunning }: TimerProps) {
  const timeString = useTimeString();

  useIncrementTime({ isRunning });

  return <p>{timeString}</p>;
}
