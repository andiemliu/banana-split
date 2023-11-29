import NavBarComponent from "../components/navbarComponent";
import ReceiptComponent from "../components/receiptComponent";
import './dashboardPage.css';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

const DashboardPage = ({ numberOfCards }) => {

    const displayedCards = Array.from({ length: numberOfCards }, (_, index) => ({
        title: `Receipt ${index + 1}`,
        content: `Content for Receipt ${index + 1}: will be user's names (eg Person1, Person2, Person3)`,
      }));

      const [dashboardCards, setDashboardCards] = useState([]);

    //   const handleCardSave = (card) => {
    //     setDashboardCards((prevCards) => [...prevCards, card]);
    //   };

      const handleCardSave = useCallback(
        (data) => {
          setDashboardCards((prevData) => [...prevData, data]);
        },
        [setDashboardCards]
      );

      useEffect(() => {
        console.log('Dashboard data updated:', dashboardCards);
      }, [dashboardCards]);

      const noFirstCardArr = dashboardCards.slice(1);
    
    // const peopleNamesArr = ['Person 1', 'Person 2', 'Person 3']

    return (
        <div className="fullDashboardPage">
            <NavBarComponent className="navBarSpacing" onCardSave={handleCardSave}></NavBarComponent>
            <h1 className="yourReceipts">Your Receipts</h1>
            <div className="separate">
                {/* {displayedCards.map((card, index) => (
                    <div key={index} className="individualReceipts">
                        <ReceiptComponent title={card.title} content={card.content} peopleNamesArr={peopleNamesArr}></ReceiptComponent>
                    </div>
                ))} */}
                {dashboardCards.length > 1 ? (
                    noFirstCardArr?.map((card, index) => (
                        <div key={index} className="individualReceipts">
                            <ReceiptComponent title={card.title} content={card.people} peopleNamesArr={card.people}></ReceiptComponent>
                        </div>
                        ))
                ) : (
                    <div className="individualReceipts">
                        <ReceiptComponent title={"No title yet"} content={"No people yet"} peopleNamesArr={[]}></ReceiptComponent>
                    </div>)
                }
            </div>
        </div>
    )
}

DashboardPage.propTypes = {
    numberOfCards: PropTypes.number,
  };

export default DashboardPage;