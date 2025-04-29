'use client'
import { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function NumberInput() {
  const [value, setValue] = useState(1);

  const decrement = () => setValue((prev) => Math.max(prev - 1, 0));
  const increment = () => setValue((prev) => prev + 1);

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={decrement}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <Minus size={16} />
      </button>
      <input
        type="number"
        className="w-16 text-center border border-gray-300 rounded"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
      />
      <button
        onClick={increment}
        className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
