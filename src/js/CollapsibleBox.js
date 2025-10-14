'use strict';

import React, { useState } from "react";
import PropTypes from "prop-types";

export default function CollapsibleBox({ data, label }) {
  const [isOpen, setIsOpen] = useState(false);
  if (!data) return null;

  return (
    <div className="collapsible-box">
      <button className="collapsible-button" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "hide" : label}
      </button>
      {isOpen && <div className="collapsible-content">
          {data.map((item, index) => (
            item === "---" ? <hr key={index} /> : <div key={index}>{item}</div>
          ))}</div>}
    </div>
  );
}

CollapsibleBox.propTypes = {
  data: PropTypes.string,
  label: PropTypes.string,
};