import { useState } from "react";
import "./Searchbar.css";
import SearchIcon from "../../assets/search.svg";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  }

  // Functionality later

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