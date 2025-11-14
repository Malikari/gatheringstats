'use strict';

import React, { useState } from "react";
import PropTypes from "prop-types";

export function CollapsibleBox({ data, label }) {
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
  data: PropTypes.array,
  label: PropTypes.string,
};


export function CollapsibleIframeBox({ src, labelDef = "show", labelOpen = "hide", height = "500" }) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div style={{ display: "inline" }}>
      <button
        className="collapsible-iframebutton"
        style={{ display: "inline-block", marginLeft: "0.5px" }}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? labelOpen : labelDef}
      </button>

      {isOpen && (
        <div style={{ marginTop: "8px" }}>
          <iframe
            src={src}
            width="100%"
            height={height}
            title={labelDef}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

CollapsibleIframeBox.propTypes = {
  src: PropTypes.string,
  labelDef: PropTypes.string,
  labelOpen: PropTypes.string,
  height: PropTypes.string,
}