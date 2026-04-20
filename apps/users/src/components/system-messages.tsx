import type { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

type SystemMessageProps = ComponentProps<"div"> & {
  type?: "error" | "warning" | "success" | "info";
};

export default function SystemMessage({
  className,
  type,
  ...props
}: SystemMessageProps) {
  const baseClasses =
    "w-full flex items-center justify-center border p-4 rounded";
  const typeClasses = {
    error: "border-red-500 bg-red-100 text-red-700",
    warning: "border-yellow-500 bg-yellow-100 text-yellow-700",
    success: "border-green-500 bg-green-100 text-green-700",
    info: "border-blue-500 bg-blue-100 text-blue-700",
  };

  return (
    <div
      className={twMerge(baseClasses, typeClasses[type], className)}
      {...props}
    />
  );
}
