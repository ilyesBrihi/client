import { useTranslation } from "react-i18next";

const Sectiontwo = ({ props }) => {
  const { setLanguages, setPracticearea, practicearea, languages } = props;
  const { t, i18n } = useTranslation();

  const onClickHandle = (e, num, type,value) => {
    e.target.className =
      e.target.className == "button"
        ? "buttong"
        : e.target.className == "button mx-1"
        ? "buttong mx-1"
        : e.target.className == "buttong"
        ? "button"
        : "button mx-1";
    if (type == "lang") {
      languages[num] = value;
      setLanguages(languages);
    } else {
      practicearea[num] = value;
      setPracticearea(practicearea);
    }
  };

  return (
    <section>
      <h2 className="h2">{t("additional")}</h2>
      <section className="form">
        <h1 className="h1">{t("area")}</h1>
        <div className="rounded-lg border-primary border-solid border-[1.6px] p-3 mt-2">
          <button
            className={practicearea[0] ? "buttong" : "button"}
            onClick={(e) => {
              onClickHandle(e, 0, "prac","Faillite et dettes");
            }}
          >
            {t("bank")}
          </button>
          <button
            onClick={(e) => {
              onClickHandle(e, 1, "prac","Taxe");
            }}
            className={practicearea[1] ? "buttong mx-1" : "button mx-1"}
          >
            {t("tax")}
          </button>
          <button
            onClick={(e) => {
              onClickHandle(e, 2, "prac","Pratique General");
            }}
            className={practicearea[2] ? "buttong" : "button"}
          >
            {t("gpractice")}
          </button>
        </div>
        <h1 className="h1">{t("languages")}</h1>
        <div className="rounded-lg border-primary border-solid border-[1.6px] p-3 mt-2">
          <button
            className={languages[0] ? "buttong " : "button"}
            onClick={(e) => {
              onClickHandle(e, 0, "lang",'arabic');
            }}
          >
            {t("ar")}
          </button>
          <button
            onClick={(e) => {
              onClickHandle(e, 1, "lang",'english');
            }}
            className={languages[1] ? "buttong  mx-1" : "button mx-1"}
          >
            {t("eng")}
          </button>
          <button
            onClick={(e) => {
              onClickHandle(e, 2, "lang",'french');
            }}
            className={languages[2] ? "buttong " : "button"}
          >
            {t("fr")}
          </button>
        </div>
        {/*<div className="flex justify-start items-center gap-2 mt-4">*/}
        {/*  <input*/}
        {/*    type="number"*/}
        {/*    className="btn"*/}
        {/*    required*/}
        {/*    placeholder={t("cost")}*/}
        {/*    name="cost"*/}
        {/*  />*/}
        {/*  <select*/}
        {/*    className="text-start py-[6px] rounded-md border-solid border-primary border-[1.5px] px-3 shadow-md"*/}
        {/*    name="costper"*/}
        {/*    id="costper"*/}
        {/*    required*/}
        {/*  >*/}
        {/*    <option value="hour">{t("hour")}</option>*/}
        {/*    <option value="day">{t("day")}</option>*/}
        {/*  </select>*/}
        {/*</div>*/}
      </section>
    </section>
  );
};

export default Sectiontwo;
