import React from 'react'
import {NavBar, InputItem, TextareaItem, Button,WhiteSpace} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {updateUser} from '../../redux/actions'
import HeaderSeletor from '../../components/header-seletor/header-seletor'

class Laoban extends React.Component{
    state={
        post:'',
        company:'',
        salary:'',
        info:'',
        header:''
    }
    handelChange=(name,val)=>{
        this.setState({
            [name]:val
        })
    }
    setHeader=(header)=>{
        this.setState({
            header,
        })
    }
    save=()=>{
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
                <NavBar>招聘信息完善</NavBar>
                <HeaderSeletor setHeader={this.setHeader}></HeaderSeletor>
                <InputItem placeholder='请输入招聘职位'  onChange={val=>{this.handelChange('post',val)}}>招聘职位:</InputItem>
                <InputItem placeholder='请输入公司名称'  onChange={val=>{this.handelChange('company',val)}}>公司名称:</InputItem>
                <InputItem placeholder='请输入职位薪资'  onChange={val=>{this.handelChange('salary',val)}}>职位薪资:</InputItem>
                <TextareaItem title='职位要求:'
                    placeholder="请输入职位要求"
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
    state=>({user:state.user}),
    {updateUser}
)(Laoban)