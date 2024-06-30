import CoreComponent from "../../components/common/CoreComponent";
import {BACKEND_URL} from "../../utils/Constants";

const LOAD_REPORT_INFO_URL = BACKEND_URL + '/api/report/all/';

export default class ReportCore extends CoreComponent{


    loadReportInfoCore(id, processingCallback, errorCallback, successCallback) {
        this.getMethod(LOAD_REPORT_INFO_URL + id, processingCallback, errorCallback, successCallback);
    }

}


