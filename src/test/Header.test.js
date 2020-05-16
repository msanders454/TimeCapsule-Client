/* eslint-disable no-undef */
import React from "react";
import { shallow, configure} from "enzyme";
import Header from "../header/header";
import Adapter from "enzyme-adapter-react-16";
 
configure({ adapter: new Adapter() });
test("should render Header correctly", () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});