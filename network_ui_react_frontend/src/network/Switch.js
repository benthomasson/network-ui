import React, { Component } from 'react';

import TextInput from '../text/TextInput';

import {debugLineStyle,
        debugRectStyle,
        constructionLineStyle,
        deviceStyle,
        deviceSelectedStyle,
        devicePathStyle,
        deviceTextStyle
        } from '../style/Styles.js';

class Switch extends Component {
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
                        y1="-60"
                        x2="0"
                        y2="60"
                        style={debugLineStyle}>
                    </line>
                    {/*  end vertical line */}

                    {/*  debug rectangle */}
                    <rect x="-50"
                        y="-50"
                        width="100"
                        height="100"
                        style={debugRectStyle}>
                    </rect>
                    {/*  end debug rectangle */}
                </g>
                : null}

                <g transform="translate(-50,-50)">
                    <rect
                        ry="20"
                        rx="20"
                        width="100"
                        height="100"
                        style={this.props.selected ? deviceSelectedStyle : deviceStyle}>
                    </rect>
                    <g transform="scale(2)">
                        <path
                            style={devicePathStyle}
                            d="M40.8,0H9.2C4.2,0,0,4.2,0,9.2v31.5C0,45.8,4.2,50,9.2,50h31.5c5.1,0,9.2-4.2,9.2-9.2V9.2C50,4.2,45.8,0,40.8,0
                            z M22.2,12.6l11.1,0l-2.3-2.3c-0.4-0.4-0.4-1.2,0-1.6c0.4-0.4,1.2-0.4,1.6,0l4.2,4.2c0.2,0.2,0.3,0.5,0.3,0.8c0,0.3-0.1,0.6-0.3,0.8
                            l-4.2,4.2c-0.4,0.4-1.2,0.4-1.6,0c-0.4-0.4-0.4-1.2,0-1.6l2.3-2.3H22.2c-0.6,0-1.1-0.5-1.1-1.1C21.1,13.1,21.6,12.6,22.2,12.6z
                             M10,21.2c0-0.3,0.1-0.6,0.3-0.8l4.2-4.2c0.4-0.4,1.2-0.4,1.6,0c0.4,0.4,0.4,1.2,0,1.6l-2.3,2.3H25c0.6,0,1.1,0.5,1.1,1.1
                            c0,0.6-0.5,1.1-1.1,1.1l-11.1,0l2.3,2.3c0.4,0.4,0.4,1.2,0,1.6c-0.4,0.4-1.2,0.4-1.6,0L10.3,22C10.1,21.8,10,21.5,10,21.2z
                             M27.8,37.4l-11.1,0l2.3,2.3c0.4,0.4,0.4,1.2,0,1.6c-0.4,0.4-1.2,0.4-1.6,0l-4.2-4.2c-0.2-0.2-0.3-0.5-0.3-0.8
                            c0-0.3,0.1-0.6,0.3-0.8l4.2-4.2c0.4-0.4,1.2-0.4,1.6,0c0.4,0.4,0.4,1.2,0,1.6l-2.3,2.3h11.1c0.6,0,1.1,0.5,1.1,1.1
                            C28.9,36.9,28.4,37.4,27.8,37.4z M39.7,29.6l-4.2,4.2c-0.4,0.4-1.2,0.4-1.6,0c-0.4-0.4-0.4-1.2,0-1.6l2.3-2.3H25
                            c-0.6,0-1.1-0.5-1.1-1.1c0-0.6,0.5-1.1,1.1-1.1l11.1,0l-2.3-2.3c-0.4-0.4-0.4-1.2,0-1.6c0.4-0.4,1.2-0.4,1.6,0l4.2,4.2
                            c0.2,0.2,0.3,0.5,0.3,0.8C40,29.1,39.9,29.4,39.7,29.6z"/>
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
        </g>
      </g>
    );
  }
}

export default Switch;
