import React from "react";

const InfoCard = ({img, cardTitle,classbg, body}) => {
    return (
        <div>
            <div className={`card lg:card-side shadow-xl ${classbg} p-2`}>
                <figure>
                    <img
                        src={img}
                        alt="Album"
                    />
                </figure>
                <div class="card-body text-white text-center">
                    <h2 class="text-xl text-bold">{cardTitle}</h2>
                    <p><small>{body}</small></p>
                </div>
            </div>
        </div>
    );
};

export default InfoCard;
