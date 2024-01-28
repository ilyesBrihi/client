import {useEffect} from "react";
import {useLocation, useNavigate} from 'react-router-dom';
import axios from "axios";

const LoginHandler = () => {
    const s = useLocation();
    const navigate = useNavigate();
    const token = s['search'].split("&")[0].replace("?token=","")
    const data = JSON.parse(decodeURI(s['search'].split("&")[1].replace("data=","")))
    console.log(data)

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

    useEffect(() => {
            const handleLogin = async()=>{
            try {
                console.log('Logging in with token:', token);
                localStorage.setItem("token",token)
                localStorage.setItem("profile-picture",data.picture)
                localStorage.setItem("email",data.email)
                localStorage.setItem("first_name",data.given_name)
                localStorage.setItem("last_name",data.family_name)


                const isLawyer =await  verifyToken("http://localhost:8000/core/verify-lawyer/", "/ProfilAvocat");
                const isClient = await verifyToken("http://localhost:8000/core/verify-client/", "/");
                if (isLawyer){
                    navigate("editprofile")
                }else if (isClient){
                    navigate("/")
                }else{
                    navigate("/create-account")
                }
            } catch (error) {
                console.error('Error during login:', error);
                // Handle errors, e.g., show an error message to the user
            }}
        handleLogin();

    }, [token, navigate]);

    return (
        <div className="flex justify-center">
            <div className={"text-4xl text-black font-black"}>Loading</div>
        </div>
    );
};

export default LoginHandler;