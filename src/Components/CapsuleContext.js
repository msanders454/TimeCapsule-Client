import React from 'react';

/*
* Used to store context info.
*/ 
const CapsuleContext = React.createContext({
    capsules: [],
    users: [],
});

export default CapsuleContext;