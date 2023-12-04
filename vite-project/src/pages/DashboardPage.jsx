import NavBarComponent from '../components/navbarComponent'
import ReceiptComponent from '../components/receiptComponent'
import './dashboardPage.css'
import PropTypes from 'prop-types'
import { useEffect, useState, useCallback } from 'react'
import { useCardContext } from '../CardContext'

const DashboardPage = () => {
    const { dashboardCards, handleCardSave } = useCardContext()

    useEffect(() => {
        console.log('Dashboard data updated:', dashboardCards)
    }, [dashboardCards])

    const noFirstCardArr = dashboardCards.slice(1)
    //   const noLastCard = dashboardCards.filter(card => card.people?.length !== 1);

    return (
        <div className="fullDashboardPage">
            <NavBarComponent
                page={1}
                className="navBarSpacing"
                onCardSave={handleCardSave}
                dashboardCards={dashboardCards}
            ></NavBarComponent>
            <h1 className="yourReceipts"></h1>
            <div className="separate">
                {dashboardCards?.length > 1 ? (
                    noFirstCardArr?.map((card, index) => (
                        <div key={index} className="individualReceipts">
                            {/* Only render card if id is valid (gets rid of dummy cards after context switching) */}
                            {card.id != undefined && (
                                <ReceiptComponent
                                    id={card.id}
                                    initialized={true}
                                    title={card.title + ' ' + index.toString()}
                                    peopleNamesArr={card.people}
                                ></ReceiptComponent>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="individualReceipts">
                        <ReceiptComponent
                            initialized={false}
                            title={'No Receipts Yet'}
                            peopleNamesArr={[]}
                        ></ReceiptComponent>
                    </div>
                )}
            </div>
        </div>
    )
}

DashboardPage.propTypes = {
    dashboardCards: PropTypes.array,
    noFirstCardArr: PropTypes.array,
    handleCardSave: PropTypes.func,
}

export default DashboardPage
