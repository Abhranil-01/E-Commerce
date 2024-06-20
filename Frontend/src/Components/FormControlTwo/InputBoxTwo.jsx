import React from "react";

function InputBoxTwo({
  className,
  label,
  type = 'text',
  register,
  value,
}) {
  return (
    <>
      <div className={`${className} form-floating mb-3 p-0`}>
        <input
          type={type}
          className="form-control"
          id="floatingInput"
          {...register}
          defaultValue={value}
          placeholder={label}
        />
        <label htmlFor="floatingInput">{label}</label>
      </div>
    </>
  );
}

export default InputBoxTwo;
