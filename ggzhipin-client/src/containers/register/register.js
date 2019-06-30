import React, { Component } from 'react'

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button
} from 'antd-mobile'

import { connect } from 'react-redux'
import { register } from '../../redux/actions'
import { Redirect } from 'react-router-dom'

import Logo from '../../components/logo/logo.js'

const ListItem = List.Item


class Register extends Component {
    state = {
        username: '',
        password: '',
        password1: '',
        type: 'dashen'
    }
    //注册
    register = () => {
        // console.log(this.state)
        this.props.register(this.state)
    }
    handelChange = (name, val) => {
        this.setState({
            [name]: val
        })
    }
    goLogin = () => {
        this.props.history.replace('/login')
    }

    render() {
        const { msg, redirectTo } = this.props.user
        if (redirectTo) {
            return <Redirect to={redirectTo} />
        }
        return (
            <div>
                <NavBar>Boss&nbsp;直&nbsp;聊</NavBar>
                <Logo />
                <WingBlank>
                    <List>
                        {msg ? <div className='error-msg'>{msg}</div> : null}
                        <WhiteSpace />
                        <InputItem 
                                placeholder='请输入用户名' 
                                onChange={val => { this.handelChange('username', val) }}>用户名:</InputItem>
                        <WhiteSpace />
                        <InputItem 
                            placeholder='请输入密码' 
                            type="password" 
                            onChange={val => { this.handelChange('password', val) }}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace />
                        <InputItem 
                            placeholder='请输入确认密码' 
                            type="password" 
                            onChange={val => { this.handelChange('password1', val) }}>确认密码:</InputItem>
                        <WhiteSpace />
                        <ListItem>
                            <span>用户类型:</span>&nbsp;&nbsp;&nbsp;
                            <Radio 
                                checked={this.state.type === 'dashen'} 
                                onChange={val => { this.handelChange('type', 'dashen') }}>大神</Radio>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <Radio 
                                checked={this.state.type === 'laoban'} 
                                onChange={val => { this.handelChange('type', 'laoban') }}>老板</Radio>
                        </ListItem>
                        <WhiteSpace />
                        <Button type="primary" onClick={this.register}>注&nbsp;&nbsp;&nbsp;册</Button>
                        <WhiteSpace />
                        <Button onClick={this.goLogin}>已有账号</Button>
                    </List>
                </WingBlank>

            </div>
        )
    }
}

export default connect(
    (state) => ({ user: state.user }),
    { register }
)(Register)