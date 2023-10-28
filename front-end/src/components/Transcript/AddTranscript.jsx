import React, {useEffect, useState} from 'react'
import TranscriptService from "../../services/User/TranscriptService";
import {useNavigate} from "react-router-dom";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";
import HomeService from "../../services/Guest/HomeService";

function AddTranscript() {
    const [language, setLanguage] = useState('');
    const [phoneContact, setPhoneContact] = useState('');
    const [fromSemester, setFromSemester] = useState(0);
    const [toSemester, setToSemester] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [isSealed, setIsSealed] = useState(false);
    const [semesters, setSemesters] = useState([]);
    const nav = useNavigate();
    const [resp, setResp] = useState('');

    const saveTranscript = (e) => {
        e.preventDefault();
        if (phoneContact === '' || fromSemester === undefined || language === ''
            || toSemester === undefined || quantity === undefined)
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (quantity <= 0)
            setResp('Số bản nhập không hợp lệ');
        else if (toSemester < fromSemester)
            setResp('Học kỳ chọn không hợp lệ');
        else {
            const transcript = {
                language,
                fromSemester,
                toSemester,
                quantity,
                phoneContact,
                isSealed,
            };

            TranscriptService.addTranscript(transcript).then(res => {
                setResp('Đăng ký thành công.');
                let data = res.data;
                nav(`/user/payment/create/${data.onlineService.id}`);
            });
        }
    };

    const changeLanguageHandler = (e) => {
        setLanguage(e.target.value);
        setResp('');
    }

    const changePhoneHandler = (e) => {
        setPhoneContact(e.target.value);
        setResp('');
    }

    const changeFromSemesterHandler = (e) => {
        setFromSemester(parseInt(e.target.value));
        setResp('');
    }

    const changeToSemesterHandler = (e) => {
        setToSemester(parseInt(e.target.value));
        setResp('');
    }

    const changeQuantityHandler = (e) => {
        setQuantity(parseInt(e.target.value));
        setResp('');
    }

    const changeSealedHandler = (e) => {
        setIsSealed(e.target.checked);
        setResp('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }

    useEffect(() => {
        const getSemesters = async () => {
            try {
                const res = await HomeService.getSemester();
                setSemesters(res.data);
            } catch (err) {
                console.error('Lỗi khi lấy danh sách học kỳ:', err);
            }
        };

        getSemesters().then();
    }, [])

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
                    <Row className="justify-content-center pb-2 mt-2 border-bottom h3">Cấp bảng điểm</Row>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Ngôn ngữ</Label>
                                <Input placeholder="Tiếng Việt, Anh ..." name="language" className="form-control"
                                       value={language} onChange={changeLanguageHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Học kỳ bắt đầu</Label>
                                <Input type="select" name="from semester" className="form-control"
                                        value={fromSemester} onChange={changeFromSemesterHandler}>
                                    <option value="">Chọn học kỳ</option>
                                    {semesters.map((semester) => (
                                        <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Học kỳ kết thúc</Label>
                                <Input type="select" name="to semester" className="form-control custom-select"
                                        value={toSemester} onChange={changeToSemesterHandler}>
                                    <option value="">Chọn học kỳ</option>
                                    {semesters.map((semester) => (
                                        <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Số điện thoại</Label>
                                <Input placeholder="Số điện thoại" name="phoneContact" className="form-control"
                                       value={phoneContact} onChange={changePhoneHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Số bản sao</Label>
                                <Input placeholder="Số bản" name="quantity" className="form-control" min="1"
                                       type="number" value={quantity} onChange={changeQuantityHandler}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" checked={isSealed} onChange={changeSealedHandler} />
                                    Niêm phong (trường hợp gửi qua nước ngoài)
                                </Label>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={saveTranscript}>Lưu</Button>
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

export default AddTranscript;
