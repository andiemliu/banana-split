import NavBarComponent from "../components/navbarComponent";
import ReceiptComponent from "../components/receiptComponent";
import './dashboardPage.css';
import PropTypes from 'prop-types';
import { useEffect, useState, useCallback } from "react";
import { useCardContext } from "../CardContext";

const DashboardPage = () => {

    // const displayedCards = Array.from({ length: numberOfCards }, (_, index) => ({
    //     title: `Receipt ${index + 1}`,
    //     content: `Content for Receipt ${index + 1}: will be user's names (eg Person1, Person2, Person3)`,
    //   }));

    const { dashboardCards, handleCardSave, setDashboardCards } = useCardContext();

    // const [dashboardCards, setDashboardCards] = useState([]);

    // const handleCardSave = useCallback(
    // (data) => {
    //     setDashboardCards((prevData) => [...prevData, data]);
    //     console.log(dashboardCards)
    // },
    // [setDashboardCards]
    // );

    useEffect(() => {
    console.log('Dashboard data updated:', dashboardCards);
    }, [dashboardCards]);

    const noFirstCardArr = dashboardCards.slice(1);

    const handlePageClick = () => {
        // Remove the last card when the dashboard page is clicked
        if (dashboardCards.length > 0) {
          const updatedCards = dashboardCards.slice(0, -1);
          setDashboardCards(updatedCards);
          console.log('Last card removed:', updatedCards);
        }
      };
    
    return (
        <div className="fullDashboardPage">
            <NavBarComponent page={1} className="navBarSpacing" onCardSave={handleCardSave} dashboardCards={dashboardCards}></NavBarComponent>
            <h1 className="yourReceipts">Your Receipts</h1>
            <div className="separate">
                {/* {displayedCards.map((card, index) => (
                    <div key={index} className="individualReceipts">
                        <ReceiptComponent title={card.title} content={card.content} peopleNamesArr={peopleNamesArr}></ReceiptComponent>
                    </div>
                ))} */}
                {dashboardCards?.length > 1 ? (
                    noFirstCardArr?.map((card, index) => (
                        <div key={index} className="individualReceipts">
                            <ReceiptComponent title={card.title + " " + (index + 1).toString()} peopleNamesArr={card.people}></ReceiptComponent>
                        </div>
                        ))
                ) : (
                    <div className="individualReceipts">
                        <ReceiptComponent title={"No Receipts Yet"}  peopleNamesArr={[]}></ReceiptComponent>
                    </div>)
                }
            </div>
        </div>
    )
}

DashboardPage.propTypes = {
    // numberOfCards: PropTypes.number,
    dashboardCards: PropTypes.array,
    noFirstCardArr : PropTypes.array,
    handleCardSave: PropTypes.func
  };

export default DashboardPage;