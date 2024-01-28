import React, { useState } from "react";
import cities from "../../wilayas/algeria_cities.json";
import { useTranslation } from "react-i18next";

const Select = ({ props }) => {
  const { wilaya, setWilaya, setWilayaselected } = props;
  const { t, i18n } = useTranslation();

  const [tableData, setTableData] = useState(cities);

  const removeDuplicates = (data) => {
    const uniqueWilayaCodes = new Set();
    const uniqueData = [];

    data.forEach((item) => {
      if (!uniqueWilayaCodes.has(item.wilaya_code)) {
        uniqueWilayaCodes.add(item.wilaya_code);
        uniqueData.push(item);
      }
    });

    return uniqueData;
  };

  const uniqueData = removeDuplicates(tableData);

  return (
    <select
      name="wilaya"
      value={wilaya}
      required
      className="select text-start"
      onChange={(e) => {
        setWilayaselected(true);
        setWilaya(e.target.value);
      }}
    >
      <option value="" disabled selected hidden>
        {t("wilaya")}
      </option>
      {uniqueData.map((wilaya, index) => (
        <option key={index} value={wilaya["wilaya_name_ascii"]}>
          {`${wilaya["wilaya_code"]} ${wilaya["wilaya_name_ascii"]}`}
        </option>
      ))}
    </select>
  );
};

export default Select;
