/* eslint-disable no-undef */
import React from "react";
import { shallow, configure } from "enzyme";
import AddExpense from "../Routes/addExpense/addExpense";
import Adapter from "enzyme-adapter-react-16";
 
configure({ adapter: new Adapter() });
test("should render AddExpense correctly", () => {
  const wrapper = shallow(<AddExpense />);
  expect(wrapper).toMatchSnapshot();
});