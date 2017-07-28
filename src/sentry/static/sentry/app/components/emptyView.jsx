import React, {PropTypes} from 'react';
import classNames from 'classnames';

const EmptyView = React.createClass({
  propTypes: {
    icon: PropTypes.node
  },

  getDefaultProps() {
    return {
      icon: <span className="icon icon-exclamation" />
    };
  },

  render() {
    let {className, icon, children} = this.props;
    let cx = classNames('box', 'empty-stream', className);

    return (
      <div className={cx}>
        {icon}
        {React.Children.map(children, child => <p>{child}</p>)}
      </div>
    );
  }
});

export default EmptyView;
