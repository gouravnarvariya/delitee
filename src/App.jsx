import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Route, Routes } from "react-router-dom";
import { useRoutes } from "react-router-dom";
import { Footer, Header, SideBar } from "./components/common";
import {
  AddServiceListPage,
  AddWorkerPage,
  CategoryMainPage,
  // ChangePasswordPage,
  CompletedServicePage,
  HomePage,
  LoginPage,
  ProfilePage,
  QuotationDetailPage,
  QuotationPage,
  BookingDetailPage,
  UserDetailPage,
  UserPage,
  WorkerDetailPage,
  WorkerPage,
} from "./RoutesMain";
import ProtectedRoute from "./utils/ProtectedRoute ";
function App() {
  const routes = useRoutes([
    { path: "/login", element: <LoginPage /> },
    {
      path: "/*",
      element: (
        <ProtectedRoute>
          <div class="grid-container">
            <Header />
            <SideBar />
            <main className="main">
              <Routes>
                <Route index element={<HomePage />} />
                <Route path="/user-list" index element={<UserPage />} />
                <Route path="/user-detail" index element={<UserDetailPage />} />
                <Route
                  path="/booking-detail"
                  index
                  element={<BookingDetailPage />}
                />
                <Route path="/worker" index element={<WorkerPage />} />
                <Route path="/add-worker" index element={<AddWorkerPage />} />
                <Route
                  path="/worker-detail"
                  index
                  element={<WorkerDetailPage />}
                />
                <Route
                  path="/services"
                  index
                  element={<AddServiceListPage />}
                />
                <Route
                  path="/category"
                  index
                  element={<CategoryMainPage />}
                />
                <Route path="/quotation" index element={<QuotationPage />} />
                <Route
                  path="/quotation-detail"
                  index
                  element={<QuotationDetailPage />}
                />
                <Route
                  path="/completed-service"
                  index
                  element={<CompletedServicePage />}
                />
                <Route path="/my-profile" index element={<ProfilePage />} />
                {/* <Route path="/change-password" index element={<ChangePasswordPage />} /> */}
              </Routes>
            </main>
            <Footer />
          </div>
        </ProtectedRoute>
      ),
    },
  ]);
  return <>{routes}
    <ToastContainer autoClose={2000} hideProgressBar={true} />
  </>;
}

export default App;
