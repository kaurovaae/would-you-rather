import React, {Component}               from 'react';
import {connect}                        from 'react-redux';

class Question extends Component {
    render() {
        return (
            <div>
                {this.props.id}
            </div>
        )
    }
}

export default connect()(Question);
