import AuthRoutes from "./auth.routes";
import AdminRoutes from "./admin.routes";
import AppRoutes from "./app.routes";
import { useContext } from "react";
import { AppContext } from "../context";

export function Routes() {
    const { userAuth } = useContext(AppContext)
    console.log(userAuth)
    return (
        <>
            {
                !userAuth ?
                    <AuthRoutes />
                    :
                    userAuth.role == 'coordinator' ?
                        <AdminRoutes />
                        :
                        <AppRoutes />
            }
        </>
    )
}