import NavBarComponent from '../components/navbarComponent';
import PropTypes from 'prop-types';
import PersonComponent from "../components/PersonComponent";
import './profilesPage.css';
import { useEffect, useState } from 'react';
import axios from 'axios';


const ProfilesPage = ({ numberOfPeople, handleCardSave }) => {
    // Fetch owed amounts array from DB
    const [owedAmounts, setOwedAmounts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const id = '656bb44e730a0709c0107c00'
                const username = 'andieliu'
                const response = await axios.get(`http://localhost:3001/api/getOwedAmounts/${id}/${username}`);
                console.log("get owed amounts response", response);
                setOwedAmounts(response.data.data.user.amounts);
            } catch (error) {
                console.log("owedAmounts not initialized yet", error);
            }
            setLoading(false);
        }
        fetchData();
      }
    , []);
    // const displayedProfiles = Array.from({ length: numberOfPeople }, (_, index) => ({
    //     name: `Profile ${index + 1}`,
    //     others: `${owedAmounts}`,
    //   }));
     // Create displayedProfiles array
    console.log("owedAmounts", owedAmounts);


//   const displayedProfiles = owedAmounts.map((entry) => {
//     const { person, collector, amount } = entry;
//     const message = `${person} owes ${collector} $${amount.toFixed(2)}`; // Ensure amount is formatted as needed
//     return { name: person, others: message };
//   });

// Create displayedProfiles array
const displayedProfiles = owedAmounts.reduce((accumulator, entry) => {
    const { person, collector, amount } = entry;

    // Find an existing profile for the person
    const existingProfile = accumulator.find(profile => profile.name === person);

    if (existingProfile) {
      // If the profile exists, add the new owed amount to others array
      existingProfile.others.push(`${person} owes ${collector} $${amount.toFixed(2)}`);
    } else {
      // If the profile doesn't exist, create a new profile with the owed amount
      accumulator.push({ name: person, others: [`${person} owes ${collector} $${amount.toFixed(2)}`] });
    }

    return accumulator;
  }, []);


    return (
        <div className='fullProfilesPage'>
            <NavBarComponent page={2} onCardSave={handleCardSave}></NavBarComponent>
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
    handleCardSave: PropTypes.func
  };

export default ProfilesPage;

// import NavBarComponent from '../components/navbarComponent';
// import PropTypes from 'prop-types';
// import PersonComponent from "../components/PersonComponent";
// import './profilesPage.css';


// const ProfilesPage = ({ numberOfPeople, handleCardSave }) => {

//     const displayedProfiles = Array.from({ length: numberOfPeople }, (_, index) => ({
//         name: `Profile ${index + 1}`,
//         others: `not sure how to format this right now`,
//       }));

//     return (
//         <div className='fullProfilesPage'>
//             <NavBarComponent page={2} onCardSave={handleCardSave}></NavBarComponent>
//             <h1 className="yourProfiles">Your Profiles</h1>
//             <div className="separate1">
//                 {displayedProfiles.map((profile, index) => (
//                     <div key={index} className="individualProfiles">
//                         <PersonComponent name={profile.name} others={profile.others}></PersonComponent>
//                     </div>
//                 ))}
//             </div>
//          </div>
//     )
// }

// ProfilesPage.propTypes = {
//     numberOfPeople: PropTypes.number,
//     handleCardSave: PropTypes.func
//   };

// export default ProfilesPage;