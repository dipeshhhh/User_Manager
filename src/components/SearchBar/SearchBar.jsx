import { useState, useEffect, useCallback } from "react";
import { useUserListContext } from "../../contexts/UserListContext";
import { capitalizeFirstLetter, debounce } from "../../utils/helpers";
import "./SearchBar.css";
import FormCheckboxInput from "../FormInputs/FormCheckboxInput/FormCheckboxInput";
import SearchIcon from "../../assets/search.svg";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const { searchUsers } = useUserListContext();
  const [filters, setFilters] = useState({
    first_name: true,
    last_name: true,
    email: false,
  });

  // Debounced function now considers both searchInput and filters
  const debouncedSearch = useCallback(
    debounce((query, activeFilters) => searchUsers(query, Object.keys(activeFilters).filter((key) => activeFilters[key])), 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchInput, filters);
  }, [searchInput, filters, debouncedSearch]);

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    searchUsers(searchInput, Object.keys(filters).filter((key) => filters[key]));
  };

  const toggleFilter = (key) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: !prevFilters[key],
    }));
  };

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search user..."
          value={searchInput}
          onChange={handleSearchInput}
        />
        <img className="search-bar-icon" src={SearchIcon} onClick={handleSearch} />
      </form>
      <section className="filter-section">
        {Object.keys(filters).map((key) => (
          <FormCheckboxInput
            key={key}
            inputName={capitalizeFirstLetter(key.replace("_", " "))}
            checked={filters[key]}
            onChange={() => toggleFilter(key)}
          />
        ))}
      </section>
    </div>
  );
}
