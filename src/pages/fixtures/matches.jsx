import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { images } from "../../constants";
import { useEffect } from "react";
import { useState } from "react";
const Matches = ({ data,id,status, className }) => {
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
    "Gujarat Titans": images.gt,
  };
  
  const teamA = data.teamA;
  const teamB = data.teamB;
  const teamAImage = teamImages[teamA.teamname];
  const teamBImage = teamImages[teamB.teamname];
  console.log(data)
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    let formattedHours = parseInt(hours, 10);
    let period = 'AM';
  
    if (formattedHours === 0) {
      formattedHours = 12;
    } else if (formattedHours === 12) {
      period = 'PM';
    } else if (formattedHours > 12) {
      formattedHours -= 12;
      period = 'PM';
    }
  
    return `${formattedHours}:${minutes.padStart(2, '0')} ${period} IST`;
  };
  const [currentMatch, setCurrentMatch] = useState(null);

// Update currentMatch based on current time and match time
useEffect(() => {
  // Get current date and time
  const currentDate = new Date();
  const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

  // Convert match time to minutes since midnight
  const matchTime = parseInt(data.matchtime.split(':')[0]) * 60 + parseInt(data.matchtime.split(':')[1]);

  // Check if the match is in the past or future compared to current time
  if (currentTime > matchTime) {
    setCurrentMatch('past');
  } else if (currentTime > matchTime && matchTime - currentTime <= 90) {
    setCurrentMatch('upcoming');
  } else {
    setCurrentMatch('future');
  }
}, [data]);
  console.log(currentMatch)

  return (
    <a
      href={`/fixtures/${id}?status=${data.status}`}
      className={`overflow-hidden rounded-xl py-5 bg-[#eeedf0] shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ${className}`}
    >
      <div className="absolute bg-blue right-50">{currentMatch}</div>
      <div>
        <div className="flex flex-col justify-center w-full h-[85px] my-7">
          <p className="flex flex-row justify-start items-start gap-x-3 top-0 mb-2 ml-3 text-[#0818A8]">
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
                  alt={data.teamA.teamname}
                  className="w-9 h-auto my-[2px] rounded mx-3"
                />
                <p>{data.teamA.teamname}</p>
              </div>
              <div className="flex flex-row my-[1px]">
                <img
                  src={teamBImage}
                  alt={data.teamB}
                  className="w-9 h-auto my-[2px] rounded mx-3"
                />
                <p>{data.teamB.teamname}</p>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-end w-[45%]">
              <p>{formatDate(data.matchdate)}</p>
              <p>{formatTime(data.matchtime)}</p>
            </div>
          </div>
          {/* <button className="w-[50%] mx-auto my-2 bg-black font-semibold hover:bg-blue-900 rounded-md text-white py-1">
          Make prediction
        </button>  */}
        </div>
      </div>
    </a>
  );
};

export default Matches;