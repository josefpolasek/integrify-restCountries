import { useEffect, useState } from "react";
import axios from "axios";
import { Typography } from "@mui/material";

interface Props {
  countryName: string;
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
  description: string;
}

const SingleCountry = ({ countryName }: Props) => {
  const [country, setCountry] = useState<Country | null>(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const { data } = await axios.get<Country>(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      setCountry(data);
    };
    fetchCountry();
  }, [countryName]);

  if (!country) {
    return <Typography variant="h4">Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">{country.name.common}</Typography>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="128"
        height="128"
      />
      <Typography variant="body1">Capital: {country.capital}</Typography>
      <Typography variant="body1">Region: {country.region}</Typography>
      <Typography variant="body1">
        Population: {country.population}
      </Typography>
      <Typography variant="body1">
        Languages:{" "}
        {country.languages &&
          Object.values(country.languages).map((lang: string) => (
            <span key={lang}>{lang} </span>
          ))}
      </Typography>
      <Typography variant="body1">{country.description}</Typography>
    </div>
  );
};

export default SingleCountry;
