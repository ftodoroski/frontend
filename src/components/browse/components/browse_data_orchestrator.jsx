import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllPrograms } from '../../../util/programs_api_util';
import { fetchGenres } from '../../../util/genres_api_util';
import { fetchAllProfiles } from '../../../util/profiles_api_util';
import { selectCurrentProfile, selectUser } from '../../../features/auth/auth_slice';
import { fetchWatchlistPrograms } from '../../../util/watchlist_api_util';


const BrowseDataOrchestrator = () => {
    const dispatch = useDispatch()
    const currentProfile = useSelector(selectCurrentProfile)
    
    useEffect(() => {
        dispatch(fetchAllPrograms())
        dispatch(fetchGenres())
    }, [])

    useEffect(() => {
        if (currentProfile.id) {
            dispatch(fetchWatchlistPrograms(currentProfile.id))
        }
    }, [dispatch, currentProfile.id])

    return null
}

export default BrowseDataOrchestrator