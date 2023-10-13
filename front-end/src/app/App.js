import React, {Component, createContext} from 'react';
import '../styles/App.css';
import Home from './Home';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Signin from './Signin';
import { AuthProvider } from './Auth';
import cookie from 'react-cookies';
import Header from './Header';
import Footer from './Footer';
import * as Comp from '../components';
import Signout from './Signout';

export const UserContext = createContext();

class App extends Component {
    constructor(props) {
        super(props);
        const userCookie = cookie.load('user') || null;
        this.state = {
            user: userCookie,
            isSignin: false
        };
    }

    componentDidMount() {
        const pathname = window.location.pathname;
        this.setUser(JSON.parse(sessionStorage.getItem('user')));
        this.setState({ isSignin: pathname === '/auth/guest/signin' });
    }
    setUser = (user) => { this.setState({ user }); };

    render() {
        const { user, isSignin } = this.state;

        return (
            <UserContext.Provider value={[user, this.setUser]}>
                <AuthProvider>
                    <div className="container">
                        {!isSignin && <Header />}
                        <Routes>
                        <Route path="/" element={<Navigate to="/auth/guest/signin" />} />
                        <Route path="/auth/guest/signin" element={<Signin />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/auth/guest/signout" element={<Signout />} />

                        <Route path="/user/info" element={<Comp.UserList />} />
                        <Route path="/user/service-cate" element={<Comp.CateList />} />
                        <Route path="/user/service-cate/:id" element={<Comp.CateList />} />
                        <Route path="/user/semester" element={<Comp.UserSemesterList />} />
                        <Route path="user/semester/:id/course" element={<Comp.UserCourseList />} />

                        <Route path="/user/service/transcript/:id" element={<Comp.TranscriptList />} />
                        <Route path="/user/service/transcript/add" element={<Comp.AddTranscript />} />
                        <Route path="/user/service/transcript/update/:id" element={<Comp.UpdateTranscript />} />

                        <Route path="/user/service/diploma/:id" element={<Comp.DiplomaList />} />
                        <Route path="/user/service/diploma/update/:id" element={<Comp.UpdateDiploma />} />
                        <Route path="/user/service/diploma/add" element={<Comp.AddDiploma />} />

                        <Route path="/user/service/stud-cert/:id" element={<Comp.StudCertificateList />} />
                        <Route path="/user/service/stud-cert/update/:id" element={<Comp.UpdateStudCertificate />} />
                        <Route path="/user/service/stud-cert/add" element={<Comp.AddStudCertificate />} />

                        <Route path="/user/service/unlock-stud/:id" element={<Comp.UnlockStudList />} />
                        <Route path="/user/service/unlock-stud/add" element={<Comp.AddUnlockStud />} />
                        <Route path="/user/service/unlock-stud/update:id" element={<Comp.UpdateUnlockStud />} />

                        <Route path="/admin/student" element={<Comp.StudentList />} />
                        <Route path="/admin/student/:id" element={<Comp.StudentList />} />
                        <Route path="/admin/department" element={<Comp.DepartmentList />} />
                        <Route path="/admin/departmen/:id" element={<Comp.DepartmentList />} />

                        <Route path="/admin/course-data/getall" element={<Comp.CourseDataList />} />
                        <Route path="/admin/course-data/add" element={<Comp.AddCourseData />} />
                        <Route path="/admin/course-data/update/:id" element={<Comp.UpdateCourseData />} />
                        <Route path="/admin/course-data/delete/:id" element={<Comp.CourseDataList />} />
                    </Routes>
                    <Footer />
                </div>
            </AuthProvider>
            </UserContext.Provider>
        );
    }
}

export default App;