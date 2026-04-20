import { useQueryState, parseAsInteger } from "nuqs";

export function usePagination() {
  const [per, setPer] = useQueryState(
    "_per_page",
    parseAsInteger.withDefault(10),
  );
  const [page, setPage] = useQueryState("_page", parseAsInteger.withDefault(1));

  const goToNext = () => setPage((p) => p + 1);
  const goToPrev = () => setPage((p) => Math.max(1, p - 1));

  return { page, setPage, goToNext, goToPrev, per, setPer };
}
