import React from "react";

//NEED STYLING
type FormErrors = {
  [key: string]: string | null;
};

const ErrorMessageBox = ({ errors }: { errors: FormErrors }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const errorsContent = Object.entries(errors).map(([_, rules], index) => {
    return (
      <div key={`error-${index}`} className="w-full text-base text-red-600">
        <p className="text-left font-clash-regular">
          {rules as unknown as string}
        </p>
      </div>
    );
  });

  return (
    <div className="error_ref flex w-full scroll-mt-[60px] flex-col gap-2">
      {errorsContent}
    </div>
  );
};

export default ErrorMessageBox;