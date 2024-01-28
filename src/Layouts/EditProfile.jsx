import { useContext , useState , useRef } from "react"; 
import { userContext } from "../Context/UserContextProvider";
import { useTranslation } from "react-i18next";
import Sectionone from "../Sections/Section1";
import Sectiononetwo from "../Sections/Section12.jsx";
import Sectiontwo from "../Sections/Section2";
import Sectionthree from "../Sections/Section3";
import Sectionfour from "../Sections/Section4";
import { ArrowwIcon } from "../Svgs/Svgs";
import axios from "axios";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
const EditProfile = () => {
    const navigate = useNavigate()
    const {user} = useContext(userContext)
    const [data , setData] = useState({
        id : user.id,
        firstname : "aaa",
        lastname : "aaa",
        address : "aaa",
        wilaya : "aaa",
        commune : "aaa",
        univ : "aaa",
        diploma : "aaa",
        obtdate : "2000",
        phone : "00000000",
        email : "aaa@gmail.com",
        website : "aaa.com",
        position : [0,0],
        languages : [false,false,false],
        practicearea : [false,false,false],
        image : "aaa",
        cost : 0,
        per : "hour",
        desciptions : [
            {
                id : 1,
                title : "aaa",
                description : "aaa"
            },
            {
                id : 2,
                title : "aaa",
                description : "aaa"
            },
            {
                id : 3,
                title : "aaa",
                description : "aaa"
            }
        ],
        schedue : [
            {id : 1 , day : "sunday" , from : "00:00" , to : "00:00"},
            {id : 2 , day : "monday" , from : "00:00" , to : "00:00"},
            {id : 3 , day : "tuesday" , from : "00:00" , to : "00:00"},
            {id : 4 , day : "wednesday" , from : "00:00" , to : "00:00"},
            {id : 5 , day : "thursday" , from : "00:00" , to : "00:00"},
            {id : 6 , day : "saturday" , from : "00:00" , to : "00:00"},
        ]
    })
    const [position, setPosition] = useState(data.position);
      const [practicearea, setPracticearea] = useState(data.practicearea); //[arab,english,frnch]
      const [languages, setLanguages] = useState(data.languages); //[depth , tax , general]
      const { t, i18n } = useTranslation();
      const [image, setImage] = useState(data.image);
      const [wilayaselected, setWilayaselected] = useState(true);
      const [commune, setCommune] = useState(data.commune);
      const [wilaya, setWilaya] = useState(data.wilaya);
      const [selectedFile, setSelectedFile] = useState(null);
      const fileInputRef = useRef(null);
      const [year, setYear] = useState(data.obtdate);
        const [timeSlots,setTimeSlots] = useState([])
        const [bio,setBio] = useState([])
        const [firstName,setFirstName] = useState("")
        const [lastName,setLastName] = useState('')
        const [address,setAddress] = useState("")
        const [phone,setPhone] = useState("")

        const token = localStorage.getItem("token")
    const [lawyer,setLawyer] = useState({})
    const [isLoading,setIsLoading] = useState(true)
    const [practice,setPractice] = useState("")
    const [form,setForm] = useState({})
    console.log(form)
    const handlePost = async ()=>{
        const form = {
            // "first_name":firstName,
            // "last_name":lastName,
            phone_number: phone,
            bio: bio,
            address:{
                street: address,
                city: commune,
                state: wilaya,
                zip_code: "000000",
                country: "Algeria"
            },
            "time_slots": timeSlots
        }
        console.log(form)
        await fetch(
            "http://localhost:8000/core/lawyers/", {
                method: "PUT",
                withCredentials: true,
                body: JSON.stringify(form),
                headers: {
                    'Authorization': token,
                    "Content-Length": 115640,
                    "Content-Type": "application/json",
                },
                maxContentLength: 2000000,
            }).then((res)=>{
                console.log(res)
                navigate("/")
            }
        ).catch((e)=>{
                console.log(e)
            }
        )
    }
    const verifyTokenLaywer = async (url) => {
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

    useEffect(()=>{
        const checkLawyer = async()=>{
            const isLawyer = await verifyTokenLaywer("http://localhost:8000/core/verify-lawyer")
            if (isLawyer){
                axios(
                    {
                        method:"get",
                        url:"http://localhost:8000/core/lawyers/",
                        headers:{"Authorization":token},
                    }
                ).then((res=>{
                    console.log(res.data[0])
                    // setIsLoading(false)
                    setLawyer(res.data[0])
                    console.log(lawyer)
                    // setAddress(lawyer.address.street)
                    if(lawyer){

                    // setWilaya(lawyer.address.state)
                    // setPhone(lawyer.phone_number)
                    // setWilaya(lawyer.address.state)
                    // setBio(lawyer.bio)
                    // setTimeSlots(lawyer.time_slots)
                        setForm({address:lawyer.address.state,
                            phone_number:lawyer.phone_number,
                            bio:lawyer.bio,
                            timeSlots:lawyer.time_slots,
                            wilaya:lawyer.address.city})
                    setIsLoading(false)
                    }
                    // setPractice(lawyer.specialization)

                })).catch((e)=>{
                    console.log(e)
                })
            }else{
                console.log("nta hmar")
                navigate('/')
            }
        }

        checkLawyer()
    },[lawyer])
    return isLoading?<div className={"flex justify-center"}><p className={"text-white text-2xl font-black"}>Loading</p></div> :(
        
             <div className="w-screen bg-primary overflow-x-hidden">
      <header>
        <h1 className="text-white text-2xl font-bold mx-6 pt-4">
          {t("editprofile")}
        </h1>
        <ArrowwIcon lang={i18n.language} />
        <p className="txt inline mx-[3px] font-semibold">
          {t("soussetprofile")}
        </p>
      </header>

      <Sectiononetwo
        props={{
          form,setForm
        }}
      />

      {/*<Sectiontwo*/}
      {/*  props={{ setLanguages, setPracticearea, practicearea, languages }}*/}
      {/*/>*/}

      <Sectionthree props={{bio,setBio}}/>

      <Sectionfour props={{setTimeSlots,timeSlots}}/>

      <button className={"bg-white font-black rounded p-2 mt-2 ml-10 "} onClick={handlePost}>Update Profile</button>

    
    </div>
            
        
     );
}
 
export default EditProfile;