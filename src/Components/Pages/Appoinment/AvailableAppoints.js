import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import Service from './Service';

const AvailableAppoints = ({date}) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
        .then(res=> res.json())
        .then(data=> setServices(data))
    }, [])
    return (
        <div className='px-12'>
            <h1 className='text-secondary my-12'>Available appoinments on {format(date, "PP")}</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
                {
                    services.map(s=> <Service key={s._id} service={s}></Service>)
                }
            </div>
        </div>
    );
};

export default AvailableAppoints;