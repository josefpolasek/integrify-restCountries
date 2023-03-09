/**
 * In this version I added fetching data from the API and displaying them instead of the names and ages.
 */

import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress } from "@mui/material"; // components from Material UI

// all components of each country; it's a bit like interface in Java
interface Country {
  flag: string;
  name: string;
  region: string;
  population: number;
  languages: { [key: string]: string }[];
}

const SimpleTable = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  // const [selected, setSelected] = useState<number | null>(null);

  // // this function is called when a row is clicked
  // const handleRowClick = (id: number) => {
  //   setSelected(id); // that's a MUI component
  // };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        const data = await response.json();
        setCountries(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  // this part is React JSX. This part looks like my normal javascript files.
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Flag</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Region</TableCell>
            <TableCell>Population</TableCell>
            <TableCell>Languages</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {countries.map((country) => (
            <TableRow key={country.name}>
              <TableCell>
                <img src={country.flag} alt={country.name} width="50" />
              </TableCell>
              <TableCell>{country.name}</TableCell>
              <TableCell>{country.region}</TableCell>
              <TableCell>{country.population}</TableCell>
              <TableCell>
                {Object.values(country.languages).join(", ")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};


export default SimpleTable;
