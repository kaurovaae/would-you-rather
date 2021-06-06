import React, {Component}        from 'react';
import PropTypes                from "prop-types";

class Answer extends Component {
    state = {
        left: 0,
        percent: 0
    };

    componentDidMount() {
        const {filled, all} = this.props;
        const percent = Math.round(filled * 100 / all);

        const lineElWidth = document.getElementById("line").getBoundingClientRect().width;

        this.setState(() => ({
            percent,
            left: Math.round(percent * lineElWidth / 100)
        }))
    }

    render() {
        const {left, percent} = this.state;
        const {filled, all, isActive, text} = this.props;

        const diff = left - 44;
        const leftPos = diff <= 0 ? 8 : diff;

        return (
            <div className={isActive ? 'selected-answer' : ''}>
                <span>Would you rather {text}</span>
                <div className="progress-bar">
                    <div id="line" className="line">
                        <div className="filled" style={{width: left}} />
                        <span style={{left: leftPos}}>{percent}%</span>
                    </div>
                    <div>{filled} out of {all} votes</div>
                </div>
                {isActive && (
                    <div className="vote">
                        Your vote
                    </div>
                )}
            </div>
        )
    }
}

Answer.propTypes = {
    filled: PropTypes.number.isRequired,
    all: PropTypes.number.isRequired,
    isActive: PropTypes.bool,
    text: PropTypes.string.isRequired
};

export default Answer;
