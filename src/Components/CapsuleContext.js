import React from 'react';

/*
* Used to store context info.
*/ 
const CapsuleContext = React.createContext({
    capsules: [],
    users: [],
    addExpense: () => {},
    deleteExpense: () => {},
    updateExpense: () => {},
    updateUserInfo: () => {},
});

export default CapsuleContext;