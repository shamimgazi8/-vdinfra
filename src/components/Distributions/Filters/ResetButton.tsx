import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import * as React from "react";

export const ResetFilters = ({ onReset }: { onReset: () => void }) => {
  return (
    <Button variant="ghost" onClick={onReset} className="p-2 h-auto text-primary">
      <XCircle className="w-4 h-4 mr-1" />
      Reset
    </Button>
  );
};