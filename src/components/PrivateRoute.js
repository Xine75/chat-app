import React from 'react'
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({ children, ...routeProps }) => {

const profile = useProfile()
    //if a profile doesn't exist, redirect to sign-in page
    if(!profile) {
        return <Redirect to="/signin" />
    }
    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
};
export default PrivateRoute;
