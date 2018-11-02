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


class Host extends PureComponent {

  render() {
    return (
      <g>
        <g transform={"translate(" + this.props.x + "," + this.props.y + ")"}>
            <g transform="scale(0.75)">
                {this.props.moving ?
                <g>
                    {/* horizontal line */}
                    <line x1="-150"
                       y1="0"
                       x2="150"
                       y2="0"
                       style={constructionLineStyle}>
                    </line>
                    {/*  end horizontal line */}

                    {/*  vertical line */}
                    <line x1="0"
                       y1="-150"
                       x2="0"
                       y2="150"
                       style={constructionLineStyle}>
                    </line>
                    {/*  end vertical line */}
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
                    {/*  end horizontal line */}

                    {/*  vertical line */}
                    <line x1="0"
                        y1="-40"
                        x2="0"
                        y2="40"
                        style={debugLineStyle}>
                    </line>
                    {/*  end vertical line */}

                    {/*  debug rectangle */}
                    <rect x="-50"
                        y="-30"
                        width="100"
                        height="60"
                        style={debugRectStyle}>
                    </rect>
                    {/*  end debug rectangle */}
                </g>
                : null}

                <g transform="translate(-50,-30)">
                    <rect
                        ry="20"
                        rx="20"
                        width="100"
                        height="60"
                        style={this.props.selected ? deviceSelectedStyle : deviceStyle}>
                    </rect>
                    <g transform="scale(2)">
                      <path
                            style={devicePathStyle}
                            d="M17.8,14.7c-0.3,0-0.6,0.2-0.6,0.6c0,0.3,0.2,0.6,0.6,0.6c0.3,0,0.6-0.2,0.6-0.6S18.1,14.7,17.8,14.7z"/>
                      <path
                            style={devicePathStyle}
                            d="M40.8,0H9.2C4.2,0,0,4.2,0,9.2v11.5C0,25.8,4.2,30,9.2,30h31.5c5.1,0,9.2-4.2,9.2-9.2V9.2
                        C50,4.2,45.8,0,40.8,0z M37.8,17.9c0,1-0.8,1.8-1.8,1.8H14c-1,0-1.8-0.8-1.8-1.8V13c0-1,0.8-1.8,1.8-1.8h22c1,0,1.8,0.8,1.8,1.8
                        V17.9z"/>
                      <path
                            style={devicePathStyle}
                            d="M36,12.5H14c-0.3,0-0.4,0.2-0.4,0.4v4.9c0,0.3,0.2,0.4,0.4,0.4h22c0.3,0,0.4-0.2,0.4-0.4v-4.9
                        C36.4,12.7,36.3,12.5,36,12.5z M17.8,17.2c-1.1,0-1.9-0.9-1.9-1.9c0-1.1,0.9-1.9,1.9-1.9s1.9,0.9,1.9,1.9S18.9,17.2,17.8,17.2z
                         M28.2,17.1h-0.9c-0.3,0-0.6-0.2-0.6-0.6s0.2-0.6,0.6-0.6h0.9c0.4,0,0.6,0.2,0.6,0.6C28.8,16.8,28.6,17.1,28.2,17.1z M28.2,14.9
                        h-0.9c-0.3,0-0.6-0.2-0.6-0.6c0-0.4,0.2-0.6,0.6-0.6h0.9c0.4,0,0.6,0.2,0.6,0.6C28.8,14.7,28.6,14.9,28.2,14.9z M30.9,17.1H30
                        c-0.3,0-0.6-0.2-0.6-0.6s0.2-0.6,0.6-0.6h0.9c0.4,0,0.6,0.2,0.6,0.6C31.5,16.8,31.3,17.1,30.9,17.1z M30.9,14.9H30
                        c-0.3,0-0.6-0.2-0.6-0.6c0-0.4,0.2-0.6,0.6-0.6h0.9c0.4,0,0.6,0.2,0.6,0.6S31.3,14.9,30.9,14.9z M33.6,17.1h-0.9
                        c-0.4,0-0.6-0.2-0.6-0.6s0.2-0.6,0.6-0.6h0.9c0.4,0,0.6,0.2,0.6,0.6C34.2,16.8,33.9,17.1,33.6,17.1z M33.6,14.9h-0.9
                        c-0.4,0-0.6-0.2-0.6-0.6c0-0.4,0.2-0.6,0.6-0.6h0.9c0.4,0,0.6,0.2,0.6,0.6C34.2,14.7,33.9,14.9,33.6,14.9z"/>
                    </g>
                </g>
                <g>
                    <TextInput x="0" y="50"
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
            <StatusLight item={this.props} />
        </g>
      </g>
    );
  }
}

export default Host;
