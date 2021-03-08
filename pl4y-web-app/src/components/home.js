import React, {Component} from 'react';
import {Route, Switch, Link} from 'react-router-dom'
import Logo from "../logo-demo.svg";
import { Navbar, Nav, Button, Card, Row, Container, Col } from 'react-bootstrap'
import RootService from '../actions/rootservice'
import Catalogue from './catalogue';


export default class Home extends Component{

        constructor(props){
                super(props);
                this.state = {
                        games : [] ,
                        selected : null
                } 
        }

        componentDidMount(){
                RootService.fetchAllGames().then((res)=>{
                        this.setState({ games : res.data });
                        console.log(res.data);
                });
        }

        select(title){
                this.state.selected = title;
                this.forceUpdate();
        }

        render(){
                return(
                        <div> 
                                <Navbar id="dark" variant="dark" fixed="top" style={{backdropFilter:'blur(100px)', background:'rgba(25,25,25,0.1)'}}>
                                        <Navbar.Brand href="/" id="header">
                                        <img
                                                alt=""
                                                src={Logo}
                                                width="30"
                                                height="30"
                                                className="d-inline-block align-top"
                                        />{' '}
                                                PL4Y
                                                </Navbar.Brand>
                                        <Navbar.Toggle />
                                        <Nav className="ml-auto" activeKey={window.location.pathname} defaultActiveKey="/">
                                        <Nav.Link href="/" id="mono">Collection</Nav.Link>
                                        <Nav.Link href="#signout"  id="mono" disabled>Signout</Nav.Link>
                                        </Nav>
                                </Navbar>
                                <Switch>
                                        <Route path='/' exact>
                                                <Container style={{paddingTop: '4em'}}>
                                                        <Row>
                                                        {
                                                        this.state.games.map(
                                                        game =>
                                                                <Col md={4}  key={game.id} style={{padding:'1em'}}>
                                                                <Card className="text-white" onClick={()=>this.select(game.title)}>
                                                                <Link to={'/catalogue'} style={{textDecoration:'none', color:'inherit'}}>
                                                                        <Card.Img src={game.imgurl} alt="Card image" style={{width:'100%'}}/>
                                                                        <Card.ImgOverlay id="filter">
                                                                        <h4>{game.title}</h4>
                                                                        <Card.Text>{game.devname}</Card.Text>
                                                                        <hr></hr>
                                                                        <Button href={game.link} id="button-link" variant="light" target="_blank"><strong>Visit Store ➡️</strong></Button>
                                                                        </Card.ImgOverlay>
                                                                </Link>
                                                                </Card>
                                                                </Col>
                                                        )
                                                        }
                                                        </Row>
                                                </Container>
                                        </Route>
                                        <Route path={'/catalogue'}><Catalogue title={this.state.selected}></Catalogue></Route>
                                </Switch>
                        </div>
                );
        }
}

