import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import CourseDataService from "../../../services/Admin/CourseDataService";
import {useNavigate} from "react-router-dom";

function CourseDataList() {
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
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Chi tiết môn học</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center"><tr>
                            <th>Tên</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Giảng viên</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { courseDatas.map( courseData => (
                            <tr key={courseData.id}>
                                <td>{courseData.course.courseName}</td>
                                <td>{courseData.startDate}</td>
                                <td>{courseData.endDate}</td>
                                <td>{courseData.lecture.lectureName}</td>
                                <td className="text-center">
                                    <button className="btn-success btn"
                                            onClick={() => {updateCourseData(courseData.id)}}>Chỉnh sửa
                                    </button>
                                    <button className="ms-2 btn-danger btn"
                                            onClick={() => {deleteCourseData(courseData.id)}}>Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn"
                            onClick={addCourseData}>Thêm
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default CourseDataList;