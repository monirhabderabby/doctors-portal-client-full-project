import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import auth from "../../../firebase.init";

const MyAppoinments = () => {
    const [treatment, setTreatment] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            fetch(`https://desolate-castle-78820.herokuapp.com/treatment?patient=${user.email}`, {
                method: "GET",
                headers: {
                    'authorization' : `Bearer ${localStorage.getItem(
                        "accessToken"
                    )}`,
                },
            })
                .then((res) => {
                    if(res.status === 401 || res.status===403){
                        toast.error("You have no access for this application")
                        localStorage.removeItem("accessToken")
                        signOut(auth);
                        navigate('/')
                        
                    }
                    else{
                        return res.json();
                    }
                    
                   
                })
                .then((data) => {
                    
                    setTreatment(data);
                });
        }
    }, [user]);
    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead className="text-center">
                        <tr>
                            <th>S/L</th>
                            <th>Name</th>
                            <th>Treatment</th>
                            <th>Time</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {treatment?.map((t, index) => (
                            <tr>
                                <th>{index + 1}</th>
                                <td>{t.patientName}</td>
                                <td>{t.treatment}</td>
                                <td>{t.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAppoinments;
