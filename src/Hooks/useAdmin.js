import { useEffect, useState } from "react";

const useAdmin = user => {
    const [admin, setAdmin] = useState(false);
    const [adminLoading, setAdminLoading] = useState(true)
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
                setAdminLoading(false);
            }
        })
    }, [user])
    return [admin, adminLoading]
}

export default useAdmin;