import * as React from 'react';
import HomePage from '../HomePage';
import renderer from 'react-test-renderer';

it('HomePage renders correctly', () => {
    const component = renderer.create(<HomePage />);
    const result = component.toJSON();
    expect(result).toMatchSnapshot();
});