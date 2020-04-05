'use strict';

import React from 'react';
import { Helmet } from "react-helmet";

const NotFound = () => (
  <Helmet>
    <title>Gathering Stats | Not Found</title>
    <div className="col-md-offset-3 col-md-6 container">
      <div className="jumbotron notFound">
        <h1>Not Found</h1>
        <p>Unfortunately, no content was found at this URL.</p>
      </div>
    </div>
  </Helmet>
);

export default NotFound;
