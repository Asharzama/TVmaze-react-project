import React, { useEffect, useState, useRef } from "react";

const Header = () => {
  //State
  const [data, setData] = useState(""); //Show or Person
  const [name, setName] = useState("");
  const [responseOfData, setResponseOfData] = useState([]); //Response from url
  const inputRef = useRef(null);

  //functions
  useEffect(() => {
    if (data !== "" && name !== "") {
      if (data === "shows") {
        fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
          .then((res) => res.json())
          .then((dat) => {
            if (dat.length) {
              setResponseOfData(dat);
              inputRef.current.style.visibility = "hidden";
            } else {
              inputRef.current.style.visibility = "visible";
            }
          });
      } else if (data === "people") {
        fetch(`https://api.tvmaze.com/search/people?q=${name}`)
          .then((res) => res.json())
          .then((dat) => {
            if (dat.length) {
              fetch(
                `https://api.tvmaze.com/people/${dat[0].person.id}/castcredits?embed=show`
              )
                .then((res) => res.json())
                .then((result) => {
                  if (!result.length) {
                    inputRef.current.style.visibility = "visible";
                  }
                  setResponseOfData(result);
                });

              inputRef.current.style.visibility = "hidden";
            } else {
              inputRef.current.style.visibility = "visible";
            }
          });
      }
    }
  }, [data, name]);

  const searchHandler = (e) => {
    if (e.key === "Enter") {
      setName(e.target.value);
    }
  };

  return (
    <div>
      <section>
        <h1 className="main-heading">TVmaze</h1>
        <h2 className="secondary-heading">Search Your favorite Shows</h2>
        <input
          type="radio"
          id="actors"
          name="search"
          onClick={() => {
            setData("people");
            setResponseOfData([]);
          }}
        />
        <label htmlFor="actors" className="sub-headings">
          Actors
        </label>
        <input
          type="radio"
          id="shows"
          name="search"
          onClick={() => {
            setData("shows");
            setResponseOfData([]);
          }}
        />
        <label htmlFor="shows" className="sub-headings">
          Shows
        </label>
        <p className="sub-headings">
          Enter {data === "people" ? "Actor's" : "Show"} name below
        </p>
        <input
          type="text"
          onKeyDown={(e) => searchHandler(e)}
          placeholder={data === "people" ? "Eg. Akon" : "Eg.friends"}
        />
        <p className="error" ref={inputRef}>
          No result found!!
        </p>
      </section>

      <section>
        {data === "people"
          ? responseOfData.map((item, index) => (
              <div key={item._embedded.show.id} className="container">
                <img
                  src={item._embedded.show.image?.medium}
                  alt="Not found"
                  className="pic"
                />
                <div>
                  <h2 className="show-name">
                    {index + 1}. {item._embedded.show.name}
                  </h2>
                  <h3 className="show-summary">
                    {item._embedded.show.summary}
                  </h3>
                </div>
              </div>
            ))
          : data === "shows"
          ? responseOfData.map((item, index) => (
              <div key={item.show.id} className="container">
                <img
                  src={item.show.image?.medium}
                  alt="Not Found"
                  className="pic"
                />
                <div>
                  <h2 className="show-name">
                    {index + 1}. {item.show.name}
                  </h2>
                  <h3 className="show-summary">
                    {item.show.summary}
                    <br />
                    Available on : {item.show.webChannel?.name}
                    <br />
                    Ratings : {item.show.rating?.average}
                  </h3>
                </div>
              </div>
            ))
          : null}
      </section>
    </div>
  );
};

export default Header;
