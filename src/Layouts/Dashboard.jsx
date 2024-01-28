import { useEffect, useState } from 'react'
import  axios  from 'axios'
export default function Dashboard() {
    const [lawyers,setLawyers] = useState([])
    const token = "d3175011f3420e29016c53b59ca8e1ca51b80069";
    const [approve, setApprove] = useState(null)
    let change=false
    const getlawyers = async () =>{
        const verifyToken = async (url) => {
            try {

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
        const isAdmin = await verifyToken("http://localhost:8000/core/verify-admin")
        console.log(isAdmin)
        if (isAdmin){
            axios({
                method:"GET",
                url:"http://localhost:8000/core/dashboard/",
                headers:{"Authorization":token}
            }).then((res)=>{
                console.log(res.data)
                setLawyers(res.data)

            }).catch(e=>{
                console.log(e)
            })
        }else{
            console.log("not client")
        }

    }
    useEffect(()=>{
        getlawyers()
    },[])
    const handleRoleChange = (e,id,specialization) =>{
        console.log(e)
        console.log(id)
        const newRole = e.target.value;
        if (newRole == "approved") {
            change=true

            ApproveChange(id,specialization)
        }else{
            change=false

            ApproveChange(id,specialization)
        }
    }
    const ApproveChange = (id,specialization) =>{
        axios({
            method:"PUT",
            url:`http://localhost:8000/core/dashboard/${id}/`,
            data:{approved:change,specialization:specialization},
            withCredentials:true,
            headers:{
                'Authorization':token,
                "Content-Type":"application/json"
            }
        })
            .then(response => {
                console.log('Approval state updated successfully:', response.data);
            })
            .catch(error => {

                console.error('Error updating approval state:', error);
            });
    }
    const deleteLawyer = (id) =>{
        axios({
            method:"DELETE",
            url:`http://localhost:8000/core/dashboard/${id}/`,
            withCredentials:true,
            headers:{
                'Authorization':token,
                "Content-Type":"application/json"
            }
        })
            .then(response => {
                console.log('Approval state updated successfully:', response.data);
            })
            .catch(error => {

                console.error('Error updating approval state:', error);
            });
    }
    return (
        <div class="text-gray-300 bg-gray-800 h-[100vh]">
            <div class="p-4 flex">
                <h1 class="text-3xl">
                    Dashboard
                </h1>
            </div>
            <div class="px-3 py-4 flex justify-center">
                <table class="w-full text-md bg-gray-300 text-black shadow-md rounded mb-4">
                    <tbody>
                    <tr class="border-b">
                        <th class=" p-3 px-5 text-center">Name</th>
                        <th class="text-center p-3 px-5 border-l-2 border-black border-solid">Email</th>
                        <th class="text-center p-3 px-5 border-l-2 border-black border-solid">Role</th>
                        <th></th>
                    </tr>
                    {lawyers.map((lawyer) =>(
                        <tr class="border-b hover:bg-orange-100 bg-gray-100">
                            <td class="p-3 px-5"><p class="bg-transparent text-center" >{lawyer.first_name} {lawyer.last_name}</p></td>
                            <td class="p-3 px-5 text-center"><a  class="bg-transparent " >doc</a></td>
                            <td class="p-3 px-5 text-center">
                                <select value={lawyer.approved?"approved":"not_approved"} class="bg-transparent" onChange={(e) => handleRoleChange(e,lawyer.id,lawyer.specialization)}>
                                    <option value="approved">approved</option>
                                    <option value="not_approved">not approved</option>
                                </select>
                            </td>
                            <td class="p-3 px-5 flex justify-end"><button type="button" class="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() =>{deleteLawyer(lawyer.id)}}>Delete</button></td>
                        </tr>
                    ))}






                    </tbody>
                </table>
            </div>
        </div>
    )
}