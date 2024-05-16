import React from 'react';
import Marquee from "react-fast-marquee";
const Notice = () => {
    return (
        <div className='flex bg-gray-400 '>
            <button className='btn btn-secondary'>Breaking news</button>
            <Marquee pauseOnHover={true} speed={100}>
                If you love football legends and legendary jokes, then you will love these hilarious Cristiano Ronaldo funnies!
            </Marquee>
        </div>
    );
};

export default Notice;