import React, { PureComponent } from 'react';

import Select from '../text/Select';

class PlaybookSelect extends PureComponent {

  render() {
    return (
        <Select {...this.props} />
    );
  }
}

export default PlaybookSelect;
