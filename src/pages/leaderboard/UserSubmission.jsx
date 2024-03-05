import React from "react";
// import { images } from "../../constants";
// import Headers from "../../headers/header";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import "../styles.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { getUserSubmission } from "../../services/leaderboard";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const UserSubmission = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Default");

  const handleItemClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close the menu after selection, if desired
  };
  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const { data, isLoading, isError, error } = useQuery({
    queryFn: () => getUserSubmission({}),
    queryKey: ["board"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  console.log(data);
  const UserData = [
    {
      matchID: "1",
      matchBetween: "Mumbai Indians vs Chennai Super Kings",
      predictedTeam: "Mumbai Indians",
      pom: "Rohit Sharma",
      mostRuns: "Suryakumar Yadav",
      stats: "Win",
      mostWickets: "Jasprit Bumrah",
    },
    {
      matchID: "2",
      matchBetween: "Royal Challengers Bangalore vs Kolkata Knight Riders",
      predictedTeam: "Royal Challengers Bangalore",
      pom: "Virat Kohli",
      mostRuns: "Glenn Maxwell",
      stats: "Win",
      mostWickets: "Yuzvendra Chahal",
    },
    {
      matchID: "3",
      matchBetween: "Delhi Capitals vs Punjab Kings",
      predictedTeam: "Delhi Capitals",
      pom: "Rishabh Pant",
      mostRuns: "Shikhar Dhawan",
      stats: "Win",
      mostWickets: "Kagiso Rabada",
    },
    {
      matchID: "4",
      matchBetween: "Rajasthan Royals vs Sunrisers Hyderabad",
      predictedTeam: "Rajasthan Royals",
      pom: "Sanju Samson",
      mostRuns: "Sanju Samson",
      stats: "Win",
      mostWickets: "Chris Morris",
    },
    {
      matchID: "5",
      matchBetween: "Chennai Super Kings vs Kolkata Knight Riders",
      predictedTeam: "Chennai Super Kings",
      pom: "Ravindra Jadeja",
      mostRuns: "Faf du Plessis",
      stats: "Lost",
      mostWickets: "Deepak Chahar",
    },
    {
      matchID: "6",
      matchBetween: "Mumbai Indians vs Delhi Capitals",
      predictedTeam: "Mumbai Indians",
      pom: "Ishan Kishan",
      mostRuns: "Ishan Kishan",
      stats: "Lost",
      mostWickets: "Trent Boult",
    },
    {
      matchID: "7",
      matchBetween: "Punjab Kings vs Royal Challengers Bangalore",
      predictedTeam: "Royal Challengers Bangalore",
      pom: "AB de Villiers",
      mostRuns: "KL Rahul",
      stats: "Win",
      mostWickets: "Harshal Patel",
    },
    {
      matchID: "8",
      matchBetween: "Sunrisers Hyderabad vs Rajasthan Royals",
      predictedTeam: "Sunrisers Hyderabad",
      pom: "David Warner",
      mostRuns: "David Warner",
      stats: "Lost",
      mostWickets: "Rashid Khan",
    },
    {
      matchID: "9",
      matchBetween: "Kolkata Knight Riders vs Delhi Capitals",
      predictedTeam: "Delhi Capitals",
      pom: "Kagiso Rabada",
      mostRuns: "Prithvi Shaw",
      stats: "Win",
      mostWickets: "Kagiso Rabada",
    },
    {
      matchID: "10",
      matchBetween: "Chennai Super Kings vs Mumbai Indians",
      predictedTeam: "Chennai Super Kings",
      pom: "MS Dhoni",
      mostRuns: "Ambati Rayudu",
      stats: "Win",
      mostWickets: "Shardul Thakur",
    },
  ];

  const recordsPerPage = 5;
  const filteredData =
    selectedOption === "Top 10"
      ? UserData.slice(0, 3)
      : selectedOption === "Correct"
      ? UserData.filter((record) => record.stats === "Win")
      : UserData;
  // Calculate start and end index for pagination

  const startIndex = currentPage * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  return (
    <>
      <div className="flex flex-col my-auto mt-[100px]">
        {/* <Headers /> */}
        <div
          className={`w-full lg:h-[160px] md:h-[200px] h-[160px]  flex flex-col justify-center items-center"`}
        >
          <p className="text-2xl font-bold mt-3 xs:mt-[1px] sm:mt-1 ml-3 lg:text-black lg:text-3xl text-center uppercase">
            Indian priemer Leaugue 2024
          </p>
          <p className="xs:text-sm m-3 text-xl text-center  text-[#05b1e6] font-semibold">
            Dive into the pulse-pounding excitement of the IPL!
          </p>
        </div>
        <div class="container max-w-6xl px-4 mx-auto sm:px-8">
          <div class="py-8 relative">
            <div class="flex flex-row justify-start items-center text-center w-full mb-1 sm:mb-0">
              <h2 class="text-xl uppercase ml-2 font-bold">User Submissions</h2>
            </div>
            <div className="absolute lg:right-[-47px] right-[-87px] xs:ml-[290px] sm:ml-[290px]  md:ml-[290px] top-0 py-8 mr-0 flex justify-between items-center">
              <motion.nav
                initial={false}
                animate={isOpen ? "open" : "closed"}
                onHoverStart={() => setIsOpen(true)}
                onHoverEnd={() => setIsOpen(false)}
                className="menu"
              >
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setIsOpen(!isOpen)}
                  className="text-black"
                >
                  <p className="text-black  text-[18px] rounded-md px-3 flex flex-row">
                    {selectedOption}{" "}
                    <span>
                      <IoMdArrowDropdown className="my-[1px]" size={20} />
                    </span>
                  </p>
                  <motion.div
                    variants={{
                      open: { rotate: 180 },
                      closed: { rotate: 0 },
                    }}
                    transition={{ duration: 0.2 }}
                    style={{ originY: 0.55 }}
                  ></motion.div>
                </motion.button>
                <motion.ul
                  variants={{
                    open: {
                      clipPath: "inset(0% 0% 0% 0% round 10px)",
                      transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.7,
                        delayChildren: 0.3,
                        staggerChildren: 0.05,
                      },
                    },
                    closed: {
                      clipPath: "inset(10% 50% 90% 50% round 10px)",
                      transition: {
                        type: "spring",
                        bounce: 0,
                        duration: 0.3,
                      },
                    },
                  }}
                  className="bg-black/60 text-white py-3  w-[110px] flex justify-center items-center right-0 ml-[2.8rem]"
                  style={{
                    pointerEvents: isOpen ? "auto " : "none",
                    filter: "drop-shadow(1px 1px 1px #000000)",
                  }}
                >
                  <motion.li
                    variants={itemVariants}
                    onClick={() => handleItemClick("Top 10")}
                    className="cursor-pointer font-medium text-md hover:text-gray-400 hover:animate-pulse"
                  >
                    Top 3{" "}
                  </motion.li>
                  <motion.li
                    variants={itemVariants}
                    onClick={() => handleItemClick("Correct")}
                    className="cursor-pointer font-medium text-md hover:text-gray-400 hover:animate-pulse"
                  >
                    Correct
                  </motion.li>
                  <motion.li
                    variants={itemVariants}
                    onClick={() => handleItemClick("Default")}
                    className="cursor-pointer font-medium text-md hover:text-gray-400 hover:animate-pulse"
                  >
                    Default
                  </motion.li>
                </motion.ul>
              </motion.nav>
            </div>

            <div class="flex justify-center items-center py-4 w-90 mt-7  mx-0 px-0">
              <div class="flex items-center border-2 border-gray-200 shadow-2xl shadow-black overflow-auto scrollbar-hide rounded-lg">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 0}
                  className="cursor-pointer my-auto rounded-full bg-black/10 p-2 w-[55px] animate-pulse"
                >
                  <FaArrowLeft color="black" />
                </button>
                <table class="min-w-2xl lg:min-w-4xl  leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Match ID
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Match
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Predicted team
                      </th>

                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Player of the match
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Most runs
                      </th>
                      <th
                        scope="col"
                        class="px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Most wickets
                      </th>
                    </tr>
                  </thead>

                  <tbody className="w-full ">
                    {filteredData
                      .slice(startIndex, endIndex)
                      .map((record, index) => (
                        <tr
                          className={`${
                            record.stats === "Win"
                              ? "text-green-500"
                              : "text-red-500"
                          } hover:bg-black/50 hover:cursor-pointer`}
                        >
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span
                              class={`${
                                record.stats === "Win"
                                  ? "text-green-900"
                                  : "text-red-700"
                              } relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={`${
                                  record.stats === "Win"
                                    ? "bg-green-200"
                                    : "bg-red-200"
                                } absolute inset-0 bg-green-200 rounded-full opacity-50`}
                              ></span>
                              <span class="relative">{record.matchID}</span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div class="flex justify-center items-center">
                              <div class="ml-3">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  {record.matchBetween}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap flex flex-row justify-center items-center">
                              {record.predictedTeam}
                              <span>
                                <p></p>
                              </span>
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap text-center flex flex-row justify-center items-center">
                              {record.pom}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap text-center flex flex-row justify-center items-center">
                              {record.mostRuns}
                            </p>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap text-center flex flex-row justify-center items-center">
                              {record.mostWickets}
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <button
                  onClick={handleNextPage}
                  disabled={endIndex >= UserData.length}
                  className="cursor-pointer my-auto rounded-full bg-black/10 p-2 w-[55px] animate-pulse"
                >
                  <FaArrowRight color="black" />
                </button>
              </div>
            </div>
          </div>
        </div>
        ;
      </div>
    </>
  );
};

export default UserSubmission;