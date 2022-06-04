
import "./styles/searchbar.css";
import React, { useState } from 'react';
import searchIcon from "../images/icons/search_icon.svg"
import axios from "axios";

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

            <form onSubmit={handleSearchSubmit} id="searchForm" >
                <input
                    id="searchInput"
                    type="text"
                    value={searchInput}
                    onChange={handleSearchInput}
                    placeholder="Search for anything..."
                />
                <img src={searchIcon} alt="search icon" id="searchIcon" />
            </form>


        </div>
    )
}
