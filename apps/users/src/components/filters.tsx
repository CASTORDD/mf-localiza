import FilterEmail from "./filter-email";
import FilterName from "./filter-name";
import FilterRole from "./filter-role";
import FilterStatus from "./filter-status";

export default function Filters() {
  return (
    <div className="w-full flex max-sm:flex-col gap-2 justify-end">
      <div className="flex gap-2">
        <FilterRole />
        <FilterStatus />
      </div>
      <div className="flex gap-2">
        <FilterName />
        <FilterEmail />
      </div>
    </div>
  );
}
