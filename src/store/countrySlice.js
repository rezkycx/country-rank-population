import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

const formatPopulation = (population) => {
  if (population >= 1e9) return (population / 1e9).toFixed(1) + " B"; 
  if (population >= 1e6) return (population / 1e6).toFixed(1) + " M"; 
  if (population >= 1e3) return (population / 1e3).toFixed(1) + " K"; 
  return population; 
};

export const fetchCountries = createAsyncThunk(
  "countries/fetchCountries",
  async () => {
    const response = await axios.get("https://restcountries.com/v3.1/all")
    const sortedCountries = response.data.sort(
      (a, b) => b.population - a.population
    )
    return sortedCountries.map((country) => ({
      ...country,
      formattedPopulation: formatPopulation(country.population),
    }))
  }
)

export const countrySlice = createSlice({
  name: "countries",
  initialState: {
    data: [],
  },
  reducers: {
    
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCountries.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
})

export const { compareCountries } = countrySlice.actions
export default countrySlice.reducer
