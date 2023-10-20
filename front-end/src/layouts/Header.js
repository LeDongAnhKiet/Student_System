import React, {useContext, useState} from 'react';
import { Collapse, DropdownItem, DropdownMenu, DropdownToggle, Nav, Navbar,
    NavbarBrand, NavbarToggler, NavItem, NavLink, UncontrolledDropdown } from 'reactstrap';
import {Link, useNavigate} from 'react-router-dom';
import logo from "../styles/ou_logo.png";
import {UserContext} from "../app/App";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useContext(UserContext);
    const nav = useNavigate();

    const signout = () => {
        setUser({'type': 'signout'});
        if (user === null) nav('/');
    }

    return (
        <Navbar className='navbar bg-primary navbar-dark fixed-top p-0'>
            <NavbarBrand className="navbar-brand" tag={Link} to="/home">
                <img style={{ height: "50px" }} className="me-2 my-auto d-inline rounded-2" src={logo} alt="logo"/>
                Dịch vụ sinh viên</NavbarBrand>
            <NavbarToggler onClick={() => {
                setIsOpen(!isOpen)
            }}/>
            <Collapse className="collapse navbar-collapse" isOpen={isOpen} navbar>
                <Nav className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end" style={{ width: "100%" }} navbar>
                    <NavItem className="dropdown nav-item">
                        <NavLink className='App-link nav-link dropdown-toggle' role="button" data-bs-toggle="dropdown"
                                 aria-expanded="false" href="/guest/service-cate">Danh sách dịch vụ
                        </NavLink>
                        <Nav className="d-block dropdown-menu bg-primary" aria-labelledby="navbarDropdown">
                            <NavItem>
                                <NavLink className="text-black dropdown-item text-hover"
                                         href="/user/service/transcript/${id}">Đăng ký cấp bảng điểm
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-black dropdown-item"
                                         href="/user/service/stud-cert/${id}">Đăng ký chứng nhận sinh viên
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-black dropdown-item"
                                         href="/user/service/diploma/${id}">Đăng ký bản sao bằng tốt nghiệp
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-black dropdown-item"
                                         href="#">Đăng ký xét tốt nghiệp
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <hr className="dropdown-divider"/>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-black dropdown-item"
                                              href="/user/service/unlock-stud/${id}">Mở khóa sinh viên
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </NavItem>
                    <NavItem>
                        <NavLink className='App-link nav-link' href="/user/info">Thông tin tài khoản</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='App-link nav-link' href="#" onClick={signout}>Đăng xuất</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Header;