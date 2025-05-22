import { useState } from "react";
import { Item } from "./Item";

export default function PackingList({
  items,
  handleDeleteItems,
  handleToggleItem,
  deleteAllItems,
}) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems = items;
  if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="bg-white p-6 rounded shadow-md border border-gray-200 mb-6 relative pb-20">
      <ul className="space-y-3">
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDeleteItems={handleDeleteItems}
            handleToggleItem={handleToggleItem}
          />
        ))}
      </ul>

      {/* Fixed footer */}
      <div className="absolute bottom-0 left-0 w-full mt-4 flex items-center justify-center flex-wrap gap-4 pt-4 bg-white p-4 rounded-b">
        <select
          className="border border-gray-300 rounded focus:outline-none focus:border-gray-400 p-2 "
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button
          onClick={deleteAllItems}
          className="bg-gray-950 text-white px-4 py-2 rounded hover:bg-gray-800 transition"
        >
          Clear All List
        </button>
      </div>
    </div>
  );
}
