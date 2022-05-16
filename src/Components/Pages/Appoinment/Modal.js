import React from "react";
import { format } from "date-fns";

const Modal = ({ treatment, date, setTreatment }) => {
    const { name, slots } = treatment;

    const handleBooking = e => {
        e.preventDefault();
        const slot = e.target.slot.value;
        console.log(slot);
        setTreatment('')
    }
    return (
        <div>
            <input type="checkbox" id="booking-modal" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle">
                <div class="modal-box">
                    <h3 class="text-left">{name}</h3>
                    <form className="grid grid-cols-1 gap-4 my-6" onSubmit={handleBooking}>
                        <input
                            type="text"
                            disabled
                            value={format(date, "PP")}
                            class="input input-md input-bordered w-full"
                        />
                        <select name="slot" class="select select-bordered w-full">
                            {
                                slots.map(slot=> <option value={slot}>{slot}</option>)
                            }
                        </select>
                        <input
                            type="text"
                            placeholder="Full Name"
                            class="input input-md input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            class="input input-md input-bordered w-full"
                        />
                        <input
                            type="text"
                            placeholder="Email"
                            class="input input-md input-bordered w-full"
                        />
                        <input
                            type="submit"
                            placeholder="Email"
                            class="btn input-bordered w-full"
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Modal;
