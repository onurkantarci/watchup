const Pagination = ({
  handlePrevClick,
  handleNextClick,
  currentPage,
  handleLatest,
  handleFirst,
  totalPages,
}) => {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  return (
    <div className="prev-next">
      <button onClick={handleFirst} disabled={isFirstPage}>
        &lt;&lt;
      </button>
      <button onClick={handlePrevClick} disabled={isFirstPage}>
        Prev
      </button>
      <p style={{ color: "white" }}>
        {currentPage} / {totalPages}
      </p>
      <button onClick={handleNextClick} disabled={isLastPage}>
        Next
      </button>
      <button onClick={handleLatest} disabled={isLastPage}>
        &gt;&gt;
      </button>
    </div>
  );
};

export default Pagination;
