import React, {useEffect, useState} from 'react';
import {Alert, Button, Container, Row, Table} from 'reactstrap';
import CourseService from "../../../services/Admin/CourseService";
import {useNavigate, useParams} from "react-router-dom";

function CourseList() {
    const [courses, setCourses] = useState([]);
    const nav = useNavigate();
    const [resp, setResp] = useState('');
    const { id } = useParams();

    useEffect(() => {
        if (id)
            CourseService.getCourseById(id).then(res => {
                setCourses(res.data);
            });
        else
            CourseService.getCourse().then(res => {
                setCourses(res.data);
            });
    }, [id]);

    const addCourse = () => { nav('/admin/course/add'); }

    const deleteCourse = (course) => {
        CourseService.deleteCourse(course.id)
            .then(() => {
                setCourses(courses.filter(c => c.id !== course.id));
                setResp(`Xóa ${course.courseName} thành công.`);
            })
            .catch((error) => {
                if (error.response && error.response.status === 409)
                    setResp('Đã có lớp dạy môn này. Không thể xóa được.');
                else {
                    console.error("Lỗi không xác định: ", error);
                    setResp('Lỗi xảy ra. Không thể xóa.');
                }
            });
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

    const alert = () => {
        if (resp.includes('thành công'))
            return (
                <Alert color="success" className="fixed-bottom"
                       style={{marginBottom:'5rem', marginLeft:'25%', marginRight:'25%'}}
                       onMouseEnter={() => setResp('')}>{resp}
                </Alert>
            )
        else if (resp)
            return (
                <Alert color="danger" className="fixed-bottom"
                       style={{marginBottom:'5rem', marginLeft:'25%', marginRight:'25%'}}
                       onMouseEnter={() => setResp('')}>{resp}
                </Alert>
            )
    }

    return (
        <div className='mb-5'>
            <Container fluid>
                <h3 className ="App">Danh sách môn học</h3>
                <Row>
                    <Table className="mt-3 table-striped table-bordered">
                        <thead className="App">
                            <tr>
                                <th>Tên môn học</th>
                                <th>Số tín chỉ</th>
                                <th>Ghi chú</th>
                                <th>Thao tác</th>
                            </tr>
                        </thead>
                        <tbody>
                        { courses.map( course => (
                            <tr key={course.id}>
                                <td>{course.courseName}</td>
                                <td>{course.creditsNum}</td>
                                <td>{course.note}</td>
                                <td className="App">
                                    <Button color="success" className="m-1"
                                            onClick={() => {updateCourse(course)}}>Chỉnh sửa
                                    </Button>
                                    <Button color="danger " className="m-1"
                                            onClick={()=> {deleteCourse(course)}}>Xóa
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </Row>
                <Row className="float-end">
                    <Button color="primary" onClick={addCourse}>Thêm môn học</Button>
                </Row>
                {alert()}
            </Container>
        </div>
    );
}
export default CourseList;