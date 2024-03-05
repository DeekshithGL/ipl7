import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

const Input = ({ label, id, type, required, register, errors, disabled }) => {
  return (
    <div>
      <label className="block text-md text-left ml-[1px] font-medium">
        {label}
      </label>
      <div className="my-4">
        <input
          id={id}
          type={type}
          {...register(id, { required })}
          className={clsx(
            `
                form-input block w-full rounded-md py-1.5 text-gray-900 ring-black border-2 border-gray-400 placeholder:text-sm
                focus:border-[3px]
                sm:text-sm
                sm:leading-6
                `,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacity-50"
          )}
          placeholder={`Enter your ${id}`}
        />
      </div>
    </div>
  );
};

export default Input;