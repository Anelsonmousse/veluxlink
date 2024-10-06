"use client";
import { useState } from "react";
import { twMerge } from "tailwind-merge";

const CheckBox = ({
  isChecked,
  onToggle,
}: {
  isChecked: boolean;
  onToggle?: (checked: boolean) => void;
}) => {
  return (
    <label className="w-12 h-6 shrink-0 relative inline-block">
      <input
        onChange={() => {
          return typeof onToggle === "function" && onToggle(isChecked);
        }}
        className="w-0 h-0 opacity-0"
        type="checkbox"
      />
      <div
        className={twMerge(
          "rounded-full before:content-[''] before:left-0 block before:top-0 before:bg-main before:block before:w-4 before:transition-transform before:h-full before:rounded-full w-full h-full p-1 absolute top-0 left-0 cursor-pointer bg-[#02590F40]",
          isChecked ? "before:translate-x-6" : "before:translate-x-0"
        )}
      ></div>
    </label>
  );
};

export default CheckBox;
