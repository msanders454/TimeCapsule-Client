import React from "react";
import { shallow, configure } from "enzyme";
import SideBar from "../SideBar/SideBar";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
test("should render SideBar correctly", () => {
  const wrapper = shallow(<SideBar />);
  expect(wrapper).toMatchSnapshot();
});