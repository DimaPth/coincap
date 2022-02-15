import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { routes } from "./routes";

function App() {
  return (
    <>
      <div>header</div>
      <Routes>
        {routes.map((route) => {
          return (
            <Route path={route.path} element={route.element} key={route.path} />
          );
        })}
      </Routes>
    </>
  );
}

export default App;
