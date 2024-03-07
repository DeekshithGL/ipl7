import React, { useEffect } from "react";
import { SectionWrapper } from "../../hoc";
import { fadeIn, textVariant, zoomIn } from "../../utils/motion";
import {styles} from '../../styles'
import { motion } from "framer-motion";
import { useState } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { getTodayMatch } from "../../services/fixtures";
import { MdLeaderboard } from "react-icons/md";
import MainLayout from "../../Components/MainLayout";
import { MdNotStarted } from "react-icons/md";
import { images } from "../../constants";
import { useQuery } from "@tanstack/react-query";
import Matches from "../fixtures/matches";

const texts = [
  { index: 1, title: "Browse the upcoming matches and make your predictions." },
  { index: 2, title: "Earn points based on the accuracy of your predictions." },
  {
    index: 3,
    title: "Check the leaderboard to see your ranking among other players.",
  },
  { index: 4, title: "Enjoy the thrill of predicting and winning!" },
];
const HowItWorks = ({ index, title }) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
      className="w-[100%] sm:w-[90%] mx-auto lg:h-40  p-[1px] my-[10px] rounded-[20px] border-[1px] xs:black-gradient sm:black-gradient md:black-gradient"
    >
      <div className="bg-[#2b072e] rounded-[20px] text-secondary m-[1px] py-[14px] px-10 min-h-[90px] flex justify-evenly items-center flex-col">
        <p className="text-lg font-semibold text-start">{title}</p>
      </div>
    </motion.div>
  );
};
const Intro = () => {
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
  const [matchesToday, setMatchesToday] = useState([]);
  const {data:dataa,isLoading,isError,refetch} = useQuery({
    queryFn: ()=> {
      return getTodayMatch();
    },
    queryKey: ["todaymatch"],
    
  })
  useEffect(()=> {
    refetch()
  },[isLoading])
  const [completed, isCompleted] = useState(false);
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  // This arrangement can be altered based on how we want the date's format to appear.
  
  // const compareDates = (d1, d2) => {
  //   let date1 = new Date(d1).getTime();
  //   let date2 = new Date(d2).getTime();
  //   console.log(date1);
  //   console.log(date2);
  //   if (date1 < date2) {
  //     isCompleted(false);
  //   } else if (date1 > date2) {
  //     isCompleted(true);
  //   }
  // };
  console.log(completed);
  const [Breadcrumbsdata, setBreadcrumbsdata] = useState([
    {
      name: "Home",
      link: "/",
    },
  ]);
  const index = 1;
  useEffect(() => {
    const fetchMatchesToday = async () => {
      const response = await getTodayMatch();
      setMatchesToday(response.data);
    };
    fetchMatchesToday();
  }, []);
  
  console.log(dataa?.matches)
  const data = dataa?.matches
  return (
    <MainLayout>
      <section className="h-full mx-8">
        <div
          className={`${styles.paddingX}  max-w-7xl mt-20 mb-4 my-0 mx-auto flex flex-col items-start gap-1 `}
        >
          <div className="">
            <h1 className={`${styles.heroHeadText} text-black`}>
              Welcome to <span className="text-[#2b072e]">Predictive Play</span>
            </h1>
            <p className={`text-xl mt-2 text-center font-medium`}>
              Predict the outcomes of the matches and earn points to climb the
              leaderboard. Compete with other players and showcase your
              predictive skills!
            </p>
          </div>
          <div className="my-5 ">
            <h2 className={`${styles.sectionHeadText} text-center mb-5`}>
              How it works&nbsp;?
            </h2>
            <div className="lg:flex lg:flex-row lg:w-full lg:gap-x-3">
              {texts.map((text, index) => (
                <HowItWorks index={index} {...text} />
              ))}
            </div>
          </div>
          <div className="my-5 ">
            <h2 className={`${styles.sectionHeadText} text-center mb-5`}>
              How it works&nbsp;?
            </h2>
            <div className="lg:flex lg:flex-row lg:w-full lg:gap-x-3">
            {data &&
    data.map((match, index) => {
      const matchDate = new Date(match.matchdate);
      const currentDate = new Date();
      const isMatchCompleted = matchDate < currentDate;
      // Compare the match date with the current date
      const currentTime = currentDate.getHours() * 60 + currentDate.getMinutes();

  // Check if the current date is today and the current time is before 3:30 PM (15:30)
  const isTodayBefore330PM = currentDate.toDateString() === matchDate.toDateString() && currentTime < 15 * 60 + 30
  console.log(currentTime)
  const matchTimeParts = match.matchtime.split(':');
const matchHours = parseInt(matchTimeParts[0], 10);
const matchMinutes = parseInt(matchTimeParts[1], 10);

// Convert match time to minutes
const matchTimeInMinutes = matchHours * 60 + matchMinutes;

// Check if the current date is today and the current time is before the match time
const isTodayBeforeMatchTime = currentDate.toDateString() === matchDate.toDateString() && currentTime < matchTimeInMinutes; 
      console.log(currentDate)
      if (isMatchCompleted && isTodayBeforeMatchTime ) {
        return (
          <Matches
            key={match.matchID}
            data={match}
            id={match.matchID}
            status={match.status}
            className="h-auto py-2 w-full sm:w-[calc(60%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
          />
        );
      } else {
        // Render nothing if the match is not yet completed
        return null;
      }
    })}
            </div>
          </div>
          <div className="my-4">
            <motion.div>
              <div className="w-14 h-14 my-2 bg-slate-300 flex justify-center items-center rounded-full px-2">
                <div className="w-12 h-12 bg-slate-200 flex justify-center items-center rounded-full px-2">
                  <MdLeaderboard size={28} color="blue" />
                </div>
              </div>
              <h5 className="text-[#6b042c] text-left font-semibold">Check out</h5>
              <h3 className={`${styles.sectionHeadText} text-left mb-5`}>LeaderBoard</h3>
              { /*prettier-ignore  */}
              <p className={` text-xl font-medium"`}>
                Keep an eye on the <motion.b  className="text-[#000000]">leaderboard </motion.b>
                to see how you stack up against other players. The more accurate
                your predictions, the higher you'll climb!
              </p>
            </motion.div>
          </div>
          <div className="my-5">
            <motion.div>
              {/* {<div className="w-14 h-14 my-2 bg-slate-300 flex justify-center items-center rounded-full p-2">
                <div className="w-12 h-12 border-2 border-slate-200 flex justify-center items-center rounded-full p-[2px]">
                  <img src={images.start} alt="start" className="w-auto" />
                </div>
              </div>} */}
              <h3
                className={`${styles.sectionHeadText} flex flex-row gap-x-2 items-center`}
              >
                Get started <MdNotStarted color="#2b072e" />
              </h3>
              <div className="flex flex-row justify-evenly">
                <div className="w-[50%]">
                  <p className={` text-xl text-start  py-4`}>
                    Register to start predicting matches and earning points. The
                    more you play, the more chances you have to win exciting
                    rewards!
                  </p>
                </div>
                <div className="w-[50%] text-xl gap-y-2 font-medium flex flex-col justify-center items-center">
                  <a
                    href="/userinfo"
                    className="bg-brown p-2 rounded-md w-[50%]"
                  >
                    <button className=" text-secondary  hover:text-white">
                      SIGN IN
                    </button>
                  </a>
                  <a
                    href="/userinfo"
                    className="bg-brown p-2 rounded-md w-[50%]"
                  >
                    <button className=" text-secondary  hover:text-white">
                      Register
                    </button>
                  </a>
                  <p></p>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div className="w-full">
            <div className="flex flex-row justify-evenly items-center">
              <p className="font-bold text-2xl">Number of players waiting</p>
              <p className="text-2xl font-bold bg-brown text-secondary p-5 rounded-md animate-pulse">
                {dataa?.total_users}
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SectionWrapper(Intro, "intro");