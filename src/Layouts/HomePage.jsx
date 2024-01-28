import { useState, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import { userContext } from "../Context/UserContextProvider";
import {
  LogoutIcon,
  MenuIcon,
  SearchhIcon,
  UserIcon,
  CloseIcon,
  ReservationIcon
} from "../Svgs/Svgs";
import NotificationsModal from "../Components/NotificationsModal";

const HomePage = () => {
  const { user } = useContext(userContext);
  const [notifications, setNotifications] = useState([{
    id : 2 ,
    user : 2,
    lawyer : 1,
    response : "accepted",
    date : "2022-22-22",
    from : "11:00",
    to : "12:00",
    description : "description"
  }])
  const [reservations, setReservations] = useState([
    {
      id: 1,
      user: 1,
      lawyer: 1,
      date: "2022:11:11",
      from: "11:00",
      to: "12:00",
      description: "description",
    },
    {
      id: 1,
      user: 1,
      lawyer: 1,
      date: "2022:11:11",
      from: "11:00",
      to: "12:00",
      description: "description",
    },
  ]);
  const { t, i18n } = useTranslation();
  const [isNavHidden, setIsNavHidden] = useState(true);

  const toggleNavVisibility = () => {
    setIsNavHidden(!isNavHidden);
  };

  const [notif , setNotif] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsNavHidden(window.innerWidth >= 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col bg-primary">
      <header className="flex relative justify-between bg-[#1D1D21] items-center px-8 py-4">
        <Link>
          <h1 className="text-white text-center font-bold text-[16px] sm:text-[22px]">
            DZ-MOUHAMI
          </h1>
        </Link>

        {isNavHidden && (
          <nav className="flex z-40 px-2 h-screen pt-8 gap-5 bg-[#1D1D21] flex-col right-0 top-0 fixed lg:mx-7 lg:flex-1 lg:justify-between lg:h-fit lg:bg-transparent lg:items-center lg:px-0 lg:gap-14 lg:flex-row lg:relative lg:pt-0">
            <button
              onClick={toggleNavVisibility}
              className="inline self-end mr-1 lg:hidden"
            >
              <CloseIcon />
            </button>
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-end lg:gap-5">
              <Link to="/" className="text-center">
                <SearchhIcon />
                <h2 className="text-white font-semibold lg:text-[17px] px-2 inline">
                  {t("find")}
                </h2>
              </Link>
              {user.role == 1 && (
                <Link to="/editprofile" className="text-center">
                  <UserIcon />
                  <h2 className="text-white font-semibold lg:text-[17px] px-2 inline">
                    {t("edit")}
                  </h2>
                </Link>
              )}
              {user.role == 1 && (
                <Link to="/reservations" className="text-center flex items-center justify-start">          
                 <h2 className="text-white font-semibold lg:text-[17px] px-2 capitalize">
                    {t("reservations")}
                  </h2>
                  <p className="bg-red-600 ps-[4.5px] pe-[5px]  mt-[5.5px] pt-[1.5px] pb-[3px] rounded-[50%] text-white text-center text-xs font-semibold">
                    {reservations ? reservations.length : 0}
                  </p>
                </Link>
              )}
            </div>
            <div className="flex flex-col lg:flex-row px-[6px] gap-5 lg:gap-2 lg:px-0">
              <select
                name="lang"
                className="py-[6px] ps-3 lg:w-[100px] rounded-lg focus:outline-none"
                id="lang"
                placeholder="language :"
                value={i18n.language}
                onChange={(e) => {
                  i18n.changeLanguage(e.target.value);
                }}
              >
                <option value="ar">العربية</option>
                <option value="fr">francais</option>
              </select>
              <button className="bg-white text-primary rounded-lg shadow-md px-[8px] py-[5px] text-center">
                <h2 className="inline text-xs mx-2 font-semibold mb-[6px]">
                  {t("logout")}
                </h2>
                <LogoutIcon />
              </button>
            </div>
          </nav>
        )}
        <div className="flex flex-1 justify-end gap-3 lg:flex-none">
        {user.role == 2 && 
        <button onClick={()=>{
          if((notifications && notifications?.length > 0)){
            setNotif(true);
          }else{
            setNotif(false)
          }
          
        }} className="h-6 w-6 lg:h-8 lg:w-8 relative flex justify-end">
          <ReservationIcon />
          {(notifications && notifications?.length > 0) && <p className="absolute bottom-[-12px] lg:bottom-[-6px] right-[-2px] bg-red-600 pt-[2px] pb-[3px] lg:px-2 pr-[7px] pl-[6px] rounded-[50%] text-white text-center text-xs font-semibold">{notifications.length }</p>}
        </button>
        }
        <button
          className="inline-block lg:hidden"
          onClick={toggleNavVisibility}
        >
          <MenuIcon />
        </button>
        </div>
        
      </header>
      <div className="flex-1">
      <Outlet />
      </div>
      <Footer />
      { notif && <NotificationsModal close = {setNotif} /> }
    </div>
  );
};

export default HomePage;
