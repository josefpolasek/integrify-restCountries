import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from "@mui/material";

interface Props {
  searchQuery: string;
}

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

const CountriesTable = ({ searchQuery }: Props) => {
  const [selected, setSelected] = useState<number | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get<Country[]>(
        "https://restcountries.com/v3.1/all"
      );
      setCountries(data);
    };
    fetchCountries();
  }, []);

  const handleRowClick = (id: number) => {
    setSelected(id);
  };

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const pageSize = 5;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const sortedCountries = [...filteredCountries].sort((a, b) => {
    return a.name.common.localeCompare(b.name.common);
  });

  const countriesToDisplay = sortedCountries.slice(startIndex, endIndex);

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
