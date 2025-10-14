'use strict';

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function CollapsibleBox({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!data) return null;

  return (
    <div className="collapsible-box">
      <button className="collapsible-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "hide" : "additional information"}
      </button>
      {isOpen && <div className="collapsible-content">
          {data.map((item, index) => (
            item === "---" ? <hr key={index} /> : <div key={index}>{item}</div> // jedes Item in einer neuen Zeile
          ))}</div>}
    </div>
  );
}

CollapsibleBox.propTypes = {
  data: PropTypes.string,
};