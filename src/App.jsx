
import "./app.css"
import { Routes, Route } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core"
import { Web3Provider } from "@ethersproject/providers"

// _____ Components ___________________________
import Navbar from "./components/Navbar/Navbar";
import Market from "./components/Market/Market";
import Dashboard from "./components/Dashboard/Dashboard";
import Activity from "./components/Activity/Activity";
import MyWallet from "./components/MyWallet/MyWallet";
import Bundles from "./components/Bundles/Bundles";

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  return library
}

function App() {
  return (
    <div id="appComponent">
      <Navbar />
      <main id="main">
        {/* <Searchbar /> */}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/wallet" element={<Web3ReactProvider getLibrary={getLibrary}> <MyWallet /></Web3ReactProvider>} />
          <Route path="/activity" element={<Activity />} />
          <Route path="/bundles" element={<Bundles />} />
          <Route path="/market" element={<Market />} />
          <Route />
        </Routes>
      </main>
    </div>
  );
}

export default App;
