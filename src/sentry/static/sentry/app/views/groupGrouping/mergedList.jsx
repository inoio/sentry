import React, {PropTypes} from 'react';

import {t} from '../../locale';
import {Event} from '../../proptypes';

import Pagination from '../../components/pagination';
import EmptyView from '../../components/emptyView';

import MergedItem from './mergedItem';
import MergedToolbar from './mergedToolbar';

const MergedList = React.createClass({
  propTypes: {
    onUnmerge: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(Event),
    pageLinks: PropTypes.string
  },

  render() {
    let {items, pageLinks, onUnmerge, ...otherProps} = this.props;
    let hasResults = items.length > 0;
    let cx = 'grouping-list-container grouping-merged-list-container';

    if (hasResults) {
      return (
        <div className={cx}>
          <h2>{t('Merged with this Issue')}</h2>
          <MergedToolbar onUnmerge={onUnmerge} />

          <div className="grouping-list">
            {items.map(({id, latestEvent}) => (
              <MergedItem
                key={id}
                {...otherProps}
                event={latestEvent}
                fingerprint={id}
                itemCount={items.length}
              />
            ))}
          </div>
          <Pagination pageLinks={pageLinks} />
        </div>
      );
    }

    return (
      <div className={cx}>
        <EmptyView>
          {`${t("There don't seem to be any hashes for this issue")}.`}
        </EmptyView>
      </div>
    );
  }
});

export default MergedList;
