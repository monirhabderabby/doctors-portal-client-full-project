import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../firebase.init";

const Dashboard = () => {
    const [admin, setAdmin] = useState(false);

    const [user] = useAuthState(auth);
    useEffect(() => {
        fetch(`http://localhost:5000/user/checkAdmin/${user.email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(res=> res.json())
        .then(data=> {
            if(data.role === 'admin'){
                setAdmin(!false)
            }
        })
    }, [user])
    return (
        <div class="drawer drawer-mobile">
            <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
            <div class="drawer-content ">
                <h1 className="text-5xl text-secondary text-bold">
                    Welcome to Dashboard
                </h1>
                <Outlet></Outlet>
            </div>
            <div class="drawer-side">
                <label for="my-drawer-2" class="drawer-overlay"></label>
                <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                    <li>
                        <Link to="/dashboard">My Appoinments</Link>
                    </li>
                    <li>
                        <Link to="/dashboard/reviews">Reviews</Link>
                    </li>
                    {
                        admin && <li>
                        <Link to='/dashboard/users'>All Users</Link>
                    </li>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;
