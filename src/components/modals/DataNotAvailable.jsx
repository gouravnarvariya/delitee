import React from 'react';
import dataImg from '../../assets/images/datano.png';

const DataNotAvailable = () => {
  return (
    <div className='data-not-available-container'>
      <div className='data-not-available-content'>
        <p className='data-not-available-title'>No Records Found</p>    
        <p className='data-not-available-message'>
          We couldn't find any records.
        </p>    
        <img src={dataImg} className='data-not-available-image' alt="No Data Available" />
      </div>
    </div>
  );
};

export default DataNotAvailable;
