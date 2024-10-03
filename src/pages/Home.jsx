// src/pages/Home.jsx  
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchCountries } from "../store/countrySlice"

const Home = () => {
  const dispatch = useDispatch()
  const countries = useSelector((state) => state.countries.data || [])
  const [currentPage, setCurrentPage] = useState(1)
  const [countryLimitPage] = useState(10)
  
  const indexOfLastCountry = currentPage * countryLimitPage
  const indexOfFirstCountry = indexOfLastCountry - countryLimitPage
  const currentCountry = countries.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  )


  // const formatPopulation = (population) => {
  //   if (population >= 1_000_000_000) {
  //     return (population / 1_000_000_000).toFixed(1) + "B"
  //   } else if (population >= 1_000_000) {
  //     return (population / 1_000_000).toFixed(1) + "M"
  //   } else if (population >= 1_000) {
  //     return (population / 1_000).toFixed(1) + "K"
  //   } else {
  //     return population
  //   }
  // }

  // const sortedCountries = response.data.sort(
  //   (a, b) => b.population - a.population
  // )
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  
  const totalPages = Math.ceil(countries.length / countryLimitPage)

  useEffect(() => {
    dispatch(fetchCountries())
  }, [dispatch])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="container mx-auto overflow-x-auto">
        <h1 className="text-4xl font-bold text-center mb-8 mt-8">
          Country Rankings
        </h1>

        {/* Tabel untuk layar besar */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full table-auto border-collapse bg-white shadow-lg">
            <thead>
              <tr className="border border-gray-300">
                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-sm sm:text-base">
                  Flag
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-sm sm:text-base">
                  Name
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-sm sm:text-base">
                  Population
                </th>
                <th className="border border-gray-300 px-2 sm:px-4 py-2 text-sm sm:text-base">
                  Code
                </th>
              </tr>
            </thead>
            <tbody>
              {currentCountry.map((country) => (
                <tr
                  key={country.cca3}
                  className="text-center hover:bg-gray-100 transition duration-300"
                >
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <img
                      src={country.flags.png}
                      alt={country.name.common}
                      className="w-12 h-8 sm:w-16 sm:h-10 object-cover mx-auto"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {country.name.common}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {country.formattedPopulation}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {country.cca2}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Daftar responsif untuk layar kecil */}
        <div className="block md:hidden">
          {currentCountry.map((country) => (
            <div
              key={country.cca3}
              className="border border-gray-300 mb-4 p-4 rounded-md bg-white shadow-md"
            >
              <div className="flex items-center">
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  className="w-12 h-8 sm:w-16 sm:h-10 object-cover mr-4"
                />
                <div>
                  <h3 className="font-bold">{country.name.common}</h3>
                  <p>Population: {country.formattedPopulation}</p>
                  <p>Code: {country.cca2}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center mt-8 mb-8">
          <ul className="inline-flex space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => paginate(index + 1)}
                  className={`px-2 sm:px-4 py-1 sm:py-2 rounded-md border transition ${
                    currentPage === index + 1
                      ? "bg-gray-800 text-white"
                      : "bg-white text-gray-800 hover:bg-blue-100"
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
