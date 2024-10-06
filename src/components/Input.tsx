import { InputHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const Input = ({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className={twMerge(
        "bg-transparent border-t border-opacity-20 border-white outline-none w-full px-6 py-5 placeholder:text-white placeholder:text-opacity-50 rounded-xl shadow-white shadow-md text-white",
        className
      )}
    />
  );
};

export default Input;
