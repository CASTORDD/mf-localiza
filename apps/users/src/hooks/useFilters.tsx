import { useQueryState, debounce } from "nuqs";

export default function useFilters() {
  const [name, setName] = useQueryState("name:contains", {
    shallow: false,
    limitUrlUpdates: debounce(500),
  });
  const [email, setEmail] = useQueryState("email:contains");
  const [role, setRole] = useQueryState("role:eq");
  const [status, setStatus] = useQueryState("status:eq");
  return { name, setName, email, setEmail, role, setRole, status, setStatus };
}
