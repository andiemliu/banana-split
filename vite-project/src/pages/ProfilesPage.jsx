import NavBarComponent from "../components/NavbarComponent";
import PropTypes from 'prop-types';
import PersonComponent from "../components/PersonComponent";
import './profilesPage.css';


const ProfilesPage = ({ numberOfPeople }) => {

    const displayedProfiles = Array.from({ length: numberOfPeople }, (_, index) => ({
        name: `Profile ${index + 1}`,
        others: `not sure how to format this right now`,
      }));

    return (
        <div className='fullProfilesPage'>
            <NavBarComponent></NavBarComponent>
            <h1 className="yourProfiles">Your Profiles</h1>
            <div className="separate1">
                {displayedProfiles.map((profile, index) => (
                    <div key={index} className="individualProfiles">
                        <PersonComponent name={profile.name} others={profile.others}></PersonComponent>
                    </div>
                ))}
            </div>
         </div>
    )
}

ProfilesPage.propTypes = {
    numberOfPeople: PropTypes.number,
  };

export default ProfilesPage;