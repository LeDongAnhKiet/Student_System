import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import StudCertificateService from "../../services/User/StudCertificateService";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function UpdateStudCertificate() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [resp, setResp] = useState('');

    const { vietCopy, engCopy, email, phoneContact, content } = loc.state || {};
    const [vietCopyInput, setVietCopyInput] = useState(vietCopy || 0);
    const [engCopyInput, setEngCopyInput] = useState(engCopy || 0);
    const [emailInput, setEmailInput] = useState(email || '');
    const [phoneContactInput, setPhoneContactInput] = useState(phoneContact || '');
    const [contentInput, setContentInput] = useState(content || '');

    useEffect(() => {
        StudCertificateService.getStudCertificate(id).then(res => {
            let studCertificate = res.data;
            setVietCopyInput(studCertificate.vietCopy);
            setPhoneContactInput(studCertificate.phoneContact);
            setEmailInput(studCertificate.email);
            setEngCopyInput(studCertificate.engCopy);
            setContentInput(studCertificate.content);
        })
    }, [id]);

    const updateStudCertificate = (e) => {
        e.preventDefault();
        if (phoneContactInput === '' || vietCopyInput === undefined || emailInput === ''
                || engCopyInput === undefined || contentInput === '')
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (vietCopyInput < 0 || engCopyInput < 0 || (vietCopyInput === 0 && engCopyInput === 0))
            setResp('Số nhập không hợp lệ');
        else {
            const studCertificate = {
            vietCopy: vietCopyInput,
            engCopy: engCopyInput,
            email: emailInput,
            phoneContact: phoneContactInput,
            content: contentInput,
        };
        StudCertificateService.updateStudCertificate(studCertificate, id).then(() => {
            nav(`/user/service/stud-cert/${studCertificate.onlineService.id}`);
        });
    }
    }

    const changeVietCopyHandler = (e) => {
        setVietCopyInput(parseInt(e.target.value));
        setResp('');
    }

    const changePhoneHandler = (e) => {
        setPhoneContactInput(e.target.value);
        setResp('');
    }

    const changeEmailHandler = (e) => {
        setEmailInput(e.target.value);
        setResp('');
    }

    const changeEngCopyHandler = (e) => {
        setEngCopyInput(parseInt(e.target.value));
        setResp('');
    }

    const changeContentHandler = (e) => {
        setContentInput(e.target.value);
        setResp('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <Container fluid>
            <Row className="mt-3">
                <Card className = "col-md-6 offset-md-3">
                    <h3 className="justify-content-center pb-2 mt-2 border-bottom row">Chỉnh sửa chứng nhận sinh viên</h3>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Bản sao tiếng Việt</Label>
                                <Input placeholder="Bản Việt" name="vietCopy" type="number" min="0" className="form-control"
                                       value={vietCopyInput} onChange={changeVietCopyHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Bản sao tiếng Anh</Label>
                                <Input placeholder="Bản Anh" name="engCopy" type="number" min="0" className="form-control"
                                       value={engCopyInput} onChange={changeEngCopyHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Số điện thoại</Label>
                                <Input placeholder="Số điện thoại" name="phoneContact" className="form-control"
                                       value={phoneContactInput} onChange={changePhoneHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input placeholder="Địa chỉ email" name="email" className="form-control"
                                       value={emailInput} onChange={changeEmailHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Nội dung</Label>
                                <Input placeholder="Nội dung" name="content" className="form-control"
                                       value={contentInput} onChange={changeContentHandler}/>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={updateStudCertificate}>Lưu</Button>
                                <Button color="secondary" className="m-1" onClick={cancel}>Hủy</Button>
                            </div>
                        </Form>
                    </CardBody>
                </Card>
            </Row>
        </Container>
    )
}

export default UpdateStudCertificate