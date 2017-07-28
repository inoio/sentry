import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import EmptyView from 'app/components/emptyView';

describe('EmptyView', function() {
  it('renders', function() {
    let wrapper = shallow(<EmptyView>Empty View</EmptyView>);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders w/ multiple children', function() {
    let wrapper = shallow(
      <EmptyView>
        Empty View
        <span>
          Another Child
        </span>
      </EmptyView>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('renders with different icon', function() {
    let wrapper = shallow(
      <EmptyView icon={<span className="icon icon-test" />}>
        Empty View w/ icon
        <span>
          Another Child
        </span>
      </EmptyView>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
