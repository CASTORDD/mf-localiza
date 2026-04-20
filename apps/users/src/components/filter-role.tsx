import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROLES } from "@/consts/roles";
import useFilters from "@/hooks/useFilters";

export default function FilterRole() {
  const { role, setRole } = useFilters();
  return (
    <Select value={role} onValueChange={setRole}>
      <SelectTrigger className="w-45">
        <SelectValue placeholder="Role" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={null}>All Roles</SelectItem>
          {Object.entries(ROLES).map(([key, value]) => (
            <SelectItem key={key} value={value}>
              {key}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
