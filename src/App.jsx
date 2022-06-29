
import "./app.css"
import { Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"

// _____ Components ___________________________
import Navbar from "./components/Navbar";
import Market from "./components/Market";
import Searchbar from "./components/Searchbar";
import Dashboard from "./components/Dashboard";
import Activity from "./components/Activity";
import MyWallet from "./components/MyWallet";
import Bundles from "./components/Bundles";
// Add different styles, to choose. (Dark mode, paralex effect mode, 
// visible borders mode, follow mouse movement mode (three.js ?), 
// maybe something with haptic feedback, scrolling sideways?, 
//  )

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  return library
}

function App() {
  return (
    <div id="appComponent">
      <Navbar />
      <main id="main">
        <Searchbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallet" element={<Web3ReactProvider getLibrary={getLibrary}> <MyWallet /></Web3ReactProvider>} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/bundles" element={<Bundles />} />
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
