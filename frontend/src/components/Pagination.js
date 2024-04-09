import React, { useMemo, memo } from 'react';

// memo PageButton to avoid slow re-renders
const PageButton = memo(({ page, currentPage, onClick }) => (
  <button key={page} onClick={() => onClick(page)}
    className={currentPage === page ? 'active' : ''}>
    {page}
  </button>
));

const Pagination = memo(({ currentPage, totalPages, onPageChange }) => {
  // memo page numbers array to avoid slow computations
  const pageNumbers = useMemo(() => {
    const numbers = [];
    for (let i = 1; i <= totalPages; i++) {
      numbers.push(<PageButton key={i} page={i} 
        currentPage={currentPage} onClick={onPageChange} />);
    }
    return numbers;
  }, [totalPages, currentPage, onPageChange]);

  return (
    <div className="pagination">
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>Previous</button>)}
      {pageNumbers}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>Next</button>)}
    </div>
  );
});

export default Pagination;
