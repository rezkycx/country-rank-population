//src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Template from "../components/Template";
import ComparisonPage from "../components/CountryComparison";
import CountryComparisonForm from "../components/CountryComparisonForm";
import Error404 from "../pages/Error404";
import Home from "../pages/Home";
import News from "../pages/News";


export const router  = createBrowserRouter([
    {
        path: "/",
        element: <Template />,
        errorElement: <Error404 />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path: "compare",
                element: <CountryComparisonForm />
            },
            {
                path: "compare/:page1/n/:page2",
                element: <ComparisonPage  />
            },
            {
                path: "news",
                element: <News />
            }
        ]
    }
])