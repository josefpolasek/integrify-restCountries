/**
 * This is a table that displays a list of countries and their details.
 * Modified by ChatGPT.
 */

import { useState, useEffect } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

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

const CountriesTable = () => {
  const [selected, setSelected] = useState<number | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);

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

  // countries.map((country, index) => {
  //   if (country.languages == null) console.log("N/A");
  //   else {
  //     Object.values(country.languages).map((lang) => {
  //       if (lang != null) console.log(lang);
  //     })
  //     // country.languages.map
  //     // console.log(Object.values(country.languages));
  //   }
  // })

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
          {/* Map through each country object in the `countries` array */}


          {countries.map((country, index) => (
            // {Object.values(country.languages).map((language, index) => (
            // ))}
            <TableRow
              key={index}
              onClick={() => handleRowClick(index)}
              selected={index === selected}
            >
              {/* First column: Flag */}
              <TableCell>
                <img
                  src={country.flags.png}
                  alt={`Flag of ${country.name.common}`}
                  width="32"
                  height="32"
                />
              </TableCell>

              {/* Second column: Name */}
              <TableCell>{country.name.common}</TableCell>

              {/* Third column: Capital */}
              <TableCell>{country.capital}</TableCell>

              {/* Fourth column: Region */}
              <TableCell>{country.region}</TableCell>

              {/* Fifth column: Population */}
              <TableCell>{country.population}</TableCell>

              {/* Sixth column: Languages as bullet points */}
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
    </TableContainer>
  );
};

export default CountriesTable;