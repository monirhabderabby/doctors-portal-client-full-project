import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./App.css";
import About from "./Components/Pages/About/About";
import Appoinment from "./Components/Pages/Appoinment/Appoinment";
import ContactUs from "./Components/Pages/ContactUs/ContactUs";
import Home from "./Components/Pages/Home/Home";
import Login from "./Components/Pages/Login/Login";
import RequireAuth from "./Components/Pages/Login/RequireAuth";
import Signup from "./Components/Pages/Login/Signup";
import Reviews from "./Components/Pages/Reviews/Reviews";
import Navbar from "./Components/Shared/Navbar";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <div className="App">
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home></Home>} />
                <Route path="/about" element={<About></About>} />
                <Route
                    path="/appoinment"
                    element={
                        <RequireAuth>
                            <Appoinment></Appoinment>
                        </RequireAuth>
                    }
                ></Route>
                <Route path="/reviews" element={<Reviews></Reviews>}></Route>
                <Route
                    path="/contactus"
                    element={<ContactUs></ContactUs>}
                ></Route>
                <Route path="/login" element={<Login></Login>}></Route>
                <Route path="/signup" element={<Signup></Signup>}></Route>
            </Routes>
            <ToastContainer />
        </div>
    );
}

export default App;
