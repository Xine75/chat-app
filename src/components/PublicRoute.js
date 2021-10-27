import React from 'react'
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

const PublicRoute = ({ children, ...routeProps }) => {

    const {profile, isLoading} = useProfile();

    if(isLoading && !profile){
        return <Container>
            <Loader center vertical size="md" content="Loading" speed="slow"  />
        </Container>
    }
    //if a profile DOES exist, redirect from sign-in to Home page
    if(profile && !isLoading) {
        return <Redirect to="/" />
    }
    
    
    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
};
export default PublicRoute;