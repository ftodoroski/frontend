import { combineReducers } from "redux";
import programsReducer from './programs_slice'
import genresReducer from './genres_slice'
import searchReducer from './search_slice'
import profilesReducer from './profiles_slice'
import watchlistReducer from './watchlist_slice'

export default combineReducers({
    programs: programsReducer,
    genres: genresReducer,
    search: searchReducer,
    profiles: profilesReducer,
    watchlist: watchlistReducer,
    // likes: likesReducer,
    // dislikes: dislikesReducer
})


// Find out how one program is being kept in state
// Since all of the programs are in state and when picking a profile you dont need to keep track of
//   which showcaseId is being used because that woudl be in the profiles section and it would be 
//   reduntant to make a seperate state just to keep track of it
//   and when you need to put that program on the front cover you just get it from all programs


//   When you only need one program to show which one is being played you just change the state for programs
//   and the way he implemented this is very wasteful because each time he goes back he has to make request
//   and retrive all the programs which would. when you also need. there is multiple ways to optamize
//   this but for now just implement it 

//   And i guess the way he organizes the videos is based on sorting them and just makes a bunch of copies