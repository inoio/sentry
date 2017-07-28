import React, {PropTypes} from 'react';

import {t} from '../../locale';
import {Group} from '../../proptypes';

import Pagination from '../../components/pagination';
import EmptyView from '../../components/emptyView';

import SimilarToolbar from './similarToolbar';
import SimilarItem from './similarItem';

const SimilarItemPropType = PropTypes.shape({
  issue: Group,
  score: PropTypes.object,
  avgScore: PropTypes.number,
  isBelowThreshold: PropTypes.bool
});

const SimilarList = React.createClass({
  propTypes: {
    orgId: PropTypes.string.isRequired,
    projectId: PropTypes.string.isRequired,
    onMerge: PropTypes.func.isRequired,
    pageLinks: PropTypes.string,
    items: PropTypes.arrayOf(SimilarItemPropType),
    filteredItems: PropTypes.arrayOf(SimilarItemPropType)
  },

  getInitialState() {
    return {
      showAllItems: false
    };
  },

  render() {
    let {orgId, projectId, items, filteredItems, pageLinks, onMerge} = this.props;
    let hasHiddenItems = !!filteredItems.length;
    let hasResults = items.length > 0 || hasHiddenItems;
    let cx = 'grouping-list-container grouping-similar-list-container';

    if (hasResults) {
      return (
        <div className={cx}>
          <h2>{t('Similar Issues')}</h2>
          <SimilarToolbar onMerge={onMerge} />

          <div className="grouping-list">
            {items.map(item => (
              <SimilarItem
                key={item.issue.id}
                orgId={orgId}
                projectId={projectId}
                {...item}
              />
            ))}

            {this.state.showAllItems &&
              filteredItems.map(item => (
                <SimilarItem
                  key={item.issue.id}
                  orgId={orgId}
                  projectId={projectId}
                  {...item}
                />
              ))}
            {hasHiddenItems &&
              !this.state.showAllItems &&
              <div className="similar-items-footer">
                <button
                  className="btn btn-default btn-xl"
                  onClick={() => this.setState({showAllItems: true})}>
                  Show {filteredItems.length} issues below threshold
                </button>
              </div>}
          </div>
          <Pagination pageLinks={pageLinks} />
        </div>
      );
    }

    return (
      <div className={cx}>
        <EmptyView>
          {t('There are no similar issues.')}
        </EmptyView>
      </div>
    );
  }
});

export default SimilarList;
