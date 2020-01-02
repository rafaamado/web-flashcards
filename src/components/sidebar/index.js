import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { FaHome, FaInfoCircle } from "react-icons/fa";
import { MdViewList, MdSettings } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { logout } from '../../services/auth';


const Sidebar = (props) => {

    function handleLogout(){
        logout();
        props.history.push('/');
    }

    return (
    <div className="sidebar">
        <Link to='/app/decks'><FaHome className='menu-icon'/>My Decks</Link>
        <Link to='/app/cards'><MdViewList className='menu-icon'/>Card Browser</Link>
        <a href="#clients"><FaInfoCircle className='menu-icon'/>About</a>
        <a href="#contact"><MdSettings className='menu-icon'/>Settings</a>
        <a href="/" className="logout" onClick={handleLogout} ><FiLogOut className='menu-icon'/>Logout</a>
    </div>
    );
};

export default Sidebar;