import React, { Component } from 'react'

import { connect } from 'react-redux'
import { NavBar, List, InputItem, Grid, Icon } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim'

import { sendMsg } from '../../redux/actions'


class C extends Component {
    state = {
        content: ''
    }
    handleSend = () => {
        const from = this.props.user._id
        const to = this.props.match.params.userid
        const content = this.state.content.trim()

        //发送消息
        if (content) {
            this.props.sendMsg({ from, to, content })
        }
        //清除输入框
        this.setState({ content: '' })
    }
    render() {
        const { user } = this.props
        const { users, chatMsgs } = this.props.chat

        //计算当前聊天的chatId
        const meId = user._id
        console.log(users)

        return (
            <div>ccc</div>
        )
    }
}

export default connect(
    state => ({ user: state.user, chat: state.chat })
)(C)