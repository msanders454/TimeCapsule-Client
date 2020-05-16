/* eslint-disable no-undef */
import React from "react";
import { shallow, configure } from "enzyme";
import AddCapsulePage from '../Components/addCapsule/addCapsule';
import Adapter from "enzyme-adapter-react-16";
 
configure({ adapter: new Adapter() });
test("should render AddCapsule correctly", () => {
  const wrapper = shallow(<AddCapsulePage />);
  expect(wrapper).toMatchSnapshot();
});