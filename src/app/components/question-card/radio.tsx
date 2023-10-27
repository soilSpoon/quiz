import { Fragment } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { FormPayload } from "~/app/types";

type RadioProps = {
  name: string;
  text: string;
  correctAnswer: string;
};

export function Radio({ name, text, correctAnswer }: RadioProps) {
  const { control, register } = useFormContext<FormPayload>();

  const value = useWatch({ control, name });
  const classNames = ["radio"];

  if (value != null) {
    classNames.push(text === correctAnswer ? "radio-success" : "radio-error");
  }

  return (
    <div className="form-control">
      <label className="label cursor-pointer flex gap-3">
        <span className="label-text">{text}</span>
        <input
          type="radio"
          {...register(name)}
          className={classNames.join(" ")}
          value={text}
        />
      </label>
    </div>
  );
}
