import {useEffect, useState} from "react";
import RatingInput from "./RatingInput";
import RatingComponent from "./RatingComponent";
import { t } from "i18next";
import { AddIcon } from "../Svgs/Svgs";
import RatingModal from "./RatingModal";
import axios from "axios";
import {useParams} from "react-router-dom";

function timeFormatter(dateString){
    const date = new Date(dateString);
    const timeAgo = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });
    const timeElapsed = Math.floor((Date.now() - date.getTime()) / 1000);
    if (timeElapsed < 60) {
        return(`${timeElapsed} seconds ago`);
    } else if (timeElapsed < 60 * 60) {
       return(`${Math.floor(timeElapsed / 60)} minutes ago`);
    } else if (timeElapsed < 24 * 60 * 60) {
        return(`${Math.floor(timeElapsed / 60 / 60)} hours ago`);
    } else if (timeElapsed < 30 * 24 * 60 * 60) {
        return(`${Math.floor(timeElapsed / 24 / 60 / 60)} days ago`);
    } else {
        return(`${timeAgo.format(timeElapsed, 'year')} ago`);
    }
}
const Rating = () => {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [ratingModal , setRatingModal] = useState(false)
  const [ratings,setRatings] = useState()
  const [isLoading,setIsLoading] = useState(true)
  // const [ratings, setRatings] = useState([
  //   {
  //     id: 1,
  //     rating: 4,
  //     lawyer: 1,
  //     rater: "lallouche abdelghani",
  //     desc: "good lawyer",
  //     date: "12/12/2022",
  //   },
  //   {
  //     id: 2,
  //     rating: 5,
  //     lawyer: 1,
  //     rater: "azououa",
  //     desc: "good lawyer",
  //     date: "12/12/2022",
  //   },
  //   {
  //     id: 3,
  //     rating: 5,
  //     lawyer: 1,
  //     rater: "spiderman",
  //     desc: "good lawyer",
  //     date: "12/12/2022",
  //   },
  // ]);
  useEffect(() => {
      console.log(id)
      axios({
      method: "get",
      url: `http://localhost:8000/core/lawyer-search/${id}/reviews/`
    }).then(
        (res) => {
          console.log(res.data)
          setRatings(res.data)
          setIsLoading(false)
        }
    )
  }, []);
  return isLoading?(<div className={"flex mt-10 text-2xl font-bold justify-center text-white"}><p>Loading</p></div>):(
    <div>
      <div className="flex flex-wrap items-center gap-2 bg-white rounded-xl p-3 mt-5">
        <div className="hh">{t("addrating")}</div>
        <RatingInput props={{userRating, setUserRating}} />
        <div className="flex-1 flex justify-end">
          <button onClick={()=>{setRatingModal(true)}} className="flex flex-wrap gap-2 items-center">
            <h1 className="text-primary text-base font-semibold">
              {t("addreview")}
            </h1>
            <AddIcon />
          </button>
        </div>
      </div>
      <div>
        {ratings.length > 0 ? (
          <div>
            {ratings.map((rating) => (
              <div key={rating.id} className="bg-white rounded-xl p-3 my-2">
                <h1>{`${rating.client_name} | ${timeFormatter(rating.created_at)}`}</h1>
                <RatingComponent rating={rating.rating} />
                <p className="">{rating.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <div>{t("noreview")}</div>
        )}
      </div>
      {ratingModal && <RatingModal close = {setRatingModal}  rating={userRating} id={id}/>}
    </div>
  );
};

export default Rating;
