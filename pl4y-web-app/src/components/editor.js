import React, { Component } from "react";
import {Route, Switch, Link } from 'react-router-dom'
import Logo from "../logo-demo.svg"; 
import { Navbar, Nav, Container } from 'react-bootstrap'
import GameCards from './gamecards';
import AddGame from './addGame'


export default class Editor extends Component{
        constructor(props){
                super(props);
                this.state={
                        show: false
                }
                
        }

        render(){
                return(
                        <div>
                                <Navbar bg="dark" variant="dark" fixed="top">
                                        <Navbar.Brand href="/" id="header"><img
                                                alt=""
                                                src={Logo}
                                                width="30"
                                                height="30"
                                                className="d-inline-block align-top"
                                        />{' '}
                                        PL4Y | <span id="mono" style={{fontWeight:'400'}}>EDITOR</span>
                                        </Navbar.Brand>
                                        <Navbar.Toggle />
                                        <Nav className="ml-auto" activeKey={window.location.pathname} defaultActiveKey="/">
                                        <Nav.Link href="/" id="mono">Games</Nav.Link>
                                        <Nav.Link href="#signout"  id="mono">Signout</Nav.Link>
                                        </Nav>
                                </Navbar>
                                <Container style={{marginTop:'5em'}}>
                                <Switch>
                                        <Route path="/" exact><GameCards></GameCards></Route>
                                        <Route path="/add-a-game" exact><AddGame></AddGame></Route>
                                </Switch>
                                </Container>
                                
                        </div>
                );
        }
}