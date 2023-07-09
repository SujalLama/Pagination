import React, { useEffect, useState } from 'react'

const totalPages = 6;

export default function Paginate() {
    const [currentPage, setCurrentPage] = useState(1);
    const [buttonLeftDisable, setButtonLeftDisable] = useState(true);
    const [buttonRightDisable, setButtonRightDisable] = useState(false);

    const goToPrevPage = () => {
        if(currentPage !== 1) {
            setCurrentPage((prevPage) => prevPage-=1)
        }
    }

    const goToNextPage = () => {
        if(currentPage !== totalPages) {
            setCurrentPage((prevPage) => prevPage+=1)
        }
    }

    // disable the button if first page or last page
    useEffect(() => {

        if(currentPage === 1) {
            setButtonLeftDisable(true)
        } else {
            setButtonLeftDisable(false)
        }

        if(currentPage === totalPages) {
            setButtonRightDisable(true)
        } else {
            setButtonRightDisable(false)
        }
        
    }, [currentPage])


    /* spread number nearby the current page
    
    conditions
    // no number before first page
    // no number after last page
    */

    function showPageNumbers () {
        let pageNumbers = totalPages > 3 ? Array(3).fill(0) : Array(totalPages).fill(0);

        const range = createPageRange(pageNumbers);
        
        /* ================
            adding dots to the front or back
        =============*/
        if(range[pageNumbers.length - 1] < totalPages) {
            if(range[-1] !== "...") {
                range.push("...");
            }
        }

        return range.map((item) => {
            return <div key={Date.now() + item} className={`${item == currentPage ? "active" : ""}`}>{item}</div>
        })
    }


    function createPageRange (pageNumbers) {
        let lowerLimit = 1;
        const higherLimit = totalPages;

        /* ================
        creating a range [] with three elements
        =============*/

        for(let i = 0; i < pageNumbers.length; i++ ) {
            // Numbers following first number
            if(currentPage === lowerLimit) {
            pageNumbers[i] = currentPage + i;

            }

            // Numbers before last number
            if(currentPage === higherLimit) {
                let lastIndex = pageNumbers.length - 1;
                pageNumbers[lastIndex - i] = currentPage - i;
            }
        }

        // middle page numbers
        if(currentPage !== lowerLimit && currentPage !== higherLimit) {
            pageNumbers[0] = currentPage - 1;
            pageNumbers[1] = currentPage;
            pageNumbers[2] = currentPage + 1;
        }
        

        return pageNumbers;  
    }

  return (
    <div className='paginate-wrapper'>
        <button disabled={buttonLeftDisable} onClick={goToPrevPage}>
            {`<`}
        </button>
        {showPageNumbers()}
        <button disabled={buttonRightDisable} onClick={goToNextPage}>
            {`>`}
        </button>
    </div>
  )
}
