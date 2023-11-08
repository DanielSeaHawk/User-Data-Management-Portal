import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import Layout from "./components/Layout";
import AuthFormPage from "./pages/AuthFormPage";
import React from "react";
import NeedAuth from "./components/NeedAuth";
import useAutoLogout from "./hooks/useAutoLogout";
import StudentPage from "./pages/StudentPage";
function App() {
  useAutoLogout()
//   const auth = useSelector(state=>state.auth)
//   const dispatch = useDispatch()
//   useEffect(()=>{

//  const timeout = auth.expirationTime - Date.now
//     const timer= setTimeout(()=>{
//       dispatch(logout())
//     },timeout)
//     return ()=>{
//       clearTimeout(timer)
//     }
// },[auth,dispatch])
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
          <Route path="/student" element={<NeedAuth><StudentPage /></NeedAuth>} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
