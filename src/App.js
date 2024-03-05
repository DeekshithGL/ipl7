import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Leaderboard from "./pages/leaderboard/Leaderboard";
// import ProfilePage from "./profile/profilePage";

import FixturePage from "./pages/fixtures/fixturePage";
import PredictMatch from "./pages/fixtures/predict";
import UserSubmission from "./pages/leaderboard/UserSubmission";
// import SliderPages from "./Components/SliderPages";
import Intro from "./pages/Homepage/Intro";
import Authform from "./pages/Authform";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Intro />}></Route> 
          <Route exact path="/user" element={<Authform/>}></Route>
          <Route exact path="/board" element={<Leaderboard />}></Route> 
          <Route exact path="/usersubmission" element={<UserSubmission />}></Route>
          <Route exact path="/fixtures" element={<FixturePage />}></Route>
          <Route
            exact
            path="/fixtures/:matchId"
            element={<PredictMatch />}
          ></Route>
          {/* <Route exact path="/profile" element={<ProfilePage />}></Route>


          
         
          <Route exact path="/images" element={<SliderPages />}></Route> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;