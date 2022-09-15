import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Body from "./components/Body";
import Header from "./components/Header";

function App() {
  //State
  const [data, setData] = useState(""); //Show or Person
  const [name, setName] = useState("");
  const [responseOfData, setResponseOfData] = useState([]); //Response from url
  const inputRef = useRef(null);

  //functions

  useEffect(() => {
    if (data !== "" && name !== "") {
      const url =
        data === "shows"
          ? `https://api.tvmaze.com/search/shows?q=${name}`
          : `https://api.tvmaze.com/search/people?q=${name}`;
      (async () => {
        const res = await fetch(url);
        const dat = await res.json();

        if (data === "people") {
          fetch(
            `https://api.tvmaze.com/people/${dat[0].person.id}/castcredits?embed=show`
          )
            .then((res) => res.json())
            .then((result) => {
              setResponseOfData(result);
              !result.length
                ? (inputRef.current.style.visibility = "visible")
                : (inputRef.current.style.visibility = "hidden");
            });
        } else {
          setResponseOfData(dat);
          !dat.length
            ? (inputRef.current.style.visibility = "visible")
            : (inputRef.current.style.visibility = "hidden");
        }
      })();
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
            setName("");
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
            setName("");
          }}
        />
        <label htmlFor="shows" className="sub-headings">
          Shows
        </label>
        <Header data={data} searchHandler={searchHandler} ref={inputRef} />
      </section>
      <Body data={data} responseOfData={responseOfData} />
    </div>
  );
}

export default App;
