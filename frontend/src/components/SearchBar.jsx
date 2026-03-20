import React, { useState, useEffect, useRef, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { searchCareers } from "../Services/api";
import { ThemeContext } from "../context/ThemeContext";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const navigate = useNavigate();
  const { isDarkMode } = useContext(ThemeContext);
  const wrapperRef = useRef(null);
  const debounceRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced search
  const handleSearch = useCallback((searchQuery) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!searchQuery.trim()) {
      setResults([]);
      setIsOpen(false);
      setNoResults(false);
      return;
    }

    setLoading(true);
    debounceRef.current = setTimeout(async () => {
      try {
        const response = await searchCareers(searchQuery);
        const careers = response.data?.careers || [];
        setResults(careers);
        setNoResults(careers.length === 0);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
        setNoResults(true);
      } finally {
        setLoading(false);
      }
    }, 300);
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    handleSearch(value);
  };

  const handleResultClick = (career) => {
    setIsOpen(false);
    setQuery("");
    navigate(`/career/${career._id}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  // Icon mapping for categories
  const getCategoryIcon = (icon) => {
    return icon || "work";
  };

  return (
    <div className="relative w-full max-w-md" ref={wrapperRef}>
      <div className={`flex w-full items-center rounded-xl border px-4 h-11 transition-colors ${isDarkMode ? "bg-[#1a142e] border-[#2d264a] focus-within:border-[#8b5cf6]/50" : "bg-white border-border-light focus-within:border-primary/50"}`}>
        <span className={`material-symbols-outlined text-[20px] ${isDarkMode ? "text-[#a094b8]" : "text-slate-400"}`}>
          search
        </span>
        <input
          className={`w-full border-none bg-transparent focus:ring-0 px-3 text-sm ${isDarkMode ? "text-white placeholder:text-[#a094b8]" : "text-charcoal placeholder:text-slate-400"}`}
          placeholder="Search careers..."
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (results.length > 0 || noResults) setIsOpen(true);
          }}
        />
        {loading && (
          <div className="animate-spin size-4 border-2 border-[#8b5cf6]/30 border-t-[#8b5cf6] rounded-full"></div>
        )}
      </div>

      {/* Dropdown Results */}
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 mt-2 backdrop-blur-xl border rounded-xl shadow-2xl z-50 overflow-hidden max-h-[360px] overflow-y-auto custom-scrollbar ${isDarkMode ? "bg-[#1a142e]/95 border-[#2d264a] shadow-black/40" : "bg-white/95 border-border-light shadow-slate-200/60"}`}>
          {noResults && !loading && (
            <div className="flex flex-col items-center justify-center p-6 gap-2">
              <span className="material-symbols-outlined text-[#a094b8] text-3xl">
                search_off
              </span>
              <p className="text-[#a094b8] text-sm font-medium">
                No careers found for "{query}"
              </p>
              <p className="text-[#a094b8]/60 text-xs">
                Try different keywords
              </p>
            </div>
          )}

          {results.map((career) => (
            <div
              key={career._id}
              onClick={() => handleResultClick(career)}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors last:border-b-0 group ${isDarkMode ? "hover:bg-[#8b5cf6]/10 border-b border-[#2d264a]/50" : "hover:bg-primary/5 border-b border-slate-100"}`}
            >
              <div className="size-10 rounded-lg bg-[#8b5cf6]/10 text-[#8b5cf6] flex items-center justify-center shrink-0 group-hover:bg-[#8b5cf6] group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-xl">
                  {getCategoryIcon(career.icon)}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-semibold truncate group-hover:text-[#8b5cf6] transition-colors ${isDarkMode ? "text-white" : "text-charcoal"}`}>
                  {career.title || career.careerName}
                </p>
                <p className={`text-xs truncate ${isDarkMode ? "text-[#a094b8]" : "text-slate-500"}`}>
                  {career.category || "General"}
                  {career.shortDescription && ` · ${career.shortDescription}`}
                </p>
              </div>
              <span className="material-symbols-outlined text-[#a094b8]/40 group-hover:text-[#8b5cf6] transition-colors text-lg">
                arrow_forward
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
