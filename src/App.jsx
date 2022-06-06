
import "./app.css"
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";
import Dashboard from "./components/Dashboard";
import Activity from "./components/Activity";
import Rankings from "./components/Rankings";

function App() {
  return (
    <div id="appComponent">
      <Navbar />
      <main id="main">
        <Searchbar />
        <Activity />
        {/* <Rankings /> */}
        {/* <Dashboard /> */}


      </main>
    </div>
  );
}

export default App;
