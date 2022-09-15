import React from 'react'

const Body = (props) => {
    
  return (
    <div>
        <section>
        {props.data === "people"
          ? props.responseOfData.map((item, index) => (
              <div key={item._links.character.href} className="container">
                <img
                  src={item._embedded.show.image?.medium}
                  alt="Not found"
                  className="pic"
                />
                <div>
                  <h2 className="show-name">
                    {index + 1}. {item._embedded.show.name}
                  </h2>
                  <h3
                    className="show-summary"
                    dangerouslySetInnerHTML={{
                      __html: item._embedded.show.summary,
                    }}
                  ></h3>
                </div>
              </div>
            ))
          : props.data === "shows"
          ? props.responseOfData.map((item, index) => (
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
                  <h3
                    className="show-summary"
                    dangerouslySetInnerHTML={{ __html: item.show.summary }}
                  ></h3>
                  <h3 className="show-summary">
                    Available on : {item.show.webChannel?.name}
                  </h3>
                  <h3 className="show-summary">
                    Ratings : {item.show.rating?.average}
                  </h3>
                </div>
              </div>
            ))
          : null}
      </section>
    </div>
  )
}

export default Body
