// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Email from "@material-ui/icons/Email";


import loginPageStyle from "../../assets/jss/views/loginPageStyle";
import PropTypes from "prop-types";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import GridContainer from "../../components-tim/Grid/GridContainer";
import GridItem from "../../components-tim/Grid/GridItem";
import CardHeader from "../../components-tim/Card/CardHeader";
import Card from "../../components-tim/Card/Card";
import React from "react";
import Button from "../../components-tim/CustomButtons/Button";
import CardBody from "../../components-tim/Card/CardBody";
import CardFooter from "../../components-tim/Card/CardFooter";
import LanguageSelector from "../language/LanguageSelector";
function LoginFormView(props) {
    const {classes, cardAnimaton, onSubmit, onChange, username, password, errors} = props;
    return (
        <div className={classes.container}>
            <GridContainer justify="center">
                <GridItem xs={12} sm={6} md={4}>
                    <form>
                        <Card login className={classes[cardAnimaton]}>
                            <CardHeader
                                className={`${classes.cardHeader} ${classes.textCenter}`}
                                color="rose">
                                <h4 className={classes.cardTitle}>Tripss</h4>

                            </CardHeader>
                            <CardBody>
                                <CustomInput
                                    labelText="Login"
                                    id="username"
                                    autoFocus
                                    value={username}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "username",
                                        onChange: onChange,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Email className={classes.inputAdornmentIcon}/>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <CustomInput
                                    labelText="Password"
                                    id="password"
                                    value={password}

                                    onChange={onChange}
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "password",
                                        type: "password",
                                        onChange: onChange,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <Icon className={classes.inputAdornmentIcon}>
                                                    lock_outline
                                                </Icon>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            </CardBody>
                            <CardFooter className={classes.justifyContentCenter}>
                                <Button onClick={onSubmit} type="submit" color="rose" simple size="lg" block>
                                    Sign in
                                </Button>
                            </CardFooter>
                        </Card>
                    </form>
                </GridItem>
            </GridContainer>
        </div>
    );
}

LoginFormView.propTypes = {
    cardAnimaton: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
    username: PropTypes.string,
    password: PropTypes.string
};
LoginFormView.defaultProps = {
    cardAnimaton: "",
    username: '',
    password: ''
};
export default withStyles(loginPageStyle)(LoginFormView);
