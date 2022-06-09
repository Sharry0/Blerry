
import "./app.css"
import { Routes, Route } from "react-router-dom";

// _____ Components ___________________________
import Navbar from "./components/Navbar";
import Market from "./components/Market";
import Searchbar from "./components/Searchbar";
import Dashboard from "./components/Dashboard";
import Activity from "./components/Activity";
import MyWallet from "./components/MyWallet";
import Rankings from "./components/Rankings";

// Add different styles, to choose. (Dark mode, paralex effect mode, 
// visible borders mode, follow mouse movement mode (three.js ?), 
// maybe something with haptic feedback, scrolling sideways?, 
//  )

function App() {
  return (
    <div id="appComponent">
      <Navbar />
      <main id="main">
        <Searchbar />
        <Routes>

          <Route path="/" element={<Dashboard />} />
          <Route path="/wallet" element={<MyWallet />} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/market" element={<Market />} />
          <Route />
        </Routes>
        {/* <Rankings /> */}
        {/* <Dashboard /> */}


      </main>
    </div>
  );
}

export default App;
