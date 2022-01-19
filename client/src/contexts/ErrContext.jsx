import { createContext } from 'react';

import React from 'react';
import { useState } from 'react';

const PostContext = createContext();

function ErrContextProvider({ children }) {
    const [error, setError] = useState('');

    return <ErrContext.Provider value={{}}>{children}</ErrContext.Provider>;
}

export default ErrContextProvider;
export { ErrContext };
