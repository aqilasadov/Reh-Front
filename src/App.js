import React, {Component} from 'react';
import LoginPage from "./container/LoginPage";
import {LOGIN_KEY_TOKEN} from "./utils/Constants";
import {setCurrentUser} from "./redux/actions/loginAction";
import {connect} from "react-redux";
import PrivateRoute from "./components/route/PrivateRoute";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {isEmpty} from "./utils/Validator";
import BankAccountPage from "./container/BankAccountPage";
import ClientPage from "./container/ClientPage";
import FirmPage from "./container/FirmPage";
import WarehousePage from "./container/WarehousePage";
import ItemsPage from "./container/ItemsPage";
import updateMomentLocate from "./utils/MomentUpdateLocate";
import ServiceCardPage from "./container/ServiceCardPage";
import ItemCardAmountPage from "./container/ItemCardAmountPage";
import UnitsetGrpPage from "./container/UnitsetGrpPage";
import UnitsetLinePage from "./container/UnitsetLinePage";
import UnitBarcodePage from "./container/UnitBarcodePage";
import PartiyaPage from "./container/PartiyaPage";
import StgrpcodePage from "./container/StgrpcodePage";
import BranchPage from "./container/BranchPage";
import KassaPage from "./container/KassaPage";
import CurRatePage from "./container/CurRatePage";
import KassaItemsPage from "./container/KassaItemsPage";
import FakturaPageV2 from "./container/FakturaPageV2";
import KassaBankDefaultPage from "./container/KassaBankDefaultPage";
import KassaBankClientDefaultPage from "./container/KassaBankClientDefaultPage";
import HomePage from "./container/HomePage";
import KassaToKassaPage from "./container/KassaToKassaPage";
import FFakturaPage from "./container/FFFakturaPage";
import UserRegistrationPage from "./container/UserRegistrationPage";
import PermissionPage from "./container/PermissionPage";
import ItemsIlkinQaliqlar from "./container/ItemsIlkinQaliqlarPage";
import ReportsPage from "./container/Reports/ReportsPage";
import YerdeyismePage from "./container/YerdeyismePage";
import TansferPage from "./container/TansferPage";
import Trans5 from "./components/tab5/Trans5";
import OdenisPage from "./container/OdenisPage";
import QaliqPage from "./container/QaliqPage";
import ExchangePage from "./container/ExchangePage";
import MaasPage from "./container/MaasPage";
import ChatGroupPage from "./container/ChatGroupPage";
import ChatPage from "./container/ChatPage";
import ReportsPagek from "./container/Reports/ReportsPagek";
import ReportCurRatePage from "./container/ReportCurRatePage";
import ExpencePage from "./container/ExpencePage";
import ExpenceTypePage from "./container/ExpenceTypePage";
import Tansfer2Page from "./container/Tansfer2Page";
import Tansfer3Page from "./container/Tansfer3Page";

class App extends Component {
    constructor(props) {
        super(props);
        updateMomentLocate();
    }

    componentWillMount() {
        this.props.loadAuthToken();
    }


    render() {
        return (
            <BrowserRouter basename={process.env.REACT_APP_ROUTER_BASE || ''}>
                <Switch>
                    <Route        exact={true} path='/login' component={LoginPage} {...this.props}/>
                    <PrivateRoute exact={true} path='/' component={HomePage}/>
                    <PrivateRoute exact={true} path='/components/banks' component={BankAccountPage}/>
                    <PrivateRoute exact={true} path='/admin/kassa' component={KassaPage}/>
                    <PrivateRoute exact={true} path='/components/clients' component={ClientPage}/>
                    <PrivateRoute exact={true} path='/components/operation' component={TansferPage}/>
                    <PrivateRoute exact={true} path='/admin3/operation2' component={Tansfer2Page}/>
                    <PrivateRoute exact={true} path='/admin4/operation3' component={Tansfer3Page}/>
                    <PrivateRoute exact={true} path='/components/tab5' component={OdenisPage}/>
                    <PrivateRoute exact={true} path='/components/tab7' component={ExchangePage}/>
                    <PrivateRoute exact={true} path='/admin/tab6' component={QaliqPage}/>
                    <PrivateRoute exact={true} path='/admin/tab15' component={MaasPage}/>
                    <PrivateRoute exact={true} path='/admin/firm' component={FirmPage}/>
                    <PrivateRoute exact={true} path='/admin/warehouse' component={WarehousePage}/>
                    <PrivateRoute exact={true} path='/components/items' component={ItemsPage}/>
                    <PrivateRoute exact={true} path='/components/servicecard' component={ServiceCardPage}/>
                    <PrivateRoute exact={true} path='/components/itemcardamount' component={ItemCardAmountPage}/>
                    <PrivateRoute exact={true} path='/components/unitsetgrp' component={UnitsetGrpPage}/>
                    <PrivateRoute exact={true} path='/components/unitsetline' component={UnitsetLinePage}/>
                    <PrivateRoute exact={true} path='/components/unitbarcode' component={UnitBarcodePage}/>
                    <PrivateRoute exact={true} path='/components/partiya' component={PartiyaPage}/>
                    <PrivateRoute exact={true} path='/components/stgrpcode' component={StgrpcodePage}/>

                    <PrivateRoute exact={true} path='/admin2/otherexpence' component={ExpencePage}/>
                    <PrivateRoute exact={true} path='/admin2/otherexpencetype' component={ExpenceTypePage}/>
                    <PrivateRoute exact={true} path='/components/currate' component={CurRatePage}/>
                    <PrivateRoute exact={true} path='/components/currate2' component={ReportCurRatePage}/>
                    <PrivateRoute exact={true} path='/default/kassabankd' component={KassaBankDefaultPage}/>
                    <PrivateRoute exact={true} path='/default/clientbankkassa' component={KassaBankClientDefaultPage}/>
                    <PrivateRoute exact={true} path='/default/mallard' component={ItemsIlkinQaliqlar}/>
                    <PrivateRoute exact={true} path='/admin/branch' component={BranchPage}/>
                    <PrivateRoute exact={true} path='/admin/users' component={UserRegistrationPage}/>
                    <PrivateRoute exact={true} path='/admin/chatgroup' component={ChatGroupPage}/>
                    <PrivateRoute exact={true} path='/admin/chat' component={ChatPage}/>
                    <PrivateRoute exact={true} path='/admin/permission' component={PermissionPage}/>
                    <PrivateRoute exact={true} path='/cashbox/kassaitems' component={KassaItemsPage}/>
                    <PrivateRoute exact={true} path='/cashbox/kassatokassa' component={KassaToKassaPage}/>
                    <PrivateRoute          path='/reports' component={ReportsPage}/>
                    <PrivateRoute          path='/reportsk' component={ReportsPagek}/>
                    <PrivateRoute              path='/operations/fakturaalis' component={props => <FakturaPageV2 fakturaType={1} {...props}/>}/>
                    <PrivateRoute exact={true} path='/operations/fakturasatis' component={props => <FakturaPageV2 fakturaType={2} {...props}/>}/>
                    <PrivateRoute exact={true} path='/operations/fffaktura' component={FFakturaPage}/>
                    <PrivateRoute exact={true} path='/operations/yerdeyisme' component={YerdeyismePage}/>
                </Switch>


            </BrowserRouter>
        );
    }
}


// const mapDispatchToProps = (dispatch) => {
//     return {
//         loadAuthToken: () => {
//             let token = localStorage.getItem(LOGIN_KEY_TOKEN);
//             if (!isEmpty(token)) {
//                 dispatch(setCurrentUser(token));
//             }
//         }
//     }
// };


const mapDispatchToProps = (dispatch) => {
    return {
        loadAuthToken: () => {
            let token = localStorage.getItem(LOGIN_KEY_TOKEN);
            if (!isEmpty(token)) {
                dispatch(setCurrentUser(token));
            }
        }
    }
};

export default connect(null, mapDispatchToProps)(App);
