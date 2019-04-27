import React, { Component } from 'react'

import Info from './Info'
import Contact from './Contact'

class University extends Component {

    state = {
        bottom: false
    }

    componentDidMount() {
        this.refs.iScroll.addEventListener("scroll", () => this.handleScroll())
    }

    handleScroll = event => {
        if (this.refs.iScroll.scrollTop + this.refs.iScroll.clientHeight >= this.refs.cScroll.scrollHeight + 35){
            this.setState({
                bottom: true
            })
        }
        if (this.refs.iScroll.scrollTop === 0) {
            this.setState({
                bottom: false
            })
        }
    }

    render() {
        return(
            <div ref="iScroll" className="home">
                {
                    this.props.univer.univer ?
                        <div className="u-i-cont">
                            <Info {...this.props} />
                            <div
                                ref="cScroll"
                                className={ this.state.bottom ? "u-c-wrapper p-fixed" : "u-c-wrapper" }
                            >
                                <Contact
                                    {...this.state}
                                    {...this.props}
                                />
                            </div>
                        </div> :
                        null
                }
            </div>
        )
    }
}

export default University
