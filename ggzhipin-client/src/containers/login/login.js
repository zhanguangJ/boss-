import React,{Component} from 'react'

import {
    NavBar,
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'

import {connect} from 'react-redux' 
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/actions'

import Logo from '../../components/logo/logo.js'

class Login extends Component{
    state={
        username : '',
        password : ''
    }
    login=()=>{
        this.props.login(this.state)
    }
    goRegister=()=>{
        this.props.history.replace('/register')
    }
    handelChange=(name,val)=>{
        this.setState({
            [name] : val
        })
    }
    render(){
        const {msg,redirectTo} = this.props.user
        if(redirectTo){
            return <Redirect to={redirectTo}/>
        }
        return(
            <div>
                <NavBar>Boss&nbsp;直&nbsp;聊</NavBar>
                <Logo/>
                <WingBlank>
                    {msg?<p className='error-msg'>{msg}</p>:null}
                    <List>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入用户名' onChange={val=>{this.handelChange('username',val)}}>用户名:</InputItem>
                        <WhiteSpace/>
                        <InputItem placeholder='请输入密码' type="password" onChange={val=>{this.handelChange('password',val)}}>密&nbsp;&nbsp;&nbsp;码:</InputItem>
                        <WhiteSpace/>
                        <Button type="primary" onClick={this.login}>登&nbsp;&nbsp;&nbsp;录</Button>
                        <WhiteSpace/>
                        <Button onClick={this.goRegister}>还没有有账号</Button>
                    </List>                
                </WingBlank>

            </div>
        )
    }
}

export default connect(
    state => ({user: state.user}),
    {login}
)(Login)