import { Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Components/Pages/About/About';
import Appoinment from './Components/Pages/Appoinment/Appoinment';
import ContactUs from './Components/Pages/ContactUs/ContactUs';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import Reviews from './Components/Pages/Reviews/Reviews';
import Navbar from './Components/Shared/Navbar';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>} />
        <Route path="/about" element={<About></About>} />
        <Route path="/appoinment" element={<Appoinment></Appoinment>}></Route>
        <Route path="/reviews" element={<Reviews></Reviews>}></Route>
        <Route path="/contactus" element={<ContactUs></ContactUs>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </div>
  );
}

export default App;
