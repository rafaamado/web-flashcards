import React from 'react';
import './styles.css';

export default class Login extends React.Component{

    state= {
        tab: 'signIn'
    }

    handleSignIn = (event) => {
        event.preventDefault();
        this.props.history.push("/app");
    };

    handleSignUp = (event) => {
        event.preventDefault();
        this.props.history.push("/app");
    }

    render(){
        return (
            <div className="login">
                <div className="centerForm"> 
                    <div className="tab">
                        <button className="tablinks" onClick={() => this.setState({tab: 'signIn'})}>Sign in</button>
                        <button className="tablinks" onClick={() => this.setState({tab: 'signUp'})}>Sing Up</button>
                    </div>
                    
                    {this.state.tab === 'signIn' ? this.renderSignIn() : this.renderSingUp()}
                </div>
            </div>
        );
    }

    renderSignIn(){
        return (
        <form>
            <label><b>Email</b> </label>
            <input type="text" placeholder="youremail@gmail.com" name="email" required/>
            <label><b>Password</b> </label>
            <input type="password" placeholder="Enter Password" name="pwd" required/>
            <button className="login-btn" onClick={this.handleSignIn}>Login</button> 
        </form>
        );
    }

    renderSingUp(){
        return (
        <form>
            <label><b>Nome</b> </label>
            <input type="text" name="name" required/>
            <label><b>Email</b> </label>
            <input type="text" placeholder="youremail@gmail.com" name="email" required/>
            <label><b>Password</b> </label>
            <input type="password" placeholder="Enter Password" name="pwd" required/>
            <button className="signin-btn" onClick={this.handleSignUp}>Sing up</button>
        </form>
        );
    }
}