import React from 'react';

const RedZoneContext = React.createContext({
    expenses: [],
    users: [],
    red_zone_amount: 0,
    RedZoneAlert: false,
    addExpense: () => {},
    deleteExpense: () => {},
    updateExpense: () => {},
    updateUserInfo: () => {},
    updateRedZoneAmount : () => {}
});

export default RedZoneContext;