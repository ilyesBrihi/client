import {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import RatingComponent from "./RatingComponent";
import MapComponent from "./MapComponent";
import axios from "axios";

const Generale = () => {
  const { id } = useParams();
  const [data,setLawyer] = useState()
  const [isLoading,setIsLoading] = useState(true)
    const profile = localStorage.getItem('profile-picture'
    )
  useEffect(() => {

    axios({
      method: "get",
      url: `http://localhost:8000/core/lawyer-search/${id}/`
    }).then(
        (res) => {
          console.log(res.data)
          setLawyer(res.data)
          setIsLoading(false)
        }
    )
  }, []);

  return isLoading?(<div className={"flex mt-10 text-2xl font-bold justify-center text-white"}><p>Loading</p></div>): (
    <div className="bg-white rounded p-6 my-4">
      <div className="sm:flex sm:justify-start sm:items-start sm:gap-6">
        <div className="pb-4 my-4 w-full border-b-[1px] border-black sm:border-none sm:w-fit sm:py-0">
            <div className="h-fit w-fit bg-gray-500 rounded-xl mx-auto sm:mx-0">
                <img src={profile}></img>
            </div>

        </div>

        <div className="pb-4 my-4 w-full border-b-[1px] border-black sm:border-none sm:w-fit sm:py-0">
          <div>
            <h1>{data.first_name} {data.last_name}</h1>
            <p>{`${data.address.street} , ${data.address.city} , ${data.address.state}`}</p>
            <RatingComponent />
            <p>{data.bio}</p>
          </div>
        </div>

        <div className="pb-4 my-4 w-full border-b-[1px] border-black sm:border-none sm:w-fit sm:py-0 flex-1 sm:flex sm:flex-col sm:items-end">
          <div className="flex-1 sm:flex sm:flex-col sm:items-end">
            {/*<p>{data.website}</p>*/}
            {/*<p>{data.email}</p>*/}
            <p>{data.phone_number}</p>
          </div>
        </div>
      </div>

      <div className="w-fit mx-auto p-1 border-black border-solid border-[1.5px] rounded-md mt-3">
        <p className="text-sm font-semibold mb-1">Location :</p>
        <MapComponent props={{ position: [36.75, 5.07], setPosition: null }} />
      </div>
    </div>
  );
};

export default Generale;
