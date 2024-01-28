import { t } from "i18next";
import {useContext, useEffect, useState} from "react";
import { userContext } from "../Context/UserContextProvider";
import Modal from "./Modal";
import { useParams } from "react-router-dom";
import axios from "axios";

const Schedule = () => {
  const {id} = useParams();
  const { user } = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data,setTimeSlots] = useState()
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    axios({
      method: "get",
      url: `http://localhost:8000/core/lawyer-search/${id}/`
    }).then(
        (res) => {
          console.log(res.data)
          setTimeSlots(res.data.time_slots)
          setIsLoading(false)
        }
    )
  }, []);

  // const [data, setData] = useState([
  //   { id: 1, lawyer: 1, day: "sunday", from: "8:00", to: "15:00" },
  //   { id: 2, lawyer: 1, day: "monday", from: "8:00", to: "17:00" },
  //   { id: 3, lawyer: 1, day: "tuesday", from: "8:00", to: "15:00" },
  //   { id: 4, lawyer: 1, day: "wednesday", from: "8:00", to: "17:00" },
  //   { id: 5, lawyer: 1, day: "thursday", from: "8:00", to: "15:00" },
  //   { id: 6, lawyer: 1, day: "saturday", from: "8:00", to: "17:00" },
  // ]);
  return isLoading?(<div className={"flex mt-10 text-2xl font-bold justify-center text-white"}><p>Loading</p></div>): (
    <div className="bg-white rounded p-6 my-4 ">
      <h1 className="hh">{t("avaible")}</h1>
      <div>
        {data.map((day, index) => (
          <div className="flex justify-start items-center gap-2">
            <div className="button w-full">{t(`${day.day}`)}</div>
            <div className="py-1 px-2 text-start border-solid border-primary border-[1px] rounded w-full text-primary">
              {day.start_time}
            </div>
            <div className="py-1 px-2 border-solid text-start border-primary border-[1px] rounded w-full text-primary">
              {day.end_time}
            </div>
          </div>
        ))}
      </div>
      {user.role == 2 && (
        <div className="flex justify-end">
          <button
            className="button font-semibold hover:bg-green-700 transition duration-[0.5s] ease-in-out"
            onClick={() => {
              setIsModalOpen(true);
              
            }}
          >
            {t("reserver")}
          </button>
        </div>
      )}
      {isModalOpen && <Modal props = {{close : setIsModalOpen , idlawyer : id}}/>}
    </div>
  );
};

export default Schedule;
