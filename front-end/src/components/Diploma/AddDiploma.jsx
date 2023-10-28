import React, {useState} from 'react'
import DiplomaService from "../../services/User/DiplomaService";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function AddDiploma() {
    const nav = useNavigate();
    const [resp, setResp] = useState('');
    const [copy, setCopy] = useState(0);
    const [phoneContact, setPhoneContact] = useState('');
    const [email, setEmail] = useState('');
    const [diplomaYear, setDiplomaYear] = useState(1970);
    const [diplomaCode, setDiplomaCode] = useState('');

    const saveDiploma = (e) => {
        e.preventDefault();
        if (copy === undefined || phoneContact === '' || email === '' || diplomaYear === undefined || diplomaCode === '')
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (copy <= 0 || diplomaYear <= 1970)
            setResp('Số nhập không hợp lệ');
        else {
            const diploma = {
                copy,
                phoneContact,
                email,
                diplomaYear,
                diplomaCode,
            };

            DiplomaService.addDiploma(diploma).then(res => {
                setResp('Đăng ký thành công.');
                let data = res.data;
                nav(`/user/payment/create/${data.onlineService.id}`);
            });
        }
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

    const changeCopyHandler = (e) => {
        setCopy(parseInt(e.target.value));
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

    const changeYearHandler = (e) => {
        setDiplomaYear(parseInt(e.target.value));
        setResp('');
    }

    const changeCodeHandler = (e) => {
        setResp('');
        setDiplomaCode(e.target.value);
    }
    
    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <Container fluid>
            <Row className="mt-3">
                <Card className = "col-md-6 offset-md-3">
                    <Row className="justify-content-center pb-2 mt-2 border-bottom h3">Cấp bản sao bằng tốt nghiệp</Row>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Số lượng bản sao</Label>
                                <Input placeholder="Copy" name="copy" type="number" min="1" className="form-control"
                                       value={copy} onChange={changeCopyHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Số điện thoại</Label>
                                <Input placeholder="Phone Contact" name="phoneContact" className="form-control"
                                       value={phoneContact} onChange={changePhoneHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Email</Label>
                                <Input placeholder="Email Address" name="email" className="form-control"
                                       value={email} onChange={changeEmailHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Năm tốt nghiệp</Label>
                                <Input placeholder="Year" name="year" min="1970" type="number" className="form-control"
                                       value={diplomaYear} onChange={changeYearHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Mã bằng</Label>
                                <Input placeholder="Code" name="code" className="form-control"
                                       value={diplomaCode} onChange={changeCodeHandler}/>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={saveDiploma}>Lưu</Button>
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

export default AddDiploma