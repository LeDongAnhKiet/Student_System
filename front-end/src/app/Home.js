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

    const signin = () => {
        setUser({'type': 'signin', initState});
        if (user !== null) nav('/guest/auth/signin');
    }
    const viewSemester = (id) => { nav('/user/semester/' + id + '/course'); }

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
                        { user && user.fullName ? (
                            <>
                                <h2 className='App'>Xin chào, {user.fullName}</h2>
                                <h5 className="my-3 pb-2 border-bottom">Xem học kỳ</h5>
                                    { semesters === [] ? <>
                                        { semesters.map(semester => (
                                        <span className="list-group-horizontal row-cols-4" key={semester.id}>
                                            <div className="list-inline-item m-1">
                                                <a className="btn" onClick={() => viewSemester(semester.id)}>
                                                    {semester.semesterName}</a>
                                            </div>
                                        </span>
                                        ))}
                                    </>: <>
                                        <div className="App row">
                                            <span className="bg-warning fw-bold text-black p-2">Chưa mở học kỳ</span>
                                        </div>
                                    </>}
                                <h5 className="my-3 pb-2 border-bottom">Dịch vụ đã đăng ký</h5>
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