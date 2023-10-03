import React from "react";
import ReactPaginate from "react-paginate";

// Example items, to simulate fetching from another resources.

function Pagination({ itemsPerPage, onChange, currentPage }) {
  // const pageCount = Math.ceil(totalPage / itemsPerPage);

  const handlePageClick = (event) => {
    onChange(event?.selected + 1);
  };

  return (
    <>
      <ReactPaginate
        forcePage={currentPage - 1}
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={10}
        pageCount={itemsPerPage}
        previousLabel="Prev"
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        previousLinkClassName={"pagination__link"}
        nextLinkClassName={"pagination__link"}
        disabledClassName={"pagination__link--disabled"}
        activeClassName={"pagination__link--active"}
      />
    </>
  );
}

export default Pagination;
