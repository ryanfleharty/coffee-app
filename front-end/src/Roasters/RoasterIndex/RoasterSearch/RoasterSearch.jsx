import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { searchRoasters } from '../../../redux/actions/searchActions';

class RoasterSearch extends Component{
    constructor(){
        super();
        this.state = {
            query: "",
            location: ""
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.name
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.searchRoasters(this.state);
    }
    render(){
        return(
            <Form onSubmit={this.handleSubmit}>
                <Row>
                    <Col>
                        <FormGroup>
                            <Label>Search Roasters</Label>
                            <Input onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Near</Label>
                            <Input onChange={this.handleChange}/>
                        </FormGroup>
                    </Col>
                </Row>

                
                <Button type="submit">Search</Button>
            </Form>
        )
    }
}
const mapStateToProps = (state) => {
    return{

    }
}
const mapDispatchToProps = (dispatch, ownProps) => {
    return{
        searchRoasters: (formData) => { searchRoasters(dispatch, formData, ownProps.history)}
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(RoasterSearch);