import React, { useEffect } from "react";
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
import { useSelector } from "react-redux";
import MainLayout from "../../Components/MainLayout";
const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const UserSubmission = () => {
  const userState = useSelector((state)=>state.user)
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
  const { data, isLoading, isError, error,refetch } = useQuery({
    queryFn: () => getUserSubmission({username:userState?.userInfo?.user?.username}),
    queryKey: ["usersubmissions"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  useEffect(()=>{
    refetch()
  },[isLoading])
  console.log(userState.userInfo.username)
  console.log(data?.submissions);
  const jsondata = data?.submissions;

  
  const recordsPerPage = 5;
  // const filteredData =
  //   selectedOption === "Top 5"
  //     ? UserData.slice(0, 3)
  //     : selectedOption === "Correct"
  //     ? UserData.filter((record) => record.stats === "Win")
  //     : UserData;
  // Calculate start and end index for pagination

  const startIndex = currentPage * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  return (
    <MainLayout>
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
            

            <div class="flex justify-center items-center py-4 w-90 mt-7  mx-0 px-0">
              <div class="flex items-center border-2 border-gray-200 shadow-2xl shadow-black scrollbar-hide rounded-lg">
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
                    {jsondata?.slice(startIndex, endIndex)
                      .map((record, index) => (
                        <tr
                          className={` hover:bg-black/50 hover:cursor-pointer`}
                        >
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <span
                              class={` relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={` absolute inset-0  rounded-full opacity-50`}
                              ></span>
                              <span class="relative">{record.smatchID}</span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div class="flex justify-center items-center">
                              <div class="ml-3">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  {record.match_teamA} vs {record.match_teamB}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span
                              class={`${
                                record.predictedteam === record.winner_team
                                  ? "text-green-900"
                                  : record.winner_team === null ? "text-black" : "text-red-700"
                              } relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={`${
                                  record.predictedteam === record.winner_team
                                  ? "bg-green-200"
                                  : record.winner_team === null ? "bg-white" : "bg-red-200"
                                } absolute inset-0 bg-green-200 rounded-full opacity-50`}
                              ></span>
                              <span class="relative">{record.predictedteam}</span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span
                              class={`${
                                record.predictedpom === record.playerofmatch
                                ? "text-green-900"
                                : record.playerofmatch === null ? "text-black" : "text-red-700"
                              } relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={`${
                                  record.predictedpom === record.playerofmatch
                                    ? "bg-green-200"
                                    : record.playerofmatch === null ? "bg-white" : "bg-red-200"
                                } absolute inset-0 bg-green-200 rounded-full opacity-50`}
                              ></span>
                              <span class="relative">{record.predictedpom}</span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span
                              class={`${
                                record.predictedmr === record.mostrunsplayer
                                  ? "text-green-900"
                                  : record.mostrunsplayer !== null ? "text-red-700" : "text-black"
                              } relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={`${
                                  record.predictedmr === record.mostrunsplayer
                                  ? "bg-green-200"
                                  : record.mostrunsplayer === null ? "bg-white" : "bg-red-200"
                                } absolute inset-0 bg-green-200 rounded-full opacity-50`}
                              ></span>
                              <span class="relative">{record.predictedmr}</span>
                            </span>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                          <span
                              class={`${
                                record.predictedmwk === record.mostwickettaker
                                ? "text-green-700"
                                : record.mostwickettaker === null ? "text-black" : "text-red-700"
                              } relative inline-block px-5 py-1 font-semibold leading-tight`}
                            >
                              <span
                                aria-hidden="true"
                                class={`${
                                  record.predictedmwk === record.mostwickettaker
                                ? "bg-green-200"
                                : record.mostwickettaker === null ? "bg-white" : "bg-red-200"
                                } absolute inset-0 bg-green-200 rounded-full opacity-50`}
                              ></span>
                              <span class="relative">{record.predictedmwk}</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <button
                  onClick={handleNextPage}
                  disabled={endIndex >= jsondata?.length}
                  className="cursor-pointer my-auto rounded-full bg-black/10 p-2 w-[55px] animate-pulse"
                >
                  <FaArrowRight color="black" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </MainLayout>
  );
};

export default UserSubmission;