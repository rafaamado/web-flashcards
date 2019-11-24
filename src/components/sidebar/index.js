import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { MdViewList, MdSettings } from 'react-icons/md';


const Sidebar = () => (
    <div className="sidebar">
        <Link to='/app/decks'><FaHome /> My Decks</Link>
        <Link to='/app/cards'><MdViewList /> Card Browser</Link>
        <a href="#clients"><FaInfoCircle /> About</a>
        <a href="#contact"><MdSettings /> Settings</a>
    </div>
);

export default Sidebar;