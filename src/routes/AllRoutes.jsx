import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage, LoginPage, ChannelPage, PageNotFound } from "../pages";

export const AllRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path={`channel`} element={<Navigate to="/" replace />} />
        <Route path={`channel/:id`} element={<ChannelPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </>
  );
};
