import React, { createContext, useState } from 'react';

export const AppContext = createContext();
export const AppProvider = (props) => {
    const { children } = props;
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUser] = useState(null);

    return (        
        <AppContext.Provider
            value={{
                isLogin, setIsLogin,
                user, setUser
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
