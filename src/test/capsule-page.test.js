/* eslint-disable no-undef */
import CapsulesPage from '../Components/capsules/capsules-page';
import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
 
configure({ adapter: new Adapter() });
test("should render CapsulesPage correctly", () => {
  const wrapper = shallow(<CapsulesPage />);
  expect(wrapper).toMatchSnapshot();
});