import React from "react";

const Filter = ({ search, changed }) => {
  return (
    <div>
      filter shown with:
      <input value={search} onChange={changed}></input>
    </div>
  );
};

export default Filter;
