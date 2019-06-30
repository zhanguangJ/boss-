import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/userList'

class Laoban extends Component{
    componentDidMount(){
        console.log(this)
        this.props.getUserList('dashen')
    }
    render(){
        return(
            <UserList userList={this.props.userList} />
        )
    }
}
export default connect(
    state =>({userList: state.userList}),
    {getUserList}
)(Laoban)
