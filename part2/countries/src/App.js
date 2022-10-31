import axios from "axios";
import { useEffect, useState } from "react";
import ShowCountries from "./components/ShowCountries"
import ShowCountryDetails from "./components/ShowCountryDetails"

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [detailed, setDetailed] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearchChange = (event) => {
    setDetailed([]);
    setSearch(event.target.value);
  };

  return (
    <div>
      search: <input value={search} onChange={handleSearchChange} />
      <br></br>
      <br></br>
      <ShowCountries
        countries={countries}
        searchTerm={search}
        setDetailed={setDetailed}
      />
      {detailed.map((country, idx) => (
        <ShowCountryDetails country={country} key={idx} />
      ))}
    </div>
  );
};

export default App;
