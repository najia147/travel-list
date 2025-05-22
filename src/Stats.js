export default function Stats({ items }) {
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
