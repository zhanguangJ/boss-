import React,{Component} from 'react'
import {Switch,Route,Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import Cookies from 'js-cookie'
import Laobaninfo from '../laoban-Info/laoban'
import Dasheninfo from '../dashen-Info/dashen'
import Dashen from '../dashen/dashen'
import Laoban from '../laoban/laoban'
import Message from '../message/message'
import Personal from '../personal/personal'
import Chat from '../chat/chat'


import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/Footer'

import {NavBar} from 'antd-mobile'


import {getRedirectTo} from '../../utils/index'
import {getUser} from '../../redux/actions'
 
class MAIN extends Component{
    // 给组件对象添加属性
    navList = [ // 包含所有导航组件的相关信息数据
        {
        path: '/laoban', // 路由路径
        component: Laoban,
        title: '大神列表',
        icon: 'dashen',
        text: '大神',
        },
        {
        path: '/dashen', // 路由路径
        component: Dashen,
        title: '老板列表',
        icon: 'laoban',
        text: '老板',
        },
        {
        path: '/message', // 路由路径
        component: Message,
        title: '消息列表',
        icon: 'message',
        text: '消息',
        },
        {
        path: '/personal', // 路由路径
        component: Personal,
        title: '用户中心',
        icon: 'personal',
        text: '个人',
        }
    ]
    componentDidMount(){
        const userid = Cookies.get('userid')
        const {_id} = this.props.user
        if(userid && !_id){
            this.props.getUser()
        }
    }
    render(){
        // 读取cookie中的userid
        const userid = Cookies.get('userid')
        // 如果没有, 自动重定向到登陆界面
        if(!userid){
            return <Redirect to='/login'/>
        }
        // 如果有,读取redux中的user状态
        const {user,unReadCount} = this.props
        // console.log(this.props)
        // 如果user有没有_id, 返回null(不做任何显示)
        if(!user._id){
            return null
        }else{
            // 如果有_id, 显示对应的界面
            // 如果请求根路径, 根据user的type和header来计算出一个重定向的路由路径, 并自动重定向
            let path = this.props.location.pathname
            if(path === '/'){
                // 得到一个重定向的路由路径
                path = getRedirectTo(user.type, user.header)
                return <Redirect to= {path}/>
            }
        }
        // console.log(this)
        const {navList} = this
        const path = this.props.location.pathname//请求的路径
        const currentNav = navList.find(nav=> nav.path===path)

        if(currentNav){
            if(user.type === 'laoban'){
                navList[1].hide = true
            }else{
                navList[0].hide = true
            }
        }
        return(
            <div>
                {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        navList.map(nav=><Route path={nav.path} component={nav.component} key={nav.path}></Route>)
                    }
                    <Route path='/laobaninfo' component={Laobaninfo}></Route>
                    <Route path='/dasheninfo' component={Dasheninfo}></Route>
                    <Route path='/chat/:userid' component={Chat}></Route>

                    <Route component={NotFound}></Route>
                </Switch>
                {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount}></NavFooter> : null}
            </div>
        )
    }
}
export default connect(
    state=>({user:state.user,unReadCount:state.chat.unReadCount}),
    {getUser}
)(MAIN)