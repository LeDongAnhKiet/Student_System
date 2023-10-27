import React, {useState} from 'react'
import UnlockStudService from "../../services/User/UnlockStudService";
import {useNavigate} from "react-router-dom";
import {Button, Container, Form, FormGroup, Input, Label} from "reactstrap";

function AddUnlockStud() {
    const [image, setImage] = useState('');
    const [content, setContent] = useState('');
    const nav = useNavigate();
    const [err, setErr] = useState('');

    const saveUnlockStud = (e) => {
        e.preventDefault();
        if (image === '' || content === '')
            setErr('Vui lòng nhập đầy đủ thông tin');
        else {
            const unlockStud = {
                image,
                content,
            };

            UnlockStudService.addUnlockStud(unlockStud).then(res => {
                let data = res.data;
                nav(`/user/payment/create/${data.onlineService.id}`);
            });
        }
    };

    const changeImageHandler = (e) => {
        setImage(e.target.value);
        setErr('');
    }

    const changeContentHandler = (e) => {
        setContent(e.target.value);
        setErr('');
    }

    const cancel = () => { nav(`/guest/service-cate`); }

    return (
        <Container>
            <div className = "row">
                <div className = "card col-md-6 offset-md-3">
                    <h3 className="App mt-2">Đăng ký mở khóa sinh viên</h3>
                    <div className = "card-body">
                        <Form>
                            <FormGroup className="form-group">
                                <Label>Ảnh đại diện</Label>
                                <br/>
                                <Input type="file" className="form-control-file" onChange={changeImageHandler} />
                            </FormGroup>
                            <FormGroup className = "form-group">
                                <Label>Nội dung</Label>
                                <Input placeholder="Nội dung" name="content" className="form-control"
                                       value={content} onChange={changeContentHandler}/>
                            </FormGroup>
                            <div className="text-end mt-2">
                                <Button color="primary" className="m-1" onClick={saveUnlockStud}>Lưu</Button>
                                <Button color="secondary" className="m-1" onClick={cancel}>Hủy</Button>
                            </div>
                        </Form>
                    </div>
                    {err && <div className="alert alert-danger">{err}</div>}
                </div>
            </div>
        </Container>
    )
}

export default AddUnlockStud;
