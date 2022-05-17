import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";

const MyAppoinments = () => {
    const [treatment, setTreatment] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        if (user) {
            fetch(`http://localhost:5000/treatment?patient=${user.email}`)
                .then((res) => res.json())
                .then((data) => {
                    setTreatment(data);
                    console.log(data);
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
                        {treatment.map((t, index) => (
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
