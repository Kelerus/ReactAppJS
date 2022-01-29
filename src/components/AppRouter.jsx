import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "../context";
import { privateRoutes, publicRoutes } from "../router/routes";
import MyLoader from "./UI/Loader/MyLoader";
const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if(isLoading) {
        return <MyLoader/>
    }

    return (
        isAuth
        ?
        <Switch>
            {privateRoutes.map(router =>
                <Route 
                    key={router.path}
                    component={router.component} 
                    exact={router.exact} 
                    path={router.path}
                />
            )}
            <Redirect to="/posts"/>
        </Switch>
        :
        <Switch>
            {publicRoutes.map(router =>
                <Route 
                    key={router.path}
                    component={router.component} 
                    exact={router.exact} 
                    path={router.path}
                />
            )}
            <Redirect to="/login"/>
        </Switch>
    )
}

export default AppRouter;