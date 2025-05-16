import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems(items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function deleteAllItems() {
    const confirmed = window.confirm(
      "Are you sure you want to delete all items?"
    );
    if (confirmed) setItems([]);
  }

  return (
    <div className="min-h-screen bg-blue-100 text-gray-800 p-6 font-sans">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList
        items={items}
        handleDeleteItems={handleDeleteItems}
        handleToggleItem={handleToggleItem}
        deleteAllItems={deleteAllItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return (
    <div className="text-center mb-8">
      <h1 className="text-4xl font-bold">🌴 FAR AWAY 💼</h1>
    </div>
  );
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("Computer");
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
      className="bg-white p-4 rounded shadow-md mb-6 flex flex-col sm:flex-row gap-3 items-center justify-center"
    >
      <p className="font-semibold">What do you need for your 😍 trip?</p>
      <select
        className="border rounded p-2"
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
        className="border rounded p-2 w-48"
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
        Add
      </button>
    </form>
  );
}

function PackingList({
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
    <div className="bg-white p-6 rounded shadow-md mb-6">
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

      <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
        <select
          className="border rounded p-2"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button
          onClick={deleteAllItems}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Clear All List
        </button>
      </div>
    </div>
  );
}

function Item({ item, handleDeleteItems, handleToggleItem }) {
  return (
    <li className="flex items-center justify-between p-2 border-b">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => handleToggleItem(item.id)}
          className="form-checkbox h-5 w-5 text-blue-600"
        />
        <span className={`${item.packed ? "line-through text-gray-400" : ""}`}>
          {item.quantity} × {item.description}
        </span>
      </label>
      <button
        onClick={() => handleDeleteItems(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        ❌
      </button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  if (!numItems) {
    return (
      <p className="text-center italic text-gray-600">
        Start adding some items to your packing list ✨
      </p>
    );
  }

  return (
    <footer className="text-center mt-6">
      <em className="text-lg font-medium">
        {numPacked === numItems
          ? "✅ You got everything! Ready to go!"
          : `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}
