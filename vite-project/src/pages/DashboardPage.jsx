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

      const { dashboardCards, handleCardSave } = useCardContext();

    //   const [dashboardCards, setDashboardCards] = useState([]);

    //   const handleCardSave = useCallback(
    //     (data) => {
    //       setDashboardCards((prevData) => [...prevData, data]);
    //     },
    //     [setDashboardCards]
    //   );

      useEffect(() => {
        console.log('Dashboard data updated:', dashboardCards);
      }, [dashboardCards]);

    //   useEffect(() => {
 
    //     if (dashboardCards.length > 1) {
    //       const updatedDashboardCards = dashboardCards.slice(0, -1);
    //       setDashboardCards(updatedDashboardCards);
    //     }
    //   }, [dashboardCards, setDashboardCards]);

      const noFirstCardArr = dashboardCards.slice(1);

    //   const noLastCard = dashboardCards.filter(card => card.people?.length !== 1);
    
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
                             {/* Only render card if id is valid (gets rid of dummy cards after context switching) */}
                            {card.id != undefined && <ReceiptComponent id={card.id} initialized={true} title={card.title + " " + (index + 1).toString()} peopleNamesArr={card.people}></ReceiptComponent> }
                            </div>
                        ))
                ) : (
                    <div className="individualReceipts">
                        <ReceiptComponent initialized={false} title={"No Receipts Yet"}  peopleNamesArr={[]}></ReceiptComponent>
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