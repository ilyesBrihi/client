import { useTranslation } from "react-i18next";
import SelectYear from "../Components/SelectYear";
import { useState } from "react";
import { ArrowIcon } from "../Svgs/Svgs";
const PlansPage = () => {
  const { t, i18n } = useTranslation();
  const plans = [t("plan1"), t("plan2"), t("plan3")];
  const prix = 4300;
  const [year, setYear] = useState();
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return (
    <div className="bg-primary md:h-screen text-center sm:text-start flex flex-col items-center sm:flex sm:justify-around sm:items-center sm:flex-row">
      <div className="m-5 text-white">
        <h1 className="text-[20px] font-bold">{t("plan")}</h1>
        {plans.map((p, index) => (
          <div key={index} className="my-1">
            <ArrowIcon lang={i18n.language} />
            <p className="text-white text-sm inline">{p}</p>
          </div>
        ))}
      </div>

      <form
        method="post"
        className="px-[30px] py-4 flex flex-col justify-start gap-5 relative bg-white rounded-2xl h-[500px] max-w-full sm:min-w-[370px] md:min-w-[440px] min-w-[300px] mx-3 shadow-md"
      >
        <h2 className="text-primary font-bold text-center mb-7">
          {t("subscribe")}
          <span className="text-[30px] block">{t("price", { prix })}</span>
        </h2>
        <div>
          <input
            type="text"
            name="name"
            className="btn"
            required
            placeholder={t("name")}
          />
          <p className="text-[11px] mt-1 text-primary">{t("souscard")}</p>
        </div>

        <input
          type="number"
          name="cardnumber"
          required
          className="btn"
          placeholder={t("card")}
        />
        <div className="w-full flex gap-3 justify-between items-center">
          <SelectYear props={{ setYear, type: "brth" }} />
          <select
            name="month"
            className="select"
            id="month"
            required
            placeholder="month"
          >
            {months.map((month) => (
              <option value={month} key={month}>
                {month}
              </option>
            ))}
          </select>
        </div>

        <input
          type="number"
          name="cvc"
          className="btn"
          placeholder={t("cvc")}
          required
        />
        <button
          type="submit"
          className="bg-primary py-1 px-6 absolute bottom-6 right-6 transition-[0.6s] hover:scale-[1.1] rounded-md text-white"
        >
          {t("enroll")}
        </button>
      </form>
    </div>
  );
};

export default PlansPage;
