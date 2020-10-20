import React from "react";

const PersonForm = ({
  submited,
  nameValue,
  nameChanged,
  numberValue,
  numberChanged,
}) => {
  return (
    <form onSubmit={submited}>
      <div>
        name: <input value={nameValue} onChange={nameChanged} />
      </div>
      <div>
        number: <input value={numberValue} onChange={numberChanged} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
