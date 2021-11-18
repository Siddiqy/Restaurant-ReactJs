import React, { Component } from "react";
import {Card, CardImg, CardBody, CardTitle, CardText, Container, Button,
    Row, Col, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Label} from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors, actions } from "react-redux-form";
import { Loading } from "./LoadingComponent";
import { baseUrl } from "../shared/baseUrl";
import { FadeTransform, Fade, Stagger } from "react-animation-components";

const required = (val) => val && val.length;
const minLength = (len) => (val) => (val) && (val.length >= len);
const maxLength = (len) => (val) => !(val) || (val.length <= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isModalOpen: false
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    handleSubmit(values) {
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return(
            <div className="container">
            <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody className="m-3">
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label class="mx-auto" htmlFor="rating">Rating</Label>
                                <Control.select model=".rating" name="rating" id="rating" className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text model=".author" name="name" id="name" 
                                className="form-control" 
                                placeholder="Your Name"
                                validators={{
                                    required, maxLength: maxLength(15), minLength: minLength(3) 
                                }} />
                                <Errors 
                                    className="text-danger"
                                    model='.author'
                                    show='touched'
                                    messages= {{
                                        required: 'Required: ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment">Comment</Label>
                                <Control.textarea rows="6" model=".comment" name="comment" id="comment" 
                                className="form-control" 
                                validators={{
                                    required, maxLength: maxLength(150), minLength: minLength(3) 
                                }} />
                                <Errors 
                                    className="text-danger"
                                    model='.comment'
                                    show='touched'
                                    messages= {{
                                        required: 'Required: ',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Not more than 150 characters are allowed'
                                    }}
                                />
                            </Row>
                            <Row className="form-group">
                                <Button type="submit" color="primary">Submit</Button>
                            </Row>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

const RenderDish = ({dishDetail}) => {
    return(
        <FadeTransform
            in 
            transformProps={{
                exitTransform: 'scale(0.5) translateY(-50%)'
            }}>
            <Card >
                <CardImg top src={baseUrl + dishDetail.image} alt={dishDetail.name} />
                <CardBody>
                    <CardTitle>{dishDetail.name}</CardTitle>
                    <CardText>{dishDetail.description}</CardText>
                </CardBody>
            </Card>
        </FadeTransform>
    );
}

const RenderComments = ({comments, postComment, dishId}) => {
    if (comments != null) {
        return(
            <div>
                <h4>Comments</h4>
                <Stagger in>
                    {comments.map((comment) => (
                        <Fade in>
                            <ul className="list-unstyled">
                                    <li key={comment.id}>
                                        <p>{comment.comment}</p>
                                        <p>-- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                    </li>
                            </ul>
                        </Fade>
                    ))}
                </Stagger>
                <CommentForm dishId={dishId} postComment={postComment}/>
            </div>
        );
    }
    else {
        return(
            <div></div>
        );
    }
}

function DishDetail(props) {

    if (props.isLoading) {
        return(
            <div className="container">
                <div className="row">            
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return(
            <div className="container">
                <div className="row">            
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.dish != null) {
        return(
            <Container>
                <div className='row'>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className='col-12'>
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <Row xs="12" sm="12" md="12" xl="12">
                    <Col xs="12" sm="12" md="5" xl="5" className="m-1">
                        <RenderDish dishDetail={props.dish} />
                    </Col>
                    <Col xs="12" sm="12" md="5" xl="5" className="m-1">
                        <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id} />    
                    </Col>
                </Row>
            </Container>
        );
    }
    else {
        <div></div>
    }
}

export default DishDetail;