import React, { Component } from 'react';

var firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAHuzUd-7d8cWLf9iQzM0MRumPM_MzhAZs",
    authDomain: "login-54947.firebaseapp.com",
    databaseURL: "https://login-54947.firebaseio.com",
    projectId: "login-54947",
    storageBucket: "login-54947.appspot.com",
    messagingSenderId: "2301129425"
};
firebase.initializeApp(config);

class Authen extends Component {
    login(event){
        const email = this.refs.email.value;
        const password = this.refs.pass.value;
        console.log(email,password);

        const auth = firebase.auth();

        const promise = auth.signInWithEmailAndPassword(email, password);
        // todo: handle login promise
        promise
        .then(user=>{
            var lout = document.getElementById('lout');
            lout.classList.remove('hide');
        })
        .catch(e=>{
            var err = e.message;
            console.log(err);
            this.setState({err:err},function(){
                
            })
        })
    }

    logout(event){
        firebase.auth().signOut();
        var lout = document.getElementById('lout');
        lout.classList.add('hide');
    }

    signup(event){
        const email = this.refs.email.value;
        const password = this.refs.pass.value;
        const auth = firebase.auth();
        var promise = auth.createUserWithEmailAndPassword(email,password);

        promise
            .then(user => {
                console.log(user);
                var err = "Welcome " + user.user.email;
                firebase.database().ref('login/' + user.user.uid).set({
                    email: user.user.email,
                    // password: user.password
                });
                console.log(user);
                this.setState({ err: err });
            }).catch(e => {
            var err = e.message;
            console.log(err);
            this.setState({ err: err }, function () {

            })
        })
    }

    google(){
        console.log("i am in google method now.");


        var provider = new firebase.auth.GoogleAuthProvider();

        var promise = firebase.auth().signInWithPopup(provider);

        promise
        .then( result =>{
            var user =result.user;
            console.log(result);
            firebase.database().ref('login/'+user.uid).set({
                email: user.email,
                name:user.displayName,
            });
        })
        .catch(e => {
            var err = e.message;
            console.log(err);
            this.setState({ err: err }, function () {

            })
        });
    }
    constructor(props) {
        super(props);

        this.state = {
            err:'',
        };

        this.login = this.login.bind(this);
        this.signup = this.signup.bind(this);
        this.logout = this.logout.bind(this);
        this.google = this.google.bind(this);
    }
    
    render() {
        return (
            <div>
                <input id='email' ref='email' type="email" placeholder='Enter your email' /><br />
                <input id='pass' ref='pass' type="password" placeholder='Enter your password' /><br/>
                {this.state.err}<br />
                <button onClick={this.login}>Log In</button>
                <button onClick={this.signup}>Sign Up</button>
                <button id='lout' className='hide' onClick={this.logout}>Log Out</button><br />
                <button id='google' className='google' onClick={this.google}>Sing in with Google</button>
            </div>
        );
    }
}

export default Authen;