import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";

// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import ExitToApp from "@material-ui/icons/ExitToApp";
import ViewList from "@material-ui/icons/ViewList";
// core components
import CustomInput from "../../components-tim/CustomInput/CustomInput.jsx";
import Button from "../../components-tim/CustomButtons/Button.jsx";

import headerLinksStyle from "../../assets/jss/components/headerLinksStyle";
import MoreVert from "@material-ui/core/SvgIcon/SvgIcon";
import {connect} from "react-redux";
import {LOGIN_KEY_TOKEN} from "../../utils/Constants";
import {isEmpty} from "../../utils/Validator";
import {logout, setCurrentUser} from "../../redux/actions/loginAction";

class HeaderLinks extends React.Component {
    state = {
        open: false
    };
    handleClick = () => {
        this.setState({open: !this.state.open});
    };
    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes, rtlActive} = this.props;
        const {open} = this.state;
        const searchButton =
            classes.top +
            " " +
            classes.searchButton +
            " " +
            classNames({
                [classes.searchRTL]: rtlActive
            });
        const dropdownItem = classNames(
            classes.dropdownItem,
            classes.primaryHover,
            {[classes.dropdownItemRTL]: rtlActive}
        );
        const wrapper = classNames({
            [classes.wrapperRTL]: rtlActive
        });
        const managerClasses = classNames({
            [classes.managerClasses]: true
        });
        return (
            <div className={wrapper}>
                {
                    //searchInput()}
                }
                <Button color="white" aria-label="edit" justIcon round className={searchButton} style={{marginRight: 20}}
                onClick = {()=>this.props.logout()}>
                    <ExitToApp className={classes.headerLinksSvg + " " + classes.searchIcon}/>
                </Button>
                {
                    // this.dashboardButton(classes)
                }
                {
                    // popperMenu(this.handleClick())
                }
                {/*<Button*/}
                {/*color="transparent"*/}
                {/*aria-label="Person"*/}
                {/*justIcon*/}
                {/*className={classes.buttonLink}>*/}
                {/*<Person className={ classes.headerLinksSvg + " " + (classes.links)}/>*/}
                {/*<Hidden mdUp implementation="css">*/}
                {/*<span className={classes.linkText}>*/}
                {/*{"Profile"}*/}
                {/*</span>*/}
                {/*</Hidden>*/}
                {/*</Button>*/}
            </div>
        );

        function searchInput() {
            return (
                <CustomInput rtlActive={rtlActive} formControlProps={{className: classes.top + " " + classes.search}}
                             inputProps={{
                                 placeholder: rtlActive ? "بحث" : "Search",
                                 inputProps: {
                                     "aria-label": rtlActive ? "بحث" : "Search",
                                     className: classes.searchInput
                                 }
                             }}
                />);
        }


        // function popperMenu(onclick)
        // {
        //     return ( <div className={managerClasses}>
        //         <Button
        //             round
        //             color="white"
        //             justIcon
        //             aria-label="Notifications"
        //             aria-owns={open ? "menu-list" : null}
        //             aria-haspopup="true"
        //             onClick={onclick}
        //             className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
        //             muiClasses={{
        //                 label: rtlActive ? classes.labelRTL : ""
        //             }}
        //             buttonRef={node => {
        //                 this.anchorEl = node;
        //             }}
        //         >
        //
        //             {/*<Notifications*/}
        //             {/*className={*/}
        //             {/*classes.headerLinksSvg +*/}
        //             {/*" " +*/}
        //             {/*(rtlActive*/}
        //             {/*? classes.links + " " + classes.linksRTL*/}
        //             {/*: classes.links)*/}
        //             {/*}*/}
        //             {/*/>*/}
        //             {/*<span className={classes.notifications}>5</span>*/}
        //             {/*<Hidden mdUp implementation="css">*/}
        //             {/*<span onClick={this.handleClick} className={classes.linkText}>*/}
        //             {/*{rtlActive ? "إعلام" : "Notification"}*/}
        //             {/*</span>*/}
        //             {/*</Hidden>*/}
        //             <ViewList className={classes.sidebarMiniIcon} />
        //         </Button>
        //         <Popper
        //             open={open}
        //             anchorEl={this.anchorEl}
        //             transition
        //             disablePortal
        //             placement="bottom"
        //             className={classNames({
        //                 [classes.popperClose]: !open,
        //                 [classes.pooperResponsive]: true,
        //                 [classes.pooperNav]: true
        //             })}
        //         >
        //             {({TransitionProps, placement}) => (
        //                 <Grow
        //                     {...TransitionProps}
        //                     id="menu-list"
        //                     style={{transformOrigin: "0 0 0"}}
        //                 >
        //                     <Paper className={classes.dropdown}>
        //                         <ClickAwayListener onClickAway={this.handleClose}>
        //                             <MenuList role="menu">
        //                                 <MenuItem onClick={this.handleClose} className={dropdownItem}>
        //                                     {"Çıxış"}
        //                                 </MenuItem>
        //                             </MenuList>
        //                         </ClickAwayListener>
        //                     </Paper>
        //                 </Grow>
        //             )}
        //         </Popper>
        //     </div>);
        // }

        function dashboardButton(classes) {
            return (<Button color="transparent" simple aria-label="Dashboard" justIcon className={classes.buttonLink}>
                <Dashboard
                    className={
                        classes.headerLinksSvg + " " + classes.links
                    }
                />
                <Hidden mdUp implementation="css">
            <span className={classes.linkText}>
              {"Dashboard"}
            </span>
                </Hidden>
            </Button>)
        }
    }
}

HeaderLinks.propTypes = {
    classes: PropTypes.object.isRequired,
    rtlActive: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () =>  dispatch(logout())
    }
};

export default withStyles(headerLinksStyle)(connect(null, mapDispatchToProps,)(HeaderLinks));
