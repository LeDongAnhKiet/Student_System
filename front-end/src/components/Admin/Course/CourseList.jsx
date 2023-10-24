import React, {useEffect, useState} from 'react';
import {Alert, Container, Table} from 'reactstrap';
import CourseService from "../../../services/Admin/CourseService";
import {useNavigate} from "react-router-dom";

function CourseList() {
    const [courses, setCourses] = useState([]);
    const nav = useNavigate();
    const [success, setSuccess] = useState('');

    useEffect(() => {
        CourseService.getCourse().then((res) => {
            setCourses(res.data);
        });
    }, []);

    const addCourse = () => { nav('/admin/course/add'); }

    const deleteCourse = (course) => {
        CourseService.deleteCourse(course.id).then(() => {
            setCourses(courses.filter(c => c.id !== course.id));
        })
        setSuccess(`Xóa ${course.courseName} thành công.`)
    }

    const updateCourse = (course) => {
        nav(`/admin/course/update/${course.id}`, {
            state: {
                courseName: course.courseName,
                creditsNum: course.creditsNum,
                note: course.note,
            }
        });
    }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Danh sách môn học</h3>
                <div className="row">
                    <Table className="mt-3 table table-striped table-bordered">
                        <thead className="text-center"><tr>
                            <th>Tên môn học</th>
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
                                    <button className="btn-success btn"
                                            onClick={() => {updateCourse(course)}}>Chỉnh sửa
                                    </button>
                                    <button className="ms-2 btn-danger btn"
                                            onClick={()=> {deleteCourse(course)}}>Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
                <div className="float-end row">
                    <button className="btn-primary btn"
                            onClick={addCourse}>Thêm
                    </button>
                </div>
                {success && <Alert color="success" className="fixed-bottom"
                   style={{marginBottom:'100px', marginLeft:'200px', marginRight:'200px'}}
                   onMouseEnter={() => setSuccess('')}>{success}</Alert>}
            </Container>
        </div>
    );
}
export default CourseList;