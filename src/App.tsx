import RenderRoutes from "./components/RenderRoutes";
import ROUTES from "./routes";

const App = () => {
  return (
    <>
      <RenderRoutes routes={ROUTES} />
    </>
  );
};

export default App;
