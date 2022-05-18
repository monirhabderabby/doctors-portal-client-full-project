import React from "react";
import { format } from "date-fns";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import Loading from "../../Shared/Loading";
import { toast } from "react-toastify";

const Modal = ({ treatment, date, setTreatment, refetch }) => {
    const { _id, name, slots } = treatment;
    const [user, loading] = useAuthState(auth);
    if (loading) {
        return <Loading></Loading>;
    }
    const formattedDate = format(date, "PP");
    const handleBooking = (e) => {
        e.preventDefault();
        const slot = e.target.slot.value;
        const booking = {
            treatmentId: _id,
            treatment: name,
            date: formattedDate,
            slot,
            patient: user.email,
            patientName: user.displayName,
            phone: e.target.phone.value,
        };

        fetch("https://desolate-castle-78820.herokuapp.com/booking", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(booking),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.success) {
                    toast.success(
                        `Your appoinment is set at, ${formattedDate} on ${slot}`
                    );
                    refetch();
                    //to close modal
                    setTreatment(null);
                } else {
                    toast.error(
                        `You already have an appoinment at ${data.booking?.date} on ${data.booking?.slot}`
                    );
                }
            });
    };
    return (
        <div>
            <input
                type="checkbox"
                id="booking-modal"
                className="modal-toggle"
            />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label
                        for="booking-modal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    <h3 className="text-left">{name}</h3>
                    <form
                        className="grid grid-cols-1 gap-4 my-6"
                        onSubmit={handleBooking}
                    >
                        <input
                            type="text"
                            disabled
                            value={format(date, "PP")}
                            className="input input-md input-bordered w-full"
                        />
                        <select
                            name="slot"
                            className="select select-bordered w-full"
                        >
                            {slots?.map((slot) => (
                                <option value={slot}>{slot}</option>
                            ))}
                        </select>
                        <input
                            type="text"
                            value={user.displayName}
                            disabled
                            className="input input-md input-bordered w-full"
                        />
                        <input
                            type="email"
                            value={user.email}
                            disabled
                            className="input input-md input-bordered w-full"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Phone Number"
                            className="input input-md input-bordered w-full"
                        />
                        <input
                            type="submit"
                            value="SUBMIT"
                            className="btn input-bordered w-full"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
