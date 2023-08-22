import React, { createContext, useCallback, useEffect, useState } from 'react'

interface AppContextData {
}

const AppContext = createContext({} as AppContextData)

function AppProvider({ children }: any) {


    return (
        <AppContext.Provider value={{}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppProvider, AppContext }