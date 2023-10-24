import React, {useEffect, useState} from 'react';
import {Alert, Container, Table} from 'reactstrap';
import CourseDataService from "../../../services/Admin/CourseDataService";
import {useNavigate} from "react-router-dom";

function CourseDataList() {
    const [courseDatas, setCourseDatas] = useState([]);
    const nav = useNavigate();
    const [success, setSuccess] = useState('');

    useEffect(() => {
        CourseDataService.getCourse().then((res) => {
            setCourseDatas(res.data);
        });
    }, []);

    const addCourseData = () => { nav('/admin/course-data/add'); }

    const deleteCourseData = (data) => {
        CourseDataService.deleteCourse(data.id).then(() => {
            setCourseDatas(courseDatas.filter(courseData => courseData.id !== data.id));
        })
        setSuccess(`Xóa ${data.course.courseName} thành công.`)
    }

    const updateCourseData = (courseData) => {
        nav(`/admin/course-data/update/${courseData.id}`, {
            state: {
                startDate: (courseData.startDate).split('-').reverse().join('-'),
                endDate: (courseData.endDate).split('-').reverse().join('-'),
                courseId: courseData.course.id,
                lectureId: courseData.lecture.id,
            }
        });
    }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Thông tin lớp học</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center"><tr>
                            <th>Tên môn học</th>
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
                                            onClick={() => {updateCourseData(courseData)}}>Chỉnh sửa
                                    </button>
                                    <button className="ms-2 btn-danger btn"
                                            onClick={() => {deleteCourseData(courseData)}}>Xóa
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
                {success && <Alert color="success" className="fixed-bottom"
                   style={{marginBottom:'100px', marginLeft:'200px', marginRight:'200px'}}
                   onMouseEnter={() => setSuccess('')}>{success}</Alert>}
            </Container>
        </div>
    );
}
export default CourseDataList;