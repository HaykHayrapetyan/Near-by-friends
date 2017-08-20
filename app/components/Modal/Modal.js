import React, { Component } from 'react';
import { Modal, Button } from 'antd';
import nod from 'nod-validate'
import cookie from 'js-cookie'


const style = {
    width: '30px'
}
class CheckIn extends Component {

  state = { visible: false}
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
  handleSubmit = (input) => {
        const reqUrl = "http://localhost:8081/api/checkin";
        const reqConf = this.getReqConf("POST", {name: input, location: this.props.users});
        
        fetch(reqUrl, reqConf)
        .then(result => {
            return 'hiii'
        }) 
        .catch(function(error) {
            alert(error.toString())
        });  
        
    }

  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = (e) => {
    console.log(e);
    
    const name = document.getElementById("inputName").value;
    this.setState({
      visible: false,
    });
    this.handleSubmit(name)
    
  }
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }
  render() {
    console.log('cookie', cookie.get('name'))
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>Check-in Now</Button>
        <Modal
          title="Basic Modal"
          style={style}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <div>
            <input id="inputName" type="text" defaultValue={cookie.get('name')}/>
          </div>
        </Modal>
      </div>
    );
  }
}

export default CheckIn