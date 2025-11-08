import React from 'react'

//NEED STYLING

const ErrorMessageBox = ({ error }: { error: string }) => {
  return (
    <div className="error_ref flex w-full scroll-mt-[60px] flex-col gap-2">
      <div className="w-full text-base text-red-600">
        <p className="text-left font-kolka font-regular">{error}</p>
      </div>
    </div>
  )
}

export default ErrorMessageBox
