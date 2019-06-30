import React,{Component} from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'

import UserList from '../../components/user-list/userList'
class Dashen extends Component{
    componentDidMount(){
        this.props.getUserList('laoban')
        // console.log(this.props.userList)
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
)(Dashen)
