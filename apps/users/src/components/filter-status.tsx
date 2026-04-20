import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATUS } from "@/consts/status";
import useFilters from "@/hooks/useFilters";

export default function FilterStatus() {
  const { status, setStatus } = useFilters();
  return (
    <Select value={status} onValueChange={setStatus}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Select Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={null}>All Status</SelectItem>
          {Object.entries(STATUS).map(([key, value]) => (
            <SelectItem key={key} value={value}>
              {key}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
