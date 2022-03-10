import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RouteType } from "../../routes";

interface RenderRoutesProps {
  routes: Array<RouteType>;
}

const RenderRoutes = ({ routes }: RenderRoutesProps) => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, key, element }: RouteType) => {
          return <Route key={key} path={path} element={element} />;
        })}
        <Route element={() => <h1>No Page Found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
};

export default RenderRoutes;
