import React, { useEffect, useState } from 'react'

const totalPages = 10;

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
        let pageNumbers = totalPages > 3 ? Array(3).fill(0) : Array(totalPages).fill(0);;
        
        let lowerLimit = 1;
        const higherLimit = totalPages;

        
            // Numbers following first number
            if(currentPage === lowerLimit) {
        
                for(let i = 0; i < pageNumbers.length; i++ ) {
                    pageNumbers[i] = currentPage + i;
                }

                if(totalPages > 3) {
                    pageNumbers.push("...");
                }
            }

            // Numbers before last number
            if(currentPage === higherLimit) {

                for(let i = 0; i < pageNumbers.length; i++ ) {
                    let lastIndex = pageNumbers.length - 1;
                    pageNumbers[lastIndex - i] = currentPage - i;
                }

                if(totalPages > 3) {
                    pageNumbers.unshift("...")
                }
            }

            // middle page numbers
            if(currentPage !== lowerLimit && currentPage !== higherLimit) {

                pageNumbers[0] = currentPage - 1;
                pageNumbers[1] = currentPage;
                pageNumbers[2] = currentPage + 1;


                // if(totalPages > 3) {
                //     console.log(pageNumbers)
                //     console.log(currentPage);
                    
                //     //  if(pageNumbers[0] === 1) {
                //     //      pageNumbers.shift("...")
                //     // }
                    
                //     // if(pageNumbers[1] > 2) {
                //     //     pageNumbers.unshift("...")
                //     // }

                //     // if(pageNumbers[1] === 2) {
                //     //     pageNumbers.shift("...")
                //     // }

    
    
                //     // if(pageNumbers[2] < higherLimit) {
                //     //     pageNumbers.push("...")
                //     // }
    
                //     // if(currentPage === (higherLimit - 1)) {
                //     //     pageNumbers.pop("...")
                //     // }
                // }

            }



        return pageNumbers.map((item) => {
            return <div key={item} className={`${item == currentPage ? "active" : ""}`}>{item}</div>
        })
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
