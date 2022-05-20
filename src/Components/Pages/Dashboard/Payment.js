import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Shared/Loading";

const Payment = () => {
    const { id } = useParams();
    const url = `https://desolate-castle-78820.herokuapp.com/booking/${id}`;
    const { data, isLoading } = useQuery(["booking", id], () =>
        fetch(url, {
            method: "get",
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => res.json())
    );
    if (isLoading) {
        return <Loading></Loading>;
    }

    return (
        <div className="flex flex-col justify-center h-[80vh] items-center gap-8">
            <div class="card lg:max-w-lg bg-base-100 shadow-xl">
                <div class="p-6 text-left">
                    <h2 class="card-title text-secondary">
                        Hello, {data.patientName}
                    </h2>
                    <p>
                        Your Appoinment in {data.date} at {data.slot}
                    </p>
                    <p>Please Pay ${data.Price}</p>
                </div>
            </div>
            <div class="card lg:max-w-lg bg-base-100 shadow-xl">
                <div class="card-body">
                    <h2 class="card-title">Card title!</h2>
                    <p>If a dog chews shoes whose shoes does he choose?</p>
                    <div class="card-actions justify-end">
                        <button class="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
