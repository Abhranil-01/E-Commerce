import React from "react";

function TextArea({
    className,
    label,
    icon ,
    style,
    register,
    value
}) {
  return (
    <>
      <div class={`form-floating ${className} mb-3`} style={style}>
        <textarea
          class="form-control h-100 "
          placeholder={label}
          id="floatingTextarea2"
          {...register}
         defaultValue={value}
        ></textarea>
        <label for="floatingTextarea2">{label}</label>
      </div>
    </>
  );
}

export default TextArea;
