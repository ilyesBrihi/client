import { useParams } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const Details = () => {
  const [t, i18n] = useTranslation();
  const { id } = useParams();
  const [data, setData] = useState({
    categories: "[1,0,1]", //[depth , tax , general]
    languages: "[1,0,1]", //arabic , english , french
    exps: [
      {
        id: 1,
        title: "title",
        description: "description",
      },
      {
        id: 2,
        title: "title 2",
        description: "descriptionnnnnn",
      },
    ],
    cost: {
      cost: 1000,
      per: "hour",
    },
  });
  return (
    <div className="bg-white rounded p-6 my-4">
      <h1 className="hh">{t("area")}</h1>
      <div className="flex flex-wrap gap-1">
        {JSON.parse(data.categories)[0] == 1 && (
          <div className="button">{t("bank")}</div>
        )}
        {JSON.parse(data.categories)[1] == 1 && (
          <div className="button">{t("tax")}</div>
        )}
        {JSON.parse(data.categories)[2] == 1 && (
          <div className="button">{t("gpractice")}</div>
        )}
      </div>
      <h1 className="hh">{t("languages")}</h1>
      <div className="flex flex-wrap gap-1">
        {JSON.parse(data.languages)[0] == 1 && (
          <div className="button">{t("ar")}</div>
        )}
        {JSON.parse(data.languages)[1] == 1 && (
          <div className="button">{t("eng")}</div>
        )}
        {JSON.parse(data.languages)[2] == 1 && (
          <div className="button">{t("fr")}</div>
        )}
      </div>
      <h1 className="hh">{t("exp")}</h1>
      {data.exps.length > 0 ? (
        <div className="flex flex-wrap gap-1 mt-[6px]">
          {data.exps.map((exp) => (
            <div key={exp.id} className="card">
              <h2 className="text-primary font-semibold text-lg mb-1 text-start">
                {exp.title}
              </h2>
              <p className="text-sm text-primary">{exp.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>{t("noexp")}</div>
      )}

      <div className="flex flex-wrap gap-2 items-center mt-4">
        <h1>{`${t("cost")} :`}</h1>
        <div className="button">{data.cost.cost}</div>
        <h1>{`${t("per")} :`}</h1>
        <div className="button">{data.cost.per}</div>
      </div>
    </div>
  );
};

export default Details;
