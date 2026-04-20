import type { ComponentProps } from "react";
import { Button } from "./ui/button";
import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { usePagination } from "@/hooks/usepagination";
import PerPage from "./per-page";
import { twMerge } from "tailwind-merge";
import useUserDetail from "@/hooks/useUsers";

type PaginationButtonProps = ComponentProps<"button">;

export function PaginationButton({
  className,
  ...props
}: PaginationButtonProps) {
  return (
    <Button
      variant="outline"
      className={twMerge("cursor-pointer", className)}
      {...props}
    />
  );
}

type PaginationProps = ComponentProps<"div">;

export default function Pagination({ className, ...props }: PaginationProps) {
  const { usersResponse } = useUserDetail();
  const { page, setPage, goToPrev, goToNext } = usePagination();

  if (usersResponse?.items === 0) return null;

  return (
    <div
      className={twMerge(
        "max-md:sticky max-md:bottom-0 flex gap-1 md:gap-2 justify-center bg-white py-2",
        className,
      )}
      {...props}
    >
      {page !== 1 && (
        <PaginationButton className="max-sm:hidden" onClick={() => setPage(1)}>
          <ChevronFirst className="size-5" />
        </PaginationButton>
      )}
      {page > 1 && (
        <PaginationButton onClick={goToPrev}>
          <ChevronLeft className="size-5" />
        </PaginationButton>
      )}
      {Array.from({ length: 5 }, (_, i) => (
        <PaginationButton
          key={i}
          className="cursor-pointer"
          onClick={() => setPage(Number(`${page + i}`))}
        >
          {page + i}
        </PaginationButton>
      ))}
      {usersResponse?.next && (
        <PaginationButton className="cursor-pointer" onClick={goToNext}>
          <ChevronRight className="size-5" />
        </PaginationButton>
      )}
      {page < usersResponse?.last && (
        <PaginationButton
          className="max-sm:hidden"
          onClick={() => setPage(usersResponse?.last)}
        >
          <ChevronLast className="size-5" />
        </PaginationButton>
      )}
      <PerPage />
    </div>
  );
}
