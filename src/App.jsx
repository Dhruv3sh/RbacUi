import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import { UserProvider } from "./context/UserContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  const location = useLocation();
  const isExcludedPage = ["/login", "/register"].includes(location.pathname);


  return (
    <UserProvider>
      <div className="">
        {!isExcludedPage && <Navbar />}
        <ToastContainer/>
        <Outlet />
      </div>
    </UserProvider>
  );
}

export default App;
