import React from "react";

const ShowCountryDetails = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital}
      <br></br>
      area {country.area}
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map((lang, idx) => (
          <li key={idx}>{lang}</li>
        ))}
      </ul>
      <div style={{ fontSize: "7rem" }}>{country.flag}</div>
    </div>
  );
};

export default ShowCountryDetails;
