import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromChildren,
} from "react-router-dom";
import WelcomePage from "./Layouts/WelcomePage";
import PlansPage from "./Layouts/PlansPage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ProfileSetup from "./Layouts/ProfileSetup";
import HomePage from "./Layouts/HomePage";
import Explore from "./Layouts/Explore";
import LawyerProfile from "./Layouts/LawyerProfile";
import Generale from "./Components/Generale";
import Details from "./Components/Details";
import Schedule from "./Components/Schedule";
import Rating from "./Components/Rating";
import ReservationsList from "./Components/Reservationslist";
import UserContextProvider from "./Context/UserContextProvider";
import Reservations from "./Layouts/Resarvations";
import DatesTable from "./Components/DatesTable";
import EditProfile from "./Layouts/EditProfile";
import LoginHandler from "./Layouts/LoginHandler"
import CreateAccount from "./Layouts/CreateAccount";
import Dashboard from "./Layouts/Dashboard.jsx";
function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    if (i18n.language == "fr") {
      document.body.dir = "ltr";
    } else {
      document.body.dir = "rtl";
    }
  }, [i18n.language]);

  const router = createBrowserRouter(
    createRoutesFromChildren(
      <Route path="/">
        <Route path={"login/"} element={<WelcomePage />} />
        <Route path="login-handler/" element={<LoginHandler/>}/>
        <Route path="billing/" element={<PlansPage />} />
        <Route path="setprofile/" element={<ProfileSetup />} />
        <Route element={<HomePage />} path="/">
          <Route index element={<Explore />} />
          <Route path="reservations/" element = {<Reservations />} >
            <Route index element = {<ReservationsList />} />
            <Route path="dates/" element = {<DatesTable />} />
          </Route>
          <Route
            path="editprofile/"
            element={<EditProfile />}
          />
            <Route path={"create-account/"} element={<CreateAccount/>} />
          <Route path="lawyer/:id/" element={<LawyerProfile />}>
            <Route index element={<Generale />} />
            <Route path="details/" element={<Details />} />
            <Route path="schedule/" element={<Schedule />} />
            <Route path="rating/" element={<Rating />} />
            <Route path="dashboard/" element={<Dashboard />}/>
          </Route>
        </Route>
      </Route>
    )
  );
  return (
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>)
    
}

export default App;
