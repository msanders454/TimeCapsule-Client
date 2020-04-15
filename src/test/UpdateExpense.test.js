/* eslint-disable no-undef */
import React from "react";
import { shallow, configure } from "enzyme";
import UpdateExpense from "../Routes/UpdateExpense/UpdateExpense";
import Adapter from "enzyme-adapter-react-16";
 
configure({ adapter: new Adapter() });
test("should render UpdateExpense correctly", () => {
  const match = {
        params : {expenseId : 1}
        }
  const wrapper = shallow(<UpdateExpense match={match}/>);
  expect(wrapper).toMatchSnapshot();
});