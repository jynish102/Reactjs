import Footer from "./components/Footer/footer";
import Header from "./components/Header/header";
import Home from "./components/Home/Home";
import { Outlet } from "react-router-dom";


function App() {
 

  return (
    <>
    <Header/>
    <Outlet/>
    <Footer />
    
    
      
    </>
  );
}

export default App
