import "./App.css";
import FrontPage from "./pages/FrontPage/FrontPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/navbar/Navbar";
import ContactUs from "./Components/contact/ContactUs";
import Footer from "./Components/footer/Footer";
import FavouriteDabba from "./pages/FavouriteDabba/FavouriteDabba";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import Login from "../src/pages/login/Login";
import FormsPage from "./pages/dabbawala/FormsPage";
import DashboardPage from "./pages/dabbawala/DashboardPage";
import ServicePage from "./pages/services/ServicePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<FrontPage />} />
                    <Route path="/contactUs" element={<ContactUs />} />
                    <Route
                        exact
                        path="/ProfilePage"
                        element={<ProfilePage />}
                    />
                    <Route
                        exact
                        path="/FavouriteDabba"
                        element={<FavouriteDabba />}
                    />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dabbawalaform" element={<FormsPage />} />
                    <Route path="/service" element={<ServicePage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
