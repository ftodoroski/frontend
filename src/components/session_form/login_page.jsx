import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import onChangeHandlerInput from '../../util/on_change_handler_input_util'


const LoginPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const session = useSelector(state => state)

    const dispatch = useDispatch()
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Dispatched');
        console.log(email, password);
        dispatch(loginUser({email: email, password: password}))
    }

    // Could make this a utility function so it doesnt get repetative
    // const onChangeHandlerInput = stateSetter => event => {
    //     stateSetter(event.target.value)
    // }

    const handleLogout = e => {
        dispatch(logoutUser())
        console.log('Dispatched to Logout User');
    }

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Email </label>
                    <input type="text" name="email" onChange={onChangeHandlerInput(setEmail)} required />
                </div>
                <div className="input-container">
                    <label>Password </label>
                    <input type="password" name="password" onChange={onChangeHandlerInput(setPassword)} required />
                </div>
                <div className="button-container">
                    <input type="submit"/>
                </div>
            </form>
        </div>
    );

    return (
        renderForm
    )
}

export default LoginPage















// ************************************************************************************************************************************************************************************************************



// import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logoutUser } from '../../features/session/session_slice';
// import { fetchAllPrograms, fetchProgram, fetchSearchedPrograms} from '../../util/programs_api_util';
// import { fetchWatchlistPrograms, addProgramToWatchlist, deleteProgramFromWatchlist } from '../../util/watchlist_api_util';
// import { loginUser } from '../../util/session_api_util';
// import { fetchGenres } from '../../util/genres_api_util';
// import { fetchAllProfiles, createProfile, modifyProfile, deleteProfile } from '../../util/profiles_api_util';
// import { startLoadingPrograms } from '../../features/ui/loading_slice';

// // A lot of stuff has to be moved because it was just used for a testing ground

// const LoginPage = () => {
//     const [email, setEmail] = useState('')
//     const [password, setPassword] = useState('')
//     const session = useSelector(state => state)

//     // Testing Api Purposes
//     const [searchQuery, setSearchQuery] = useState('')

//     const dispatch = useDispatch()
    
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Dispatched');
//         console.log(email, password);
//         dispatch(loginUser({email: email, password: password}))
//     }

//     const onChangeHandlerInput = stateSetter => event => {
//         stateSetter(event.target.value)
//     }

//     const handleLogout = e => {
//         dispatch(logoutUser())
//         console.log('Dispatched to Logout User');
//     }

//     const handleAPITesting = () => {
//         console.log('API_Testing_Button')
//         dispatch(fetchProgram(5))
//     }

//     const handleSearchAPITesting = () => {
//         console.log('Search_API_Testing_Button', searchQuery)
//         dispatch(fetchSearchedPrograms(searchQuery))
//     }

//     const handleWatchlistAPITesting = () => {
//         console.log('Watchlist_API_Testing_Button')
//         dispatch(fetchWatchlistPrograms(40))
//     }

//     const handleAddProgramToWatchlistAPITesting = () => {
//         console.log('Add_Program_To_Watchlist_API_Testing')
//         // This code can be only run once because if it runs there is no code
//         // to catch the error in the redux store
//         // or it can be run and then press handleDeleteProgramFromWatchlistAPITesting to delete it
//         //from backend and change the id from the watchlist
//         dispatch(addProgramToWatchlist({ 'profile_id': 40, 'program_id': 8}))
//     }

//     const handleDeleteProgramFromWatchlistAPITesting = () => {
//         console.log('Delete_Program_From_Watchlist_API_Testing')
//         dispatch(deleteProgramFromWatchlist(22))
//     }

//     const handleGenresAPITesting = () => {
//         console.log('Genres_API_Testing_Button')
//         dispatch(fetchGenres())
//     }

//     const handleSearchRecomendationsAPITesting = () => {
//         console.log('Search_Recomendations_API_Testing_Button')
//         dispatch(fetchSearchedPrograms(searchQuery))
//     }

//     const handleGetUserProfilesAPITesting = () => {
//         console.log('Get_User_Profiles_API_Testing_Button')
//         dispatch(fetchAllProfiles())
//     }

//     const handleCreateUserProfilesAPITesting = () => {
//         console.log('Create_User_Profile_API_Testing_Button')
//         dispatch(createProfile({name: 'Garchin', user: 13}))
//     }

//     const handleUpdateUserProfilesAPITesting = () => {
//         console.log('Update_User_Profile_API_Testing_Button')
//         dispatch(modifyProfile({name: 'Levi', profileId: 46}))
//     }

//     const handleDeleteUserProfilesAPITesting = () => {
//         console.log('Delete_User_Profile_API_Testing_Button')
//         dispatch(deleteProfile(47))
//     }

//     const handleStartLoadingProgramsTest = () => {
//         console.log('Start_Loading_Programs_Test');
//         dispatch(startLoadingPrograms())
//     }

//     const renderForm = (
//         <div className="form">
//             <form onSubmit={handleSubmit}>
//                 <div className="input-container">
//                     <label>Email </label>
//                     <input type="text" name="email" onChange={onChangeHandlerInput(setEmail)} required />
//                 </div>
//                 <div className="input-container">
//                     <label>Password </label>
//                     <input type="password" name="password" onChange={onChangeHandlerInput(setPassword)} required />
//                 </div>
//                 <div className="button-container">
//                     <input type="submit"/>
//                 </div>
//                 <div className="button-container">
//                     <button type="button" onClick={handleLogout}>Sign out</button>
//                 </div>
//                 <div className="testing-button-for-api">
//                     <button type="button" onClick={handleAPITesting}>API Test Button</button>
//                 </div>
//                 <div className="input-container">
//                     <label>Search Query </label>
//                     <input type="text" name="search-query" onChange={onChangeHandlerInput(setSearchQuery)} />
//                 </div>
//                 <div className="testing-button-for-api">
//                     <button type="button" onClick={handleSearchAPITesting}>Search Query API Test Button</button>
//                 </div>
//                 <div className="button-container">
//                     <button type="button" onClick={handleGenresAPITesting}>Get Genres</button>
//                 </div>
//                 <div className="button-container">
//                     <button type="button" onClick={handleSearchRecomendationsAPITesting}>Get Search Recomendations</button>
//                 </div>
//                 <div className="button-container">
//                     <button type="button" onClick={handleGetUserProfilesAPITesting}>Get Profiles</button>
//                 </div>
//                 <div className="button-container">
//                     <button type="button" onClick={handleCreateUserProfilesAPITesting}>Create Profile</button>
//                 </div>
//                 <div className="button-container">
//                     <button type="button" onClick={handleUpdateUserProfilesAPITesting}>Update Profile</button>
//                 </div>
//                 <div className="button-container">
//                     <button type="button" onClick={handleDeleteUserProfilesAPITesting}>Delete Profile</button>
//                 </div>
//                 <div className="testing-button-for-api">
//                     <button type="button" onClick={handleWatchlistAPITesting}>Watchlist API Test Button</button>
//                 </div>
//                 <div className="testing-button-for-api">
//                     <button type="button" onClick={handleAddProgramToWatchlistAPITesting}>Add Program To Watchlist API Test Button</button>
//                 </div>
//                 <div className="testing-button-for-api">
//                     <button type="button" onClick={handleDeleteProgramFromWatchlistAPITesting}>Delete Program From Watchlist API Test Button</button>
//                 </div>
//                 <div className="testing-button-for-api">
//                     <button type="button" onClick={handleStartLoadingProgramsTest}>Start Loading Programs State Test Button</button>
//                 </div>
//             </form>
//         </div>
//     );

//     return (
//         renderForm
//     )
// }

// export default LoginPage
