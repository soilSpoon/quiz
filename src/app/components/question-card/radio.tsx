import {
  Control,
  FieldPath,
  FieldValues,
  useFormContext,
  useWatch,
} from "react-hook-form";

type RadioProps<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>;
  name: FieldPath<TFieldValues>;
  text: string;
  correctAnswer: string;
};

export function Radio<TFieldValues extends FieldValues>({
  control,
  name,
  text,
  correctAnswer,
}: RadioProps<TFieldValues>) {
  const { register } = useFormContext<TFieldValues>();
  const value = useWatch<TFieldValues>({ control, name });
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
