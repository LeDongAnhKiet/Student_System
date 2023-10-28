import React, {useEffect, useState} from 'react'
import TranscriptService from "../../services/User/TranscriptService";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import HomeService from "../../services/Guest/HomeService";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function UpdateTranscript() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [resp, setResp] = useState('');

    const {language, phoneContact, fromSemester, toSemester, quantity, isSealed} = loc.state || {};
    const [transcriptId, setTranscriptId] = useState(0);
    const [semesters, setSemesters] = useState([]);
    const [languageInput, setLanguageInput] = useState(language || '');
    const [phoneContactInput, setPhoneContactInput] = useState(phoneContact || '');
    const [fromSemesterInput, setFromSemesterInput] = useState(fromSemester || 0);
    const [toSemesterInput, setToSemesterInput] = useState(toSemester || 0);
    const [quantityInput, setQuantityInput] = useState(quantity || '');
    const [isSealedInput, setIsSealedInput] = useState(isSealed || false);

    useEffect(() => {
        TranscriptService.getTranscript(id).then(res => {
            let transcript = res.data;
            setTranscriptId(transcript.id);
            setLanguageInput(transcript.language);
            setPhoneContactInput(transcript.phoneContact);
            setFromSemesterInput(transcript.fromSemester.id);
            setToSemesterInput(transcript.toSemester.id);
            setQuantityInput(transcript.quantity);
            setIsSealedInput(transcript.isSealed);
        })

        const getSemesters = async () => {
            try {
                const res = await HomeService.getSemester();
                setSemesters(res.data);
            } catch (err) {
                console.error('Lỗi khi lấy danh sách học kỳ:', err);
            }
        };

        getSemesters().then();
    }, [id]);

    const saveTranscript = (e) => {
        e.preventDefault();
        if (phoneContactInput === '' || fromSemesterInput === undefined || languageInput === ''
            || toSemesterInput === undefined || quantityInput === undefined)
            setResp('Vui lòng nhập đầy đủ thông tin');
        else if (quantityInput <= 0)
            setResp('Số bản nhập không hợp lệ');
        else if (toSemesterInput < fromSemesterInput)
            setResp('Học kỳ chọn không hợp lệ');
        else {
            const transcript = {
                language: languageInput,
                fromSemester: fromSemesterInput,
                toSemester: toSemesterInput,
                quantity: quantityInput,
                phoneContact: phoneContactInput,
                isSealed: isSealedInput,
            };

            TranscriptService.updateTranscript(transcript, transcriptId).then(() => {
                setResp('Chỉnh sửa bảng điểm thành công.');
            })
        }
    };

    const changeLanguageHandler = (e) => {
        setLanguageInput(e.target.value);
        setResp('');
    }

    const changePhoneHandler = (e) => {
        setPhoneContactInput(e.target.value);
        setResp('');
    }

    const changeFromSemesterHandler = (e) => {
        setFromSemesterInput(parseInt(e.target.value));
        setResp('');
    }

    const changeToSemesterHandler = (e) => {
        setToSemesterInput(parseInt(e.target.value));
        setResp('');
    }

    const changeQuantityHandler = (e) => {
        setQuantityInput(parseInt(e.target.value));
        setResp('');
    }

    const changeSealedHandler = (e) => {
        setIsSealedInput(e.target.value);
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
                    <Row className="justify-content-center pb-2 mt-2 border-bottom h3">Chỉnh sửa bảng điểm</Row>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Ngôn ngữ</Label>
                                <Input placeholder="Tiếng Việt, Anh ..." name="language" className="form-control"
                                       value={languageInput} onChange={changeLanguageHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Học kỳ bắt đầu</Label>
                                <Input type="select" name="from semester" className="form-control"
                                       value={fromSemesterInput} onChange={changeFromSemesterHandler}>
                                    <option value="">Chọn học kỳ</option>
                                    {semesters.map((semester) => (
                                        <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Học kỳ kết thúc</Label>
                                <Input type="select" name="to semester" className="form-control custom-select"
                                       value={toSemesterInput} onChange={changeToSemesterHandler}>
                                    <option value="">Chọn học kỳ</option>
                                    {semesters.map((semester) => (
                                        <option key={semester.id} value={semester.id}>{semester.semesterName}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label>Số điện thoại</Label>
                                <Input placeholder="Số điện thoại" name="phoneContact" className="form-control"
                                       value={phoneContactInput} onChange={changePhoneHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Số bản sao</Label>
                                <Input placeholder="Số bản" name="quantity" className="form-control" min="1"
                                       type="number" value={quantityInput} onChange={changeQuantityHandler}/>
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

export default UpdateTranscript;
