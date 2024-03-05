import React from "react";
// import Breadcrumbs from "../../Components/Breadcrumbs";
import { useState } from "react";
// import Headers from "../../headers/header";
import Matches from "./matches";
// import { SectionWrapper } from "../../hoc";
import { getFixtures } from "../../services/fixtures";
// import MainLayout from "../../Components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
const FixturePage = () => {
  const [Breadcrumbsdata, setBreadcrumbsdata] = useState([
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Fixtures",
      link: "/fixtures",
    },
  ]);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getFixtures({}),
    queryKey: ["board"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  console.log(data);
  const matchData = [
    {
      matchID: 1,
      matchdate: "2024-04-01",
      matchtime: "19:30:00",
      teamA: "Mumbai Indians",
      teamAno: 1,
      teamB: "Chennai Super Kings",
      teamBno: 2,
      status: 1,
      winnerteam: "Mumbai Indians",
      winnerteamno: 1,
      playerofmatch: "Rohit Sharma",
      playerofmatchID: 2,
      mostrunsplayer: "Suryakumar Yadav",
      mostrunsplayerID: 3,
      mostwickettaker: "Jasprit Bumrah",
      mostwickettakerID: 4,
      location: "Wankhade",
    },
    {
      matchID: 2,
      matchdate: "2024-04-02",
      matchtime: "19:30:00",
      teamA: "Royal Challengers Bangalore",
      teamAno: 3,
      teamB: "Delhi Capitals",
      teamBno: 4,
      status: 1,
      winnerteam: "Delhi Capitals",
      winnerteamno: 4,
      playerofmatch: "Shreyas Iyer",
      playerofmatchID: 5,
      mostrunsplayer: "Prithvi Shaw",
      mostrunsplayerID: 6,
      mostwickettaker: "Ravichandran Ashwin",
      mostwickettakerID: 7,
      location: "Chinnaswamy stadium",
    },
    {
      matchID: 3,
      matchdate: "2024-04-03",
      matchtime: "19:30:00",
      teamA: "Kolkata Knight Riders",
      teamAno: 5,
      teamB: "Sunrisers Hyderabad",
      teamBno: 6,
      status: 0,
      winnerteam: null,
      winnerteamno: 0,
      playerofmatch: null,
      playerofmatchID: 1,
      mostrunsplayer: null,
      mostrunsplayerID: 1,
      mostwickettaker: null,
      mostwickettakerID: 1,
      location: "Eden gardens",
    },
    {
      matchID: 4,
      matchdate: "2024-04-04",
      matchtime: "19:30:00",
      teamA: "Rajasthan Royals",
      teamAno: 7,
      teamB: "Punjab Kings",
      teamBno: 8,
      status: 0,
      winnerteam: null,
      winnerteamno: 0,
      playerofmatch: null,
      playerofmatchID: 1,
      mostrunsplayer: null,
      mostrunsplayerID: 1,
      mostwickettaker: null,
      mostwickettakerID: 1,
      location: "Mohali",
    },
    {
      matchID: 5,
      matchdate: "2024-04-05",
      matchtime: "19:30:00",
      teamA: "Chennai Super Kings",
      teamAno: 2,
      teamB: "Royal Challengers Bangalore",
      teamBno: 3,
      status: 0,
      winnerteam: null,
      winnerteamno: 0,
      playerofmatch: null,
      playerofmatchID: 1,
      mostrunsplayer: null,
      mostrunsplayerID: 1,
      mostwickettaker: null,
      mostwickettakerID: 1,
      location: "Chepauk",
    },
  ];

  return (
    // <MainLayout>
      <section className={`lg:h-screen h-full  mt-[104px]`}>
        {/* <Breadcrumbs data={Breadcrumbsdata} activeName="Fixtures" /> */}
        <div className="container mx-auto">
          <div className="flex flex-col ml-5">
            <div>
              <h2 className="text-3xl uppercase font-bold my-2">
                IPL Predictions
              </h2>
            </div>
            <div>
              <p className="text-xl text-[#2b072e] font-semibold">
                Get ready to predict the winners and score big prizes with our
                IPL prediction game! Check out the upcoming fixtures and make
                your predictions now!
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-y-9 mt-5 pb-10 mx-5 gap-x-3 md:gap-x-5">
            {matchData.map((match, index) => (
              <Matches
                data={match}
                className="h-auto py-2 w-full sm:w-[calc(60%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
              />
            ))}
          </div>
        </div>
      </section>
    // </MainLayout>
  );
};

export default FixturePage;