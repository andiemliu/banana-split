import NavBarComponent from '../components/navbarComponent';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';
import PersonComponent from "../components/PersonComponent";
import './profilesPage.css';


const ProfilesPage = ({ numberOfPeople, handleCardSave }) => {
    // Get owed amounts from backend
    const [owedAmounts, setOwedAmounts] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Make a request to your backend API with the provided ID
                const response = await axios.get(`http://localhost:3001/api/getOwedAmounts/`);        
                console.log(response);
                
                // Parse the JSON response
                const owedAmounts = response.data.data.data;
                console.log("owedAmounts", owedAmounts);

                // Update state with the fetched data
                setOwedAmounts(owedAmounts);
            } catch (error) {
                // Handle errors
                console.log(error);
            }
        };
        fetchData();
    }, []); 


    const displayedProfiles = Array.from({ length: numberOfPeople }, (_, index) => ({
        name: `Profile ${index + 1}`,
        others: `not sure how to format this right now`,
      }));

    return (
        <div className='fullProfilesPage'>
            <NavBarComponent page={2} onCardSave={handleCardSave}></NavBarComponent>
            <h1 className="yourProfiles">Your Profiles</h1>
            <p>{owedAmounts}</p>
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
    handleCardSave: PropTypes.func
  };

export default ProfilesPage;