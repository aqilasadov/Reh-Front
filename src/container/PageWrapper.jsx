import React, {Component} from "react";
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core";
import appStyle from "../assets/jss/layouts/dashboardStyle";
import cx from "classnames";
import Sidebar from "../components-tim/Sidebar/Sidebar";
import {Add, Apps} from "@material-ui/icons";
import sidebar from "../assets/img/sidebar.jpg";
import hlogo from "../assets/img/hlogo2.jpg";
import PerfectScrollbar from "perfect-scrollbar";
import Header from "../components-tim/Header/Header";
import Footer from "../components-tim/Footer/Footer";
import {withTranslation} from "react-i18next";
import {AUTH_USERINFO_KEY} from "../utils/Constants";
import {isEmpty} from "../utils/common";
let ps;

 var loadUserInfo2 = () => {
    try {
        let userInfo = localStorage.getItem(AUTH_USERINFO_KEY);
        if(isEmpty(userInfo)) return undefined;
        let us=JSON.parse(userInfo);
        return us.userId;
    }
    catch (e) {
        return undefined;
    }
};
// var userid =loadUserInfo2();

const dashboarRoutes = [
    {
        path: "/",
         name: "Домашняя страница",
        // name: t("client_name"),

        icon: Add,
        component: Dashboard
    },
    {
        collapse: true,
        path: "/cards",
        name: "Разделы",
        state: "openComponents",
        icon: Apps,
        views: [

              {
                path: "/components/clients",
                name: "             Клиенты",
                mini: "            ",
                component: Dashboard
            }


            ,


            {
                path: "/components/currate",
                name: "Курсы обмена",

                component: Dashboard
            },
            {
                path: "/components/currate2",
                name: "Курсы Баланс",

                component: Dashboard
            },
            {
                path: "/components/operation",
                name: "Операция",

                component: Dashboard
            },
            {
                path: "/components/tab5",
                name: "Касса",

                component: Dashboard
            },

            {
                path: "/components/tab7",
                name: "Обмен",

                component: Dashboard
            },

            {
                path: "/components/partiya",
                name: "Расходы",

                component: Dashboard
            }
            ,

            {
                path: "/components/stgrpcode",
                name: "Виды расходов",

                component: Dashboard
            },




        ]
    },

    {
        collapse: true,
        path: "/admin",
        name: "Администратор",
        state: "openadmin",
        icon: Apps,
        views: [


            {
                path: "/admin/users",
                name: "Пользователи",

                component: Dashboard
            }
            ,
            {
                path: "/admin/chatgroup",
                name: "Группа чата",

                component: Dashboard
            }
            ,

            {
                path: "/admin/chat",
                name: "Чат",

                component: Dashboard
            }
            ,
            {
                path: "/admin/tab6",
                name: "Начальные остатки клиентов",

                component: Dashboard
            },
            {
                path: "/admin/kassa",
                name: "Начальная касса",

                component: Dashboard
            },
            {
                path: "/admin/tab15",
                name: "Зарплата",

                component: Dashboard
            },



                  ]
    },

    {
        collapse: true,
        path: "/admin2",
        name: "Эмин отчет",
        state: "openemin",
        icon: Apps,
        views: [




            {
                path: "/admin2/otherexpence",
                name: "Расходы",

                component: Dashboard
            }
            ,

            {
                path: "/admin2/otherexpencetype",
                name: "Виды расходов",

                component: Dashboard
            },
        ]
    },




    {
        collapse: true,
        path: "/admin3",
        name: "Турция отчет",
        state: "openkassa",
        icon: Apps,
        views: [


            {
                path: "/admin3/operation2",
                name: "Т-Касса",

                component: Dashboard
            }
            ,

            {
                path: "/admin4/operation3",
                name: "Т-Касса2",

                component: Dashboard
            }
            ,


        ]
    },



    {
        collapse: true,
        path: "/reports",
        name: "Oтчеты",
        state: "openReports",
        icon: Apps,
        views: [
            {
                path: "/reports",
                name: "Oтчеты",
                mini: "H",
                component: Dashboard
            },
        ]
    }




];



const dashboarRoutes2 = [
    {
        path: "/",
        name: "Домашняя страница",
        // name: t("client_name"),

        icon: Add,
        component: Dashboard
    },
    {
        collapse: true,
        path: "/cards",
        name: "Разделы",
        state: "openComponents",
        icon: Apps,
        views: [



            {
                path: "/components/currate",
                name: "Курсы обмена",

                component: Dashboard
            },
            {
                path: "/components/currate2",
                name: "Курсы Баланс",

                component: Dashboard
            },

            {
                path: "/components/tab5",
                name: "Касса",

                component: Dashboard
            },

            {
                path: "/components/tab7",
                name: "Обмен",

                component: Dashboard
            },
            {
                path: "/components/partiya",
                name: "Расходы",

                component: Dashboard
            }
            ,

            {
                path: "/components/stgrpcode",
                name: "Виды расходов",

                component: Dashboard
            },


        ]
    },


    {
        collapse: true,
        path: "/reports",
        name: "Oтчеты",
        state: "openReports",
        icon: Apps,
        views: [
            {
                path: "/reportsk",
                name: "Oтчеты",
                mini: "H",
                component: Dashboard
            },
        ]
    }




];




const dashboarRoutes3 = [
    {
        path: "/",
        name: "Домашняя страница",
        // name: t("client_name"),

        icon: Add,
        component: Dashboard
    },
    {
        collapse: true,
        path: "/admin3",
        name: "Турция отчет",
        state: "openkassa",
        icon: Apps,
        views: [
            {
                path: "/admin3/operation2",
                name: "Т-Касса",

                component: Dashboard
            }
            ,
        ]
    },


];


const dashboarRoutes4 = [
    {
        path: "/",
        name: "Домашняя страница",
        // name: t("client_name"),

        icon: Add,
        component: Dashboard
    },
    {
        collapse: true,
        path: "/admin4",
        name: "Турция отчет",
        state: "openkassa",
        icon: Apps,
        views: [
            {
                path: "/admin4/operation3",
                name: "Т-Касса2",

                component: Dashboard
            }
            ,
        ]
    },


];




class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userid2:loadUserInfo2(),
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
        console.log('this.props33 ',this.state.userid2);
        const {classes,t, component, ...rest} = this.props;
        const mainPanel = classes.mainPanel + " " +
            cx({
                [classes.mainPanelSidebarMini]: this.state.miniActive, [classes.mainPanelWithPerfectScrollbar]:
                navigator.platform.indexOf("Win") > -1
            });

        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes= {(this.state.userid2===78) ? dashboarRoutes2: (this.state.userid2===85) ? dashboarRoutes3: (this.state.userid2===86) ? dashboarRoutes4:dashboarRoutes}

                    logoText={"Tripss"}
                    logo={hlogo}
                    image={sidebar}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    bgColor="blue"
                    miniActive={this.state.miniActive}
                    {...rest}
                />
                <div className={mainPanel} ref={this.mainPanel}>
                    <Header
                        sidebarMinimize={this.sidebarMinimize.bind(this)}
                        miniActive={this.state.miniActive}
                        routes={(this.state.userid2===78) ? dashboarRoutes2:(this.state.userid2===85) ? dashboarRoutes3:(this.state.userid2===86) ? dashboarRoutes4:dashboarRoutes}
                        handleDrawerToggle={this.handleDrawerToggle}
                        {...rest} />
                    <div className={classes.content}>
                        <div className={classes.container}>
                            {component}
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
    component: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(withTranslation()(Dashboard));
