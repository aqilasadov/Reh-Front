import React from "react";

import CustomTabs from "../../components-tim/CustomTabs/CustomTabs";
import {Build, Chat, Face} from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

import TransAll from "../taball/TransAll";
import Kassa1DigerV3 from "../kassaturk1/Kassa1DigerV3";
import Kassa2DigerV3 from "../kassaturk2/Kassa2DigerV3";



const styles = {
    textCenter: {
        textAlign: "center"
    }
};
const useStyles = makeStyles(styles);

export default function Transfer2(){


        const classes = useStyles();


        return (
            <div>


                  <CustomTabs
                        headerColor="primary"
                        tabs={[
                            // {
                            //     tabName: "Счет на счет",
                            //     tabContent: (
                            //         <TransDiger></TransDiger>
                            //     )
                            // },
                            // {
                            //     tabName: "Счет на другой счет",
                            //     tabContent: (
                            //         <TransDigerV2></TransDigerV2>
                            //     )
                            // },
                            // {
                            //     tabName: "Конвертация",
                            //     tabContent: (
                            //         <TransDigerV3></TransDigerV3>
                            //     )
                            // },
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
                                tabName: "Неподтвержденные",
                                tabContent: (
                                    <Kassa1DigerV3></Kassa1DigerV3>
                                )
                            },
                            {
                                tabName: "Подтвержденные",
                                tabContent: (
                                    <Kassa2DigerV3></Kassa2DigerV3>
                                )
                            },

                            // {
                            //     tabName: "Все удалитед",
                            //     tabContent: (
                            //         <TransDeleteAll></TransDeleteAll>
                            //     )
                            // },
                        ]}
                    />




            </div>


        );

}

