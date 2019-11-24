import React from 'react';
import './styles.css';
import Sidebar from '../../components/sidebar';

export default class CardBrowser extends React.Component{

    state = {}

    render(){
        return(
            <div className="CardBrowser">
                <Sidebar/>
                <h1>Card Browser</h1>
            </div>
        );
    }

}