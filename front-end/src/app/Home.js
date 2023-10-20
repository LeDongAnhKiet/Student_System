import {Button, Container} from "reactstrap";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
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

    const signin = () => {
        setUser({'type': 'signin', initState});
        if (user !== null) nav('/guest/auth/signin');
    }

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
        //window.location.reload();
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
                                <h2 >Xin chào, {user.fullName}</h2>
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