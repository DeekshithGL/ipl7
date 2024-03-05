import React,{useEffect} from "react";
// import Breadcrumbs from "../../Components/Breadcrumbs";
import { motion } from "framer-motion";
import { useState } from "react";
import "../styles.css";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
// import MainLayout from "../../Components/MainLayout";
import { useQuery } from "@tanstack/react-query";
import { getLeaderBoard } from "../../services/leaderboard";
import toast from "react-hot-toast";
import {useSelector} from 'react-redux'
const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};
const Leaderboard = () => {
  const userState = useSelector((state)=>state.user)
  const [Breadcrumbsdata, setBreadcrumbsdata] = useState([
    {
      name: "Home",
      link: "/",
    },
    {
      name: "Leaderboard",
      link: "/board",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Global");

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
  const [searchQuery, setSearchQuery] = useState("");
   // Add selectedOption as a dependency
  useEffect(() => {
    // Refetch data when selectedOption changes
    refetch();
  }, [selectedOption]);
  const { data, isLoading, isError, error,refetchh } = useQuery({
    queryFn: () => getLeaderBoard({selected_leaderboard:selectedOption}),
    queryKey: ["board"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  const { data1, isLoadingg, isErrorr, errorr,refetch } = useQuery({
    queryFn: () => getLeaderBoard(),
    queryKey: ["board"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
 
  const LeaderboardData = data;
  console.log(LeaderboardData);
console.log(data1);
const jsondata = data;
const user_list = jsondata?.user_list;
console.log(user_list);
  // console.log(jsondata);
  // jsondata.map((item) => console.log(item["fields"].name));
  // const leaderboardData = [
  //   {
  //     rank: 1,
  //     player: "Jean Marc",
  //     level: 100,
  //   },
  //   {
  //     rank: 2,
  //     player: "Marcus coco",
  //     level: 200,
  //   },
  //   {
  //     rank: 3,
  //     player: "Marcus coco",
  //     level: 200,
  //   },
  //   {
  //     rank: 4,
  //     player: "Marcus coco",
  //     level: 200,
  //   },
  //   {
  //     rank: 5,
  //     player: "Marcus coco",
  //     level: 200,
  //   },
  //   {
  //     rank: 6,
  //     player: "Marcus coco",
  //     level: 200,
  //   },
  //   // Add more data as needed
  // ];
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };
  const recordsPerPage = 5;
  

  // Calculate start and end index for pagination
  const startIndex = currentPage * recordsPerPage;
  const endIndex = startIndex + recordsPerPage;
  return (
    // <MainLayout>
      <div className="flex flex-col mt-[100px] min-w-xl overflow-clip">
        {/* <Breadcrumbs
          data={Breadcrumbsdata}
          activeName="Leaderboard"
          className="mt-2"
        /> */}
        <div
          className={`w-full my-0 lg:h-[160px] bg-cover bg-no-repeat border-t-2 md:h-[200px] h-[140px] border-b-2  flex flex-col justify-center items-center`}
        >
          <p className="text-2xl font-bold mt-3 xs:mt-[1px] sm:mt-1 ml-3 lg:text-black lg:text-3xl text-center uppercase">
            Indian priemer Leaugue 2024
          </p>
          <p className="xs:text-sm my-3 mx-3 text-xl text-center  text-[#05b1e6] font-semibold">
            Dive into the pulse-pounding excitement of the IPL!
          </p>
        </div>
        <div class="container flex flex-col  max-w-3xl px-4 mx-auto sm:px-8">
          <div class="py-2 relative w-full">
            <div className="mx-14">
              <div class="flex flex-row justify-center items-center text-center w-full mb-1 mt-4 sm:mb-0">
                <h2 class="text-2xl uppercase font-bold text-tertiary">
                  Leader Board
                </h2>
              </div>
              <div className="flex flex-row justify-between mt-6 mx-2">
                <div className="flex justify-start">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Search player name..."
                    className="mb-2 px-[1px] text-[14px] sm:w-[160px] xs:w-[80px] md:w-28  lg:w-40 py-2 border-[2px]  placeholder:text-center border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="absolute lg:right-[-47px] right-[-10px] xs:ml-[270px] sm:ml-[290px]  md:ml-[290px] top-[68px] xs:py-0 py-5 mr-0 flex justify-between items-center">
                  <motion.nav
                    initial={false}
                    animate={isOpen ? "open" : "closed"}
                    className="menu"
                    onHoverStart={() => setIsOpen(true)}
                    onHoverEnd={() => setIsOpen(false)}
                  >
                    <motion.button
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setIsOpen(!isOpen)}
                      className="text-black border-2"
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
                        onClick={() => handleItemClick("Global")}
                        className="cursor-pointer font-medium text-md hover:text-gray-400 hover:animate-pulse"
                      >
                        Global{" "}
                      </motion.li>
                      <motion.li
                        variants={itemVariants}
                        onClick={() => handleItemClick("Weekly")}
                        className="cursor-pointer font-medium text-md hover:text-gray-400 hover:animate-pulse"
                      >
                        Weekly{" "}
                      </motion.li>
                    </motion.ul>
                  </motion.nav>
                </div>
              </div>
            </div>

            <div class="flex justify-center items-center py-4 w-90 mt-1  mx-0 px-0">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="cursor-pointer mx-4 my-auto rounded-full bg-black/10 p-2 w-[48px] animate-pulse"
              >
                <FaArrowLeft color="gray" />
              </button>
              <div class="flex items-center border-2 w-screen border-gray-200 shadow-2xl shadow-black overflow-auto scrollbar-hide rounded-lg">
                <table class=" lg:min-w-4xl w-[500px] leading-normal">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="lg:px-9 px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Rank
                      </th>
                      <th
                        scope="col"
                        class="lg:px-9 px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        User
                      </th>
                      <th
                        scope="col"
                        class="lg:px-9 px-5 py-3 text-sm font-semibold text-center text-gray-800 uppercase bg-white border-b border-gray-200"
                      >
                        Score
                      </th>
                    </tr>
                  </thead>

                  <tbody className=" p-7">
                    {user_list && user_list
                      .map((record, index) => (
                        <tr className="" key={index}>
                          <td class="px-5 py-8 text-sm bg-white border-b flex items-center justify-center h-auto border-gray-200">
                            <div class=" w-8 h-8  text-center flex justify-center items-center text-black rounded-md whitespace-no-wrap">
                              <p>{record.rank}</p>
                            </div>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <div class="flex justify-center items-center">
                              <div class="ml-3">
                                <p class="text-gray-900 whitespace-no-wrap">
                                  {record.username}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td class="px-5 py-5 text-sm bg-white border-b border-gray-200">
                            <p class="text-gray-900 whitespace-no-wrap flex flex-row justify-center items-center">
                              {selectedOption === "Weekly" ? record.score2 : record.score1}
                              <span>
                                <p></p>
                              </span>
                            </p>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <button
                onClick={handleNextPage}

                className="cursor-pointer mx-4 my-auto rounded-full bg-black/10 p-2 w-[48px] animate-pulse"
              >
                <FaArrowRight color="gray" />
              </button>
            </div>
          </div>
        </div>
        ;
      </div>
    // </MainLayout>
  );
};

export default Leaderboard;