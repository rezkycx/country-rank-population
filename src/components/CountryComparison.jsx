import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

const formatPopulation = (population) => {
  if (population >= 1e9) return (population / 1e9).toFixed(1) + " B";
  if (population >= 1e6) return (population / 1e6).toFixed(1) + " M";
  if (population >= 1e3) return (population / 1e3).toFixed(1) + " K";
  return population.toString();
};

const ComparisonPage = () => {
  const { page1, page2 } = useParams(); // Params from URL
  const [country1, setCountry1] = useState(null);
  const [country2, setCountry2] = useState(null);

  useEffect(() => {
    // Retrieve the comparison data from localStorage
    const comparisonData = localStorage.getItem("comparisonData");

    if (comparisonData) {
      const { country1: storedCountry1, country2: storedCountry2 } = JSON.parse(comparisonData);
      // Set the countries from localStorage
      setCountry1(storedCountry1);
      setCountry2(storedCountry2);
    }
  }, []);

  // If countries aren't loaded yet, show a loading message or fallback
  if (!country1 || !country2) return <p>data is loading...</p>;

  return (
    <div className="max-w-4xl mx-auto bg-slate-400 p-8 rounded-lg shadow-md mt-8">
      <h2 className="text-3xl font-bold text-center mb-6">
        Country Comparison
      </h2>
      <table className="min-w-full bg-slate-400 shadow-md rounded-lg">
        <thead>
          <tr>
            <th className="border px-6 py-3 text-lg font-bold text-gray-600">Data</th>
            <th className="border px-6 py-3 text-lg font-bold text-gray-600">{country1.name.common}</th>
            <th className="border px-6 py-3 text-lg font-bold text-gray-600">{country2.name.common}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-6 py-4 font-semibold">Population</td>
            <td className="border px-6 py-4">{formatPopulation(country1.population)}</td>
            <td className="border px-6 py-4">{formatPopulation(country2.population)}</td>
          </tr>
          <tr>
            <td className="border px-6 py-4 font-semibold">Region</td>
            <td className="border px-6 py-4">{country1.region}</td>
            <td className="border px-6 py-4">{country2.region}</td>
          </tr>
          <tr>
            <td className="border px-6 py-4 font-semibold">Capital</td>
            <td className="border px-6 py-4">{country1.capital?.[0] || "N/A"}</td>
            <td className="border px-6 py-4">{country2.capital?.[0] || "N/A"}</td>
          </tr>
          <tr>
            <td className="border px-6 py-4 font-semibold">Status</td>
            <td className="border px-6 py-4">{country1.status || "N/A"}</td>
            <td className="border px-6 py-4">{country2.status || "N/A"}</td>
          </tr>
          <tr>
            <td className="border px-6 py-4 font-semibold">Flag</td>
            <td className="border px-6 py-4">
              <img
                src={country1.flags.png}
                alt={country1.name.common}
                className="w-16 h-10 object-cover"
              />
            </td>
            <td className="border px-6 py-4">
              <img
                src={country2.flags.png}
                alt={country2.name.common}
                className="w-16 h-10 object-cover"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ComparisonPage;

