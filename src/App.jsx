
import "./app.css"
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar";

function App() {
  return (
    <div id="appComponent">
      <Navbar />
      <main id="main">
        <Searchbar />
        
      </main>
    </div>
  );
}

export default App;
