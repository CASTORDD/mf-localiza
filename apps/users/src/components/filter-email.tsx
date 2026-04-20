import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { AtSign, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import useFilters from "@/hooks/useFilters";
export default function FilterEmail() {
  const { email, setEmail } = useFilters();
  const [localEmail, setLocalEmail] = useState<string | null>(email);

  useEffect(() => {
    const t = setTimeout(() => {
      setEmail(localEmail ? localEmail : null);
    }, 500);

    return () => clearTimeout(t);
  }, [localEmail, setEmail]);

  function handleClear() {
    setLocalEmail("");
    setEmail(null);
  }
  return (
    <InputGroup className="max-w-2xs">
      <InputGroupAddon align="inline-start">
        <AtSign className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput
        id="inline-start-input"
        placeholder="Search by email..."
        value={localEmail || ""}
        onChange={(e) => setLocalEmail(e.target.value)}
      />
      <InputGroupAddon align="inline-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClear}
          className="text-muted-foreground hover:text-foreground"
        >
          <XIcon className="size-4" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
