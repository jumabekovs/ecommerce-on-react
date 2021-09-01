import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function SearchBox() {
  const history = useHistory();
  const [name, setName] = useState("");
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    history.push(`/?search=${encodeURIComponent(name)}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button className="primary" type="submit" onClick={closeMenu}>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}

export default React.memo(SearchBox);
