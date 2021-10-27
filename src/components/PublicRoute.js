import React from 'react'
import { Redirect, Route } from 'react-router';
import { useProfile } from '../context/profile.context';

const PublicRoute = ({ children, ...routeProps }) => {

    const profile = useProfile();
    //if a profile DOES exist, redirect from sign-in to Home page
    if(profile) {
        return <Redirect to="/" />
    }
    
    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
};
export default PublicRoute;