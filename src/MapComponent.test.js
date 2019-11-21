import React from "react";
import MapComponent from "./MapComponent";
import renderer from 'react-test-renderer';
import { shallow, mount, render } from 'enzyme';

test('MapComponent renderer', () => {
  const component = renderer.create(
    <MapComponent></MapComponent>
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('MapComponent mount', () => {
  const wrapper = mount(<MapComponent />);
});
