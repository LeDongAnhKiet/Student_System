import React, {useEffect, useState} from 'react';
import {Container, Table} from 'reactstrap';
import CourseService from "../../../services/Admin/CourseService";
import {useNavigate} from "react-router-dom";

function CourseList() {
    const [courses, setCourses] = useState([]);
    const nav = useNavigate();

    useEffect(() => {
        CourseService.getCourse().then((res) => {
            setCourses(res.data);
        });
    }, []);

    const addCourse = () => { nav('/admin/course/add'); }

    const deleteCourse = (id) => {
        CourseService.deleteCourse(id).then(() => {
            setCourses(courses.filter(course => course.id !== id));
        })
    }

    const updateCourse = (id) => { nav(`/admin/course/update/${id}`); }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Danh sách môn học</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center align-middle"><tr>
                            <th>Tên</th>
                            <th>Số tín chỉ</th>
                            <th>Ghi chú</th>
                            <th>Thao tác</th>
                        </tr></thead>
                        <tbody>
                        { courses.map( course => (
                            <tr key={course.id}>
                                <td>{course.courseName}</td>
                                <td>{course.creditsNum}</td>
                                <td>{course.startDate}</td>
                                <td className="text-center">
                                    <button className="btn-success btn m-1"
                                            onClick={() => {updateCourse(course.id)}}>Chỉnh sửa
                                    </button>
                                    <button className="btn-danger btn m-1"
                                            onClick={() => {deleteCourse(course.id)}}>Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn m-1"
                            onClick={addCourse}>Thêm
                    </button>
                </div>
            </Container>
        </div>
    );
}
export default CourseList;