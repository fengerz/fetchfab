import { Routes, Route } from "react-router-dom";
import { PUBLIC_ROUTES } from "../shared/config/routes";
import NotFoundPage from "./home/NotFoundPage";

const AppRouter = () => {
  return (
    <Routes>
      {PUBLIC_ROUTES.map(({ path, Component }) => (
        <Route key={path} path={path} element={<Component />} />
      ))}

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRouter;
