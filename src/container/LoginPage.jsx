import React from 'react';
import LoginForm from "../components/login/LoginForm";
import {connect} from "react-redux";
import {Redirect, withRouter} from "react-router-dom";

class LoginPage extends React.Component {

    render() {
        console.log('LoginPage: ', this.props);
        console.log('LoginPage: ', this.props.location.state.from.pathname);
        const to = this.props.location.state.from.pathname ? this.props.location.state.from.pathname : '/';
        return !this.props.isAuthenticated ? <LoginForm/> : <Redirect to={to} />;
    }
}

export default withRouter(
    connect((state) => {
        return {isAuthenticated: state.loginState.isAuthenticated};
    }, null)(LoginPage)
);

