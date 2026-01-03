import { Slider } from "@/components/ui/slider";
import { useState } from "react";

function SalaryRangeFilter({ value, setValue }) {
  const displayMax = value[1] >= 15000 ? "∞" : value[1];

  return (
    <div className="w-64 flex flex-col gap-1 justify-center items-center">
      <Slider
        value={value}
        onValueChange={setValue}
        min={3000}
        max={15000}
        step={100}
        />
        <p>
          Zakres płacy: {value[0]} – {displayMax} zł
        </p>
    </div>
  );
}
export default SalaryRangeFilter;
