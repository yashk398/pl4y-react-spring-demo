import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import ReviewService from '../actions/reviewservice'
import { Image, Container, Row, Col, ProgressBar, Button, Card, Form, Modal } from 'react-bootstrap'
import CatalogueService from '../actions/catalogueservice'

export default class Catalogue extends Component{
        constructor(props){
                super(props);
                this.state = {
                        title: null,
                        catalogue: {catalogue:{id: null, title:null, rating:null, count:null}, game:{id:null, title:null, category:null, devname:null, link:null, imgurl:null, year:null, size:null}, reviews:[{id:null, title:null, writer:null, comments:null, rating:null}]},
                        id: 0,
                        writer: 'anonymous',
                        rating: 3,
                        comments: '',
                        reviewsEmpty : true,
                        show: false,
                        error: false
                }
                this.ratingChanged = this.ratingChanged.bind(this);
                this.commentsChanged = this.commentsChanged.bind(this);
                this.writerChanged = this.writerChanged.bind(this);
                this.saveEvent = this.saveEvent.bind(this);
                this.handleShow = this.handleShow.bind(this);
		this.handleClose = this.handleClose.bind(this);
                this.handleExit = this.handleExit.bind(this);
		this.handleAlert = this.handleAlert.bind(this);
        }
        

        writerChanged(event){
                let writerFetched = event.target.value.toLowerCase();
                this.setState({writer: writerFetched});
        }

        ratingChanged(event){
                let ratingTemp = event.target.value.toLowerCase();
                this.setState({rating: ratingTemp});
        }

        commentsChanged(event){
                let commentTemp = event.target.value.toLowerCase();
                this.setState({comments: commentTemp});
        }

        saveEvent(e){
                e.preventDefault();
                let reviewObject = { id: this.state.id, writer: this.state.writer, rating: this.state.rating, comments:this.state.comments, title: this.state.title};
                console.log("reviewObject : "+JSON.stringify(reviewObject));
                if(reviewObject.title!=="" && reviewObject.comments!=="" && reviewObject.rating!==""){
                        ReviewService.addReview( reviewObject).then(res=>{
                                this.handleShow();
                        });
                }
                else{
                        alert("Something went wrong....");
                }
        }
        
        async componentDidMount(){
                this.state.title=this.props.title;
                if(this.state.title!==null && this.state.title!==undefined){
                        CatalogueService.fetchCatalogue(this.state.title).then((res)=>{
                                this.setState({ catalogue : res.data });
                                console.log(res.data);
                                let filteredList = [];
                                for(var i = 0; i < res.data.reviews.length; i++) {
                                        if (res.data.reviews[i].title === this.state.title) {
                                                this.setState({reviewsEmpty: false});
                                                filteredList.push(res.data.reviews[i]);
                                        }
                                    }
                                    if(this.state.reviewsEmpty){
                                            console.log("No reviews found");
                                    }
                                    this.state.catalogue.reviews = filteredList;
                                    this.forceUpdate();
                        }); 
                }
                else{
                        this.handleAlert();
                }
                
        }
        handleClose() {
		this.setState({ show: false });
                this.componentDidMount();
        }
        handleShow() {
                this.setState({ show: true });
        }

        handleExit() {
		this.setState({ error: false });
        }
        handleAlert() {
                this.setState({ error: true });
        }

        render(){
                return(
                        <div>
                                <Container style={{paddingTop:'5em', textAlign:'left'}}>
                                        <Row>
                                        <Col><Image src={this.state.catalogue.game.imgurl} width={400}></Image></Col>
                                                <Col>
                                                        <Row>
                                                                <Col>
                                                                        <h1>{this.state.catalogue.game.title}</h1>
                                                                        <h4>by {this.state.catalogue.game.devname}</h4>
                                                                        <h5 style={{color:'#15cffe'}}>{this.state.catalogue.game.category}</h5>
                                                                        <hr style={{background:"#757575"}}></hr>
                                                                        <h5><ProgressBar animated now={parseInt(this.state.catalogue.catalogue.rating)*100/5} /><br></br>⭐ Rating : {this.state.catalogue.catalogue.rating}/5  ✍🏽  {this.state.catalogue.catalogue.count} ratings</h5>
                                                                        <h6>Year of Release : {this.state.catalogue.game.year}</h6>
                                                                        <br></br>
                                                                        {this.state.title?
                                                                        <Button href={this.state.catalogue.game.link} target="_blank">Visit Store ➡️</Button>:<h1 style={{color:'#cc5555'}}>Could not fetch data :(</h1>}
                                                                        <br></br>
                                                                        <span style={{fontStyle:'italic', fontSize:'15px', color:'#757575'}}>Size required on disk : {this.state.catalogue.game.size==="NA"?"Not Available":this.state.catalogue.game.size>1000?this.state.catalogue.game.size/1000+" GB":this.state.catalogue.game.size+" MB"}</span>
                                                                </Col>
                                                        </Row>
                                                </Col>
                                        </Row>
                                        <br></br>
                                        <Row>
                                                <h5 style={{padding:'0 1em'}}>Reviews</h5>
                                        </Row>
                                        <Row>
                                                {this.state.reviewsEmpty?<div style={{padding:'0 1em'}}><br></br><h5 style={{fontStyle:'italic', color:'#05ccef'}}>No submitted reviews yet, be the first one to write a review?</h5><br></br></div>:<br></br>}
                                                <Col style={this.state.reviewsEmpty?{display:'none'}:{display:'block'}}>
                                                {this.state.catalogue.reviews.map(
                                                        review =>
                                                        <Row key={review.id}>
                                                                <Col>
                                                                        <Row>
                                                                                <Col>
                                                                                        <Card className="bg-dark text-white">
                                                                                                <Card.Body>
                                                                                                <Card.Header as="h5">⭐ Rated this game : <strong>{review.rating}/5</strong></Card.Header>
                                                                                                <Card.Text>
                                                                                                        <h5>{review.comments}</h5>
                                                                                                        <p>Review By : {review.writer}</p>
                                                                                                </Card.Text>
                                                                                                </Card.Body>
                                                                                        </Card>
                                                                                        <br></br>
                                                                                </Col>
                                                                        </Row>
                                                                </Col>
                                                        </Row>
                                                )
                                                 }
                                                </Col>
                                        </Row>
                                        
                                        <Row>
                                                <Col>
                                                <h4>Add a review?</h4>
                                                </Col>
                                        </Row>
                                        {this.state.title?
                                        <Row>
                                                <Col>
                                                        <Form>
                                                                <Form.Group controlId="formBasic">
                                                                <Form.Label>Your Name</Form.Label>
                                                                <Form.Control type="text" placeholder="Enter name" required onChange={this.writerChanged}/>
                                                                <Form.Text className="text-muted">
                                                                Your full name/alias is required if no login
                                                                </Form.Text>
                                                                </Form.Group>
                                                                <Form.Group controlId="formBasicRating">
                                                                <Form.Label>Rating</Form.Label>
                                                                <Form.Control variant='light' min={0} max={5} default={3} type="range" required tooltip='auto' onChange={this.ratingChanged}/>
                                                        
                                                                <Form.Group controlId="formBasic">
                                                                <Form.Label>Write some comments</Form.Label>
                                                                <Form.Control type="text" placeholder="Comments" required onChange={this.commentsChanged} value={this.state.comments}/>
                                                                <Form.Text className="text-muted">
                                                                Be descriptive....      
                                                                </Form.Text>
                                                                </Form.Group>
                                                                <Button variant="primary" type="submit" onClick={this.saveEvent}>
                                                                Post this review
                                                                </Button>
                                                                </Form.Group>
                                                        </Form>
                                                </Col>
                                        </Row>:
                                        <h1>Ohh Snap, something went wrong</h1>
                                        }
                                </Container>                

                                <Modal show={this.state.show} onHide={this.handleClose}>
                                        <Link to='/' id="no-text-decor"><Modal.Header closeButton>
                                                <Modal.Title>Thanks For Your Review</Modal.Title>
                                                </Modal.Header>
                                        </Link>
                                        <Modal.Body style={{color:'#050505'}}>Successfully added review for {this.state.title} </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}>OK
                                        </Button>
                                        
                                        </Modal.Footer>
                                </Modal>

                                <Modal show={this.state.error} onHide={this.handleExit}>
                                        <Link to='/' id="no-text-decor"><Modal.Header closeButton>
                                                <Modal.Title style={{color:'#ce1515'}}>Error</Modal.Title>
                                                </Modal.Header>
                                        </Link>
                                        <Modal.Body style={{color:'#ce1515'}}>We are so sorry, but something went wrong. Please go to the main screen again : (  </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="dark" onClick={this.handleExit}><Link to="/">OK</Link>
                                        </Button>
                                        
                                        </Modal.Footer>
                                </Modal>
                        </div>
                );
        }
}