import React, { Component } from "react";
import { Link} from 'react-router-dom'

import { Modal, Button, Card, Row, Container, Col } from 'react-bootstrap'
import RootService from '../actions/rootservice'
export default class GameCards extends Component{
        constructor(props){
                super(props);
                this.state = {
                        games : [],
                        show: false,
                        idToDel : null,
                        nameToDel: null
                } 
                this.setProps = this.setProps.bind(this);
                this.deleteGame = this.deleteGame.bind(this)
                this.handleClose = this.handleClose.bind(this);
                this.handleDelete = this.handleDelete.bind(this);
                this.handleShow = this.handleShow.bind(this);
                
        }

        deleteGame(id, name){
                RootService.deleteGame(id).then((res)=>{
                        console.log("Remaining games : ", res.data);
                        alert("Deleted "+name);
                        this.state.idToDel = null;
                        this.state.nameToDel = null;
                        window.location.reload(false);
                });
        }

        setProps(id, name){
                this.state.idToDel = id;
                this.state.nameToDel = name;
                this.handleShow();
        }

        handleClose() {
		this.setState({ show: false });
                window.location.reload(false);
        }
        handleShow() {
                this.setState({ show: true });
        }
        handleDelete() {
                this.setState({ show: false });
                this.deleteGame(this.state.idToDel, this.state.nameToDel)
        }

        componentDidMount(){
                RootService.fetchAllGames().then((res)=>{
                        this.setState({ games : res.data });
                        console.log(res.data);
                        this.forceUpdate();
                });
        }

        // this.deleteGame(game.id, game.title)
        render(){
                return(
                        <div>
                                
                                <Container style={{paddingTop: '4em'}}>
                                        <h1>Games registered on PL4Y</h1>
                                        <br></br><hr></hr><br></br>
                                        <h1 style={{paddingBottom:'1em'}}><Link to='add-a-game'><Button id="button-link" variant="light" style={{width:'100%'}}><strong>ADD A GAME</strong></Button></Link></h1>
                                       
                                       <Row>{
                                                                this.state.games.map(
                                                                game =>
                                                                <Col sm={4} key={game.id} style={{padding:'1em'}}>
                                                                        <Card className="text-white">
                                                                                <Card.Img src={game.imgurl} alt="Card image" style={{width:'100%'}} />
                                                                                <Card.ImgOverlay id="filter">
                                                                                <h1>{game.title}</h1>
                                                                                <h5>{game.devname}</h5>
                                                                                <hr></hr>
                                                                                <Button href={game.link} variant="light" target="_blank">Visit Store</Button>
                                                                                <span> </span>
                                                                                <Button variant="danger" onClick={()=>this.setProps(game.id, game.title)}>Delete Game</Button>
                                                                                </Card.ImgOverlay>
                                                                        </Card>
                                                                </Col>
                                                        
                                                        )
                                                        }
                                       </Row>
                                       <br></br>
                               </Container>
                               <Modal show={this.state.show} onHide={this.handleClose}>
                                        <Link to='/' id="no-text-decor"><Modal.Header closeButton>
                                                <Modal.Title>Delete {this.state.title}?</Modal.Title>
                                                </Modal.Header>
                                        </Link>
                                        <Modal.Body style={{color:'#050505'}}>Are you sure you want to delete {this.state.title}?</Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="danger" onClick={this.handleDelete}><Link to='/'>🗑️ Delete</Link></Button>
                                        <Button variant="secondary" onClick={this.handleClose}>Cancel
                                        </Button>
                                        
                                        </Modal.Footer>
                                </Modal>
                               
                        </div>
                );
        }
}