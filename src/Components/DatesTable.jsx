import { useState } from "react";
import { useTranslation } from "react-i18next";
import { DetailsIcon, EditIcon, TrashIcon } from "../Svgs/Svgs";

const DatesTable = () => {
  const { t } = useTranslation();
  const [dates, setDates] = useState([
    {
      id: 1,
      user: 1,
      lawyer: 1,
      date: "2022-12-22",
      from: "11:00",
      to: "12:00",
      description: "description",
    },
    {
      id: 2,
      user: 2,
      lawyer: 1,
      date: "2023-02-22",
      from: "11:00",
      to: "12:00",
      description: "description",
    },
  ]);
  return (
    <div className="bg-white rounded xs:p-6 p-3 my-4">
      <table className="table-auto text-center overflow-hidden rounded-md w-full bg-gray-200">
        <thead>
          <th className="thh">{t("datte")}</th>
          <th className="thh">{t("fromm")}</th>
          <th className="thh">{t("too")}</th>
          <th className="thh">{t("actions")}</th>
        </thead>
        <tbody>
          {dates.map((date) => (
            <tr key={date.id} className="hover:bg-green-700 hover:text-white">     
              <td className="py-1">{date.date}</td>
              <td className="py-1">{date.from}</td>
              <td className="py-1">{date.to}</td>
              <td className="py-1">
                <button className="bg-green-700 text-white rounded-[50%] p-[6px] mx-1">
                  <EditIcon />
                </button>
                <button className="bg-red-700 text-white rounded-[50%] p-[6px] mx-1">
                  <TrashIcon />
                </button>
                <button className="bg-primary text-white rounded-[50%] p-[6px] mx-1">
                    <DetailsIcon /> 
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DatesTable;
