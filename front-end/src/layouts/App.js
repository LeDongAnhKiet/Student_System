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

                        <Route path="/admin/student" element={<Comp.StudentList />} />
                        <Route path="/admin/student/:id" element={<Comp.StudentList />} />
                        <Route path="/admin/department" element={<Comp.DepartmentList />} />
                        <Route path="/admin/department/:id" element={<Comp.DepartmentList />} />

                        <Route path="/admin/course-data/getall" element={<Comp.CourseDataList />} />
                        <Route path="/admin/course-data/add" element={<Comp.AddCourseData />} />
                        <Route path="/admin/course-data/update/:id" element={<Comp.UpdateCourseData />} />

                        <Route path="/admin/semester/getavailable" element={<Comp.SemesterList />} />
                        <Route path="/admin/semester/get/:id" element={<Comp.SemesterList />} />
                        <Route path="/admin/semester/add" element={<Comp.AddSemester />} />
                        <Route path="/admin/semester/update/:id" element={<Comp.UpdateSemester />} />

                        <Route path="/admin/schedule-info/getall" element={<Comp.ScheduleList />} />
                        <Route path="/admin/schedule-info/add" element={<Comp.AddSchedule />} />
                        <Route path="/admin/schedule-info/update/:id" element={<Comp.UpdateSchedule />} />

                        <Route path="/admin/room/get" element={<Comp.RoomList />} />
                        <Route path="/admin/room/add" element={<Comp.AddRoom />} />
                        <Route path="/admin/room/update/:id" element={<Comp.UpdateRoom />} />

                        <Route path="/admin/course/getall" element={<Comp.CourseList />} />
                        <Route path="/admin/course/get/:id" element={<Comp.CourseList />} />
                        <Route path="/admin/course/add" element={<Comp.AddCourse />} />
                        <Route path="/admin/course/update/:id" element={<Comp.UpdateCourse />} />
                    </Routes>
                    <Footer />
                </div>
        </UserContext.Provider>
    );
}

export default App;