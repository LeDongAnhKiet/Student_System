import React, { useState, useEffect } from 'react';
import DiplomaService from '../../services/User/DiplomaService';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function UpdateDiploma() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [resp, setResp] = useState('');
    
    const { copy, phoneContact, email, diplomaYear, diplomaCode } = loc.state || {};
    const [diplomaId, setDiplomaId] = useState(0);
    const [copyInput, setCopyInput] = useState(copy || 0);
    const [phoneContactInput, setPhoneContactInput] = useState(phoneContact || '');
    const [emailInput, setEmailInput] = useState(email || '');
    const [diplomaYearInput, setDiplomaYearInput] = useState(diplomaYear || 1970);
    const [diplomaCodeInput, setDiplomaCodeInput] = useState(diplomaCode || '');

    useEffect(() => {
        DiplomaService.getDiploma(id).then(res => {
            let diploma = res.data;
            // Set cac gia tri cho diploma
            setDiplomaId(diploma.id);
            setCopyInput(diploma.copy);
            setPhoneContactInput(diploma.phoneContact);
            setEmailInput(diploma.email);
            setDiplomaYearInput(diploma.diplomaYear);
            setDiplomaCodeInput(diploma.diplomaCode);
        });
    }, [id]);

    const updateDiploma = (e) => {
        e.preventDefault();
        if (phoneContactInput === undefined || copyInput === '' || emailInput === ''
                || diplomaYearInput === undefined || diplomaCodeInput === '')
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (copyInput <= 0 || diplomaYearInput < 1970)
            setResp('Số không hợp lệ');
        else {
            const diploma = {
                copy: copyInput,
                phoneContact: phoneContactInput,
                email: emailInput,
                diplomaYear: diplomaYearInput,
                diplomaCode: diplomaCodeInput,
            };

            DiplomaService.updateDiploma(diploma, diplomaId).then(() => {
                setResp('Chỉnh sửa bản sao bằng thành công.');
            });
        }
    }

    const changeCopyHandler = (e) => {
        setCopyInput(parseInt(e.target.value));
        setResp('');
    };

    const changePhoneHandler = (e) => {
        setPhoneContactInput(e.target.value);
        setResp('');
    };

    const changeEmailHandler = (e) => {
        setEmailInput(e.target.value);
        setResp('');
    };

    const changeYearHandler = (e) => {
        setDiplomaYearInput(parseInt(e.target.value));
        setResp('');
    };

    const changeCodeHandler = (e) => {
        setDiplomaCodeInput(e.target.value);
        setResp('');
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

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <Container fluid>
            <Row className="mt-3">
                <Card className="col-md-6 offset-md-3">
                    <Row className="justify-content-center pb-2 mt-2 border-bottom h3">Chỉnh sửa bản sao bằng tốt nghiệp</Row>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Số lượng bản sao</Label>
                                <Input placeholder="Copy" name="copy" type="number" min="1" className="form-control"
                                       value={copyInput} onChange={changeCopyHandler} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Số điện thoại</Label>
                                <Input placeholder="0123456789" name="phoneContact" className="form-control"
                                    value={phoneContactInput} onChange={changePhoneHandler} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input placeholder="Địa chỉ email" name="email" className="form-control"
                                    value={emailInput} onChange={changeEmailHandler} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Năm tốt nghiệp</Label>
                                <Input placeholder="20xx" name="year" type="number" min="1970" className="form-control"
                                    value={diplomaYearInput} onChange={changeYearHandler} />
                            </FormGroup>
                            <FormGroup>
                                <Label>Mã bằng</Label>
                                <Input placeholder="123..." name="code" className="form-control"
                                    value={diplomaCodeInput} onChange={changeCodeHandler} />
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={updateDiploma} >Lưu</Button>
                                <uBtton color="secondary" className="m-1" onClick={cancel} >Hủy</uBtton>
                            </div>
                        </Form>
                    </CardBody>
                    {alert()}
                </Card>
            </Row>
        </Container>
    );
}

export default UpdateDiploma;
