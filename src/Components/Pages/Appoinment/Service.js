import React from "react";

const Service = ({ service, setTreatment }) => {
    const { name, slots, Price } = service;
    return (
        <div className="card lg:max-w-lg bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="text-secondary">{name}</h2>
                <p>
                    {slots.length ? (
                        <span>{slots[0]}</span>
                    ) : (
                        <span className="text-red-600">No slot Available</span>
                    )}
                </p>
                <p>
                    {slots.length} {slots.length > 1 ? "spaces" : "space"}{" "}
                    Available
                </p>
                <p>Price: ${Price}</p>
                <div>
                    {/* <button  className="">Book Appoinment</button> */}
                    <label
                        disabled={slots.length === 0}
                        onClick={() => setTreatment(service)}
                        for="booking-modal"
                        className="btn modal-button btn-primary text-bold text-white bg-gradient-to-r from-secondary to-primary uppercase"
                    >
                        Book Appoinment
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Service;
