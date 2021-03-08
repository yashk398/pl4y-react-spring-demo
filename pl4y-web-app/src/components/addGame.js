import { Component } from "react";
import {Link} from 'react-router-dom'
import {Form, Button, Modal} from 'react-bootstrap'
import RootService from "../actions/rootservice";
import CatalogueService from "../actions/catalogueservice";

class AddGame extends Component{
        constructor(props){
                super(props);
                this.state={
                        games: [],
                        id:'0',
                        title:'',
                        category: '',
                        developername: '',
                        link: '',
                        vol: 0,
                        imgurl: '',
                        year:'',
                        flagged: false,
                        yearIssue: false,
                        show: false
   
                }
                this.categoryChanged = this.categoryChanged.bind(this);
                this.titleChanged = this.titleChanged.bind(this);
                this.developerChanged = this.developerChanged.bind(this);
                this.yearChanged = this.yearChanged.bind(this);
                this.linkChanged = this.linkChanged.bind(this);
                this.sizeChanged = this.sizeChanged.bind(this);
                this.imgurlChanged = this.imgurlChanged.bind(this);
                this.saveEvent = this.saveEvent.bind(this);
                this.handleClose = this.handleClose.bind(this);
                this.handleShow = this.handleShow.bind(this);
        }

        titleChanged(event){
                let titleTemp = event.target.value;
                this.state.flagged = false;
                for(var i = 0; i < this.state.games.length; i++) {
                        if (this.state.games[i].title == titleTemp) {
                                this.setState({flagged: true});
                            break;
                        }
                        else{
                                this.setState({flagged: false});
                        }
                    }
                if(this.state.flagged){
                        
                }
                else{
                        this.setState({title: titleTemp});
                }
        }

        categoryChanged(event){
                let categoryTemp = event.target.value.toLowerCase();
                this.setState({category: categoryTemp});
        }

        developerChanged(event){
                let developerTemp = event.target.value;
                this.setState({developername: developerTemp});
        }

        yearChanged(event){
                let yearTemp = event.target.value;
                this.setState({year: yearTemp});
                if(yearTemp>new Date().getFullYear()){
                        this.state.yearIssue = true;
                }
                else{
                        this.state.yearIssue = false;
                }
        }

        linkChanged(event){
                let linkTemp = event.target.value.toLowerCase();
                this.setState({link: linkTemp});
        }

        sizeChanged(event){
                let sizeTemp = event.target.value;
                this.setState({vol: sizeTemp});
        }

        imgurlChanged(event){
                let imgUrlTemp = event.target.value.toLowerCase();
                this.setState({imgurl: imgUrlTemp});
        }

        async componentDidMount(){
                        RootService.fetchAllGames(this.state.title).then((res)=>{
                                this.setState({ games : res.data });
                                console.log(res.data);
                        }); 
        }

        saveEvent(e){
                e.preventDefault();
                if(this.state.year>(new Date().getFullYear())){
                        this.state.year = "NA";
                }
                if(this.state.size<=0){
                        this.state.size = "NA";
                }
                let gameObject = { id: this.state.id, title: this.state.title, category: this.state.category, devname: this.state.developername, link: this.state.link, year: this.state.year, imgurl: this.state.imgurl, size: this.state.vol};
                console.log("gameObject : "+JSON.stringify(gameObject));
                if(gameObject.title!=="" && gameObject.category!=="" && gameObject.imgurl!==""&& gameObject.link!==""&& gameObject.devname!==""&& gameObject.size!==""&& gameObject.year!==""){
                        RootService.addGame( gameObject).then(res=>{
                                let catalogueObject = { id: 0, title: this.state.title, rating: 0, count: 0}
                                CatalogueService.addCatalogue( gameObject).then(res=>{ 
                                });
                                this.handleShow();
                        });
                        
                }
                else{
                        alert("Something went wrong....");
                }
        }
        handleClose() {
		this.setState({ show: false });
                window.location.reload(false);
        }
        handleShow() {
                this.setState({ show: true });
        }
        
        render(){
                return(
                        <div style={{textAlign:'left'}}>
                                <Form style={{width:'80%', margin:'auto'}}>
                                        <Form.Group controlId="formBasicTitle">
                                        <Form.Label>Enter Title of the game</Form.Label>
                                        <Form.Control type="text" placeholder="Title" style={this.state.flagged?{color:'red'}:{color:'black'}} value={this.state.title} onChange={this.titleChanged}/>
                                        <Form.Text className="text-muted" style={this.state.flagged?{display: 'block'}:{display: 'none'}}>
                                        This title exists already.
                                        </Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicText">
                                        <Form.Label>Category of the game</Form.Label>
                                        <Form.Control as="select" custom onChange={this.categoryChanged}>
                                                <option>action</option>
                                                <option>arcade</option>
                                                <option>casual</option>
                                                <option>fps</option>
                                                <option>indie</option>
                                                <option>racing</option>
                                                <option>strategy</option>
                                                <option>simulation</option>
                                                <option selected>OTHER</option>
                                        </Form.Control>
                                        </Form.Group>
                                        
                                        <Form.Group controlId="formBasicDeveloper">
                                        <Form.Label>Developer Name/Organization</Form.Label>
                                        <Form.Control type="text" placeholder="Developer" value={this.state.developername} onChange={this.developerChanged}/>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicYear">
                                        <Form.Label>Year of Release</Form.Label>
                                        <Form.Control type="number" min={1990} max={new Date().getFullYear()} placeholder="Year" value={this.state.year} onChange={this.yearChanged}/>
                                        <Form.Text className="text-muted" style={this.state.yearIssue?{display: 'block'}:{display: 'none'}}>Incorrect year, can't be beyond {new Date().getFullYear()}</Form.Text>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicLink">
                                        <Form.Label>Link to store</Form.Label>
                                        <Form.Control type="text" placeholder="https://*****" value={this.state.link} onChange={this.linkChanged} pattern="http(s?)(:\/\/)"/>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicLink">
                                        <Form.Label>Link to cover image</Form.Label>
                                        <Form.Control type="text" placeholder="https://*****.png" value={this.state.imgurl} onChange={this.imgurlChanged} pattern="https?://(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?:/[^/#?]+)+\.(?:jpg|gif|png)$"/>
                                        </Form.Group>

                                        <Form.Group controlId="formBasicVolume">
                                        <Form.Label>Disk size in MEGABYTES [1GB = 1000MB]</Form.Label>
                                        <Form.Control type="number" min={0} max={1000000} placeholder="(0MB~1000GB)" value={this.state.vol} onChange={this.sizeChanged}/>
                                        </Form.Group>

                                        <Button variant="primary" type="submit" onClick={this.saveEvent}>
                                        Submit
                                        </Button>
                                </Form>

                                <Modal show={this.state.show} onHide={this.handleClose}>
                                        <Link to='/' id="no-text-decor"><Modal.Header closeButton>
                                                <Modal.Title>Thanks for adding {this.state.title}</Modal.Title>
                                                </Modal.Header>
                                        </Link>
                                        <Modal.Body style={{color:'#050505'}}>Successfully added game {this.state.title} </Modal.Body>
                                        <Modal.Footer>
                                        <Button variant="secondary" onClick={this.handleClose}><Link to='/'>OK</Link>
                                        </Button>
                                        
                                        </Modal.Footer>
                                </Modal>
                        </div>
                );
        }
}

export default AddGame;