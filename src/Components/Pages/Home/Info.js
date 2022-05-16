import React from 'react';
import InfoCard from './InfoCard';
import clock from '../../Assets/icons/clock.svg'
import marker from '../../Assets/icons/marker.svg'
import phone from '../../Assets/icons/phone.svg'

const Info = () => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-12 my-6'>
            <InfoCard body="Lorem Ipsum is simply dummy text" cardTitle="Opening Hours" classbg="bg-gradient-to-r from-secondary to-primary" img={clock}></InfoCard>
            <InfoCard body="Brooklyn, NY 10036, United States" cardTitle="Visit our location" classbg="bg-accent" img={marker}></InfoCard>
            <InfoCard body="+000 123 456789" cardTitle="Contact us now" classbg="bg-gradient-to-r from-secondary to-primary" img={phone}></InfoCard>
        </div>
    );
};

export default Info;