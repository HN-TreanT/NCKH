import React, { Suspense } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux";
import { RouterLinks } from "./const/RouterLinks";
// import { AppContext, socket } from "./context/appContext";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import MainLayout from "./layouts/Layout";
import NotFound from "./pages/not-found/NotFound";
import ThongKeTime from "./pages/thong-ke-time";
import ThongKeCount from "./pages/thong-ke-count";
import KiemTraWebsite from "./pages/kiem-tra-website";
import ErrorPage from "./pages/error-page/ErrorPage";
import KiemTraOneWebsite from "./pages/kiem-tra-website/KiemTraWebsite";
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <PersistGate loading={null} persistor={persistor}>
          {/* <AppContext.Provider value={{socket}}> */}
          <div className="MainApp">
            <div className="ContentApp">
              <Routes>
                <Route path="*" element={<NotFound />}></Route>
                <Route
                  path={RouterLinks.LOGIN}
                  element={<Login />}
                  errorElement={<ErrorPage />}
                ></Route>
                <Route
                  path={RouterLinks.REGISTER}
                  element={<Register />}
                  errorElement={<ErrorPage />}
                ></Route>
                <Route
                  path={RouterLinks.HOME_PAGE}
                  element={<MainLayout />}
                  errorElement={<ErrorPage />}
                >
                  <Route
                    path={RouterLinks.THONG_KE_TIME}
                    element={<ThongKeTime />}
                    errorElement={<ErrorPage />}
                  ></Route>
                  <Route
                    path={RouterLinks.THONG_KE_COUNT}
                    element={<ThongKeCount />}
                    errorElement={<ErrorPage />}
                  ></Route>
                  <Route
                    path={RouterLinks.KIEM_TRA_WEBSITE}
                    element={<KiemTraWebsite />}
                    errorElement={<ErrorPage />}
                  ></Route>
                  <Route
                    path={RouterLinks.KIEM_TRA__ONE_WEBSITE}
                    element={<KiemTraOneWebsite />}
                    errorElement={<ErrorPage />}
                  ></Route>
                </Route>
              </Routes>
            </div>
          </div>
          {/* </AppContext.Provider> */}
        </PersistGate>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
