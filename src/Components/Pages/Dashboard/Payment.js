import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const Payment = () => {
    const {id} = useParams();
    useEffect(() => {
        fetch(`https://desolate-castle-78820.herokuapp.com/booking/${id}`, {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
        .then(res=> res.json())
        .then(data=> console.log(data))
    }, [id])
    return (
        <div>
            Payment id {id}
        </div>
    );
};

export default Payment;