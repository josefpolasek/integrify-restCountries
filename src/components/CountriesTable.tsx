/* LIBRARIES */
import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

// props for searching
interface Props {
  searchQuery: string;
}

// interface is similiar to interface in Java
// country object returned by the API
interface Country {
  flags: {
    png: string;
  };
  name: {
    common: string;
  };
  capital: string[];
  region: string;
  population: number;
  languages: Record<string, string>;
}

// main component - table of countries
const CountriesTable = ({ searchQuery }: Props) => {
  // State variables
  const [selected, setSelected] = useState<number | null>(null); // ID of selected country
  const [countries, setCountries] = useState<Country[]>([]); // countries fetched from the API
  const [page, setPage] = useState<number>(1);

  // fetching data from the API
  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get<Country[]>("https://restcountries.com/v3.1/all");
      setCountries(data);
    };
    fetchCountries();
  }, []);

  // function for when a row is clicked -> ToDO: change to Link to SingleCountry.tsx
  const handleRowClick = (id: number) => {
    setSelected(id);
  };

  // moves to the next page
  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  // moves to the previous page
  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  // constants, in the future might be changed on the page (e.g. 10 countries per page)
  const pageSize = 5; 
  const startIndex = (page - 1) * pageSize; 
  const endIndex = startIndex + pageSize;

  // filtering countries based on the search
  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // sorting countries alphabetically
  const sortedCountries = [...filteredCountries].sort((a, b) => {
    return a.name.common.localeCompare(b.name.common);
  });

  // showing only 5 countries
  const countriesToDisplay = sortedCountries.slice(startIndex, endIndex);

  // rendering the page
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flag</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Capital</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Population</TableCell>
            <TableCell>Languages</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countriesToDisplay.map((country, index) => (
            // <Link to={`/countries/${startIndex + index}`} key={startIndex + index}>
            <TableRow
              key={startIndex + index}
              onClick={() => handleRowClick(startIndex + index)}
              selected={startIndex + index === selected}
            >
              <TableCell>
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  width="32"
                  height="32"
                />
              </TableCell>
              <TableCell>{country.name.common}</TableCell>
              <TableCell>{country.capital}</TableCell>
              <TableCell>{country.region}</TableCell>
              <TableCell>{country.population}</TableCell>
              <TableCell>
                <ul>
                  {country.languages &&
                    Object.values(country.languages).map((lang: string) => (
                      <li key={lang}>{lang}</li>
                    ))}
                </ul>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button onClick={handlePrevPage} disabled={page === 1}>
        Prev Page
      </Button>
      <Button onClick={handleNextPage} disabled={endIndex >= sortedCountries.length}>
        Next Page
      </Button>
    </TableContainer>
  );
};

export default CountriesTable;
