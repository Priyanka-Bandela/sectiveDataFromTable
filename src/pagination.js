import React, { useState, useEffect } from 'react';
// import './Pagination.css';
import './App.css';

function Pagination({
  total,
  showparPage,
  counter,
  setCounter,
  paginationChange,
  showPerPageHandler,
}) {
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    setPageNo(counter);
  }, [counter]);

  const onButtonClick = (type) => {
    let newCounter = counter;
    if (type === 'previous') {
      newCounter = Math.max(1, counter - 1);
    } else if (type === 'next') {
      const totalPages = Math.ceil(total / showparPage);
      newCounter = Math.min(totalPages, counter + 1);
    }
    setCounter(newCounter);
    paginationChange((newCounter - 1) * showparPage, newCounter * showparPage);
  };

  const totalPages = Math.ceil(total / showparPage);

  return (
    <div className="mainpaginationBox">
      <div className="pagination-subwrapper">
        <div className="pagination-showperpage">
          <div>
            <span className="oneoffive">
              {Math.min(total, (counter - 1) * showparPage + 1)} -{' '}
              {Math.min(total, counter * showparPage)} of {total}
            </span>
          </div>
        </div>
        <div className="selectionbox-wrapper textright">
          <div className="mainflex">
            <div className="form-group mainselect">
              <select
                className="form-select selectionbox"
                onChange={(e) => {
                  const perPage = parseInt(e.target.value);
                  showPerPageHandler(perPage);
                }}
                value={showparPage}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>
            </div>
            <div className="">
              <span className="perpage">per page</span>
            </div>
            <div className='page-wrapper'>
              <ul className="pagintioarrow">
                <li>
                  <i  className={counter === 1 ? 'fa-solid fa-chevron-left leftdisabled' : 'fa-solid fa-chevron-left leftabled'}  onClick={() => onButtonClick('previous')}></i>
                </li>	&nbsp;	&nbsp;
                <li className="oneofone">
                  {pageNo} of {totalPages}
                </li>	&nbsp;
                <li>
                  <i className={counter === totalPages ? ' fa-solid fa-chevron-right rightdisabled' : 'fa-solid fa-chevron-right rightabled'}   onClick={() => onButtonClick('next')}></i>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;