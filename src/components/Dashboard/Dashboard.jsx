
import axios from "axios"
import { useState, useEffect } from "react"


export default function Dashboard() {
  
  const [top, setTop] = useState();

  const get = async()=>{
    await axios.get("https://api.cryptoslam.io/v1/collections/top-100?timeRange=week")
      .then(res=> setTop(res.data))
      .catch(err=> console.log(err))
  }

  useEffect(()=>{
    get();
  },[])

  return (
    <div>
      <h1 style={{color: "#aaa"}}>Dashboard on the way...</h1>
    </div>
  )
}

