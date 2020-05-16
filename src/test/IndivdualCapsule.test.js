/* eslint-disable no-undef */
import IndividualCapsule from '../Components/IndivdualCapsule/IndivdualCapsule';
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
 
configure({ adapter: new Adapter() });
test("should render IndividualCapsule correctly", () => {
  const wrapper = shallow(<IndividualCapsule />);
  expect(wrapper).toMatchSnapshot();
});