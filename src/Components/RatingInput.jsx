import React, { useState } from "react";
import StarRating from "react-stars";

const RatingInput = ({props}) => {
  const {userRating, setUserRating} = props;


  return (
    <div className="flex gap-2 items-center">
      <StarRating
        count={5}
        size={20}
        value={userRating}
        half={true}
        edit={true} 
        onChange={(newRating)=>{setUserRating(newRating)}}
      />
    </div>
  );
};

export default RatingInput;
