import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";

const ReservationsList = () => {
  const [t, i18n] = useTranslation();
  const [reservations, setReservations] = useState([
    {
      id: 1,
      user: 1,
      lawyer: 1,
      date: "2024-02-11",
      from: "11:00",
      to: "12:00",
      description: "description",
    },
    {
      id: 2,
      user: 2,
      lawyer: 1,
      date: "2024-01-10",
      from: "11:00",
      to: "12:00",
      description: "description",
    },
  ]);
  const navigate = useNavigate()
  const params = useParams()
  const token = localStorage.getItem('token')
  const [appointments,setAppointments] = useState([])
  const [isLoading,setIsLoading] = useState(true)

  const getAppointments = async() =>{
    const verifyToken = async (url) => {
      try {

        console.log(token);
        if (token) {
          const res = await axios.get(url, {
            params: {token},
            withCredentials: true,
          });

          if (res.data.success) {
            console.log(res.data.message);
            const res1 = await axios({
              url: "http://localhost:8000/core/lawyers/",
              method: "get",
              headers: {
                'Authorization': token,
              },
            })
            console.log(res1.data[0])
            console.log(res1.data[0].id)
            return res1.data[0].id

          } else {
            console.error("Verification failed");
            return false
          }
        }
      } catch (error) {
        console.error("Error during token verification", error);
      }
    }
    const id = await verifyToken("http://localhost:8000/core/verify-lawyer")
    console.log("fetched");
    console.log(id);
    if (id){
      axios(
          {url:`http://localhost:8000/core/lawyers/${id}/appointments/`,
            method:"get",
            headers: {
              'Authorization': token,
            },
          },
      ).then((res)=>{
        console.log(res.data)
        setAppointments(res.data)
        setIsLoading(false)
        // navigate(0)
      }).catch(e=>{
        console.log(e)
      })
    }

  }
  useEffect(() =>{
    getAppointments()
  },[])
  return (
    <div className="bg-white rounded p-6 my-4">
      {/* mapping through data + accept or decline btns */}
      {appointments?.map((reservation) => (
        <div
          key={reservation.id}
          className="flex flex-col xs:flex-row justify-between items-center my-4  shadow-lg p-4"
        >
          <div>
            <p className="text-lg font-bold">{`${t("date")} ${reservation.date}`}</p>
            <p className="text-lg font-bold">{`${t("from")} ${reservation.from}`}</p>
            <p className="text-lg font-bold">{`${t("to")} ${reservation.to}`}</p>
            <p className="text-lg font-bold">
              {`${t("desc")} ${reservation.description}`} 
            </p>
          </div>
          <div className="w-full xs:w-fit gap-2 mt-3 flex xs:mt-0 xs:flex-col xs:gap-2">
            <button className="bg-green-700 rounded text-white px-2 py-1 flex-1 xs:flex-none">
              {t("accept")}
            </button>
            <button className="bg-red-700 rounded text-white px-2 py-1 flex-1 xs:flex-none">
            {t("decline")}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReservationsList;
