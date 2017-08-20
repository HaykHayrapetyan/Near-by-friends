import React, { Component } from 'react'
import { Table, Icon } from 'antd';

const columns = [{
            title: 'Name',
            dataIndex: 'name',
        }, 
        {
            title: 'Distance',
            dataIndex: 'distance',
        }, 
        {
            title: 'Time',
            dataIndex: 'time',
        }, 
    ];

// const users = [{
//         key: '1',
//         name: 'John Brown',
//         time: 32,
//         distance: 'New York No. 1 Lake Park',
//     }];


class DataTable extends Component {
    constructor(){
        super()
        this.state = {
            users: []
        }
    }


    getReqConf = (method, body) => {
      let reqConf = {
          method,
          credentials: "include",
          headers: {
              "Content-Type" : "application/json"
          }
      }

      if (body) {
          reqConf.body = JSON.stringify(body);
      }

      return reqConf;
  }

    componentDidMount(){
        console.log('Front User List', this.props.users)
        const reqUrl = `http://localhost:8081/api/checkin/?lat=${this.props.users[0]}&lng=${this.props.users[1]}`
        const reqConf = this.getReqConf('GET');
        console.log('did mount')
        fetch(reqUrl, reqConf)
        .then(result => {
            console.log('fetch')
            return result.json()
        }) 
        .then(result => { 
            console.log(result)
            this.setState({
                users: result
            })
        })
        .catch(function(error) {
            console.log(error.toString())
        });
    }

    render(){
        return(
           <Table rowKey={this.state.users._id} columns={columns} dataSource={this.state.users} />
        )
    }
}

export default DataTable;