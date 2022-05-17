import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import Loading from "../../Shared/Loading";
import Modal from "./Modal";
import Service from "./Service";

const AvailableAppoints = ({ date }) => {
    // const [services, setServices] = useState([]);
    const [treatment, setTreatment] = useState({});
    const formattedDate = format(date, "PP");

    const {
        data: services,
        isLoading,
        refetch,
    } = useQuery(["available", formattedDate], () =>
        fetch(`http://localhost:5000/available?date=${formattedDate}`).then(
            (res) => res.json()
        )
    );

    if (isLoading) {
        return <Loading></Loading>;
    }

    // useEffect(() => {
    //     fetch(`http://localhost:5000/available?date=${formattedDate}`)
    //         .then((res) => res.json())
    //         .then((data) => setServices(data));
    // }, [formattedDate]);
    return (
        <div className="px-12">
            <h1 className="text-secondary my-12">
                Available appoinments on {format(date, "PP")}
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {services.map((s) => (
                    <Service
                        key={s._id}
                        service={s}
                        setTreatment={setTreatment}
                    ></Service>
                ))}
            </div>
            {treatment && (
                <Modal
                    treatment={treatment}
                    date={date}
                    setTreatment={setTreatment}
                    refetch={refetch}
                ></Modal>
            )}
        </div>
    );
};

export default AvailableAppoints;
