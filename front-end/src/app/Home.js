import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'reactstrap';
import UserService from '../services/User/UserService';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({});
    const nav = useNavigate();
    const [semesters, setSemesters] = useState([]);
    const [requests, setRequests] = useState([]);
    const [hoveredText, setHoveredText] = useState('');

    const signin = () => {
        setUser({});
        if (user !== null) nav('/guest/auth/signin');
    };

    const viewDetails = (id) => { nav('/user/semester/' + id + '/course'); }
    const viewCates = () => { nav('/guest/service-cate'); }
    const viewInfo = () => { nav('/user/info'); }
    const viewServices = () => { nav('/moderator/get-request'); }
    const viewCourses = () => { nav('/admin/course/all'); }
    const viewSemesters = () => { nav('/admin/semester/available'); }
    const viewStuds = () => { nav('/admin/student'); }

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
        //window.location.reload();
    }, []);

    return (
        <div className="pb-5">
            <Container fluid>
                {loading ? (
                    <p className="display-6 m-2">Loading...</p>
                ) : (
                    <div>
                        {user.role === "MODERATOR" || user.role === "ADMIN" ? <>
                            <span className="btn-group">
                                <button className="mx-2 btn btn-primary rounded-pill"
                                    onClick={viewServices}>Quản lý dịch vụ</button>
                            </span>
                        </> : <></>}
                        {user.role === "ADMIN" ? <>
                            <span className="btn-group">
                                <button className="mx-2 btn btn-primary rounded-pill"
                                        onClick={viewStuds}>Quản lý đào tạo</button>
                                <button className="mx-2 btn btn-primary rounded-pill"
                                        onClick={viewSemesters}>Quản lý học kỳ</button>
                                <button className="mx-2 btn btn-primary rounded-pill"
                                        onClick={viewCourses}>Quản lý môn học</button>
                            </span>
                        </> : <></>}
                        {user.fullName ? (<>
                            <h2 className='App'>
                                Xin chào, {user.fullName}
                                {user.avatar !== '' ? (<> {user.avatar}</>) : (
                                    <span className='ms-2'
                                        dangerouslySetInnerHTML={{ __html: '&#x1F464;' }}>
                                    </span>
                                )}
                            </h2>
                            <h5 className="my-3 pb-2 border-bottom">Các học kỳ</h5>
                            {semesters.length ? (<>
                                {semesters.map((semester) => (
                                    <span className="list-group-horizontal row-cols-4" key={semester.id}>
                                        <div className="list-inline-item mx-1">
                                            <div className="btn fw-bold"
                                                style={{ color: hoveredText === semester.semesterName ? 'cyan' : ''}}
                                                 data-toggle="tooltip" title="Nhấn vào để xem chi tiết"
                                                 onMouseEnter={() => setHoveredText(semester.semesterName)}
                                                onMouseLeave={() => setHoveredText('')}
                                                onClick={() => viewDetails(semester.id)}>
                                                {semester.semesterName}
                                            </div>
                                        </div>
                                    </span>
                                ))}
                            </>
                            ) : (<>
                                <div className="App row">
                                    <span className="bg-warning fw-bold text-black p-2">Chưa mở học kỳ</span>
                                </div>
                            </>
                            )}
                            <h5 className="my-3 pb-2 border-bottom text-start">Lịch sử đăng ký dịch vụ
                                <button className="float-end h5 border-0 bg-white"
                                    onMouseEnter={() => setHoveredText('cyan')}
                                    onMouseLeave={() => setHoveredText('')}
                                    data-toggle="tooltip" title="Xem danh sách dịch vụ trực tuyến"
                                    onClick={viewCates} style={{ color: hoveredText }}>Các dịch vụ
                                </button>
                            </h5>
                            {requests.length ? (<>
                                <div className="row">
                                    <Table className="mt-3 table table-striped table-bordered">
                                        <thead className="text-center"><tr>
                                                <th>Dịch vụ</th>
                                                <th>Ngày giao</th>
                                                <th>Trạng thái</th>
                                                <th>Thành tiền</th>
                                            </tr></thead>
                                        <tbody>
                                        {requests.map((request) => (
                                            <tr key={request.id}>
                                                <td>{request.serviceCateName}</td>
                                                <td>{request.createdDate}</td>
                                                <td>{request.status}</td>
                                                <td>{request.price}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </Table>
                                </div>
                            </>
                            ) : (<>
                                <div className="App row">
                                    <span className="bg-warning fw-bold text-black p-2">Chưa đăng ký dịch vụ nào</span>
                                </div>
                            </>
                            )}
                            <button className="border-0 bg-white h5 my-3 pb-2 border-bottom"
                                data-toggle="tooltip" title="Nhấn vào để xem chi tiết"
                                onClick={viewInfo}>Thông tin sinh viên
                                {user.avatar !== '' ? (<> {user.avatar}</>) : (
                                    <span className="ms-2"
                                        dangerouslySetInnerHTML={{ __html: '&#x1F464;' }}>
                                    </span>
                                )}
                            </button>
                            <div>
                                <span className="fw-bold ps-4">Khoa: </span>
                                <span>{user.department_name}</span>
                            </div>
                            <div>
                                <span className="fw-bold ps-4">Ngành: </span>
                                <span>{user.major_name}</span>
                            </div>
                        </>
                        ) : (<>
                            <h2>Vui lòng đăng nhập!</h2>
                            <Button className="my-3 bg-primary" onClick={signin}>Đăng nhập</Button>
                        </>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
};

export default Home;
