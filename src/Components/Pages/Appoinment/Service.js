import React from "react";

const Service = ({ service }) => {
    const { name, slots } = service;
    return (
        <div class="card lg:max-w-lg bg-base-100 shadow-xl">
            <div class="card-body">
                <h2 class="text-secondary">{name}</h2>
                <p>{slots.length ? <span>{slots[0]}</span> : <span className="text-red-600">No slot Available</span>}</p>
                <p>{slots.length} {slots.length > 1 ? "spaces" : "space"} Available</p>
                <div>
                    <button disabled={slots.length === 0} className="btn btn-primary text-bold text-white bg-gradient-to-r from-secondary to-primary uppercase">Book Appoinment</button>
                </div>
            </div>
        </div>
    );
};

export default Service;
