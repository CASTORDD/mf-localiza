import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePagination } from "@/hooks/usepagination";

export default function PerPage() {
  const { per, setPer } = usePagination();
  return (
    <Select
      defaultValue={String(per)}
      onValueChange={(val) => setPer(Number(val))}
    >
      <SelectTrigger className="w-17">
        <SelectValue placeholder="Items" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={"5"}>5</SelectItem>
          <SelectItem value={"10"}>10</SelectItem>
          <SelectItem value={"20"}>20</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
