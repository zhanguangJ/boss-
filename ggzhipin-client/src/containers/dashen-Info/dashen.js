import React from 'react'
import {NavBar, InputItem, Button,WhiteSpace,TextareaItem} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {updateUser} from '../../redux/actions'
import HeaderSeletor from '../../components/header-seletor/header-seletor'

class Dashen extends React.Component{
    state={
        post:'',
        info:'',
        header:''
    }
    //更新header状态
    setHeader=(header)=>{
        this.setState({
            header
        })
    }
    handelChange = (name,val)=>{
        this.setState({
            [name] : val
        })
    }
    save = ()=>{
        this.props.updateUser(this.state)
    }
    render(){
        const {header,type} = this.props.user
        if(header){
            const path = type==='dashen' ? '/dashen' : '/laoban'
            return <Redirect to={path}/>
        }

        return(
            <div>
                <NavBar>个人信息完善</NavBar>
                <HeaderSeletor setHeader={this.setHeader}></HeaderSeletor>
                <InputItem placeholder='请输入求职岗位' onChange={val=>{this.handelChange('post',val)}}>求职岗位:</InputItem>
                <TextareaItem title='个人介绍:'
                    placeholder='请输入个人介绍'
                    rows={3}
                    onChange={val=>{this.handelChange('info',val)}}
                ></TextareaItem>
                <WhiteSpace/>
                <Button type='primary' onClick={this.save.bind(this)}>保&nbsp;&nbsp;&nbsp;存</Button>
            </div>
        )
    }
}

export default connect(
    state=>({user : state.user}),
    {updateUser}
)(Dashen)