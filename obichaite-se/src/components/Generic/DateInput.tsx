import React from "react";

export type DateInputProps<T> = {
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
  voice?: boolean;
};

const DateInput = <T,>({
  name,
  label,
  formValues,
  setFormValues,
  extraClass,
  required = false,
}: DateInputProps<T>) => {
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <div className="flex w-full flex-col gap-3">
      <label htmlFor="date" className="font-clash-semibold text-white">
        {label}
        {required && <span className="text-primaryBlue"> *</span>}
      </label>
      <input
        type="date"
        name={name}
        id="date"
        value={formValues[name as keyof object]}
        onChange={(e) => onChangeHandler(e)}
        className={`w-full rounded-lg border border-gray-600 bg-transparent p-3 font-clash-medium text-white outline-none ${extraClass}`}
      />
    </div>
  );
};

export default DateInput;
