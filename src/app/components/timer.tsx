import { HTMLAttributes } from "react";
import { useIncrementTime } from "../hooks/time/use-increment-time";
import { useTimeString } from "../hooks/time/use-time-string";

type TimerProps = HTMLAttributes<HTMLParagraphElement> & {
  isRunning: boolean;
};

export function Timer({ isRunning, ...props }: TimerProps) {
  const timeString = useTimeString();

  useIncrementTime({ isRunning });

  return <p {...props}>소요시간: {timeString}</p>;
}
