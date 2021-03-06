import React, { Component } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand,
    Nav, NavItem, NavLink, UncontrolledDropdown,
    DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../redux/actions/authActions';
import './style.css';
import NavbarSearchForm from './NavbarSearchForm/NavbarSearchForm';

class NavbarComponent extends Component{
    constructor(props) {
        super(props);
        this.state = {
          isOpen: false
        };
    }
      toggle = () => {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }
      render() {
        return this.props.auth.loggedIn ? 
            //NAVBAR FOR LOGGED IN USERS
            <Navbar dark expand="md">
              <NavbarBrand tag={Link} to="/">Bean Scout</NavbarBrand>
              <NavbarToggler onClick={this.toggle} />
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav navbar>
                  <NavItem>
                    <NavbarSearchForm/>
                  </NavItem>
                </Nav>
                <Nav navbar className="ml-auto">
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Coffee
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag={Link} to="/roasts">
                        Browse Roasts
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/roasts/reviews/new">
                        Add a review of a Roast
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/roasts/new">
                        Add a new roast
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                      Roasters
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem tag={Link} to="/roasters">
                        Browse Roasters
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/roasters/reviews/new">
                        Add a review of a Roaster
                      </DropdownItem>
                      <DropdownItem tag={Link} to="/roasters/new">
                        Add a new roaster
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                    <NavItem>
                      <NavLink tag={Link} to="/mynetwork">My Network</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} to="/me">Me</NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink onClick={this.props.logout}>Logout</NavLink>
                    </NavItem>
                </Nav>
              </Collapse>
            </Navbar>
          :
          //NAVBAR FOR STRANGERS (NON-LOGGED IN USERS)
          <Navbar dark expand="md">
          <NavbarBrand tag={Link} to="/">Bean Scout</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav navbar>
              <NavItem>
                <NavbarSearchForm/>
              </NavItem>
            </Nav>
            <Nav navbar className="ml-auto">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Coffee
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem tag={Link} to="/roasts">
                    Browse Coffees
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
                <NavItem>
                  <NavLink tag={Link} to="/login">Login</NavLink>
                </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      }
}
const mapStateToProps = (state) => {
  return{
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return{
    logout: () => { logout(dispatch, ownProps.history) }
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NavbarComponent));