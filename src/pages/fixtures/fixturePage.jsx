import React, { useEffect } from "react";
import Breadcrumbs from "../../Components/Breadcrumbs";
import { useState } from "react";
import Headers from "../../headers/header";
import Matches from "./matches";
import { SectionWrapper } from "../../hoc";
import { getFixtures } from "../../services/fixtures";
import MainLayout from "../../Components/MainLayout";
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
  const { data, isLoading, isError, error,refetch } = useQuery({
    queryFn: () => getFixtures({}),
    queryKey: ["board"],
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
  });
  useEffect(()=>{
  refetch()
},[])
  console.log(data?.match_list);
  const jsondata = data ? data.match_list : null;
  console.log(jsondata)
// Map over the array of objects and extract the "fields" and "pk" fields
// const array = jsondata?.map((item) => ({
//   fields: item.fields,
//   pk: item.pk,
// }));
// console.log(array);
  

  return (
    <MainLayout>
      <section className={`lg:h-screen h-full  mt-[104px]`}>
         <Breadcrumbs data={Breadcrumbsdata} activeName="Fixtures" /> 
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
            {jsondata && jsondata.map((match, index) => (
              <Matches
                data={match}
                id={match.matchID}
                status={match.status}
                className="h-auto px-5 py-2 w-full sm:w-[calc(60%)] md:w-[calc(50%-20px)] lg:w-[calc(33.33%-20px)]"
              />
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FixturePage;