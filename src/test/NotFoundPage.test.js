/* eslint-disable no-undef */
import React from "react";
import { shallow, configure } from "enzyme";
import NotFoundPage from "../Routes/NotFoundPage/NotFoundPage";
import Adapter from "enzyme-adapter-react-16";
 
configure({ adapter: new Adapter() });
test("should render NotFoundPage correctly", () => {
  const wrapper = shallow(<NotFoundPage />);
  expect(wrapper).toMatchSnapshot();
});