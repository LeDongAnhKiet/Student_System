import React, {useEffect, useRef, useState} from 'react'
import UnlockStudService from "../../services/User/UnlockStudService";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function UpdateUnlockStud() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [resp, setResp] = useState('');

    const {image, content} = loc.state || {};
    const [imageInput, setImageInput] = useState(image || '');
    const [contentInput, setContentInput] = useState(content || '');

    useEffect(() => {
            UnlockStudService.getUnlockStud(id).then(res => {
                let unlockStud = res.data;
                setImageInput(unlockStud.image);
                setContentInput(unlockStud.content);
            })
    }, [id]);

    const saveUnlockStud = (e) => {
        e.preventDefault();
        if (image === '' || content === '')
            setResp('Vui lòng nhập đầy đủ thông tin');
        else {
            const unlockStud = {
                image: imageInput,
                content: contentInput,
            };
            UnlockStudService.updateUnlockStud(unlockStud, id).then(() => {
                setResp('Chỉnh sửa yêu cầu thành công.');
            })
        }
    };

    const changeImageHandler = (e) => {
        setImageInput(e.target.file);
        setResp('');
    }

    const changeContentHandler = (e) => {
        setContentInput(e.target.value);
        setResp('');
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

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <Container fluid>
            <Row className="mt-3">
                <Card className = "col-md-6 offset-md-3">
                    <Row className="justify-content-center pb-2 mt-2 border-bottom h3">Đăng ký mở khóa sinh viên</Row>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Ảnh đại diện</Label>
                                <Input type="file" className="form-control-file" accept="image/*"
                                       onChange={changeImageHandler} multiple={false} ref={useRef(null)} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Nội dung</Label>
                                <Input placeholder="Nội dung" name="content" className="form-control"
                                       value={content} onChange={changeContentHandler}/>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={saveUnlockStud}>Lưu</Button>
                                <Button color="secondary" className="m-1" onClick={cancel}>Hủy</Button>
                            </div>
                        </Form>
                    </CardBody>
                    {alert()}
                </Card>
            </Row>
        </Container>
    )
}

export default UpdateUnlockStud;
