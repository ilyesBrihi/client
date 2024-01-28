import { useTranslation } from "react-i18next";
import { useState } from "react";
import { CloseIcon } from "../Svgs/Svgs";

const Sectionthree = ({props}) => {
  const { t, i18n } = useTranslation();
  // const [titre, setTitre] = useState("");
  // const [desc, setDesc] = useState("");
  const {bio,setBio} = props
  const [exps, setExps] = useState([
    { id: 1, title: "bla bla", desc: "hahaha" },
    { id: 2, title: "bla bla", desc: "yoooo" },
  ]);

  return (
    <section>
      <h2 className="h2">{t("exp")}</h2>
      <div className="form">
        <form method="post">
          {/*<h1 className="h1">{t("titre")}</h1>*/}
          {/*<input*/}
          {/*  value={titre}*/}
          {/*  onChange={(e) => {*/}
          {/*    setTitre(e.target.value);*/}
          {/*  }}*/}
          {/*  type="text"*/}
          {/*  required*/}
          {/*  name="titre"*/}
          {/*  className="btn my-2"*/}
          {/*  placeholder={t("titre")}*/}
          {/*/>*/}
          <h1 className="h1">{t("desc")}</h1>
          <textarea
           value={bio}
           onChange={(e) => {
              setBio(e.target.value);
           }}
            name="desc"
            required
            id="desc"
            cols="30"
            rows="5"
            className="btn my-2"
            placeholder={t("type")}
          ></textarea>
          {/*<button onClick={(e)=>{*/}
          {/*  e.preventDefault()*/}
          {/*  if(titre.trim() != "" && desc.trim() != ""){ */}
          {/*  setExps([...exps , {id : exps.length+1 , title : titre , desc : desc}])*/}
          {/*  setTitre("")*/}
          {/*  setDesc("")*/}
          {/*  }*/}
          {/*  else{*/}
          {/*    alert("please fill all the fields");*/}
          {/*  }*/}
          {/*}} className="button">{t("addexp")}</button>*/}
        </form>
        {/*<div className="flex flex-row justify-start gap-2 items-center mt-2">*/}
        {/*  {exps.map((exp) => (*/}
        {/*    <div key={exp.id} className="card relative">*/}
        {/*      <button onClick={()=>{*/}
        {/*        setExps(exps.filter((e)=>e.id!==exp.id))*/}
        {/*      }} className="absolute start-1 top-0">x</button>*/}
        {/*      <h2 className="text-primary font-semibold text-lg mb-1 text-start">*/}
        {/*        {exp.title}*/}
        {/*      </h2>*/}
        {/*      <p className="text-sm text-primary">{exp.desc}</p>*/}
        {/*    </div>*/}
        {/*  ))}*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default Sectionthree;
