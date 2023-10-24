import React, { useState, useEffect } from 'react';
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import HomeService from "../../services/Guest/HomeService";
import ModerateService from "../../services/Mod/ModerateService";

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
        HomeService.getCate(id).then((res) => {
            let cate = res.data;
            setServiceCateNameInput(cate.serviceCateName);
            setPriceInput(cate.price);
            setDescriptionInput(cate.description);
            setIsAvailableInput(cate.isAvailable);
            setNumOfDateInput(cate.numOfDate);
        })
    }, [id]);

    const saveCate = (e) => {
        e.preventDefault();
        if (serviceCateNameInput === '' || priceInput === null || descriptionInput === '' || numOfDateInput === null)
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

    const changePriceHandler = (e) => { setPriceInput(e.target.value); }

    const changeDescriptionHandler = (e) => { setDescriptionInput(e.target.value); }

    const changeIsAvailableHandler = (e) => { setIsAvailableInput(e.target.value); }

    const changeDateHandler = (e) => { setNumOfDateInput(e.target.value); }

    const cancel = () => { nav('/guest/service-cate'); }

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3">
                        <h3 className="text-center mt-2">Chỉnh sửa dịch vụ</h3>
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Tên dịch vụ</label>
                                    <input placeholder="dịch vụ muốn chỉnh sửa..." name="serviceCateName" className="form-control"
                                           value={serviceCateNameInput} onChange={changeServiceCateNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Thành tiền</label>
                                    <input placeholder="giá tiền..." name="price" className="form-control"
                                           value={priceInput} onChange={changePriceHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Nội dung</label>
                                    <input placeholder="nội dung..." name="description" className="form-control"
                                           value={descriptionInput} onChange={changeDescriptionHandler}/>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input className="form-check-input" type="checkbox"
                                           checked={isAvailableInput} onChange={changeIsAvailableHandler}/>
                                    <label className="form-check-label">Còn mở</label>
                                </div>
                                <div className = "form-group">
                                    <label>Thời gian cấp</label>
                                    <input placeholder="số ngày..." name="numDates" className="form-control"
                                           value={numOfDateInput} onChange={changeDateHandler}/>
                                </div>
                                <div className="text-end mt-2">
                                    <button className="btn btn-primary me-1" onClick={saveCate}>Lưu</button>
                                    <button className="btn btn-secondary ms-1" onClick={cancel.bind(this)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                        {err && <div className="alert alert-danger">{err}</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCate;
