import {Button, Container, Table} from "reactstrap";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import UserService from "../services/User/UserService";

const Home = () => {
    const initState = {
        id: 0,
        email: '',
        fullName: '',
        avatar: '',
        role: '',
        major_name: '',
        department_name: ''
    }
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({initState});
    const nav = useNavigate();
    const [semesters, setSemesters] = useState([]);
    const [requests, setRequests] = useState([]);
    const [textColor, setTextColor] = useState('');

    const signin = () => {
        setUser({'type': 'signin', initState});
        if (user !== null) nav('/guest/auth/signin');
    }
    const viewSemester = (id) => { nav('/user/semester/' + id + '/course'); }
    const viewServices = () => { nav('/guest/service-cate'); }
    const viewInfo = () => { nav('/user/info/'); }

    useEffect( () => {
        const getUser = async () => {
            try {
                setLoading(true);
                const res = await UserService.getUser()
                setUser(res.data)
            } catch(error) { console.error('Lỗi lấy data: ', error); }
            finally { setLoading(false); }
        }
        const getUserSemester = async () => {
            try {
                setLoading(true);
                const res = await UserService.getSemester()
                setSemesters(res.data)
            } catch(error) { console.error('Lỗi lấy data: ', error); }
            finally { setLoading(false); }
        }
        const getRequest = async () => {
            try {
                setLoading(true);
                const res = await UserService.getRequest()
                setRequests(res.data)
            } catch(error) { console.error('Lỗi lấy data: ', error); }
            finally { setLoading(false); }
        }

        getUser().then();
        getUserSemester().then();
        getRequest().then();
        //window.location.reload();
    }, []);

    return (
        <div>
            <Container fluid>
                {loading ? (
                    <p className="display-6 m-2">Loading...</p>
                ) : (
                    <div>
                        { user.fullName ? (
                            <>
                                <h2 className='App'>
                                    Xin chào, {user.fullName}
                                    {user.avatar !== '' ? <> {user.avatar}</> :
                                        <span className='ms-2' dangerouslySetInnerHTML={{
                                            __html: '&#x1F464;' }}></span>}
                                </h2>
                                <h5 className="my-3 pb-2 border-bottom">Xem học kỳ</h5>
                                    { semesters === [] ? <>
                                        { semesters.map(semester => (
                                        <span className="list-group-horizontal row-cols-4" key={semester.id}>
                                            <div className="list-inline-item m-1">
                                                <div className="btn" onClick={() => viewSemester(semester.id)}>
                                                    {semester.semesterName}</div>
                                            </div>
                                        </span>
                                        ))}
                                    </>: <>
                                        <div className="App row">
                                            <span className="bg-warning fw-bold text-black p-2">Chưa mở học kỳ</span>
                                        </div>
                                    </>}
                                <h5 className="my-3 pb-2 border-bottom text-start">
                                    Lịch sử đăng ký dịch vụ
                                    <button className="float-end h5 border-0 bg-white"
                                            onMouseEnter={() => setTextColor('cyan')}
                                            onMouseLeave={() => setTextColor('')}
                                            data-toggle="tooltip" title="Xem danh sách dịch vụ trực tuyến"
                                            onClick={viewServices} style={{color: textColor}}>Các dịch vụ</button>
                                </h5>
                                { requests === [] ? <>
                                    { requests.map(request => (
                                        <span className="list-group-horizontal row-cols-4" key={request.id}>
                                            <div className="list-inline-item m-1">
                                                <div className="row">
                                                    <Table className="mt-3 table table-striped table-bordered">
                                                        <thead className="text-center align-middle"><tr>
                                                            <th>Tên</th>
                                                            <th>Ngày giao</th>
                                                            <th>Trạng thái</th>
                                                            <th>Thành tiền</th>
                                                        </tr></thead>
                                                        <tbody>
                                                        { requests.map( request => (
                                                            <tr key={request.id}>
                                                                <td>{request.serviceCateName}</td>
                                                                <td>{request.createdDate}</td>
                                                                <td>{request.status}{/* ? 'Còn hoạt động' : 'Đã kết thúc'*/}</td>
                                                                <td>{request.price}</td>
                                                            </tr>
                                                        ))}
                                                        </tbody>
                                                    </Table>
                                                </div>
                                            </div>
                                        </span>
                                    ))}
                                </>: <>
                                    <div className="App row">
                                        <span className="bg-warning fw-bold text-black p-2">Chưa đăng ký dịch vụ nào</span>
                                    </div>
                                </>}
                                <button className="border-0 bg-white h5 my-3 pb-2 border-bottom"
                                        data-toggle="tooltip" title="Nhấn vào để xem chi tiết"
                                        onClick={viewInfo}>
                                    Xem thông tin sinh viên { user.avatar !== '' ? <> {user.avatar}</> :                                        <span className='ms-2' dangerouslySetInnerHTML={{
                                    __html: '&#x1F464;' }}></span>}
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
                        ) : (
                            <>
                                <h2>Vui lòng đăng nhập!</h2>
                                <Button className="my-3 bg-primary" onClick={signin}>
                                    Đăng nhập
                                </Button>
                            </>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default Home