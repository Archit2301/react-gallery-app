// This component will be rendered when there are no results to be shown

import React from 'react';

const NotFound = () => {

  return (
    <li className="not-found">
      <h3>No Results Found</h3>
      <p>You search did not return any results. Please try again.</p>
    </li>
  )
}

export default NotFound;