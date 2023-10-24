import React, {createContext, useEffect, useReducer} from 'react';
import '../styles/App.css';
import Home from './Home';
import {Navigate, Route, Routes} from 'react-router-dom';
import Signin from "./Signin";
import Reducer from "./Reducer";
import cookie from "react-cookies";
import Header from "../layouts/Header";
import Footer from "../layouts/Footer";
import * as Comp from '../components';

export const UserContext = createContext(null);
const App = () => {
    const [user, setUser] = useReducer(Reducer,cookie.load('user') || null);

    useEffect(() => {
        localStorage.getItem('user');
    })

    return (
        <UserContext.Provider value={[user, setUser]}>
            <Header/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/guest/auth/signin" />} />
                    <Route path="/guest/auth/signin" element={<Signin />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/guest/service-cate" element={<Comp.CateList />} />
                    <Route path="/guest/service-cate/:id" element={<Comp.CateList />} />

                    <Route path="/user/info" element={<Comp.UserInfoList />} />
                    <Route path="/user/semester" element={<Comp.UserSemesterList />} />
                    <Route path="/user/semester/:id/course" element={<Comp.UserDetailsList />} />
                    <Route path="/user/payment/create/:id" element={<Comp.CreatePayment />} />
                    <Route path="/user/payment/status/" element={<Comp.PaymentStatus />} />

                    <Route path="/user/service/transcript/:id" element={<Comp.TranscriptList />} />
                    <Route path="/user/service/diploma/:id" element={<Comp.DiplomaList />} />
                    <Route path="/user/service/stud-cert/:id" element={<Comp.StudCertificateList />} />
                    <Route path="/user/service/unlock-stud/:id" element={<Comp.UnlockStudList />} />

                    <Route path="/user/service/transcript/add" element={<Comp.AddTranscript />} />
                    <Route path="/user/service/diploma/add" element={<Comp.AddDiploma />} />
                    <Route path="/user/service/stud-cert/add" element={<Comp.AddStudCertificate />} />
                    <Route path="/user/service/unlock-stud/add" element={<Comp.AddUnlockStud />} />

                    <Route path="/user/service/transcript/update/:id" element={<Comp.UpdateTranscript />} />
                    <Route path="/user/service/diploma/update/:id" element={<Comp.UpdateDiploma />} />
                    <Route path="/user/service/stud-cert/update/:id" element={<Comp.UpdateStudCertificate />} />
                    <Route path="/user/service/unlock-stud/update/:id" element={<Comp.UpdateUnlockStud />} />

                    <Route path="/admin/student" element={<Comp.StudentList />} />
                    <Route path="/admin/student/:id" element={<Comp.StudentList />} />
                    <Route path="/admin/department" element={<Comp.DepartmentList />} />
                    <Route path="/admin/department/:id" element={<Comp.DepartmentList />} />

                    <Route path="/admin/course-data/all" element={<Comp.CourseDataList />} />
                    <Route path="/admin/course-data/add" element={<Comp.AddCourseData />} />
                    <Route path="/admin/course-data/update/:id" element={<Comp.UpdateCourseData />} />

                    <Route path="/admin/course/all" element={<Comp.CourseList />} />
                    <Route path="/admin/course/:id" element={<Comp.CourseList />} />
                    <Route path="/admin/course/add" element={<Comp.AddCourse />} />
                    <Route path="/admin/course/update/:id" element={<Comp.UpdateCourse />} />

                    <Route path="/admin/semester/available" element={<Comp.SemesterList />} />
                    <Route path="/admin/semester/:id" element={<Comp.SemesterList />} />
                    <Route path="/admin/semester/add" element={<Comp.AddSemester />} />
                    <Route path="/admin/semester/update/:id" element={<Comp.UpdateSemester />} />

                    <Route path="/moderator/service-cate/update/:id" element={<Comp.UpdateCate />} />
                    <Route path="/moderator/service-cate/change/:id" element={<Comp.ChangeCate />} />
                    <Route path="/moderator/get-request" element={<Comp.GetRequest />} />
                </Routes>
            </div>
            <Footer />
        </UserContext.Provider>
    );
}

export default App;