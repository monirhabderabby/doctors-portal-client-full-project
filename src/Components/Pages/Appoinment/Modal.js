import React from "react";
import { format } from "date-fns";

const Modal = ({ treatment, date, setTreatment }) => {
    const { name, slots } = treatment;

    const handleBooking = (e) => {
        e.preventDefault();
        const slot = e.target.slot.value;
        console.log(slot);
        setTreatment("");
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
                            placeholder="Full Name"
                            className="input input-md input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            className="input input-md input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            className="input input-md input-bordered w-full"
                        />
                        <input
                            type="submit"
                            placeholder="Email"
                            className="btn input-bordered w-full"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
