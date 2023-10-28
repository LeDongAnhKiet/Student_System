import React, {useState} from 'react'
import StudCertificateService from "../../services/User/StudCertificateService";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function AddStudCertificate() {
    const [vietCopy, setVietCopy] = useState(0);
    const [phoneContact, setPhoneContact] = useState('');
    const [email, setEmail] = useState('');
    const [engCopy, setEngCopy] = useState(0);
    const [content, setContent] = useState('');
    const nav = useNavigate();
    const [resp, setResp] = useState('');

    const saveStudCertificate = (e) => {
        e.preventDefault();
        if (phoneContact === '' || vietCopy === undefined || email === ''
            || engCopy === undefined || content === '')
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (vietCopy < 0 || engCopy < 0
            || (vietCopy === 0 && engCopy === 0))
            setResp('Số nhập không hợp lệ');
        else {
            const studCertificate = {
                vietCopy,
                engCopy,
                email,
                phoneContact,
                content,
            };

            StudCertificateService.addStudCertificate(studCertificate).then(res => {
                setResp('Thêm môn học thành công.');
                let data = res.data;
                nav(`/user/payment/create/${data.onlineService.id}`);
            });
        }
    }

    const changeVietCopyHandler = (e) => {
        setVietCopy(parseInt(e.target.value));
        setResp('');
    }

    const changePhoneHandler = (e) => {
        setPhoneContact(e.target.value);
        setResp('');
    }

    const changeEmailHandler = (e) => {
        setEmail(e.target.value);
        setResp('');
    }

    const changeEngCopyHandler = (e) => {
        setEngCopy(parseInt(e.target.value));
        setResp('');
    }

    const changeContentHandler = (e) => {
        setContent(e.target.value);
        setResp('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }
    
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
        <Container fluid>
            <Row className="mt-3">
                <Card className = "col-md-6 offset-md-3">
                    <h3 className="justify-content-center pb-2 mt-2 border-bottom row">Cấp chứng nhận sinh viên</h3>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Bản sao tiếng Việt</Label>
                                <Input placeholder="Bản Việt" name="vietCopy" type="number" min="0" className="form-control"
                                       value={vietCopy} onChange={changeVietCopyHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Bản sao tiếng Anh</Label>
                                <Input placeholder="Bản Anh" name="engCopy" type="number" min="0" className="form-control"
                                       value={engCopy} onChange={changeEngCopyHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Số điện thoại</Label>
                                <Input placeholder="Số điện thoại" name="phoneContact" className="form-control"
                                       value={phoneContact} onChange={changePhoneHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input placeholder="Địa chỉ email" name="email" className="form-control"
                                       value={email} onChange={changeEmailHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Nội dung</Label>
                                <Input placeholder="Nội dung" name="content" className="form-control"
                                       value={content} onChange={changeContentHandler}/>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={saveStudCertificate}>Lưu</Button>
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

export default AddStudCertificate;
