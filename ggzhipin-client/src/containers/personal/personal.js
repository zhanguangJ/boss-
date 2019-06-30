import React,{Component} from 'react'
import {connect} from 'react-redux'
import {Result,List,Button,Modal} from 'antd-mobile'
import Cookies from 'js-cookie'
import {resetUser} from '../../redux/actions'

const Item = List.Item
const Brief = Item.Brief

class Personal extends Component{
    logout=()=>{
        Modal.alert('退出','确定退出登录吗？',[
            {text:'取消'},
            {
                text:'确定',
                onPress:()=>{
                    Cookies.remove('userid')
                    this.props.resetUser()
                }
            }
        ])
    }
    render(){
        // console.log(this.props.user)
        const {username,info,header,company,post,salary} = this.props.user
        return(
            <div style={{marginBottom:50,marginTop:50}}>    
                <Result
                    img={<img src={require(`../../assets/images/headers/${header}.png`)} style={{width:50}} alt='header'/>}
                    title={username}
                    message={company}
                />
                <List renderHeader={()=>'相关信息'}>
                    <Item multipleLine>
                        <Brief>职位：{post}</Brief>
                        <Brief>简介：{info}</Brief>
                        {salary ? <Brief>薪资：{salary}</Brief>:null}
                    </Item>
                </List>
                <Button type='warning' onClick={this.logout}>退出登录</Button>
            </div>
        )
    }
}
export default connect(
    state =>({user:state.user}),
    {resetUser}
)(Personal)
