import React, { useState } from 'react';
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <Navbar className="navbar bg-primary navbar-dark">
            <NavbarBrand className="navbar-brand ps-5" tag={Link} to="/api/home">Dịch vụ sinh viên</NavbarBrand>
            <NavbarToggler onClick={() => {
                setIsOpen(!isOpen)
            }}/>
            <Collapse className="collapse navbar-collapse" isOpen={isOpen} navbar>
                <Nav className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-end" style={{ width: "100%" }} navbar>
                    <NavItem className="dropdown nav-item">
                        <NavLink className='App-link nav-link dropdown-toggle' role="button" data-bs-toggle="dropdown"
                                 aria-expanded="false" href="/api/user/service-cate">Danh sách dịch vụ
                        </NavLink>
                        <Nav className="d-block dropdown-menu bg-primary" aria-labelledby="navbarDropdown">
                            <NavItem>
                                <NavLink className="text-black dropdown-item text-hover"
                                         href="/api/user/service/transcript/${id}">Đăng ký cấp bảng điểm
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-black dropdown-item"
                                         href="/api/user/service/stud-cert/${id}">Đăng ký chứng nhận sinh viên
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-black dropdown-item"
                                         href="/api/user/service/diploma/${id}">Đăng ký bản sao bằng tốt nghiệp
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-black dropdown-item"
                                         href="/api/user/service/#/${id}">Đăng ký xét tốt nghiệp
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <hr className="dropdown-divider"/>
                            </NavItem>
                            <NavItem>
                                <NavLink className="text-black dropdown-item"
                                              href="/api/user/service/unlock-stud/${id}">Mở khóa sinh viên
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </NavItem>
                    <NavItem>
                        <NavLink className='App-link nav-link' href="/api/user/info">Thông tin tài khoản</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink className='App-link nav-link' href="/api/user/signout">Đăng xuất</NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
        </Navbar>
    );
};

export default Header;