import "./App.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Pages/Home";
import Auth from "./Pages/Auth";
import { useCookies } from "react-cookie";
import Edit from "./Pages/Edit";

function App() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  // console.log(cookies);

  const logout = (e) => {
    e.preventDefault();
    setCookies("access_token", "");
    window.localStorage.removeItem("TodoUserId");
    window.localStorage.removeItem("TodoUsername");
    navigate("/login");
  };

  return (
    <div className="App">
      <main className="App-main">
        <nav>
          <div>
            <Link className="li" to="/">
              Home
            </Link>
            {cookies.access_token === "" ||
            cookies.access_token === "undefined" ? (
              <Link className="li" to="/login">
              Login
            </Link>
            ) : (
              <button onClick={logout}>Logout</button>

            )}
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
          <Route path='/:id' element={<Edit />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
