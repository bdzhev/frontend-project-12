import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import { routes } from "../utils/routes.js";
import Chat from "./pages/chat.jsx";
import Login from "./pages/login.jsx";
import NotFound from "./pages/notFound.jsx";
import Header from "./components/Header.jsx";
import store from '../store/index.js'
import { RequireAuth } from "./hoc/RequireAuth.jsx";


const App = () => {
  return (
    <Provider store={store}>
      <div className="d-flex flex-column h-100">
        <Header/>
        <Router>
          <Routes>
            <Route path={routes.main} element={
              <RequireAuth>
                <Chat />
              </RequireAuth>
            } />
            <Route path={routes.login} element={<Login />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        </Router>
      </div>
    </Provider>
  )
};


export default App;
