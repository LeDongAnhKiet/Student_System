import React, {createContext, useEffect, useReducer, useState} from 'react';
import '../styles/App.css';
import Home from '../app/Home';
import {Navigate, Route, Routes, useLocation} from 'react-router-dom';
import Signin from "../app/Signin";
import Reducer from "../app/Reducer";
import cookie from "react-cookies";
import Header from "./Header";
import Footer from "./Footer";
import * as Comp from '../components';

export const UserContext = createContext(null);
const App = () => {
    const [user, setUser] = useReducer(Reducer,cookie.load('user') || null);
    const loc = useLocation();
    const [isSignin, setIsSign] = useState(false);

    useEffect(() => {
        setIsSign(loc.pathname === '/guest/auth/signin');
    }, [loc.pathname]);
    localStorage.getItem('user');

    return (
        <UserContext.Provider value={[user, setUser]}>
                <div className="container">
                    {!isSignin && <Header />}
                    <Routes>
                        <Route path="/" element={<Navigate to="/guest/auth/signin" />} />
                        <Route path="/guest/auth/signin" element={<Signin />} />
                        <Route path="/home" element={<Home />} />

                        <Route path="/user/info" element={<Comp.UserList />} />
                        <Route path="/user/service-cate" element={<Comp.CateList />} />
                        <Route path="/user/service-cate/:id" element={<Comp.CateList />} />
                        <Route path="/user/semester" element={<Comp.UserSemesterList />} />
                        <Route path="/user/semester/:id/course" element={<Comp.UserCourseList />} />

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
                        <Route path="/user/service/unlock-stud/update/:id" element={<Comp.UpdateUnlockStud />} />

                        <Route path="/semester/:id/course" element={<Comp.UserCourseList />} />
                        <Route path="/semester/:id/course" element={<Comp.UserCourseList />} />
                        <Route path="/semester/:id/course" element={<Comp.UserCourseList />} />
                        <Route path="/semester/:id/course" element={<Comp.UserCourseList />} />

                        <Route path="/admin/student" element={<Comp.StudentList />} />
                        <Route path="/admin/student/:id" element={<Comp.StudentList />} />
                        <Route path="/admin/department" element={<Comp.DepartmentList />} />
                        <Route path="/admin/department/:id" element={<Comp.DepartmentList />} />

                        <Route path="/admin/course-data/getall" element={<Comp.UnlockStudList />} />
                        <Route path="/admin/course-data/add" element={<Comp.AddUnlockStud />} />
                        <Route path="/admin/course-data/update/:id" element={<Comp.UpdateUnlockStud />} />
                    </Routes>
                    <Footer />
                </div>
        </UserContext.Provider>
    );
}

export default App;