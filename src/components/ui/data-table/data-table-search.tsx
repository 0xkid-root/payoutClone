"use client";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

interface DataTableSearchProps {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  debounceMs?: number;
  className?: string;
}

export function DataTableSearch({
  placeholder = "Search...",
  value: initialValue,
  onChange,
  debounceMs = 500,
  className,
}: DataTableSearchProps) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue] = useDebounce(value, debounceMs);

  // When debounced value changes, notify parent
  useEffect(() => {
    onChange(debouncedValue);
  }, [debouncedValue, onChange]);

  return (
    <div className={cn("relative w-full max-w-sm", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 focus-visible:ring-primary"
      />
    </div>
  );
}
