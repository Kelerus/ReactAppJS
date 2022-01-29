import React, { useEffect } from "react";
import { BrowserRouter} from "react-router-dom";
import { useState } from "react/cjs/react.development";
import AppRouter from "./components/AppRouter";
import MyNavbar from "./components/UI/Navbar/MyNavbar";
import { AuthContext } from "./context";
import './styles/App.css';
function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem("auth")) {
      setIsAuth(true);
    }
    setIsLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth: isAuth,
      setIsAuth: setIsAuth,
      isLoading: isLoading
    }}>
      <BrowserRouter>
        <MyNavbar/>
        <AppRouter/>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default App;
