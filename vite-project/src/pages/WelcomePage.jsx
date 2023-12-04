import NavBarComponent from '../components/navbarComponent'
import './welcomePage.css'

const WelcomePage = () => {
    return (
        <div className="fullWelcomePage">
            <NavBarComponent page={0} onCardSave={null}></NavBarComponent>
            <div className="welcomeMessage">
                <div className="firstDiv">
                    <p>
                        Welcome to BananaSplit – your go-to platform for
                        hassle-free bill splitting!
                    </p>
                    <p>
                        Tired of the confusion and headaches that come with
                        dividing expenses among friends or roommates?
                        BananaSplit simplifies the process, ensuring fairness
                        and transparency in every bill split. With our intuitive
                        calculator, effortlessly calculate individual shares
                        with BananaSplit, considering each person's
                        contributions for clear reimbursement.
                    </p>

                    <p></p>
                    <p>
                        Whether you're roommates, friends, or family, keep your
                        relationships as smooth as our splitting process.
                        Because sharing groceries should be as sweet as a banana
                        split!
                    </p>
                </div>
                <div className="thirdDiv">
                    - your BananaSplit creators, Andie and Jessica
                </div>
            </div>
        </div>
    )
}

export default WelcomePage
