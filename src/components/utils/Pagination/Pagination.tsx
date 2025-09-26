import React from "react";
import PropTypes from "prop-types";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PaginationButton = ({ active, label, onChange, page }) => (
  <button
    className={`mx-1 w-7 h-7 rounded-full border border-[var(--primarycolor)] ${
      active ? "bg-[var(--primarycolor)] text-white" : "bg-white"
    }`}
    onClick={() => onChange(page)}
  >
    {label || page}
  </button>
);

PaginationButton.propTypes = {
  active: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

PaginationButton.defaultProps = {
  active: false,
  label: "",
};

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  if (!totalPages) return;

  const generatePageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxDisplayedPages = 5; // Max number of pages to display
    const pageBuffer = Math.floor(maxDisplayedPages / 2); // Number of pages to display around the current page

    // Always show the first page
    pageNumbers.push(1);

    // Determine start and end pages to display around the current page
    const startPage = Math.max(currentPage - pageBuffer, 2);
    const endPage = Math.min(currentPage + pageBuffer, totalPages - 1);

    // Show ellipsis if there are pages between 1 and startPage
    if (startPage > 2) {
      pageNumbers.push("...");
    }

    // Push page numbers for the range around the current page
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Show ellipsis if there are pages between endPage and totalPages
    if (endPage < totalPages - 1) {
      pageNumbers.push("...");
    }

    // Always show the last page if totalPages is greater than 1
    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <div className="flex gap-5 justify-center sm:justify-end flex-col-reverse sm:flex-row mt-5 text-[var(--primarycolor)] font-semibold">
      <div className="flex gap-2 items-center justify-between">
        <button
          className={`flex gap-2 items-center ${
            currentPage === 1 && "text-gray-300"
          }`}
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <MdKeyboardArrowLeft className="text-2xl" />
          Previous
        </button>
        <button
          className={`sm:hidden flex gap-2 items-center${
            currentPage === totalPages && "text-gray-300"
          }`}
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next <MdKeyboardArrowRight className="text-2xl" />
        </button>
      </div>
      <div className="mx-auto sm:mx-0">
        {generatePageNumbers()?.map((page, index) => (
          <React.Fragment key={index}>
            {typeof page === "number" ? (
              <PaginationButton
                active={currentPage === page}
                onChange={onPageChange}
                page={page}
              />
            ) : (
              <span className="mx-1">...</span>
            )}
          </React.Fragment>
        ))}
      </div>
      <button
        className={`hidden sm:flex gap-2 items-center ${
          currentPage === totalPages && "text-gray-300"
        }`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next <MdKeyboardArrowRight className="text-2xl" />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
