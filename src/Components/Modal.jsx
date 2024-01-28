import { useState } from "react";
import { useTranslation } from "react-i18next";

const Modal = ({ props }) => {
  const { close, idlawyer } = props;
  const { t } = useTranslation();

  const [lawyerschedule, setLawyerschedule] = useState([
    { id: 1, lawyer: 1, day: "sunday", from: "8:00", to: "15:00" },
    { id: 2, lawyer: 1, day: "monday", from: "8:00", to: "17:00" },
    { id: 3, lawyer: 1, day: "tuesday", from: "8:00", to: "15:00" },
    { id: 4, lawyer: 1, day: "wednesday", from: "8:00", to: "17:00" },
    { id: 5, lawyer: 1, day: "thursday", from: "8:00", to: "15:00" },
    { id: 6, lawyer: 1, day: "saturday", from: "8:00", to: "17:00" },
  ]); //to get lawyer schedule from db

  const [date, setDate] = useState("");

  const getDaybyDate = (date) => {
    //to filter "from" and "to" by day later
    const days = [
      "sunday",
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
    ];
    const day = new Date(date).getDay();
    return days[day];
  };

  //to get the from and to timing by day to show them in <select /> 
  const filterSchedule = (day) => {
    const obj = lawyerschedule.filter((schedule) => schedule.day == day);
    const from = obj[0].from;
    const to = obj[0].to;
    const fromhour = from.split(":")[0];
    const tohour = to.split(":")[0];
    const hours = [];
    for (let i = parseInt(fromhour); i <= parseInt(tohour); i++) {
      hours.push(`${i}:00`);
    }
    return hours;
  };

  return (
    <div className="h-screen w-screen overlay flex justify-center items-center">
      <div className="p-5 bg-primary rounded">
        <h1 className="hhh mb-2">{t("prendre")}</h1>
        <form method="post" className="flex flex-col gap-1">
          <label htmlFor="date" className="hhh">
            {t("date")}
          </label>
          <input
            className="border-solid focuss border-[1px] border-white rounded p-1"
            required
            type="date"
            name="date"
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
            id="date"
          />
          {(date != "" && getDaybyDate(date) != "friday") && (
            <div>
              <label className="hhh">
                {t("time")}
              </label>
              <div className="w-full flex justify-start flex-wrap gap-1">
                <select
                  name="from"
                  id="from"
                  className="w-full focuss p-[2px] border-solid border-white border-[1px] rounded-md shadow-md flex-1"
                >
                  <option value="" disabled selected hidden>
                    {t("from")}
                  </option>
                    {filterSchedule(getDaybyDate(date)).map((hour , index) => (
                      <option key={index} value={hour}>
                        {hour}
                      </option>
                    ))}
                </select>
                <select
                  name="to"
                  id="to"
                  className="w-full focuss border-solid border-white border-[1px] rounded-md shadow-md p-[2px] flex-1"
                >
                  <option value="" disabled selected hidden>
                    {t("to")}
                  </option>
                    {filterSchedule(getDaybyDate(date)).map((hour, index) => (
                      <option key={index} value={hour}>
                        {hour}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-col gap-1 mt-1">
                <label htmlFor="descr" className="hhh">
                  {t("additionalinfo")}
                </label>
                <textarea
                  name="descr"
                  id="descr"
                  cols="30"
                  rows="5"
                  className="border-solid border-white border-[1px] py-[4px] px-[6px] focuss"
                ></textarea>
              </div>
            </div>
          )}

          <div
            className="flex justify-end flex-wrap gap-1
          mt-2
          "
          >
            <button
              className="buttonwhite"
              onClick={() => {
                close(false);
              }}
            >
              {t("annuler")}
            </button>
            {(date != "" && getDaybyDate(date) != "friday") && <button
              className="buttonwhite"
              type="submit"
              onClick={(e) => {
                e.preventDefault();
                //post request later
              }}
            >
              {t("reserver")}
            </button>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
