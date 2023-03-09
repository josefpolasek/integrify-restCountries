import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
// import { Country } from "./types";

interface Country {
    name: {
        common: string;
    };
    capital: string[];
    region: string;
    population: number;
    flags: {
        svg: string;
    };
    languages: {};
}


const CountryTable = () => {
    const [countries, setCountries] = useState<Country[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("https://restcountries.com/v3.1/all");
            const data = await response.json();
            setCountries(data);
        };

        fetchData();
    }, []);

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
                        console.log(country.languages),
                        <TableRow key={country.name.common}>
                            <TableCell>
                                <img src={country.flags.svg} alt={`Flag of ${country.name.common}`} width="32" height="32" />
                            </TableCell>
                            <TableCell>{country.name.common}</TableCell>
                            <TableCell>{country.region}</TableCell>
                            <TableCell>{country.population}</TableCell>
                            <TableCell>
                                {/* {Object.values(country.languages).join(", ")} */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default CountryTable;
