import { useState } from "react";

export default function Form({ handleAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    handleAddItems(newItem);

    setDescription("");
    setQuantity(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow border border-gray-200 mb-6 flex flex-col sm:flex-row gap-3 items-center justify-center"
    >
      <p className="font-semibold">What do you need for your 😍 trip?</p>
      <select
        className="border border-gray-300 rounded p-2 focus:outline-none focus:border-gray-400"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        className="border border-gray-300 rounded p-2 focus:outline-none focus:border-gray-400  w-48"
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition">
        Add
      </button>
    </form>
  );
}
