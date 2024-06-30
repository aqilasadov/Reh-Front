import {avrFetch, checkIfResponseUnAuthorized, readResponseAsJSON, validateResponse} from "../../utils/avrFetch";
import {BACKEND_URL} from "../../utils/Constants";

export default class ReportUtils {
    static getDownloadToken(params, processingCallback, errorCallback, successCallback) {
        const {reportId, fileType, requestParams} = params;
        processingCallback(true);

        avrFetch(BACKEND_URL + '/api/report/request/download', {
            method: 'POST',
            body: JSON.stringify({
                reportId: reportId,
                fileType: fileType,
                requestParams: requestParams,
            })
        }).then(validateResponse)
            .then(readResponseAsJSON)
            .then(
                (result) => {
                    if (result.success) {
                        if (typeof successCallback === "function") {
                            successCallback(result.data);
                        }
                    }
                    else {
                        errorCallback(result.message)
                    }

                },
                (error) => {
                    if (checkIfResponseUnAuthorized(error)) return;
                    errorCallback(error)
                }
            ).catch(err => errorCallback(err.message)).finally(() => processingCallback(false));
    }

    static openReport(response) {
        let url = BACKEND_URL + '/api/report/download/' + encodeURIComponent(response.token);
        let win = window.open(url, '_blank');
        win.focus();
    }
}
