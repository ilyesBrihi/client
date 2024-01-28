import { useContext , useState } from "react";
import { useTranslation } from "react-i18next";
import { CloseIcon, TrashIcon } from "../Svgs/Svgs";
import { userContext } from "../Context/UserContextProvider";

const NotificationsModal = ({close}) => {
    const {user} = useContext(userContext);
    const [t , i18n] = useTranslation();
    const [notifications, setNotifications] = useState([{
        id : 1 ,
        user : 2,
        lawyer : "ghani",
        response : "accepted",
        date : "2022-22-22",
        from : "11:00",
        to : "12:00",
        phone : "054076657",
    }
])
    return ( <div className="h-screen overlay flex justify-center items-center">
        <div className="p-3 aa:p-5 bg-white rounded w-fit mx-5 lg:mx-0">
            <div className="flex justify-between items-center">
                <h1 className="text-xl aa:text-2xl capitalize font-bold">{t("notifications")}</h1>
                <button onClick={() =>{
                    close(false)
                }} className="p-1 aa:p-2 rounded-full bg-primary text-white">
                    <CloseIcon />
                </button>
            </div>
            <div className="mt-5 aa:mt-10">
                {notifications.map((notification) => (
                    <div className="flex justify-between gap-7 items-center border-b shadow border-gray-200 p-2 aa:p-3">
                            
                                <p className="text-xs aa:text-sm text-primary">
                                    <span className="font-bold">{notification.lawyer}</span>
                                    {` ${t("acceptedYourReservation" , {date : notification.date , from : notification.from , to : notification.to , phone : notification.phone})}`}
                                </p>
                                 <button className="p-2 bg-red-700 rounded-full text-white">
                                    <TrashIcon />
                                </button>
                    </div>
                ))}
            </div>
        </div>
    </div> );
}
 
export default NotificationsModal;