import React from "react";
import ReactPaginate from "react-paginate";

function Pagination({
  itemsPerPage,
  onChange,
  currentPage,
  perPage,
  totalResults,
  onChangePerPage,
}) {
  const handlePageClick = (event) => {
    onChange(event?.selected + 1);
  };

  const lastRecordIndex = currentPage * perPage;
  const lastRecord =
    lastRecordIndex > totalResults
      ? totalResults.toString().padStart(2, "0")
      : lastRecordIndex.toString().padStart(2, "0");
  const firstRecord = (lastRecordIndex - perPage + 1)
    .toString()
    .padStart(2, "0");

  return (
    <div className="flex items-center justify-between w-full">
      {totalResults ? (
        <div className="flex items-center">
          <select
            onChange={(e) => {
              onChangePerPage(e?.target?.value);
            }}
            value={perPage?.toString()}
            className="text-[#333] bg-[#ffffff] text-[12px] border border-[#959595] h-[25px] rounded px-2"
          >
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="60">60</option>
            <option value="100">100</option>
          </select>
          <div className="ml-2 text-[14px]">{`Showing ${firstRecord} to ${lastRecord} of ${totalResults} entities`}</div>
        </div>
      ) : (
        ""
      )}

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
    </div>
  );
}

export default Pagination;
