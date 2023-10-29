import {Container} from "reactstrap";

const Footer = () => {
    return (
        <footer className="App text-secondary fixed-bottom bg-primary-subtle">
            <Container className="p-2">
                <div>&copy; 2023<br/>Trường Đại học Mở Thành phố Hồ Chí Minh</div>
            </Container>
        </footer>
    )
}

export default Footer;