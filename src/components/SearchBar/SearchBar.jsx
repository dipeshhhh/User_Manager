import { useState, useEffect, useCallback } from "react";
import "./Searchbar.css";
import SearchIcon from "../../assets/search.svg";
import { useUserListContext } from "../../contexts/UserListContext";
import { debounce } from "../../utils/helpers";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const { searchUsers } = useUserListContext();

  const debouncedSearch = useCallback(debounce(searchUsers, 300), []);

  useEffect(() => {
    debouncedSearch(searchInput);
  }, [searchInput, debouncedSearch]);
  
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }
  

  return (
    <div className="search-bar-container">
      <form className="search-bar" onSubmit={(e) => { e.preventDefault }}>
        <input
          className="search-bar-input"
          type="text"
          placeholder="Search user..."
          value={searchInput}
          onChange={handleSearchInput}
        />
        <img className="search-bar-icon" src={SearchIcon} />
      </form>
    </div>
  )
}