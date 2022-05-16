import React from "react";
import chair from '../../Assets/images/chair.png'

const Banner = () => {
    return (
        <div className="px-12">
            <div class="hero min-h-screen">
                <div class="hero-content flex-col flex-1 lg:flex-row-reverse">
                    <img
                        src={chair}
                        class="lg:max-w-lg rounded-lg shadow-2xl" alt=""
                    />
                    <div className="flex-1 text-left px-6">
                        <h1 class="text-5xl font-bold">Your New Smile Starts Here</h1>
                        <p class="py-6">
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the
                        </p>
                        <button class="btn btn-primary text-bold text-white bg-gradient-to-r from-secondary to-primary">Get Started</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
