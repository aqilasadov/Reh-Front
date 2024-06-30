import {
    primaryColor,
    dangerColor,
    successColor,
    defaultFont
} from "../core/material-dashboard-pro-react.jsx";

const customInputStyle = {
    disabled: {
        "&:before": {
            borderColor: "transparent !important"
        }
    },
    underline: {
        "&:hover:not($disabled):before,&:before": {
            borderColor: "#D2D2D2 !important",
            borderWidth: "1px !important"
        },
        "&:after": {
            borderColor: primaryColor
        }
    },
    underlineError: {
        "&:after": {
            borderColor: dangerColor
        }
    },
    underlineSuccess: {
        "&:after": {
            borderColor: successColor
        }
    },
    labelRoot: {
        // ...defaultFont,
        // color: "#AAAAAA !important",
        // fontWeight: "normal",
        // fontSize: "10px",
        // lineHeight: "1.42857",
        // top: "0px",
        // "& + $underline": {
        //     marginTop: "5px",
        //     marginBottom: "0px"
        // }
    },
    labelRootError: {
        color: dangerColor + " !important"
    },
    labelRootSuccess: {
        color: successColor + " !important"
    },
    formControl: {
        // margin: "0 0 10px 0",
        // paddingTop: "9px",
        position: "relative",
        verticalAlign: "unset", "& svg,& .fab,& .far,& .fal,& .fas,& .material-icons": {
            color: "#495057"
        }
    },
    whiteUnderline: {
        "&:hover:not($disabled):before,&:before": {
            backgroundColor: "#FFFFFF"
        },
        "&:after": {
            backgroundColor: "#FFFFFF"
        }
    },
    input: {
        color: "#495057",
        "&,&::placeholder": {
            fontSize: "12px",
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: "400",
            lineHeight: "1.42857",
            opacity: "1"
        },
        "&::placeholder": {
            color: "#AAAAAA"
        }
    },
    whiteInput: {
        "&,&::placeholder": {
            color: "#FFFFFF",
            opacity: "1"
        }
    }
};

export default customInputStyle;
