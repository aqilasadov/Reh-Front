import React from "react";
import PageWrapper from "./PageWrapper";

import Grid from "@material-ui/core/es/Grid/Grid";
import Roles from "../components/user-permission/roles/Roles";
import RolePrivs from "../components/user-permission/role_privs/RolePrivs";
import UserRoles from "../components/user-permission/user-roles/UserRoles";

function PermissionPage(props) {
    return (
        <PageWrapper component={


                <Grid container spacing={16}>
                    <Grid item xs={6}>
                        <Roles {...props}/>
                    </Grid>
                    <Grid item xs={6}>
                        <RolePrivs {...props}/>
                    </Grid>
                    <Grid item xs={12}>
                        <UserRoles {...props}/>
                    </Grid>
                </Grid>

        } {...props}/>
    );

}
export default PermissionPage;
