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
import FetchProducts from "./Components/searchelements/FetchProducts";
import Error from "./Components/searchelements/Errors";
import SingleProduct from "./Components/searchelements/SingleProduct";
import ScrollToTop from "./Components/searchelements/ScrollToTop";
import PaymentForm from "./Components/searchelements/PaymentForm";
import Logindabba from "./pages/Logindabba/Logindabba.js";

import { UserProvider } from "./context/UserContext";
import { DabbaProvider } from "./context/DabbaContext";

function App() {
    return (
        <>
            <UserProvider>
                <DabbaProvider>
                    <BrowserRouter>
                        <ScrollToTop />

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
                            <Route
                                path="/fetch-products"
                                element={<FetchProducts />}
                            ></Route>
                            <Route
                                path="/:name"
                                element={<SingleProduct />}
                            ></Route>
                            <Route path="/error" element={<Error />}></Route>
                            <Route
                                path="/payment-form"
                                element={<PaymentForm />}
                            />
                            <Route path="/login" element={<Login />} />
                            <Route
                                path="/dabbawalaform"
                                element={<FormsPage />}
                            />
                            <Route path="/service" element={<ServicePage />} />
                            <Route
                                path="/dashboard"
                                element={<DashboardPage />}
                            />
                            <Route
                                path="/logindabba"
                                element={<Logindabba />}
                            />
                        </Routes>
                        <Footer />
                    </BrowserRouter>
                </DabbaProvider>
            </UserProvider>
        </>
    );
}

export default App;
