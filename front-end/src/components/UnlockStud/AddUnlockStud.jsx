import React, {useState, useRef} from 'react'
import UnlockStudService from "../../services/User/UnlockStudService";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function AddUnlockStud() {
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const nav = useNavigate();
    const [resp, setResp] = useState('');

    const saveUnlockStud = (e) => {
        e.preventDefault();
        if (image === '' || content === '')
            setResp('Vui lòng nhập đầy đủ thông tin');
        else {
            const unlockStud = {
                image,
                content,
            };

            UnlockStudService.addUnlockStud(unlockStud).then(res => {
                setResp('Yêu cầu thành công.');
                let data = res.data;
                nav(`/user/payment/create/${data.onlineService.id}`);
            });
        }
    };

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

    const changeImageHandler = (e) => {
        setImage(e.target.file);
        setResp('');
    };
    const changeContentHandler = (e) => {
        setContent(e.target.value);
        setResp('');
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

export default AddUnlockStud;
