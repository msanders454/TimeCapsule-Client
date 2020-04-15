/* eslint-disable no-undef */
import React from "react";
import { shallow, configure } from "enzyme";
import LoginPage from "../Routes/LoginPage/LoginPage";
import Adapter from "enzyme-adapter-react-16";
 
configure({ adapter: new Adapter() });
test("should render LoginPage correctly", () => {
  const wrapper = shallow(<LoginPage />);
  expect(wrapper).toMatchSnapshot();
});