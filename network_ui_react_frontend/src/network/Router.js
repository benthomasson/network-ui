import React, { PureComponent } from 'react';

import StatusLight from '../monitor/StatusLight';
import TextInput from '../text/TextInput';

import {debugLineStyle,
        debugRectStyle,
        constructionLineStyle,
        deviceStyle,
        deviceSelectedStyle,
        devicePathStyle,
        deviceTextStyle
        } from '../style/Styles.js';


class Router extends PureComponent {

  render() {
    return (
      <g>
        <g transform={"translate(" + this.props.x + "," + this.props.y + ")"}>
            <g transform="scale(0.75)">
                {this.props.moving ?
                <g>
                    {/*horizontal line*/}
                    <line x1="-150"
                       y1="0"
                       x2="150"
                       y2="0"
                       style={constructionLineStyle}>
                    </line>
                    {/* end horizontal line*/}

                  {/* vertical line */}
                    <line x1="0"
                       y1="-150"
                       x2="0"
                       y2="150"
                       style={constructionLineStyle}>
                    </line>
                    {/* end vertical line */}
                </g>
                : null}

                {this.props.showDebug ?
                <g>
                    {/* horizontal line */}
                    <line x1="-60"
                        y1="0"
                        x2="60"
                        y2="0"
                        style={debugLineStyle}>
                    </line>
                    {/* end horizontal line

                    {/* vertical line */}
                    <line x1="0"
                        y1="-60"
                        x2="0"
                        y2="60"
                        style={debugLineStyle}>
                    </line>
                    {/* end vertical line

                    {/* debug rectangle */}
                    <rect x="-50"
                        y="-50"
                        width="100"
                        height="100"
                        style={debugRectStyle}>
                    </rect>
                    {/* end debug rectangle */}
                </g>
                : null}
                <g transform="translate(-50,-50)">
                    <circle
                        cx="50"
                        cy="50"
                        r="50"
                        style={this.props.selected ? deviceSelectedStyle : deviceStyle}>
                    </circle>
                    <g transform="scale(2)">
                        <path
                            style={devicePathStyle}
                            d="M42.7,7.3c-9.8-9.8-25.6-9.8-35.4,0c-9.8,9.8-9.8,25.6,0,35.4c9.8,9.8,25.6,9.8,35.4,0
                            C52.4,32.9,52.4,17.1,42.7,7.3z M20,12.3l4.2-4.2c0.2-0.2,0.5-0.3,0.8-0.3c0.3,0,0.6,0.1,0.8,0.3l4.2,4.2c0.4,0.4,0.4,1.2,0,1.6
                            c-0.4,0.4-1.2,0.4-1.6,0l-2.3-2.3v10c0,0.6-0.5,1.1-1.1,1.1c-0.6,0-1.1-0.5-1.1-1.1l0-10L21.6,14c-0.4,0.4-1.2,0.4-1.6,0
                            C19.5,13.5,19.5,12.8,20,12.3z M15.6,29.8c-0.4-0.4-0.4-1.2,0-1.6l0,0l2.1-2.1l-8.7,0c-0.6,0-1.1-0.5-1.1-1.1c0-0.3,0.1-0.6,0.3-0.8
                            C8.4,24,8.7,23.8,9,23.8l8.7,0l-2.1-2.1c-0.4-0.4-0.4-1.2,0-1.6c0.4-0.4,1.2-0.4,1.6,0l4,4c0.2,0.2,0.3,0.5,0.3,0.8
                            c0,0.3-0.1,0.6-0.3,0.8l0,0l-4,4C16.8,30.3,16.1,30.3,15.6,29.8z M30,37.7l-4.2,4.2c-0.2,0.2-0.5,0.3-0.8,0.3
                            c-0.3,0-0.6-0.1-0.8-0.3L20,37.7c-0.4-0.4-0.4-1.2,0-1.6c0.4-0.4,1.2-0.4,1.6,0l2.3,2.3l0-10.2c0-0.3,0.1-0.6,0.3-0.8
                            c0.2-0.2,0.5-0.3,0.8-0.3c0.6,0,1.1,0.5,1.1,1.1l0,10.2l2.3-2.3c0.4-0.4,1.2-0.4,1.6,0C30.5,36.5,30.5,37.2,30,37.7z M41,26.2
                            l-8.9,0l2.1,2.1c0.4,0.4,0.5,1.2,0,1.6c-0.4,0.4-1.2,0.4-1.6,0l-4-4c-0.2-0.2-0.3-0.5-0.3-0.8c0-0.3,0.1-0.6,0.3-0.8l0,0l4-4
                            c0.4-0.4,1.2-0.4,1.6,0c0.4,0.4,0.4,1.2,0,1.6l0,0l-2.1,2.1l8.8,0c0.6,0,1.1,0.5,1.1,1.1C42.1,25.6,41.6,26.2,41,26.2z"/>
                    </g>
                </g>
                <g>
                    <TextInput x="0" y="75"
                               value={this.props.name}
                               selected={this.props.selected}
                               width={this.props.text_width} height={20}
                               show_cursor={this.props.edit_label}
                               edit={this.props.edit_label}
                               id={'Device_' + this.props.id}
                               cursor_pos={this.props.cursor_pos}
                               blink={this.props.blink}
                               />
                </g>
            </g>
            <StatusLight {...this.props} />
      </g>
      </g>
    );
  }
}

export default Router;
