import NavBarComponent from "../components/navbarComponent";
import "./welcomePage.css";

const WelcomePage = () => {
    return (
        <div className="fullWelcomePage">
            <NavBarComponent page={0} onCardSave={null}></NavBarComponent>
            <div className="welcomeMessage">
                <div className="firstDiv">Welcome to BananaSplit – your go-to platform for hassle-free grocery splitting! Tired of the confusion and headaches that come with dividing grocery expenses among friends or roommates? Look no further. BananaSplit simplifies the process, ensuring fairness and transparency in every grocery bill split. With our intuitive table calculator, effortlessly determine each person's share based on the items they picked. Say goodbye to complex calculations and disputes over who owes what. BananaSplit considers individual contributions, making it easy to see exactly how much each person owes and who should receive reimbursement.
                </div>

                <div className="secondDiv">
                Whether you're roommates, friends, or family, BananaSplit is here to make grocery shopping with others a breeze. Enjoy the convenience of our platform, settle up with confidence, and keep your relationships as smooth as our splitting process. Try BananaSplit today – because sharing groceries should be as sweet as a banana split!
                </div>
                <div className="thirdDiv">- your BananaSplit creators, Andie and Jessica</div>
            </div>
        </div>
    )
};

export default WelcomePage;