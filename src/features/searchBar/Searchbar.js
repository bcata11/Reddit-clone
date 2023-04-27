import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import { useDispatch } from "react-redux";
import "./searchbar.css"
import logo from './reddit-logo.png';
import { Link } from 'react-router-dom';
//searchterm
import { setSearchTermFilter } from '../PostsContainer/PostsContainerSlice';

const Searchbar = () => {
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearchTermFilter(searchTerm));
        setSearchTerm('');
    };

    const handleSearchFormChange = ({ target }) => {
        setSearchTerm(target.value);
        dispatch(setSearchTermFilter(searchTerm));
    };

    return (
        <header className='heads' id="heads">
            <div className='titluc'>
                <Link className='linkhome' to="/">
                    <h2 className='titlu'><img src={logo} alt="logo" /> by cata</h2>
                </Link>

            </div>
            <form className='formular' onSubmit={handleSearchSubmit}>
                <span><FontAwesomeIcon icon={faMagnifyingGlass} /></span>
                <input id="Search"
                    value={searchTerm}
                    type="text"
                    placeholder='Search Reddit'
                    onChange={handleSearchFormChange}
                />

            </form>
        </header>
    )
}

export default Searchbar