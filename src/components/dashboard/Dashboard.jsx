import {Component} from "react";
import React from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import appStyle from "../../assets/jss/layouts/dashboardStyle";
import cx from "classnames";
import Sidebar from "../../components-tim/Sidebar/Sidebar";
import {Add, Apps} from "@material-ui/icons";
import sidebar from "../../assets/img/sidebar.jpg";
import hlogo from "../../assets/img/hlogo2.jpg";
import PerfectScrollbar from "perfect-scrollbar";
import Header from "../../components-tim/Header/Header";
import Footer from "../../components-tim/Footer/Footer";
import BankAccountPage from "../../container/BankAccountPage";

let ps;


const dashboarRoutes = [
    {
        path: "/dashboard",
        name: "Dashboard",
        icon: Add,
        component: Dashboard
    },
    {
        collapse: true,
        path: "/cards",
        name: "Kartlar",
        state: "openComponents",
        icon: Apps,
        views: [
            {
                path: "/components/banks",
                name: "Bank hesabları",
                mini: "B",
                component: Dashboard
            },
            {
                path: "/components/clients",
                name: "Müştərilər",
                mini: "M",
                component: Dashboard
            },
            {
                path: "/components/firm",
                name: "Firmalar",
                mini: "F",
                component: Dashboard
            },
            {
                path: "/components/warehouse",
                name: "Anbarlar",
                mini: "A",
                component: Dashboard
            },
            {
                path: "/components/notifications",
                name: "Notifications",
                mini: "N",
                component: Dashboard
            }
        ]
    }
];

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            mobileOpen: false,
            miniActive: false
        };
        this.mainPanel = React.createRef();
    }

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps = new PerfectScrollbar(this.mainPanel.current, {
                suppressScrollX: true,
                suppressScrollY: false
            });
        }
        window.addEventListener("resize", this.resizeFunction);
    }

    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
        }

        window.removeEventListener("resize", this.resizeFunction);
    }

    render() {
        const {classes, ...rest} = this.props;
        const mainPanel = classes.mainPanel + " " +
            cx({
                [classes.mainPanelSidebarMini]: this.state.miniActive, [classes.mainPanelWithPerfectScrollbar]:
                navigator.platform.indexOf("Win") > -1
            });

        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={dashboarRoutes}
                    logoText={"Tripss"}
                    logo={hlogo}
                    image={sidebar}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    bgColor="black"
                    miniActive={this.state.miniActive}
                    {...rest}
                />
                <div className={mainPanel} ref={this.mainPanel}>
                    <Header
                        sidebarMinimize={this.sidebarMinimize.bind(this)}
                        miniActive={this.state.miniActive}
                        routes={dashboarRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest} />
                    <div className={classes.content}>
                        <div className={classes.container}>
                            <BankAccountPage/>
                        </div>
                    </div>
                    <Footer fluid/>
                </div>
            </div>
        );
    }

    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    resizeFunction = () => {
        if (window.innerWidth >= 960) {
            this.setState({mobileOpen: false});
        }
    };

    sidebarMinimize = () => {
        this.setState({miniActive: !this.state.miniActive});
    };
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(Dashboard);
