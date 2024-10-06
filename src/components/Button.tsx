import { ButtonHTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

const Button = ({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) => {
  return (
    <button
      className={twMerge(
        "bg-main w-full py-6 rounded-md text-white",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
