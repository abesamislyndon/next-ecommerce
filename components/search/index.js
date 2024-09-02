import { useState } from "react";

export default function Search({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch(""); // Clear the search results as well
  };

  return (
    <div className="relative mt-5 p-3 lg:mt-0 lg:p-0">
      <input
        type="text"
        className="w-full h-12 p-2 border border-gray"
        placeholder="Search Product"
        value={query}
        onChange={handleSearch}
      />
      {query && (
        <button
          className="absolute right-2 top-[52px] bg-gray-200 hover:bg-gray-300 p-1 rounded"
          onClick={clearSearch}
        >
          Clear
        </button>
      )}
    </div>
  );
}
