import React, { useState } from "react";

export default function SearchBoxInline(props) {
  const [name, setName] = useState("");
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    props.history.push(`/search/${name}`);
  };
  return (
    <form className="search_inline" onSubmit={submitHandler}>
      <div className="row_search">
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
