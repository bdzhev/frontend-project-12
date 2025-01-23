import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "../utils/routes.js";
import Chat from "./pages/Chat.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./components/features/Header.jsx";
import SignUp from "./pages/SignUp.jsx";
import { RequireAuth } from "./hoc/RequireAuth.jsx";

const App = () => {
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <Router>
        <Routes>
          <Route
            path={routes.main}
            element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            }
          />
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.signup} element={<SignUp />}/>
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
