import React from "react";
// import { SectionWrapper } from "../../hoc";
import { fadeIn } from "../../utils/motion";
import { styles } from "../../styles";
import { motion } from "framer-motion";
import { useState,useEffect } from "react";
import axios from "axios"
// import MainLayout from "../../Components/MainLayout";
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
      className="w-[100%] sm:w-[90%] mx-auto green-pink-gradient p-[1px] rounded-[20px] shadow-card "
    >
      <div className="bg-[#29349e] rounded-[20px] text-black my-2 py-4 bg-opacity-95 px-10 min-h-[90px] flex justify-evenly items-center flex-col">
        <p className="text-lg font-semibold text-start">{title}</p>
      </div>
    </motion.div>
  );
};
const Intro = () => {
  const [data, setData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get('http://127.0.0.1:8000/ipl2/home/');
  //       console.log('Response:', response); // Log entire response object
  //       if (!response.data.success) {
  //         throw new Error('Failed to fetch data');
  //       }
  //       setData(response.data); // Assuming response.data contains the actual data
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  
  //   fetchData();
  // }, []);
  

console.log("data",data)
  const [Breadcrumbsdata, setBreadcrumbsdata] = useState([
    {
      name: "Home",
      link: "/",
    },
  ]);
  const index = 1;
  return (
    // <MainLayout>
      <section className="h-full mx-8">
        <div
          className={`${styles.paddingX}  max-w-7xl mt-20 mb-4 my-0 mx-auto flex flex-col items-start gap-1 `}
        >
          <div className="">
            <h1 className={`${styles.heroHeadText} text-black`}>
              Welcome to <span className="text-[#29349e]">Predictive Play</span>
            </h1>
            <p className={`text-xl mt-2 font-medium`}>
              Predict the outcomes of the matches and earn points to climb the
              leaderboard. Compete with other players and showcase your
              predictive skills!
            </p>
          </div>
          <div className="my-5 ">
            <h2 className={`${styles.sectionHeadText} mb-5`}>
              How it works&nbsp;?
            </h2>
            <div>
              {texts.map((text, index) => (
                <HowItWorks index={index} {...text} />
              ))}
            </div>
          </div>
          <div>
            <motion.div>
              <h3 className={`${styles.sectionHeadText}`}>LeaderBoard</h3>
              <p className={` text-xl font-medium"`}>
                Keep an eye on the leaderboard to see how you stack up against
                other players. The more accurate your predictions, the higher
                you'll climb!
              </p>
            </motion.div>
          </div>
          <div className="my-5">
            <motion.div>
              <h3 className={`${styles.sectionHeadText}`}>Get started</h3>
              <div className="flex flex-row justify-evenly">
                <div className="w-[50%]">
                  <p className={` text-xl text-start  py-4`}>
                    Register to start predicting matches and earning points. The
                    more you play, the more chances you have to win exciting
                    rewards!
                  </p>
                </div>
                <div className="w-[50%] text-xl  font-medium flex flex-col justify-center items-center">
                  <button className="bg-[#29349e]  w-[50%] text-secondary p-2 rounded-md hover:text-white">
                    SIGN IN
                  </button>
                  <button className="bg-[#29349e]  w-[50%] text-secondary p-2 rounded-md hover:text-white">
                    Register
                  </button>
                  <p></p>
                </div>
              </div>
            </motion.div>
          </div>
          <motion.div className="w-full">
            <div className="flex flex-row justify-evenly items-center">
              <p className="font-bold text-2xl">Number of players waiting</p>
              <p className="text-2xl font-bold bg-blue-800 p-5 rounded-md animate-pulse">
                100
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    // </MainLayout>
  );
};

export default Intro;