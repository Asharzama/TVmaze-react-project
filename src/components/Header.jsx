import React,{forwardRef} from "react";

const Header = (props,ref) => {
  
  return (
    <div>
        <p className="sub-headings">
          Enter {props.data === "people" ? "Actor's" : "Show"} name below
        </p>
        <input
        className="input-field"
          type="text"
          onKeyDown={(e) => props.searchHandler(e)}
          placeholder={props.data === "people" ? "Eg. Akon" : "Eg.friends"}
        />
        <p className="error" ref={ref}>
          No result found!!
        </p>
    </div>
  );
};

export default forwardRef(Header);
