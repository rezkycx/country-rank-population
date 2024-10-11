import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Select from "react-select"
import { useNavigate } from "react-router-dom"
import { fetchCountries } from "../store/countrySlice"

const CountryComparisonForm = () => {
  const [selectedCountry1, setSelectedCountry1] = useState(null)
  const [selectedCountry2, setSelectedCountry2] = useState(null)
  const countries = useSelector((state) => state.countries.data)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchCountries())
    }
  }, [dispatch, countries.length])

  // Modify label to display both country name and cca2 (country code)
  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: `${country.name.common} (${country.cca2})`, // Show both name and cca2
  }))

  const country2Options = selectedCountry1
    ? countryOptions.filter((option) => option.value !== selectedCountry1.value)
    : countryOptions

  // Custom filter function to search by cca2 (value)
  const filterOption = (option, inputValue) => {
    const cca2 = option.data.value.toLowerCase() // country code
    const name = option.data.label.toLowerCase() // country name + cca2
    const input = inputValue.toLowerCase() // user input
    return cca2.includes(input) || name.includes(input)
  }

  const handleCompare = () => {
    if (selectedCountry1 && selectedCountry2) {
      // Find full details of selected countries from countries array
      const country1Details = countries.find(
        (country) => country.cca2 === selectedCountry1.value
      )
      const country2Details = countries.find(
        (country) => country.cca2 === selectedCountry2.value
      )

      // Store detailed comparison data in localStorage
      const comparisonData = {
        country1: country1Details,
        country2: country2Details,
      }
      localStorage.setItem("comparisonData", JSON.stringify(comparisonData))

      // Redirect to comparison page
      navigate(`/compare/${selectedCountry1.value}/n/${selectedCountry2.value}`)
    } else {
      alert("Please select both countries to compare.")
    }
  }

  return (
    <div className="p-6 bg-slate-400 shadow-lg rounded-lg max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Compare Countries</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Select for Country 1 */}
        <Select
          options={countryOptions}
          value={selectedCountry1}
          onChange={setSelectedCountry1}
          placeholder="Select Country 1"
          className="p-2 rounded-lg"
          filterOption={filterOption} // Use custom filter function
        />

        {/* Select for Country 2 */}
        <Select
          options={country2Options} // Use filtered options
          value={selectedCountry2}
          onChange={setSelectedCountry2}
          placeholder="Select Country 2"
          className="p-2 rounded-lg"
          filterOption={filterOption} // Use custom filter function
        />
      </div>
      <div className="text-center mt-6">
        <button
          onClick={handleCompare}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
        >
          Compare
        </button>
      </div>
    </div>
  )
}

export default CountryComparisonForm

