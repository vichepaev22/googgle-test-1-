import React from 'react';

const UserGroupIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m-7.5-2.962c.56-1.634 1.325-3.166 2.197-4.673A5.378 5.378 0 0 1 12 5.25c.165 0 .33.009.491.026m-3.79 3.87A6.75 6.75 0 0 1 12 12.75h.008c.078 0 .156.007.232.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 6.75h.008c.078 0 .156.007.232.021M12 18.75c-.165 0-.33-.009-.491-.026A18.06 18.06 0 0 1 4.406 6.164M12 18.75h-.008c-.078 0-.156-.007-.232-.021M16.128 5.843A18.06 18.06 0 0 1 19.594 18.836M16.128 5.843A9 9 0 1 1 7.872 18.157" />
  </svg>
);

export default UserGroupIcon;
