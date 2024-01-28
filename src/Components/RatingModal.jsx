import { useTranslation } from "react-i18next";
import { CloseIcon } from "../Svgs/Svgs";
import axios from "axios";
import {useState} from "react";
import {comment} from "postcss";
import { useNavigate } from "react-router-dom";

const RatingModal = ({ close , rating ,id}) => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const [message,setMessage] = useState("")
  const token = localStorage.getItem("token")
  const addReview = async()=>{
    const verifyToken = async (url) => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
          const res = await axios.get(url, {
            params: {token},
            withCredentials: true,
          });

          if (res.data.success) {
            console.log(res.data.message);
            return true

          } else {
            console.error("Verification failed");
            return false
          }
        }
      } catch (error) {
        console.error("Error during token verification", error);
      }
    }

    const isClient = await verifyToken("http://localhost:8000/core/verify-client")
    if (isClient){
      const form = {
        rating:parseInt(rating),
        comment:message
      }
      console.log(form)
      fetch(
          `http://localhost:8000/core/lawyer-search/${id}/reviews/`,
          {
            method:"POST",
            withCredentials: true,
            body:JSON.stringify(form),
            headers: {
              'Authorization': token,
              "Content-Length": 115640,
              "Content-Type": "application/json",
            },
          }
      ).then((res)=>{
        console.log(res)
       navigate(0)
      }).catch(e=>{
        console.log(e)
      })
    }else{
      console.log("not client")
    }
  }
  return (
    <div className="h-screen overlay flex justify-center items-center">
      <div className="p-6 bg-primary relative rounded-md">
        <button
          className="absolute top-1 end-1"
          onClick={() => {
            close(false);
          }}
        >
          <CloseIcon />
        </button>

        <h1 className="text-white text-xl font-semibold me-5">{`${t(
          "addreview"
        )} :`}</h1>
        <div className="flex flex-col gap-2 mt-3">
          <div className="flex flex-col gap-2">
            <label className="text-white text-base font-semibold">
              {t("desc")}
            </label>
            <textarea value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full h-24 rounded-md p-2 bg-white focus:outline-none"></textarea>
          </div>
          <div className="flex justify-end">
            <button className="text-primary rounded-md shadow-md w-full text-base bg-white font-semibold"
            onClick={addReview}>
              {t("add")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;
