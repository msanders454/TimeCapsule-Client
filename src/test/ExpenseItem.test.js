import React from "react";
import { shallow, configure } from "enzyme";
import ExpenseItem from "../Routes/ExpenseItem/ExpenseItem";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
test("should render ExpenseItem correctly", () => {
  const wrapper = shallow(<ExpenseItem />);
  expect(wrapper).toMatchSnapshot();
});