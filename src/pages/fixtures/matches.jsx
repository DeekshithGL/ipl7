import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState } from "react";
import { images } from "../../constants";
const Matches = ({ data, className }) => {
  const teamImages = {
    "Chennai Super Kings": images.csk,
    "Delhi Capitals": images.dc,
    "Kolkata Knight Riders": images.kkr,
    "Mumbai Indians": images.mi,
    "Punjab Kings": images.pbks,
    "Rajasthan Royals": images.rr,
    "Royal Challengers Bangalore": images.rcb,
    "Sunrisers Hyderabad": images.srh,
    "Lucknow Super Giants": images.lsg,
    "Gujurat Titans": images.gt,
  };
  const teamAImage = teamImages[data.teamA];
  const teamBImage = teamImages[data.teamB];
  return (
    <Link
      to={`${data.matchID}`}
      className={`overflow-hidden rounded-xl py-7 bg-[#eeedf0]   shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ${className}`}
    >
      <div>
        <div className="flex flex-col justify-center mx-5 w-30 h-20 my-3">
          <p className="flex flex-row gap-x-3 mb-2 ml-3 text-[#0818A8]">
            <span className="mt-1">
              <FaLocationDot size={15} />
            </span>
            {data.location}
          </p>
          <div className="flex flex-row">
            <div className="flex flex-col justify-start w-[55%]">
              <div className="flex flex-row my-[1px]">
                <img
                  src={teamAImage}
                  alt={data.teamA}
                  className="w-9 h-auto my-[2px] rounded mx-3"
                />
                <p>{data.teamA}</p>
              </div>
              <div className="flex flex-row my-[1px]">
                <img
                  src={teamBImage}
                  alt={data.teamB}
                  className="w-9 h-auto my-[2px] rounded mx-3"
                />
                <p>{data.teamB}</p>
              </div>
            </div>
            <div className="flex flex-col justify-center items-end w-[45%]">
              <p>{data.matchdate}</p>
              <p>{data.matchtime}</p>
            </div>
          </div>
          {/*<button className="w-[50%] mx-auto my-2 bg-blue-600 font-semibold hover:bg-blue-900 rounded-md text-white py-1">
          Make prediction
        </button> */}
        </div>
      </div>
    </Link>
  );
};

export default Matches;