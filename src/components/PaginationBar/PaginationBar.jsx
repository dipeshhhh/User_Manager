import "./PaginationBar.css";

export default function PaginationBar({ pageNumber, setPageNumber, totalPages = 1 }) {
  const handleNextPage = (e) => {
    if(pageNumber >= totalPages) return;
    setPageNumber(pageNumber+1);
  }
  const handlePrevPage = (e) => {
    if(pageNumber <= 1) return;
    setPageNumber(pageNumber-1);
  }
  const handlePageInput = (e) => {
    setPageNumber(pageNumberValidation(e.target.value, totalPages));
  }
  const pageNumberValidation = (pageNumber, totalPages = pageNumber) => {
    if (pageNumber < 1) return 1;
    if (pageNumber > totalPages) return totalPages;
    return pageNumber;
  }
  return (
    <div className="pagination-bar-container">
      <button className="pagination-button" onClick={handlePrevPage}>Prev</button>
      <span>
        Page No.
        <input
          className="pagination-page-input"
          type="number"
          value={pageNumber}
          onChange={handlePageInput}
        />
        / {totalPages}
      </span>
      <button className="pagination-button" onClick={handleNextPage}>Next</button>
    </div>
  )
}