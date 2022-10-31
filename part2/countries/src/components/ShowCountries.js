import React from "react";
import ShowCountryDetails from "./ShowCountryDetails";

const ShowCountry = (props) => {
  return (
    <div>
      {props.country.name.common}
      <button
        style={{ margin: "2px" }}
        onClick={() => props.setDetailed([props.country])}
      >
        show
      </button>
    </div>
  );
};

const ShowCountries = ({ countries, searchTerm, setDetailed }) => {
  const filtered = countries.filter((country) =>
    country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (filtered.length === 1) {
    // props.setDetailed(filtered[0])
    return <ShowCountryDetails country={filtered[0]} />;
  } else if (filtered.length < 10) {
    return (
      <div>
        {filtered.map((country, idx) => (
          <ShowCountry country={country} key={idx} setDetailed={setDetailed} />
        ))}
      </div>
    );
  } else if (searchTerm.length > 0) {
    return <div>Too many matches, specifiy another filter</div>;
  }
};

export default ShowCountries