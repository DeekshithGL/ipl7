import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
// import Headers from "../../headers/header";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn, slideIn, zoomIn } from "../../utils/motion";
 import { SectionWrapper } from "../../hoc";
 import { useSelector } from "react-redux";
// import CTA from "../../Components/CTA";
import { images } from "../../constants";
import toast from "react-hot-toast";
import MainLayout from "../../Components/MainLayout";
import { predictMatch } from "../../services/fixtures";
import { useQuery } from "@tanstack/react-query";
import { getMatchDetails } from "../../services/fixtures";
import {teams} from "../../constants";
import { getMatchDetailss } from "../../services/fixtures";
const PredictMatch = () => {
  const userState = useSelector((state)=>state.user)
  const [completed, isCompleted] = useState(false);
  const [current,setCurrent] = useState(false);



  
  const { matchId } = useParams();
  const parsedMatchId = parseInt(matchId);
  console.log(parsedMatchId);

  const [Breadcrumbsdata, setBreadcrumbsdata] = useState([
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Fixtures",
      link: "/fixtures",
    },
    {
      name: "1",
      link: `/${matchId}/`,
    },
  ]);
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
  const teamColors = {
    "Chennai Super Kings": "yellow", // Yellow
    "Delhi Capitals": "#136EA4", // Blue
    "Kolkata Knight Riders": "#3A225D", // Purple
    "Mumbai Indians": "#005DA0", // Blue
    "Punjab Kings": "#E41E26", // Red
    "Rajasthan Royals": "#2D3E8B", // Blue
    "Royal Challengers Bangalore": "#000000", // Black
    "Sunrisers Hyderabad": "#FF822A", // Orange
    "Lucknow Super Giants": "#000080", // Navy
    "Gujarat Titans": "#008000", // Green
  };


 
  const { data, isSuccess, isLoading: isLoading1, isError, refetch } = useQuery({
    queryFn: () => {
      // if (status === '0') {
        return getMatchDetails(parsedMatchId);
      // } else {
      //   return getMatchDetailss(parsedMatchId);
      // }
    },
    onError: (error) => console.log(error),
    queryKey: ["match", parsedMatchId],
  });
  useEffect(() => {
    refetch();
  }, []);
  useEffect(() => {
    if(data?.match_status === 1){
      isCompleted(true)
    } else {
      isCompleted(false)
    }
  }, [isLoading1,data]);
  console.log(data?.match_status)
  console.log(completed)

   
  console.log(data ? data : null)
  console.log(data ? data["players"] : null);
  const playerss = data ? data["players"] : null;
  const team_a = data ? data["team_A"] : null;
  const team_b = data ? data["team_B"] : null;
  const batters = data ? data["batsmen"] : null;
  const bowlers = data ? data["bowlers"] : null;
  console.log(team_a)
  const teamByName = teams[team_a?.teamshortform?.toLowerCase()]
  console.log(teamByName);
  const teamBByName = teams[team_b?.teamshortform?.toLowerCase()]
  console.log(teamBByName);

  console.log(playerss)
  const currentDate = new Date();

  const matchTimeParts = data ? data?.match_time?.split(":") : null; // Split match time into hours and minutes
  const matchHours = matchTimeParts ? parseInt(matchTimeParts[0], 10) : 0; // Check if matchTimeParts is not null
  const matchMinutes = matchTimeParts ? parseInt(matchTimeParts[1], 10) : 0; 
  const matchTime = matchTimeParts ? new Date(currentDate).setHours(matchHours, matchMinutes, 0, 0) : 0; 

  const currentTime = currentDate.getTime();
  console.log(currentTime);
  
  
  // Compare current time with match time and check if it's before 12 AM
  if (currentTime > matchTime && currentTime < new Date(currentDate).setHours(0, 0, 0, 0)) {
   setCurrent(true)
  }
  
  console.log(current);
  
  const { mutate, isLoading: isLoading2 } = useMutation({
    mutationFn: ({
      predicted_winner_team,
      predicted_player_of_the_match,
      predicted_most_runs_scorer,
      predicted_most_wicket_taker,
      username,
      match_id
    }) => {
      return predictMatch({
        predicted_winner_team,
        predicted_player_of_the_match,
        predicted_most_runs_scorer,
        predicted_most_wicket_taker,
        username,
        match_id
      });
    },
    onSuccess: (data) => {
      toast.success("Success");
    },
    onError: (error) => {
      console.log(error.message);
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      team: "",
      player: "",
      runs: "",
      wickets: "",
      username: userState?.userInfo?.user?.username
    },
    mode: "onChange",
  });
  const submitHandler = async (data) => {
    if(userState?.userInfo){
    try {
      mutate({
        predicted_winner_team: data.team,
        predicted_player_of_the_match: data.player,
        predicted_most_runs_scorer: data.runs,
        predicted_most_wicket_taker: data.wickets,
        username: userState.userInfo.user.username,
        match_id: matchId,
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    window.alert("You must be logged in")
  }
  };

  return (
    <MainLayout>
      <section className="h-full ">
        <div className="flex flex-col mt-[160px] justify-center items-center md:w-full lg:w-full xs:w-[90%]  overflow-hidden ">
          <div className="w-full flex justify-center items-center text-2xl mt-3 font-semibold ">
            <motion.div
              variants={slideIn("left", "spring", 0.4, 2)}
              className="flex flex-col justify-end items-center mx-4 gap-x-3 h-32"
            >
              <img
                src={teamImages[team_a?.teamname]}
                alt=""
                className="w-[110px] h-auto my-2"
              />
              <p className={`text-lg text-[${teamColors[team_a?.teamname]}]`}>
                &nbsp;{team_a?.teamname}
              </p>
            </motion.div>
            <motion.p variants={zoomIn(0.4, 1)} className="text-purple-950">
              &nbsp;vs&nbsp;
            </motion.p>
            <motion.div
              variants={slideIn("right", "spring", 0.4, 2)}
              className="flex flex-col justify-end items-center mx-4 gap-x-3 h-32"
            >
              <img
                src={teamImages[team_b?.teamname]}
                alt=""
                className={`${team_b?.teamname === 'Royal Challengers Bangalore' ? "w-[50px]" : "w-[110px]"} h-auto my-2`}
              />
              <p className={`text-lg text-${teamColors[team_b?.teamname]}-600`}>
                &nbsp;{team_b?.teamname}
              </p>
            </motion.div>
          </div>
          
          {!current? <div className="h-fit flex flex-col justify-center items-center  max-w-4xl w-[500px]  rounded-lg  m-5">
            <motion.p
              variants={zoomIn(0.4, 1.2)}
              className="text-2xl uppercase font-bold mt-5"
            >
              {!completed ? "Make predictions" : "Results"}
            </motion.p>
            <form
              onSubmit={handleSubmit(submitHandler)}
              className="w-[400px] my-5  p-0 space-y-6 mx-auto"
            >
              <div>
                <label className="flex flex-row">
                  <span className="font-semibold w-full">Team</span>
                  {!completed ? (
                    <select
                      {...register("team", {
                        required: {
                          value: true,
                          message: completed ? data?.winner_team : "Select team",
                        },
                      })}
                      type="text"
                      name="team"
                      className="form-input border-gray-400 border-2 rounded-md mt-1 block w-full"
                      required
                    >
                      <option value="" disabled>
                        Select Team
                      </option>

                      <option value={team_a?.teamname} className="text-black">
                        {team_a?.teamname}
                      </option>
                      <option value={team_b?.teamname} className="text-black">
                        {team_b?.teamname}
                      </option>
                    </select>
                  ) : (
                    <div className="form-input border-gray-400 border-2 rounded-md mt-1 text-center block w-full">
                      {data?.winner_team}
                    </div>
                  )}
                </label>
              </div>
              {errors.team?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.team?.message}
                </p>
              )}

              <div>
                <label className="flex flex-row">
                  <span className="font-semibold w-full">
                    Player of the match
                  </span>
                  {!completed ? (
                    <select
                      {...register("player", {
                        required: {
                          value: true,
                          message: "Select a player",
                        },
                      })}
                      type="text"
                      name="player"
                      className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                      required
                    >
                      <option value="" disabled>
                        Select Player
                      </option>

                      {playerss?.map((player, index) => (
                        <option value={player?.name}>{player?.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="form-input border-gray-400 border-2 rounded-md mt-1 text-center block w-full">
                      {data?.player_of_match}
                    </div>
                  )}
                </label>
              </div>
              {errors.player?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.player?.message}
                </p>
              )}
              <div>
              <label className="flex flex-row">
                  <span className="font-semibold w-full">
                    Most runs scorer
                  </span>
                  {!completed ? (
                    <select
                      {...register("runs", {
                        required: {
                          value: true,
                          message: "Select a player",
                        },
                      })}
                      type="text"
                      name="runs"
                      className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                      required
                    >
                      <option value="" disabled>
                        Select batsman
                      </option>

                      {batters?.map((batter, index) => (
                        <option value={batter?.name}>{batter?.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="form-input border-gray-400 border-2 rounded-md mt-1 text-center block w-full">
                      {data?.most_runs_player}
                    </div>
                  )}
                </label>
              </div>
              {errors.runs?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.runs?.message}
                </p>
              )}
              <div>
              <label className="flex flex-row">
                  <span className="font-semibold w-full">
                   Most wickets taker
                  </span>
                  {!completed ? (
                    <select
                      {...register("wickets", {
                        required: {
                          value: true,
                          message: "Select a player",
                        },
                      })}
                      type="text"
                      name="wickets"
                      className="form-input border-gray-400 border-2 rounded-md  mt-1 block w-full"
                      required
                    >
                      <option value="" disabled>
                        Select bowler
                      </option>

                      {bowlers?.map((player, index) => (
                        <option value={player?.name}>{player?.name}</option>
                      ))}
                    </select>
                  ) : (
                    <div className="form-input border-gray-400 border-2 rounded-md mt-1 text-center block w-full">
                      {data?.most_wickets_taker}
                    </div>
                  )}
                </label>
              </div>
              {errors.wickets?.message && (
                <p className="ml-3 mt-1 text-xs font-semibold text-red-500">
                  {errors.wickets?.message}
                </p>
              )}

              <div className="flex flex-row my-auto">
                {!completed && (
                  <button
                    type="submit"
                    disabled={isLoading1}
                    className="bg-[#29349e] hover:bg-[#10185c] flex mt-10 text-white font-semibold py-2 px-4 rounded-md mx-auto items-center"
                  >
                    {isLoading1 ? "Adding..." : "Predict"}
                  </button>
                )}
              </div>
            </form>
          </div> : <div></div>}
          <div className="mt-5 flex flex-col gap-y-4 ">
            <div className="bg-[#eeedf0]   shadow-lg p-3 rounded-md">
              <p className="text-left font-semibold my-2 text-xl">
                 {team_a?.teamshortform} Current squad
              </p>
              <div className="text-lg">
                <b>Wicketkeepers:</b>&nbsp;{teamByName?.Wicketkeepers}
                <p>
                  <b>Batters:</b>&nbsp;{teamByName?.Batters}
                </p>{" "}
                <p>
                  <b>All-rounders:</b>&nbsp;{teamByName?.Allrounders}
                </p>{" "}
                <p>
                  <b>Bowlers:</b>&nbsp;{teamByName?.Bowlers}
                </p>
              </div> 
            </div>
            <div className=" p-3 rounded-md bg-[#eeedf0]   shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]">
              <p className="text-left font-semibold my-2 text-xl">
                {team_b?.teamshortform} Current squad
              </p>
              <div className="text-lg">
                <b>Wicketkeepers:</b>&nbsp;{teamBByName?.Wicketkeepers}
                <p>
                  <b>Batters:</b>&nbsp;{teamBByName?.Batters}
                </p>{" "}
                <p>
                  <b>All-rounders:</b>&nbsp;{teamBByName?.Allrounders}
                </p>{" "}
                <p>
                  <b>Bowlers:</b>&nbsp;{teamBByName?.Bowlers}
                </p>
              </div> 
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default SectionWrapper(PredictMatch,"PredictMatch");