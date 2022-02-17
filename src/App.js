import { Route, Routes } from "react-router-dom";
import "./App.scss";
import { DefaultLayout } from "./components/layout/defaultLayout";
import { routes } from "./routes";

function App() {
  return (
    <DefaultLayout>
      <Routes>
        {routes.map((route) => {
          return (
            <Route path={route.path} element={route.element} key={route.path} />
          );
        })}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
