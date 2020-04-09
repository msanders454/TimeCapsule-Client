import React from "react";
import { shallow, configure } from "enzyme";
import Statistics from "../Routes/Statistics/Statistics";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
test("should render Statistics correctly", () => {
  const wrapper = shallow(<Statistics  />);
  expect(wrapper).toMatchSnapshot();
});