import React, { useState } from 'react';
import { Search, Sparkles } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className={`relative rounded-full transition duration-300 ${isFocused ? 'ring-2 ring-blue-500 shadow-lg' : 'shadow'}`}>
          <input
            type="text"
            placeholder="Search for AI agents by name, capability, or category..."
            className="w-full px-6 py-3 pl-12 pr-12 text-gray-700 bg-white border-none rounded-full focus:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <button 
              type="submit" 
              className="flex items-center justify-center p-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition duration-300"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        </div>
      </form>
      <div className="mt-2 flex justify-center flex-wrap gap-2">
        <button 
          onClick={() => {setQuery('writing'); onSearch('writing');}}
          className="text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition duration-200"
        >
          Writing
        </button>
        <button 
          onClick={() => {setQuery('coding'); onSearch('coding');}}
          className="text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition duration-200"
        >
          Coding
        </button>
        <button 
          onClick={() => {setQuery('design'); onSearch('design');}}
          className="text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition duration-200"
        >
          Design
        </button>
        <button 
          onClick={() => {setQuery('data analysis'); onSearch('data analysis');}}
          className="text-xs text-gray-600 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full transition duration-200"
        >
          Data Analysis
        </button>
      </div>
    </div>
  );
};

export default SearchBar;