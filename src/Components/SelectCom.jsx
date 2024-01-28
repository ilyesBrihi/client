import { useState } from "react";
import cities from "../../wilayas/algeria_cities.json";
import { useTranslation } from "react-i18next";
const SelectCom = ({ props }) => {
  const { t, i18n } = useTranslation();
  const { wilaya, setCommune,commune } = props;
  const [data, setData] = useState(cities);
  const puredata = data.filter((com) => com["wilaya_name_ascii"] == wilaya);

  return (
    <select
      name="commune"
      value={commune}
      disabled={wilaya ? false : true}
      required
      className="select text-start"
      onChange={(e) => {
        setCommune(e.target.value);
      }}
    >
      <option value="" disabled selected hidden>
        {t("commune")}
      </option>
      {puredata.map((com) => (
        <option key={com["id"]} value={com["commune_name_ascii"]}>
          {com["commune_name_ascii"]}
        </option>
      ))}
    </select>
  );
};

export default SelectCom;
