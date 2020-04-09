import React from "react";
import { shallow, configure } from "enzyme";
import ExpenseForm from "../ExpenseForm/ExpenseForm";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
test("should render ExpenseForm correctly", () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});