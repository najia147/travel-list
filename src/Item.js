export function Item({ item, handleDeleteItems, handleToggleItem }) {
  return (
    <li className="flex items-center justify-between p-2 border-b border-gray-300">
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => handleToggleItem(item.id)}
          className="form-checkbox h-5 w-5 bg-gray-950"
        />
        <span className={`${item.packed ? "line-through text-gray-400" : ""}`}>
          {item.quantity} {item.description}
        </span>
      </label>
      <button
        onClick={() => handleDeleteItems(item.id)}
        className="cursor-pointer w-11"
      >
        <img src="./cross.png" alt="delete" width="40%" height="40%" />
      </button>
    </li>
  );
}
