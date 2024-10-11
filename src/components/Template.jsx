// src/components/BaseLatout.jsx  
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
export default function Template() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}