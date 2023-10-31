import React from "react";
import Pagination from "react-bootstrap/Pagination";

const CustomPagination = ({isFirst,isLast, currentPage, totalPages, onPageChange }) => {
    const pageNumbers = [];

    const handlePageChange = (page) => {
        if (page !== currentPage && page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    // Calculate the page numbers to display
    if (totalPages <= 5) {
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        const halfRange = 2;
        const leftRange = currentPage - halfRange;
        const rightRange = currentPage + halfRange;

        if (leftRange <= 2) {
            // Display first 4 pages and the last page
            for (let i = 1; i <= 4; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push("...");
            pageNumbers.push(totalPages);
        } else if (rightRange >= totalPages - 1) {
            // Display the first page and last 4 pages
            pageNumbers.push(1);
            pageNumbers.push("...");
            for (let i = totalPages - 3; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            // Display the first page, current page with a range of 2 pages on each side, and the last page
            pageNumbers.push(1);
            pageNumbers.push("...");
            for (let i = leftRange; i <= rightRange; i++) {
                pageNumbers.push(i);
            }
            pageNumbers.push("...");
            pageNumbers.push(totalPages);
        }
    }

    return (
        <Pagination className="d-flex justify-content-center">
            <Pagination.First disabled={isFirst} onClick={()=>onPageChange(0)}/>
            <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)} />
            {pageNumbers.map((pageNumber, index) => (
                <Pagination.Item key={index} active={pageNumber === currentPage} onClick={() => onPageChange(pageNumber)} disabled={pageNumber==="..."}>
                    {pageNumber}
                </Pagination.Item>
            ))}
            <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)} />
            <Pagination.Last disabled={isLast} onClick={()=>onPageChange(totalPages)}/>
        </Pagination>
    );
    //   const handlePageChange = (page) => {
    //     if (page !== currentPage && page >= 1 && page <= totalPages) {
    //       onChangePage(page);
    //     }
    //   };

    //   const renderPaginationItems = () => {
    //     const items = [];

    //     for (let i = 1; i <= totalPages; i++) {
    //       items.push(
    //         <Pagination.Item
    //           key={i}
    //           active={i === currentPage}
    //           onClick={() => handlePageChange(i)}
    //         >
    //           {i}
    //         </Pagination.Item>
    //       );
    //     }

    //     return items;
    //   };

    //   return (
    //     <Pagination>
    //       <Pagination.Prev
    //         disabled={currentPage === 1}
    //         onClick={() => handlePageChange(currentPage - 1)}
    //       />
    //       {renderPaginationItems()}
    //       <Pagination.Next
    //         disabled={currentPage === totalPages}
    //         onClick={() => handlePageChange(currentPage + 1)}
    //       />
    //     </Pagination>
    //   );
};

export default CustomPagination;
