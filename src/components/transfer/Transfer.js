import React from "react";
import TrTab1 from "./TrTab1";
import TrTab2 from "./TrTab2";
import CustomTabs from "../../components-tim/CustomTabs/CustomTabs";
import {Build, Chat, Face} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import Items from "../items/Items";
import ItemCardAmount from "../itemcardamount/ItemCardAmount";
import Trans1 from "../tab1/Trans1";
import Trans2 from "../tab2/Trans2";
import Trans3 from "../tab3/Trans3";
import Trans4 from "../tab4/Trans4";
import Trans8 from "../tab8/Trans8";
import Trans9 from "../tab9/Trans9";
import Trans10 from "../tab10/Trans10";
import Trans11 from "../tab11/Trans11";
import Trans16 from "../tab16/Trans16";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import CustomInput from "../../components-tim/CustomInput/CustomInput";
import CustomSelect from "../common/select/CustomSelect";
import AsyncAutocomplete from "../common/ac/AsyncAutocomplete";
import TransAll from "../taball/TransAll";
import TransDiger from "../tabdiger/TransDiger";
import TransDigerV2 from "../tabdigerv2/TransDigerV2";
import TransferFilter from "../tabdiger/TransferFilter";
import TransDeleteAll from "../tabdeleteall/TransDeleteAll";
import TransDigerV3 from "../tabdigerv3/TransDigerV3";
import TrTransTab from "./TrTransTab";



const styles = {
    textCenter: {
        textAlign: "center"
    }
};
const useStyles = makeStyles(styles);

export default function Transfer(){


        const classes = useStyles();


        return (
            <div>

<TrTransTab></TrTransTab>
                  <CustomTabs
                        headerColor="primary"
                        tabs={[
                            {
                                tabName: "Счет на счет",
                                tabContent: (
                                    <TransDiger></TransDiger>
                                )
                            },
                            {
                                tabName: "Счет на другой счет",
                                tabContent: (
                                    <TransDigerV2></TransDigerV2>
                                )
                            },
                            {
                                tabName: "Конвертация",
                                tabContent: (
                                    <TransDigerV3></TransDigerV3>
                                )
                            },
                            // {
                            //     tabName: "Dubay",
                            //     tabContent: (
                            //       <Trans1></Trans1>
                            //     )
                            // },
                            // {
                            //     tabName: "Türk",
                            //     tabContent: (
                            //       <Trans2></Trans2>
                            //     )
                            // },
                            // {
                            //     tabName: "Moskva",
                            //     tabContent: (
                            //         <Trans3></Trans3>
                            //     )
                            // }
                            // ,
                            //
                            // {
                            //     tabName: "Kitay",
                            //     tabContent: (
                            //         <Trans9></Trans9>
                            //     )
                            // },
                            // {
                            //     tabName: "İran",
                            //     tabContent: (
                            //         <Trans16></Trans16>
                            //     )
                            // },

                            // {
                            //     tabName: "Dekond",
                            //     tabContent: (
                            //         <Trans10></Trans10>
                            //     )
                            // },
                            // {
                            //     tabName: "Hesab Bakı",
                            //     tabContent: (
                            //         <Trans11></Trans11>
                            //     )
                            // },
                            {
                                tabName: "Все операции",
                                tabContent: (
                                    <TransAll></TransAll>
                                )
                            },

                            {
                                tabName: "Все удалитед",
                                tabContent: (
                                    <TransDeleteAll></TransDeleteAll>
                                )
                            },
                        ]}
                    />




            </div>


        );

}

