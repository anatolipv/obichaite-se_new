import React from "react";
import ErrorMessageBox from "./ErrorMessage";

export type NumberInputProps<T> = {
  name: string;
  label: string;
  formValues: object;
  setFormValues: React.Dispatch<React.SetStateAction<T>>;
  placeholder: string;
  error?: {
    [key: string]: string | null;
  };
  extraClass?: string;
  required?: boolean;
  autoFocus?: boolean;
};

const NumberInput = <T,>({
  name,
  label,
  formValues,
  setFormValues,
  placeholder,
  error,
  extraClass,
  required = false,
  autoFocus = false,
}: NumberInputProps<T>) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex w-full flex-col gap-3">
      <label htmlFor={name} className="font-clash-semibold text-white">
        {label}
        {required && <span className="text-primaryBlue"> *</span>}
      </label>

      <div className="relative flex w-full items-center justify-between">
        <input
          name={name}
          id={name}
          type={"number"}
          placeholder={placeholder}
          value={formValues[name as keyof object]}
          onChange={(e) => onChangeHandler(e)}
          autoFocus={autoFocus}
          className={` w-full rounded-lg border border-gray-600 bg-transparent p-3 font-exo-2 font-[500] text-white outline-none ${extraClass}`}
        />
      </div>

      {!!error && <ErrorMessageBox errors={error} />}
    </div>
  );
};

export default NumberInput;
