import { useAuthState } from "react-firebase-hooks/auth";
import { Link, Outlet } from "react-router-dom";
import auth from "../../../firebase.init";
import useAdmin from "../../../Hooks/useAdmin";

const Dashboard = () => {
    const [user] = useAuthState(auth);
    const [admin] = useAdmin(user)
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
