import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import HomeService from "../../services/Guest/HomeService";
import ModerateService from "../../services/Mod/ModerateService";

function UpdateCate() {
    const { id } = useParams();
    const [serviceCateName, setServiceCateName] = useState(0);
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);
    const [numOfDate, setNumOfDate] = useState(0);
    const nav = useNavigate();

    useEffect(() => {
        if (id !== 'add')
            HomeService.getCate(id).then((res) => {
                let cate = res.data;
                // set state cho cate
                setServiceCateName(cate.serviceCateName);
                setPrice(cate.price);
                setDescription(cate.description);
                setIsAvailable(cate.isAvailable);
                setNumOfDate(cate.numOfDate);
            })
    }, [id]);

    const saveOrUpdateModerate = (e) => {
        e.preventDefault();
        const cate = {
            serviceCateName,
            price,
            description,
            isAvailable,
            numOfDate,
        };

        ModerateService.updateCate(cate, id).then(() => {
            nav(`/moderator/service-cate/update/${id}`);
        });
    }
const changeServiceCateNameHandler = (e) => { setServiceCateName(e.target.value); }

const changePriceHandler = (e) => { setPrice(e.target.value); }

const changeDescriptionHandler = (e) => { setDescription(e.target.value); }

const changeIsAvailableHandler = (e) => { setIsAvailable(e.target.value); }

const changeDateHandler = (e) => { setNumOfDate(e.target.value); }

    const cancel = () => { nav(-1); }

    const getTitle = () => {
        if (id === 'add')
            return <h3 className="text-center">Thêm dịch vụ</h3>
        else
            return <h3 className="text-center">Chỉnh sửa dịch vụ</h3>
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-5">
                        { getTitle }
                        <div className = "card-body">
                            <form>
                                <div className = "form-group">
                                    <label>Tên dịch vụ: </label>
                                    <input placeholder="dịch vụ muốn đăng ký..." name="serviceCateName" className="form-control"
                                           value={serviceCateName} onChange={changeServiceCateNameHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Thành tiền: </label>
                                    <input placeholder="giá tiền..." name="price" className="form-control"
                                           value={price} onChange={changePriceHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Nội dung: </label>
                                    <input placeholder="nội dung..." name="description" className="form-control"
                                           value={description} onChange={changeDescriptionHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Còn mở </label>
                                    <input className="form-check-input" type="checkbox"
                                           checked={isAvailable} onChange={changeIsAvailableHandler}/>
                                </div>
                                <div className = "form-group">
                                    <label>Thời gian cấp: </label>
                                    <input placeholder="số ngày..." name="numDates" className="form-control"
                                           value={numOfDate} onChange={changeDateHandler}/>
                                </div>
                                <div className="text-end">
                                    <button className="btn btn-primary m-1" onClick={saveOrUpdateModerate}>Lưu</button>
                                    <button className="btn btn-secondary m-1" onClick={cancel.bind(this)}>Hủy</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateCate;
