import React, { PropTypes, Component } from 'react';
import update from 'react/lib/update';
import _ from 'lodash';
import Bucket from './Bucket';

const $ = require('$');

export default class OverlayColumn extends Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    index: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    draggableActions: PropTypes.array.isRequired,
    doAction: PropTypes.func.isRequired,
    workflowScreenShow: PropTypes.func.isRequired,
    options: PropTypes.object.isRequired,
    states: PropTypes.array.isRequired
  }

  render() {
    const { isEmpty, states, draggableActions, options, doAction, workflowScreenShow } = this.props;

    const buckets = [];
    _.map(draggableActions, (v) => {
      if (_.findIndex(states, { id: v.state && v.state.id || '' }) !== -1) {
        buckets.push(v);
      }
    });

    const winHeight = $(window).height();
    const cellHeight = _.min([ winHeight - 170 - 10 - _.max([46 - $('.board-container').scrollTop(), 0]), $('.board-columns').height() ]) / _.max([ buckets.length, 1]); 

    return (
      <div className='board-zone-overlay-column' style={ { pointerEvents: isEmpty ? 'none' : 'auto' } }>
        <div className='board-zone-table'>
          <div className='board-zone-row'>
            { !isEmpty && 
              _.map(buckets, (v, i) =>
                <Bucket 
                  key={ i }
                  accepts={ _.map(options.states, (v) => v.id) }
                  doAction={ doAction }
                  workflowScreenShow={ workflowScreenShow }
                  dragAction={ v }
                  height={ cellHeight }/> ) }
          </div>
        </div>
      </div> );
  }
}
