import React from 'react';
import '../styles/App.css';
import Home from './Home';
import {Navigate, Route, Routes} from 'react-router-dom';
import UserList from "../components/User/UserList";
import UserSemesterList from "../components/User/UserSemesterList";
import CateList from "../components/User/CateList";
import UserCourseList from "../components/User/UserCourseList";
import TranscriptList from "../components/Transcript/TranscriptList";
import DiplomaList from "../components/Diploma/DiplomaList";
import Signin from "./Signin";
import AddDiploma from "../components/Diploma/AddDiploma";
import UnlockStudList from "../components/UnlockStud/UnlockStudList";
import AddTranscript from "../components/Transcript/AddTranscript";
import StudCertificateList from "../components/StudCertificate/StudCertificateList";
import AddStudCertificate from "../components/StudCertificate/AddStudCertificate";
import AddUnlockStud from "../components/UnlockStud/AddUnlockStud";
import Footer from "./Footer";
import UpdateDiploma from "../components/Diploma/UpdateDiploma";
import UpdateStudCertificate from "../components/StudCertificate/UpdateStudCertificate";
import {AuthProvider} from "./Auth";

const App = () => {
    return (
        <AuthProvider>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Navigate to="/auth/signin" />} />

                    <Route path="/auth/signin" element={<Signin />} />

                    <Route path="/home" element={<Home />} />

                    <Route path="/user/info" element={<UserList />} />

                    <Route path="/user/service-cate" element={<CateList />} />

                    <Route path="/user/service-cate/:id" element={<CateList />} />

                    <Route path="/user/service/transcript/:id" element={<TranscriptList />} />

                    <Route path="/user/service/transcript/add" element={<AddTranscript />} />

                    <Route path="/user/service/diploma/:id" element={<DiplomaList />} />

                    <Route path="/user/service/diploma/update/:id" element={<UpdateDiploma />} />

                    <Route path="/user/service/diploma/add" element={<AddDiploma />} />

                    <Route path="/user/service/stud-cert/:id" element={<StudCertificateList />} />

                    <Route path="/user/service/stud-cert/update/:id" element={<UpdateStudCertificate />} />

                    <Route path="/user/service/stud-cert/add" element={<AddStudCertificate />} />

                    <Route path="/user/service/unlock-stud/:id" element={<UnlockStudList />} />

                    <Route path="/user/service/unlock-stud/add" element={<AddUnlockStud />} />

                    <Route path="/user/semester" element={<UserSemesterList />} />

                    <Route path="/semester/:id/course" element={<UserCourseList />} />

                    <Route path="/semester/:id/course" element={<UserCourseList />} />

                    <Route path="/semester/:id/course" element={<UserCourseList />} />

                    <Route path="/semester/:id/course" element={<UserCourseList />} />

                    <Route path="/semester/:id/course" element={<UserCourseList />} />

                    <Route path="/semester/:id/course" element={<UserCourseList />} />

                    <Route path="/semester/:id/course" element={<UserCourseList />} />
                </Routes>
                <Footer />
            </div>
        </AuthProvider>
    );
}

export default App;