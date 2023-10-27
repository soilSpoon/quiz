import { Fragment } from "react";
import { useFormContext, useWatch } from "react-hook-form";

export function Radio({
  name,
  text,
  correctAnswer,
}: {
  name: string;
  text: string;
  correctAnswer: string;
}) {
  const { control, register } = useFormContext();

  const value = useWatch({ control, name });
  const classNames = ["radio"];

  if (value != null) {
    classNames.push(text === correctAnswer ? "radio-success" : "radio-error");
  }

  return (
    <Fragment>
      <p>{text}</p>
      <input
        type="radio"
        {...register(name)}
        className={classNames.join(" ")}
        value={text}
      />
    </Fragment>
  );
}
