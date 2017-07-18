import React, {Component} from 'react';
import Web3 from 'web3'

import Menu from './Menu'
import Navbar from './Navbar'
import Qualify from './Qualify'
import Tab1 from './Tab1';
import styles from './style.css';

import {Grid, Row, Col, Tabs, Tab} from 'react-bootstrap';

export default class HomeContainer extends Component{
  constructor(props){
    super(props)

    this.state = {
      option : '',
      version: ''

    }

    this.revealChoice = this.revealChoice.bind(this)
  }

  revealChoice(cb) {
    this.setState({option: cb})
  }


  componentDidMount(){
    window.addEventListener('load', () => {

      // Checking if Web3 has been injected by the browser (Mist/MetaMask)
      if (typeof web3 !== 'undefined') {
        // Use Mist/MetaMask's provider
        window.web3 = new Web3(web3.currentProvider);
        console.log('Using injected web3')
        console.log(window.web3.eth.getBlockNumber((err,result) =>{console.log('Latest Block Number:',result,'Error or null:',err)}))
        this.setState({version:window.web3.version.network})

      } else {
        console.log('No injected web3, attempting to connect to local host')
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
        this.setState({version:window.web3.version.network})
      }
    })
  }
// <div>
//         <Navbar version={this.state.version}/>
//         <div id="belowNav">
//           <Qualify id="qualify" choose={this.revealChoice} />
//           <Menu id='menu' choice={this.state.option} version={this.state.version}/>
//         </div>
//       </div>
  render(){
    let obj = {}
    console.log(this.state.version);
    if (this.state.version === '3') obj.version =  'Ropsten'
    else if (this.state.version === '1') obj.version = 'Mainnet'
    const frozenNetwork = Object.freeze(obj)
    return (
      <Grid>
        <Row>
          <Col smOffset={2} sm={8} style={{padding: 60}}>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example" className="tab-container">
                <Tab eventKey={1} title="Get info on current deposit" style={{background:'#000', padding: 30}}> 
                  <div id="belowNav">
                   <Menu id='menu' choice="getInfo" version={this.state.version}/>
                  </div> 
                </Tab>
                <Tab eventKey={2} title="Deposit ETH for a fixed time" style={{background:'#000', padding: 30}}>
                  <div id="belowNav">
                   <Menu id='menu' choice="depositFunds" version={this.state.version}/>
                  </div> 
                </Tab>
                <Tab eventKey={3} title="Withdraw ETH" style={{background:'#000', padding: 30}}>
                  <div id="belowNav">
                   <Menu id='menu' choice="withdrawFunds" version={this.state.version}/>
                  </div> 
                </Tab>
            </Tabs>
          </Col>
        </Row>
      </Grid>
    )
  }
}





