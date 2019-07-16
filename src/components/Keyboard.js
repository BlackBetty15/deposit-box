import React, { Component } from 'react';
import Button from './Button';

class Keyboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            button: [
                {
                    id: 1,
                    value: 'L',
                    symbol: 'A',
                },
                {
                    id: 2,
                    value: '0',
                    symbol: '',
                }
                ,
                {
                    id: 3,
                    value: '*',
                    symbol: 'B',
                }
                ,
                {
                    id: 4,
                    value: '3',
                    symbol: '',
                }
                ,
                {
                    id: 5,
                    value: '2',
                    symbol: 'down',
                }
                ,
                {
                    id: 6,
                    value: '1',
                    symbol: '',
                }
                ,
                {
                    id: 7,
                    value: '6',
                    symbol: 'right',
                }
                ,
                {
                    id: 8,
                    value: '5',
                    symbol: '',
                }
                ,
                {
                    id: 9,
                    value: '4',
                    symbol: 'left',
                }
                ,
                {
                    id: 10,
                    value: '9',
                    symbol: '',
                }
                ,
                {
                    id: 11,
                    value: '8',
                    symbol: 'up',
                }
                ,
                {
                    id: 12,
                    value: '7',
                    symbol: '',
                }
            ].reverse()
        };
    }

    render(){
        return (
            <div className="keyboard">
                {
                    this.state.button.map((item) =>
                    <Button key={item.id} content={item} />)
                }
            </div>
        );
    }
}

export default Keyboard;