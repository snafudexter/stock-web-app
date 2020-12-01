import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png'
import google_logo from '../../assets/images/google_logo.png'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { signIn } from '../../actions/user'

class Header extends React.Component {

    constructor(props) {
        super(props)
        let user = localStorage.getItem('user');
        this.state = {
            user: user ? JSON.parse(user) : null,
            isLoading: false
        }
    }

    handleNavigationToWatchList = (e) => {
        if (!this.state.user) {
            e.preventDefault();
            this.handleGoogleSignIn();
        }
    }

    render() {
        let user = this.state.user;

        return (<nav className="navbar navbar-expand-lg container-fluid justify-content-between">
            <div className="d-flex flex-row align-items-center ">
                <img className="main-logo navbar-brand" src={logo} />
                <div className="navbar-nav ml-5 navigation">
                    <NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink>
                    <NavLink onClick={this.handleNavigationToWatchList} exact className="nav-link ml-5" activeClassName="active" to="/waitlist">Waitlist</NavLink>
                </div>
            </div>
            <div>
                {user && <div><img className="user-img" src={user.photoURL} /></div>}
                {user && <a href="#" onClick={this.handleLogout}>Logout</a>}
                {user == null && <button onClick={this.handleGoogleSignIn} className="google-button"><img src={google_logo} />Continue with Google</button>}
            </div>
        </nav>)
    }

    handleLogout = (e) => {
        e.preventDefault();
        firebase.auth().signOut()
        this.setState({ user: null })
        localStorage.removeItem('user')
        this.props.goHome();
    }

    handleGoogleSignIn = () => {
        let provider = new firebase.default.auth.GoogleAuthProvider();
        const auth = firebase.default.auth();
        const signinHelper = this.handleSignIn;
        auth.signInWithPopup(provider).then(function (result) {
            var user = result.user;
            const payload = {
                displayName: user.displayName,
                uid: user.uid,
                email: user.email,
                photoURL: user.photoURL
            }
            signinHelper(payload)
        })

    }

    handleSignIn = (payload) => {
        signIn(payload).then(res => {
            if (res.data) {
                this.setState({ user: res.data })
                localStorage.setItem('user', JSON.stringify(res.data))
            }
        })
    }
}

export default Header;