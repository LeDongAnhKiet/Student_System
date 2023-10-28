import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import HomeService from "../../services/Guest/HomeService";
import ModerateService from "../../services/Mod/ModerateService";
import {Alert, Button, Card, CardBody, Container, Form, FormGroup, Input, Label, Row} from "reactstrap";

function UpdateCate() {
    const { id } = useParams();
    const loc = useLocation();
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const {serviceCateName, price, description, isAvailable, numOfDate} = loc.state || {};
    const [serviceCateNameInput, setServiceCateNameInput] = useState(serviceCateName || '');
    const [priceInput, setPriceInput] = useState(price || 0);
    const [descriptionInput, setDescriptionInput] = useState(description || '');
    const [isAvailableInput, setIsAvailableInput] = useState(isAvailable || false);
    const [numOfDateInput, setNumOfDateInput] = useState(numOfDate || 0);

    useEffect(() => {
        HomeService.getCate(id).then(res => {
            let cate = res.data;
            setServiceCateNameInput(cate.serviceCateName);
            setPriceInput(cate.price);
            setDescriptionInput(cate.description);
            setIsAvailableInput(cate.isAvailable);
            setNumOfDateInput(cate.numOfDate);
        })
    }, [id]);

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

    const saveCate = (e) => {
        e.preventDefault();
        if (serviceCateNameInput === '' || priceInput === '' || descriptionInput === '' || numOfDateInput === '')
            setErr('Vui lòng nhập đầy đủ thông tin');
        else if (priceInput.toString() <= 0 || numOfDateInput.toString() <= 0)
            setErr('Số nhập không hợp lệ');
        else {
            const cate = {
                serviceCateName: serviceCateNameInput,
                price: priceInput,
                description: descriptionInput,
                isAvailable: isAvailableInput,
                numOfDate: numOfDateInput,
            };

            ModerateService.updateCate(cate, id).then(() => {
                nav(`/moderator/service-cate/update/${id}`);
            })
        }
    }
    const changeServiceCateNameHandler = (e) => { setServiceCateNameInput(e.target.value); }

    const changePriceHandler = (e) => { setPriceInput(parseFloat(e.target.value)); }

    const changeDescriptionHandler = (e) => { setDescriptionInput(e.target.value); }

    const changeIsAvailableHandler = (e) => { setIsAvailableInput(e.target.value); }

    const changeDateHandler = (e) => { setNumOfDateInput(parseInt(e.target.value)); }

    const cancel = () => { nav('/guest/service-cate'); }

    return (
        <Container fluid>
            <Row className="mt-3">
                <Card className="col-md-6 offset-md-3">
                    <h3 className="justify-content-center pb-2 mt-2 border-bottom row">Chỉnh sửa dịch vụ</h3>
                    <CardBody>
                        <Form>
                            <FormGroup>
                                <Label>Tên dịch vụ</Label>
                                <Input placeholder="dịch vụ muốn chỉnh sửa..." name="serviceCateName" className="form-control"
                                       value={serviceCateNameInput} onChange={changeServiceCateNameHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Thành tiền</Label>
                                <Input placeholder="giá tiền..." name="price" type="number" min="1000" className="form-control"
                                       value={priceInput} onChange={changePriceHandler}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Nội dung</Label>
                                <Input placeholder="nội dung..." name="description" className="form-control"
                                       value={descriptionInput} onChange={changeDescriptionHandler}/>
                            </FormGroup>
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" checked={isAvailableInput}
                                           onChange={changeIsAvailableHandler} />Còn mở
                                </Label>
                            </FormGroup>
                            <FormGroup>
                                <Label>Thời gian cấp</Label>
                                <Input placeholder="số ngày..." name="numDates" className="form-control"
                                       value={numOfDateInput} onChange={changeDateHandler}/>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={saveCate}>Lưu</Button>
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

export default UpdateCate;
