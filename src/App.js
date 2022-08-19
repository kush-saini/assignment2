import "./App.css";
import Layout from "./Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Users from "./Users";
import Login from "./Login";
import Register from "./Register";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./ProtectedRoute";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Routes>
        <Route path="/sign-in" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/sign-up" element={<Register />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
