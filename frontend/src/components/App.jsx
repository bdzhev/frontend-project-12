import { BrowserRouter, Routes, Route } from "react-router-dom";
import { linkRoutes } from "../../utils/routes";
import Chat from "./pages/chat";
import Login from "./pages/login";

const App = () => {
  /*
  TODO 
  Add Header
   */
  return (
    <div className="d-flex flex-column h-100">
      <BrowserRouter>
        <Routes>
          <Route path={linkRoutes.main} element={<Chat />}/>
          <Route path={linkRoutes.login} element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
};


export default App;
