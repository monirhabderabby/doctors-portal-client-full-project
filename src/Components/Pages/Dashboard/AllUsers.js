import React from "react";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import Loading from "../../Shared/Loading";

const AllUsers = () => {
    const { data: users, isLoading, refetch } = useQuery("users", () =>
        fetch("http://localhost:5000/user", {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem("accessToken")}`
            }
        }).then((res) => res.json())
    );
        const makeAdmin = userEmail => {
            fetch(`http://localhost:5000/user/admin/${userEmail}`, {
                method: 'PUT',
                headers: {
                    'authorization': `Bearer ${localStorage.getItem("accessToken")}`
                }
            })
            .then(res=> {
                if(res.status === 403){
                    toast.error("Failed to make an admin")
                }
                return res.json()
            })
            .then(data=> {
                if(data.modifiedCount > 0){
                    toast.success('successfully make an admin')
                refetch();
                }
            })
        }

    if(isLoading){
        return <Loading></Loading>
    }
    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead className="text-center">
                        <tr>
                            <th>Position</th>
                            <th>User</th>
                            <th>Role</th>
                            <th>Check</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {
                            users?.map((u, index)=> <tr>
                                <th>{index + 1}</th>
                                <td>{u.email}</td>
                                <td>

                                    {
                                        u.role !== 'admin' && <button className="btn btn-xs" onClick={()=> makeAdmin(u.email)}>make admin</button>
                                    }
                                </td>
                                <td><button className="btn btn-xs">Remove</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
