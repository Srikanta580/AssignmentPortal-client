import { FiSearch, FiFilter } from "react-icons/fi";

const SearchFilter = ({ searchTerm, onSearchChange, placeholder }) => {
  return (
    <div className="mb-6 flex space-x-4">
      <div className="flex-1 relative">
        <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
        />
      </div>
    </div>
  );
};

export default SearchFilter;
