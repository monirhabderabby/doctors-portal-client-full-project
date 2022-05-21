import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loading from "../../Shared/Loading";
import CheckOutForm from "./CheckOutForm";

const stripePromise = loadStripe(
    "pk_test_51L1O6gI47NxtigIiVGGa6N58wX0VUowpwuRXE3omGHjeO52ZKFDFGDlbwECCAO4DpajaCMxEYsIyhsbK8YY3bRQc00siTVLMiA"
);

const Payment = () => {
    const { id } = useParams();
    const url = `https://desolate-castle-78820.herokuapp.com/booking/${id}`;
    const { data: appoinment, isLoading } = useQuery(["booking", id], () =>
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
                        Hello, {appoinment.patientName}
                    </h2>
                    <p>
                        Your Appoinment in {appoinment.date} at{" "}
                        {appoinment.slot}
                    </p>
                    <p>Please Pay ${appoinment.Price}</p>
                </div>
            </div>
            <div class="card lg:max-w-lg bg-base-100 shadow-xl">
                <div class="p-6 w-96">
                    <Elements stripe={stripePromise}>
                        <CheckOutForm appoinment={appoinment} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;
