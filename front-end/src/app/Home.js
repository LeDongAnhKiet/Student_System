import {Button, Container} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
<<<<<<< Updated upstream
import UserService from "../services/UserService";
import cookie from "react-cookies";
=======
import UserService from "../services/User/UserService";
>>>>>>> Stashed changes

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        id: 0,
        email: '',
        fullName: '',
        avatar: '',
        role: '',
        major_name: '',
        department_name: ''
    });
    const nav = useNavigate();
    const signout = () => {setUser({'type': 'signout'})}

    useEffect( () => {
        const getUser = async () => {
            try {
                setLoading(true);

                // Đọc token từ cookie
                const token = cookie.load("user");

                if (!token) {
                    throw new Error("Token not found");
                }

                // Thiết lập header Authorization
                const config = {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                const res = await UserService.getUser(config); // Gửi yêu cầu với header Authorization
                setUser(res.data);
            } catch (error) {
                console.error('Lỗi lấy dữ liệu: ', error);
            } finally {
                setLoading(false);
            }
        };

        getUser().then();
    }, []);

    return (
        <div>
            <Container fluid>
                {loading ? (
                    <p className="display-6 m-2">Loading...</p>
                ) : (
                    <div className='App'>
                        { user && user.fullName ? (
                            <>
                                <h2 className='m-3'>Xin chào, {user.fullName}</h2>
                                <br />
                                <Button className="btn btn-success" onClick={() => signout()}>
                                    Đăng xuất
                                </Button>
                            </>
                        ) : (
                            <>
                                <h3>Vui lòng đăng nhập!</h3>
                                <Button className="my-2 bg-primary" onClick={() => nav(-1)}>
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