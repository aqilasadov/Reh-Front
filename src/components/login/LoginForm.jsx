import * as React from "react";
import LoginFormView from "./LoginFormView";
import pagesStyle from "../../assets/jss/views/pagesStyle";
import withStyles from "@material-ui/core/styles/withStyles";
import {isEmpty, isValidPassword} from "../../utils/Validator";
import {login} from "../../redux/actions/loginAction";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import PropTypes from 'prop-types';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cardAnimaton: "cardHidden",
            username: '',
            password: '',
            errors: {
                username: '',
                password: '',
                summary: ''
            },
            isLoading: false
        }
    }

    componentDidMount() {
        // we add a hidden class to the card and after 700 ms we delete it and the transition appears
        this.timeOutFunction = setTimeout(
            function () {
                this.setState({cardAnimaton: ""});
            }.bind(this),
            700
        );
    }

    componentWillUnmount() {
        clearTimeout(this.timeOutFunction);
        this.timeOutFunction = null;
    }

    render() {
        const {classes, ...rest} = this.props;
        const {errors, username, password, cardAnimaton} = this.state;


        return (<LoginFormView onSubmit={this.onSubmit}
                               onChange={this.handleChange}
                               username={username}
                               password={password}
                               cardAnimaton={cardAnimaton} errors/>);

    }

    checkForm = () => {
        const err = {};
        if (this.state.username.trim() === '') {
            err.username = "İstifadəçi adı boşdur..";
        }
        // Check password
        else if (!isValidPassword(this.state.password)) {
            err.password = "Parol formata uyğun deyil.";
        }
        this.setState({errors: err});
        return isEmpty(err);
    };

    onSubmit = (e) => {
        e.preventDefault();
        const err = {};
        if (!this.checkForm()) {
            return;
        }
        this.props.login({username: this.state.username, password: this.state.password}).then(value => {
            this.props.history.push('/');
        }).catch(reason => {
            err.summary = reason.message;
            this.setState({errors: err});
        });
    };

    handleChange = (e) => {
        console.log('handleChange: ', e.target.name, e.target.value);
        this.setState(Object.assign({}, this.state, {[e.target.name]: e.target.value}));
    };


}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
    login: PropTypes.func.isRequired
};

// export default withStyles(styles)(LoginForm);
export default withStyles(pagesStyle)(connect(null, {login})(withRouter(LoginForm)));

