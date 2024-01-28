import { useTranslation } from "react-i18next";

const SelectYear = ({ props }) => {
  const { setYear, type } = props;
  const currentYear = new Date().getFullYear();
  const { t, i18n } = useTranslation();
  const getyears = () => {
    const years = [];
    for (let year = currentYear; year >= currentYear - 100; year--) {
      years.push(year);
    }
    return years;
  };
  const years = getyears();
  return (
    <select
      name="year"
      className="py-[2px] border-solid border-primary border-[1px] rounded-md shadow-md w-full"
      onChange={(e) => {
        setYear(e.target.value);
        console.log(typeof e.target.value);
      }}
      id="year"
      placeholder="year"
      required
    >
      <option value="" disabled selected hidden>
        {type == "obt" ? t("obtenation") : t("birth")}
      </option>
      {years.map((year, index) => (
        <option value={year} key={index}>
          {year}
        </option>
      ))}
    </select>
  );
};

export default SelectYear;
