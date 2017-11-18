import React, { Component } from 'react';
import './App.css';


class Card extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div class="card-wrapper">
                <div class="card-details">
                    <div class="card">
                        <div class="card-name">
                            {this.props.name}
                        </div>
                        <div class="card-description">
                            {this.props.description}
                        </div>
                        <div class="card-language">
                            {this.props.language}
                        </div>
                        <div class="card-stars">
                            <div class="star-icon-wrapper">
                                <img src="https://vignette2.wikia.nocookie.net/fantendo/images/4/45/Battle_Star.png/revision/latest?cb=20120818191010" />
                            </div>
                            <div class="star-value-wrapper">
                                {this.props.stars}
                            </div>

                        </div>
                    </div>
                </div>
                <div class="card-avatar">
                    <img src={this.props.avatar} />
                </div>
            </div>
        );
    }
}

export default Card;