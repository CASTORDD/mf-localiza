import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import useFilters from "@/hooks/useFilters";
import { User2Icon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
export default function FilterName() {
  const { name, setName } = useFilters();
  const [localName, setLocalName] = useState<string | null>(name);

  useEffect(() => {
    const t = setTimeout(() => {
      setName(localName ? localName : null);
    }, 500);

    return () => clearTimeout(t);
  }, [localName, setName]);

  function handleClear() {
    setLocalName("");
    setName(null);
  }
  return (
    <InputGroup className="max-w-2xs">
      <InputGroupAddon align="inline-start">
        <User2Icon className="text-muted-foreground" />
      </InputGroupAddon>
      <InputGroupInput
        id="inline-start-input"
        placeholder="Search by name..."
        value={localName || ""}
        onChange={(e) => setLocalName(e.target.value)}
      />
      <InputGroupAddon align="inline-end">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleClear()}
          className="text-muted-foreground hover:text-foreground"
        >
          <XIcon className="size-4" />
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
