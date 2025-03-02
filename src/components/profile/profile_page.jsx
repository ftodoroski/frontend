import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../../assets/stylesheets/profile.scss'
import { fetchAllProfiles }from '../../util/profiles_api_util'
import ProfileFormModal from '../modal/profile_form_modal';
import { openModal } from '../../features/ui/modal_slice';
import { IoMdAddCircle } from 'react-icons/io'
import PencilIcon from '../../../assets/images/pencil_icon.jsx'
import BACKGROUNDS from '../../../assets/images/profile_icons/profile_icons'
import { currentProfile } from '../../features/session/session_slice';
import { fetchAllPrograms } from '../../util/programs_api_util';
import { fetchGenres } from '../../util/genres_api_util';
import { fetchWatchlistPrograms } from '../../util/watchlist_api_util';


const ProfilePage = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const profiles = useSelector(state => state.entities.profiles)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllPrograms())
        dispatch(fetchGenres())
    }, [])

    useEffect(() => {
        if (profiles.length === 0) dispatch(fetchAllProfiles())

    }, [profiles])

    const selectProfile = (e, profile) => {
        e.preventDefault()

        dispatch(currentProfile(profile))
        dispatch(fetchWatchlistPrograms(profile.id))
        navigate('/browse')
    }
    
    const toggleProfileView = e => {
        e.preventDefault()
        
        if (location.pathname === '/profiles') {
            navigate('/manage-profiles')
        } else {
            navigate('/profiles')
        }
    }
    
    const createProfile = () => {
        return (
            profiles.length < 4 ? (
                <li 
                    key={profiles.length} 
                    className='profile' 
                    onClick={() => dispatch(openModal({ type: 'newProfile', icon: profiles.length }))}
                >
                    <div className='profile-icon profile-icon-add'>
                        <IoMdAddCircle className='add'/>
                    </div>
                    <span className='profile-name'>Add Profile</span>
                </li>
            ) : (
                ''
            )
        )
    }
            
    const renderProfiles = (profiles, { createProfile }) => {
        return (
            <section className='profile-form'>
                <div className='watching'>Who's watching?</div>
                <ul className='profile-list'>
                    {profiles.map((profile, i) => {
                        return (
                            <li 
                                key={i} 
                                className='profile' 
                                value={profile.id} 
                                onClick={(e) => selectProfile(e, profile)}
                            >
                                <div className='profile-icon' style={{ backgroundImage: `url('${BACKGROUNDS[i]}')`}}>
                                
                                </div>
                                <span className='profile-name'>
                                    {profile.name}
                                </span>
                            </li>
                        )
                    })}
                    {createProfile()}
                </ul>
                <button
                    className='manage'
                    onClick={toggleProfileView}
                >
                    Manage Profiles
                </button>
            </section>
        )
    }
    
    const renderManageProfiles = (profiles, { createProfile }) => {
        return (
            <section className='profile-form'>
                <div className='watching'>Manage Profiles:</div>
                <ul className='profile-list'>
                    {profiles.map((profile, i) => {
                        return (
                            <li 
                                key={i} 
                                className='profile' 
                                value={profile.id} 
                                onClick={() => dispatch(openModal({ type: 'editProfile', profile, icon: i }))}
                            >
                                <div className='profile-icon' style={{ backgroundImage: `url('${BACKGROUNDS[i]}')` }}>

                                    <div className='edit-mode'></div>
                                   <PencilIcon />
                                </div>
                                <span className='profile-name'>
                                    {profile.name}
                                </span>
                            </li>
                        )
                    })}
                    {createProfile()}
                </ul>
                <button
                    className='done'
                    onClick={toggleProfileView}
                >
                    Done
                </button>
            </section>
        )
    }
    
    const profileView = location.pathname === '/profiles' ? (
        renderProfiles(profiles, { createProfile })
    ) : renderManageProfiles(profiles, { createProfile })

    return (
        <>
            <div className='profile-page-header'></div>
            <main className='profile-page'>
                <ProfileFormModal />
                {profileView}
            </main>
        </>
    )
}

export default ProfilePage

//  - In testing mode now so the user is not dynamic
//  - sending a wasteful request to backend when starting from /profiles to /manage-profiles
