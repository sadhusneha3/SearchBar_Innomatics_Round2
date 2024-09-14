import React, { useState, useMemo } from "react";
import { Input } from "./components/ui/input";
import { Card, CardContent } from "./components/ui/card";
import { ScrollArea } from "./components/ui/scroll-area";
import countriesData from "./data/countries.json";

const CountrySearch = () => {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  const filteredCountries = useMemo(() => {
    if (!search) return [];
    return countriesData.filter(
      (country) =>
        country.country.toLowerCase().includes(search.toLowerCase()) ||
        country.capital.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  return (
    <div className="max-w-md mx-auto p-4">
      <Input
        type="text"
        placeholder="Search for a country or capital..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4"
      />

      {search && (
        <ScrollArea className="h-64 rounded-md border">
          {filteredCountries.map((country, index) => (
            <div
              key={index}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => setSelectedCountry(country)}
            >
              <p className="font-semibold">{country.country}</p>
              <p className="text-sm text-gray-600">
                Capital: {country.capital}
              </p>
            </div>
          ))}
        </ScrollArea>
      )}

      {selectedCountry && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-2">
              {selectedCountry.country}
            </h2>
            <p>
              <strong>Capital:</strong> {selectedCountry.capital}
            </p>
            <p>
              <strong>Population:</strong>{" "}
              {selectedCountry.population.toLocaleString()}
            </p>
            <p>
              <strong>Language:</strong>{" "}
              {Array.isArray(selectedCountry.official_language)
                ? selectedCountry.official_language.join(", ")
                : selectedCountry.official_language}
            </p>
            <p>
              <strong>Currency:</strong> {selectedCountry.currency}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CountrySearch;
