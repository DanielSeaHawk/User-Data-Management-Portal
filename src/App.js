import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import AuthFormPage from "./pages/AuthFormPage";
import React from "react";
import NeedAuth from "./components/NeedAuth";
function App() {

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/profile"
            element={<NeedAuth><ProfilePage /></NeedAuth>}
          />
          <Route path="/authform" element={<AuthFormPage />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
