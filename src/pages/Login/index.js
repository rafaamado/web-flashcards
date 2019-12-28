import React from 'react';
import './styles.css';
import api from "../../services/api";
import { login } from "../../services/auth";

export default class Login extends React.Component{

    state= {
        tab: 'signIn',
        singinEmail: '',
        singinPassword: '',
        signupName: '',
        singupEmail: '',
        singupPassword: '',
        error: '' 
    }

    handleSignIn = async (event) => {
        event.preventDefault();
        const {singinEmail : email, singinPassword : password }  = this.state;
        if (!email || !password) {
            this.setState({ error: "Please enter email e password!" });
        } else {
            try {
                const response = await api.post("/user/login", { email, password });
                login(response.data.acessToken);
                this.props.history.push("/app");
            } catch (err) {
                console.log(err)
                this.setState({
                    error: "Unable to singin, check your credentials"
                });
            }
        }
    };

    handleSignUp = async (event) => {
        event.preventDefault();
        console.log("teste");
        const {singupName : name, singupEmail : email, singupPassword : password }  = this.state;
        if (!name || !email || !password) {
            this.setState({ error: "Please enter a name, email and password!" });
        }else {
            try {
                console.log( { name, email, password });
                const response = await api.post("/user/register", { name, email, password });
                console.log( response.data );
                login(response.data.acessToken);
                this.props.history.push("/app");
            } catch (err) {
              console.log(err);
              this.setState({ error: "Failed to register." });
            }
        }
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
            <input 
                type="text" 
                placeholder="youremail@gmail.com" 
                name="email" 
                onChange={e => this.setState({singinEmail: e.target.value})}
                required/>
            <label><b>Password</b> </label>
            <input 
                type="password" 
                placeholder="Enter Password" 
                name="pwd" 
                onChange={e => this.setState({singinPassword: e.target.value})}
                required/>
            <button className="login-btn" onClick={this.handleSignIn}>Login</button> 
        </form>
        );
    }

    renderSingUp(){
        return (
        <form>
            <label><b>Nome</b> </label>
            <input 
                type="text" 
                name="name" 
                onChange={e => this.setState({singupName: e.target.value})}
                required/>
            <label><b>Email</b> </label>
            <input 
                type="text" 
                placeholder="youremail@gmail.com" 
                name="email" 
                onChange={e => this.setState({singupEmail: e.target.value})}
                required/>
            <label><b>Password</b> </label>
            <input 
                type="password" 
                placeholder="Enter Password" 
                name="pwd" 
                onChange={e => this.setState({singupPassword: e.target.value})}
                required/>
            <button className="signin-btn" onClick={this.handleSignUp}>Sing up</button>
        </form>
        );
    }
}