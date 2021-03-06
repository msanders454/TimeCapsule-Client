/* eslint-disable no-undef */
import React from "react";
import { shallow, configure } from "enzyme";
import LandingPage from "../Components/landing-page/landing-page";
import Adapter from "enzyme-adapter-react-16";
 
configure({ adapter: new Adapter() });
test("should render AddExpense correctly", () => {
  const wrapper = shallow(<LandingPage />);
  expect(wrapper).toMatchSnapshot();
});