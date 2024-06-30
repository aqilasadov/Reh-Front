import React from "react";
import {Redirect, Route} from "react-router-dom";
import {connect} from "react-redux";

const PrivateRoute = props => {


    console.log('isAuthenticated: ', props);
    const isSecure = props.isAuthenticated;
    const {component: Component, ...rest} = props;
    return(
        <Route
            {...rest}
            render={props => isSecure ? <Component {...props} /> :
                <Redirect
                    to={{
                        pathname: "/login",
                        state: {from: props.location}
                    }}
                />
            }
            // render={props =>
            //     isAuthenticated ? (
            //         <Component {...props} />
            //     ) : (
            //         <Redirect
            //             to={{
            //                 pathname: "/login",
            //                 state: {from: props.location}
            //             }}
            //         />
            //     )
            // }
        />
    )
};

export default connect((state) => {
    return {isAuthenticated: state.loginState.isAuthenticated};
}, null)(PrivateRoute);



// PrivateRoute.propTypes = {
//     isSecure: PropTypes.bool.isRequired
// };

// PrivateRoute.propTypes = {
//     auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     isAuthenticated: state.loginState.isAuthenticated
// });

// export default PrivateRoute;
// export default connect(mapStateToProps)(PrivateRoute);
