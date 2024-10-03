// src/components/BaseLatout.jsx  
import { Outlet } from "react-router-dom"
import Navbar from "./Navbar.JSX"
export default function BaseLayout() {
    return (
        <div>
            <Navbar />
            <Outlet />
        </div>
    )
}