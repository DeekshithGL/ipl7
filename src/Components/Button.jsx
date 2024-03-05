import clsx from "clsx";

const Button = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
   
      className={clsx(
        `flex block justify-center rounded-md px-4 py-2 mx-auto mt-6  w-${
          fullWidth ? "full" : ""
        } text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2`,
        disabled && "opacity-50 cursor-default",
        secondary ? "text-gray-900" : "text-white",
        danger &&
          "text-rose-500 hover:bg-rose-600 focus-visible:outline-rose-600",
        !secondary &&
          !danger &&
          "bg-black hover:bg-[#050A30] focus-visible:outline-sky-600"
      )}
    >
      <p className="uppercase">{children}</p>
    </button>
  );
};

export default Button;