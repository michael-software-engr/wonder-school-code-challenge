import React from 'react';
import ReactDOM from 'react-dom';

import renderer from 'react-test-renderer';

import App from '../App';

it('...', () => {
  const component = renderer.create(
    <App />,
  );

  // let tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseEnter();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();

  // // manually trigger the callback
  // tree.props.onMouseLeave();
  // // re-rendering
  // tree = component.toJSON();
  // expect(tree).toMatchSnapshot();
});
