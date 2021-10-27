import React, { createContext, useState, useContext } from "react";


const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [profile] = useState(false);

    return <ProfileContext.Provider value = {profile}>
        {children}
    </ProfileContext.Provider>
}
//useProfile is accesssible to any component without having to prop drill. useProfile is in global state
export const useProfile = () => useContext(ProfileContext)