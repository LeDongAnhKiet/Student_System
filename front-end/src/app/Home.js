import React, { useEffect, useState } from 'react';
import {Container, Table, Button, ButtonGroup, ListInlineItem, Row} from 'reactstrap';
import UserService from '../services/User/UserService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const nav = useNavigate();
    const [semesters, setSemesters] = useState([]);
    const [requests, setRequests] = useState([]);
    const [hovered, setHovered] = useState({ clr: '', bg: '' });

    const signin = () => {
        setUser({});
        if (user !== null) nav('/guest/auth/signin');
    };

    const viewDetails = (id) => { nav('/user/semester/' + id + '/course'); }
    const viewCates = () => { nav('/guest/service-cate'); }
    const viewInfo = () => { nav('/user/info'); }
    const viewServices = () => { nav('/moderator/get-request'); }
    const viewCourses = () => { nav('/admin/course/all'); }
    const viewCourseDatas = () => { nav('/admin/course-data/all'); }
    const viewSemesters = () => { nav('/admin/semester/available'); }
    const viewStuds = () => { nav('/admin/student'); }
    const viewDepts = () => { nav('/admin/department'); }
    const updateRequest = (request) => {
        if ((request.serviceCateName).includes('bảng điểm'))
            nav(`/user/service/transcript/update/${request.id}`);
        else if ((request.serviceCateName).includes('CNSV'))
            nav(`/user/service/stud-cert/update/${request.id}`);
        else if ((request.serviceCateName).includes('BTN'))
            nav(`/user/service/diploma/update/${request.id}`);
        else if ((request.serviceCateName).includes('Mở khóa'))
            nav(`/user/service/unlock-stud/update/${request.id}`);
    }

    useEffect(() => {
        const getUser = async () => {
            try {
                setLoading(true);
                const res = await UserService.getUser();
                setUser(res.data);

            } catch (error) { console.error('Lỗi lấy data: ', error); }

            finally { setLoading(false); }
        }

        const getUserSemester = async () => {
            try {
                setLoading(true);
                const res = await UserService.getSemester();
                setSemesters(res.data);

            } catch (error) { console.error('Lỗi lấy data: ', error); }

            finally { setLoading(false); }
        }

        const getRequest = async () => {
            try {
                setLoading(true);
                const res = await UserService.getRequest();
                setRequests(res.data);

            } catch (error) { console.error('Lỗi lấy data: ', error); }

            finally { setLoading(false); }
        }

        getUser().then();
        getUserSemester().then();
        getRequest().then();
    }, []);

    return (
        <div className="pb-5">
            <Container fluid>
                {loading ? (
                    <p className="display-6 m-2">Loading...</p>
                ) : (
                    <div>
                        {user.role === "MODERATOR" ?
                            <div className="App">
                                <ButtonGroup className="border border-secondary rounded-pill p-1">
                                    <Button color="success" className="rounded-pill"
                                            onClick={viewServices}>Quản lý dịch vụ</Button>
                                </ButtonGroup>
                            </div> : <></>}
                        {user.role === "ADMIN" ?
                            <div className="App">
                                <ButtonGroup className="border border-secondary rounded-pill p-1">
                                    <Button color="success" className="me-1 rounded-pill rounded-end-0"
                                            onClick={viewStuds}>Quản lý sinh viên</Button>
                                    <Button color="success" className="me-1 rounded-start-0 rounded-end-0"
                                            onClick={viewDepts}>Quản lý khoa</Button>
                                    <Button color="success" className="me-1 rounded-start-0 rounded-end-0"
                                            onClick={viewSemesters}>Quản lý học kỳ</Button>
                                    <Button color="success" className="me-1 rounded-pill rounded-start-0 rounded-end-0"
                                            onClick={viewCourses}>Quản lý môn học</Button>
                                    <Button color="success" className="rounded-pill rounded-start-0"
                                            onClick={viewCourseDatas}>Quản lý lớp học</Button>
                                </ButtonGroup>
                            </div> : <></>}
                        {user.fullName ? (<>
                            <h2 className='App'>
                                Xin chào, {user.fullName}
                                {user.avatar !== '' && user.avatar !== null ? (
                                    <span>{user.avatar}</span>) : (
                                    <span className='ms-2' dangerouslySetInnerHTML={{ __html: '&#x1F464;' }}></span>
                                )}
                            </h2>
                            <h5 className="my-3 pb-2 border-bottom">Các học kỳ</h5>
                            {semesters.length ? (<>
                                {semesters.map((semester) => (
                                    <span className="list-group-horizontal row-cols-4" key={semester.id}>
                                        <ListInlineItem className="list-inline-item mx-1">
                                            <Button className="fw-bold border-0"
                                                 style={{ color: hovered === semester.semesterName ? 'white' : 'black',
                                                     background: hovered === semester.semesterName ? 'darkCyan' : 'white'
                                                    }}
                                                 data-toggle="tooltip" title="Nhấn vào để xem chi tiết"
                                                 onMouseEnter={() => setHovered(semester.semesterName)}
                                                 onMouseLeave={() => setHovered({clr:'', bg:''})}
                                                 onClick={() => viewDetails(semester.id)}>
                                                {semester.semesterName}
                                            </Button>
                                        </ListInlineItem>
                                    </span>
                                ))}
                            </>
                            ) : (
                                <Row className="App">
                                    <span className="bg-warning fw-bold text-black p-2">Chưa mở học kỳ</span>
                                </Row>
                            )}
                            <h5 className="my-3 pb-2 border-bottom">Lịch sử đăng ký dịch vụ
                                <button onClick={viewCates}
                                    className="float-end h5 border-0 py-1 rounded-top-3 bt-white"
                                    onMouseEnter={() => setHovered({ clr: 'white', bg: 'darkCyan' })}
                                    onMouseLeave={() => setHovered({ clr: '', bg: '' })}
                                    data-toggle="tooltip" title="Xem danh sách dịch vụ trực tuyến"
                                    style={{ color: hovered.clr === 'white' ? 'white' : 'black',
                                        background: hovered.bg === 'darkCyan' ? 'darkCyan' : 'white',
                                    }}>Các dịch vụ</button>
                            </h5>
                            {requests.length ? (
                                <Row>
                                    <Table className="mt-3 table-striped table-bordered">
                                        <thead className="App">
                                        <tr>
                                            <th>Dịch vụ</th>
                                            <th>Ngày yêu cầu</th>
                                            <th>Trạng thái</th>
                                            <th>Thành tiền</th>
                                            <th>Thao tác</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {requests.map((request) => (
                                            <tr key={request.id}>
                                                <td>{request.serviceCateName}</td>
                                                <td>{request.createdDate}</td>
                                                <td>{request.status}</td>
                                                <td>{request.price}</td>
                                                {request.status === 'PENDING' ?
                                                <td className="App">
                                                    <Button color="success" className="m-1" onClick={() => {
                                                        updateRequest(request)}}>Chỉnh sửa
                                                    </Button>
                                                </td> : <td className="App fw-bold">Đã được duyệt</td>}
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </Row>
                            ) : (
                                <div className="App row">
                                    <span className="bg-warning fw-bold text-black p-2">Chưa đăng ký dịch vụ nào</span>
                                </div>
                            )}
                            <div className="border-bottom my-3">
                                <button className="border-0 bt-white h5 p-1 rounded-top-3"
                                        onMouseEnter={() => setHovered({clr:'white', bg:'darkCyan'})}
                                        onMouseLeave={() => setHovered({clr:'', bg:''})}
                                        data-toggle="tooltip" title="Xem danh sách dịch vụ trực tuyến"
                                        style={{ color: hovered.clr, background:hovered.bg, marginBottom:"0"}}
                                    onClick={viewInfo}>Thông tin sinh viên
                                    {user.avatar !== '' && user.avatar !== null ? (<span> {user.avatar}</span>) : (
                                        <span className="ms-2" dangerouslySetInnerHTML={{ __html: '&#x1F464;' }}></span>
                                    )}
                                </button>
                            </div>
                            <div>
                                <span className="fw-bold ps-4">Khoa </span>
                                <span>{user.department_name}</span>
                            </div>
                            <div>
                                <span className="fw-bold ps-4">Ngành </span>
                                <span>{user.major_name}</span>
                            </div>
                        </>
                        ) : (<>
                            <h2>Vui lòng đăng nhập!</h2>
                            <Button color="primary" className="my-3" onClick={signin}>Đăng nhập</Button>
                        </>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Home;
