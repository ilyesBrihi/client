import { useTranslation } from "react-i18next";
import {useState,useEffect} from "react";

const Sectionfour = ({props}) => {
  const { t, i18n } = useTranslation();
    // eslint-disable-next-line react/prop-types
  const {setTimeSlots,timeSlots} = props
  const times = [
    "06:00:00",
    "07:00:00",
    "08:00:00",
    "09:00:00",
    "10:00:00",
    "11:00:00",
    "12:00:00",
    "13:00:00",
    "14:00:00",
    "15:00:00",
    "16:00:00",
    "17:00:00",
    "18:00:00",
    "19:00:00",
    "20:00:00",
  ];
  const days = [
    "saturday",
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
  ];
    const [selectedTimes, setSelectedTimes] = useState([]); // Using state to store the selected times

    const handleTimeChange = (day, startOrEnd, selectedTime) => {
        setTimeSlots(prevTimes => {
            const updatedTimes = [...prevTimes];
            const index = updatedTimes.findIndex(item => item.day === day);
            if (index !== -1) {
                if (startOrEnd === 'end_time') {
                    updatedTimes[index] = { ...updatedTimes[index], [startOrEnd]: selectedTime };
                }
            } else {
                updatedTimes.push({ day, [startOrEnd]: selectedTime });
            }
            return updatedTimes;
        });
        console.log(timeSlots);
    };

    useEffect(() => {
        console.log('timeSlots updated:', timeSlots);
    }, [timeSlots]);

    // const handleTimeChange = (day, startOrEnd, selectedTime) => {
    //     const index = selectedTimes.findIndex(item => item.day === day);
    //     if (index !== -1) {
    //         selectedTimes[index][startOrEnd] = selectedTime;
    //     } else {
    //         if (startOrEnd=="start-time"){
    //
    //         selectedTimes.push({ day,"start-time":selectedTime});
    //         }else{
    //         selectedTimes.push({ day,"end-time":selectedTime});
    //
    //         }
    //     }
    //     console.log("selected times")
    //     console.log(selectedTimes);
    //     // setTimeSlots([...timeSlots,selectedTimes])// You can remove this line, it's for demonstration
    // };
  return (
    <section>
      <h2 className="h2">{t("shedule")}</h2>
      <form
        className="grid grid-cols-2 items-center content-center mt-2 sm:grid-cols-3 gap-y-3 p-6 bg-white rounded-xl shadow-md mx-10 my-2;"
        method="post"
      >
        {days.map((day, i) => (
          <>
            {" "}
            <div className="button place-self-center w-[150px] col-span-2 sm:col-span-1">
              {t(day)}
            </div>
            <div className="col-span-2 flex justify-start gap-3">
              <select required className="select"
                      onChange={(e) => handleTimeChange(day, "start_time", e.target.value)}
              >
                <option value="" disabled selected hidden>
                  {t("from")}
                </option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <select required className="select"
                      onChange={(e) => handleTimeChange(day, "end_time", e.target.value)}

              >
                <option value="" disabled selected hidden>
                  {t("to")}
                </option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </>
        ))}
      </form>
    </section>
  );
};

export default Sectionfour;
