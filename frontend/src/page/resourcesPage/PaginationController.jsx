import React from "react";
import "./ResourcesPageStyles.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faChevronRight, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

function PaginationController({page, setPage, totalPages, pageSize, setPageSize}) {
    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < totalPages) {
          setPage(newPage);
        }
      }

      const handlePageSizeChange = (newSize) => {
          setPageSize(newSize);
          setPage(0);
      }

      const handleInputChange = (e) => {
        const newPage = parseInt(e.target.value, 10) - 1;
        if (!isNaN(newPage) && newPage >= 0 && newPage < totalPages) {
          setPage(newPage)
        }
      }

    return (
        <div className="paginationControl">
            <div className="pageSizeControl">
                <label>
                    {"Page Size: "}
                    <select
                    value={pageSize}
                    onChange={(e)=>handlePageSizeChange(parseInt(e.target.value, 10))}
                    >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    </select>
                </label>
            </div>
            <button
                onClick = {() => handlePageChange(page - 1)}
                disabled = {page === 0}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            <div>
                <input
                    type='number'
                    value={page + 1}
                    onChange={handleInputChange}
                    min={1}
                    max={totalPages + 1}
                />
                {` / ${totalPages}`}
            </div>
            <button
                onClick = {() => handlePageChange(page + 1)}
                disabled = {page === (totalPages - 1)}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>
        </div>
    );
}

export default PaginationController;