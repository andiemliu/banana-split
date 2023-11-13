import NavBarComponent from "../components/NavbarComponent";
import ReceiptComponent from "../components/receiptComponent";
import './dashboardPage.css';

const DashboardPage = () => {
    return (
        <div className="separate">
            <div>
                <NavBarComponent></NavBarComponent>
            </div>
            <div>
                <ReceiptComponent></ReceiptComponent>
                <ReceiptComponent></ReceiptComponent>
            </div>
        </div>
    )
}

export default DashboardPage;