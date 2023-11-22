import NavBarComponent from "../components/NavbarComponent";
import ReceiptComponent from "../components/receiptComponent";
import './dashboardPage.css';
import PropTypes from 'prop-types';

const DashboardPage = ({ numberOfCards }) => {

    const displayedCards = Array.from({ length: numberOfCards }, (_, index) => ({
        title: `Receipt ${index + 1}`,
        content: `Content for Receipt ${index + 1}: will be user's names (eg Person1, Person2, Person3)`,
      }));

    return (
        <div className="fullDashboardPage">
            <NavBarComponent className="navBarSpacing"></NavBarComponent>
            <h1 className="yourReceipts">Your Receipts</h1>
            <div className="separate">
                {/* <div>
                    <ReceiptComponent></ReceiptComponent>
                </div>
                <div>
                    <ReceiptComponent></ReceiptComponent>
                </div>
                <div>
                    <ReceiptComponent></ReceiptComponent>
                </div>
                <div>
                    <ReceiptComponent></ReceiptComponent>
                </div>
                <div>
                    <ReceiptComponent></ReceiptComponent>
                </div> */}
                {displayedCards.map((card, index) => (
                    <div key={index} className="individualReceipts">
                        <ReceiptComponent title={card.title} content={card.content}></ReceiptComponent>
                    </div>
                ))}
            </div>
        </div>
    )
}

DashboardPage.propTypes = {
    numberOfCards: PropTypes.number,
  };

export default DashboardPage;