import React from 'react';

/*
* Used to store context info.
*/ 
const RedZoneContext = React.createContext({
    expenses: [],
    users: [],
    red_zone_amount: 1,
    RedZoneAlert: false,
    addExpense: () => {},
    deleteExpense: () => {},
    updateExpense: () => {},
    updateUserInfo: () => {},
    updateRedZoneAmount : () => {}
});

export default RedZoneContext;