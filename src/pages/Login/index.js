import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

export default class Login extends React.Component{

    render(){
        return (
            <div className="login">
                <form className="loginForm">
                    <label><b>Email</b> </label>
                    <input type="text" placeholder="youremail@gmail.com" name="email" required/>
                    <label><b>Password</b> </label>
                    <input type="password" placeholder="Enter Password" name="pwd" required/>
                    <Link to={'/app'}>
                        <button className="login-btn">Login</button>
                    </Link> 
                    <button className="signin-btn" type="submit">Sing up</button>
                </form>
            </div>
        );
    }
}