import {Button, Container} from "reactstrap";
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from './Auth';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(undefined);
    const nav = useNavigate();
    const {signin, signout} = useAuth();

    useEffect(() => {
        setLoading(true);
        fetch('api/user/info', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data && data.user) setUser(data.user);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                console.error('Lỗi lấy data: ', error);
            });
    }, []);

    return (
        <div>

            <Container fluid>
                {loading ? (
                    <p className="display-6 m-2">Loading...</p>
                ) : (
                    <div className='App'>
                        { user ? (
                            <>
                                <h2>Xin chào, {user.fullName}</h2>
                                <Button className="btn btn-success">
                                    <Link to="/admin">Admin</Link>
                                </Button>
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