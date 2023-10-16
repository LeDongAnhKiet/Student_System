import {Button, Container} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import UserService from "../services/User/UserService";

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
                const res = await UserService.getUser()
                setUser(res.data)
            } catch(error) { console.error('Lỗi lấy data: ', error); }
            finally { setLoading(false); }
        }
        getUser().then();
    }, []);

    return (
        <div className='mb-5'>
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