
import "./styles/searchbar.css"
import React, { useState } from 'react'
import axios from "axios"

export default function Searchbar() {
    const [searchInput, setSearchInput] = useState("");

    const handleSearchInput = (evt) => {
        setSearchInput(evt.target.value)
    }

    const handleSearchSubmit = (evt) => {
        evt.preventDefault();
        console.log(searchInput)
        setSearchInput("")
    }

    return (
        <div id='searchComponent' >

            <form onSubmit={handleSearchSubmit}>
                <input type="text" id="searchInput" value={searchInput} onChange={handleSearchInput} />
            </form>


        </div>
    )
}
