import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import CourseDataService from "../../../services/Admin/CourseDataService";
import {useNavigate} from "react-router-dom";

function CourseList() {
    const [courseDatas, setCourseDatas] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        CourseDataService.getCourse().then((res) => {
            setCourseDatas(res.data);
        });
    }, []);

    const addCourseData = () => { nav('/admin/course-data/add'); }

    const deleteCourseData = (id) => {
        CourseDataService.deleteCourse(id).then(() => {
            setCourseDatas(courseDatas.filter(courseData => courseData.id !== id));
        })
    }

    const updateCourseData = (id) => { nav(`/admin/course-data/update/${id}`); }

    return (
        <div>
            <Container fluid>
                <h3 className ="App">Chi tiết môn học</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center align-middle"><tr>
                            <th>Tên</th>
                            <th>Số tín chỉ</th>
                            <th>Email</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Giảng viên</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { courseDatas.map( courseData => (
                            <tr key={courseData.id}>
                                <td>{courseData.course.courseName}</td>
                                <td>{courseData.course.creditsNum}</td>
                                <td>{courseData.startDate}</td>
                                <td>{courseData.endDate}</td>
                                <td>{courseData.lecture.lectureName}</td>
                                <td className="btn-group">
                                    <button className="btn-success btn m-1"
                                            onClick={() => {updateCourseData(courseData.id)}}>Chỉnh sửa
                                    </button>
                                    <button className="btn-success btn m-1"
                                            onClick={() => {deleteCourseData(courseData.id)}}>Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="col-3 float-end row">
                    <button className="btn-primary btn m-1"
                            onClick={addCourseData}>Thêm
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default CourseList;