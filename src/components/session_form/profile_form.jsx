import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { closeModal } from '../../features/ui/modal_slice';
import '../../../assets/stylesheets/profile.scss'
import onChangeHandlerInput from '../../util/on_change_handler_input_util';
import BACKGROUNDS from '../../../assets/images/profile_icons/profile_icons'
import { createProfile, modifyProfile, deleteProfile } from '../../util/profiles_api_util';
import { currentProfile } from '../../features/session/session_slice';


const ProfileForm = () => {
    const [name, setName] = useState('')
    const [errorActive, setErrorActive] = useState('')
    const modal = useSelector(state => state.ui.modal)
    const userId = useSelector(state => state.session.userId)
    const profiles = useSelector(state => state.entities.profiles)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { profile, icon} = modal
    const formType = modal.type === 'newProfile' ? 'new' : 'edit'

    useEffect(() => {
        if (formType === 'edit') {
            setName(profile.name)
        }
    }, [])

    const handleNameValidation = () => {
        isNameValid() ? setErrorActive('') : setErrorActive('error-active') 
    }

    const isNameValid = () => {
        return (name !== '' && isNaN(name[0])) ? true : false
    }

    const handleSubmit = e => {
        e.preventDefault()
    
        if (!isNameValid()) {
            handleNameValidation()
        } else if (formType === 'edit') {

            dispatch(modifyProfile({name, profileId: profile.id}))
            dispatch(closeModal())
        } else {
            dispatch(createProfile({name, user: userId})).then((res) => {
                const profile = res.payload

                dispatch(currentProfile(profile))
                navigate('/browse')
            })
            dispatch(closeModal())
        }
    }

    const handleDelete = e => {
        e.preventDefault()

        dispatch(deleteProfile(profile.id))
        dispatch(closeModal())
    }

    const renderForm = () => {
        if (formType == 'new') {
            return (
                <>
                    {/* 1 */}
                    <div className='form-heading'>
                        <h1>Add Profile</h1>
                        <h2>Add a profile for another person watching Animeflix.</h2>
                    </div>

                    {/* 2 */}
                    <div className='form-container'>
                        <div className='profile-entry'>
                            <div className='profile-add-avatar' style={{ backgroundImage: `url('${BACKGROUNDS[icon]}')` }}>
                                
                            </div>

                            <div className='profile-add-name-container'>
                                <input 
                                    type="text" 
                                    value={name}
                                    placeholder='Name'
                                    className={`profile-name-input ${errorActive}`}
                                    autoFocus
                                    onBlur={handleNameValidation}
                                    onChange={onChangeHandlerInput(setName)}
                                />
                                <p className={`profile-name-error ${errorActive}`}>
                                    Please enter a name
                                </p>
                            </div>
                        </div>

                        <div className='profile-form-buttons'>
                            <button 
                                className='add-profile profile-button'
                                onClick={handleSubmit}
                            >
                                Continue
                            </button>

                            <button 
                                className='cancel profile-button'
                                onClick={() => dispatch(closeModal())}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    {/* 1 */}
                    <div className='form-heading'>
                        <h1 className='edit-profile-heading'>Edit Profile</h1>
                    </div>
                
                    {/* 2 */}
                    <div className='form-container'>
                        <div className='profile-entry'>
                            <div className='profile-add-avatar' style={{ backgroundImage: `url('${BACKGROUNDS[icon]}')` }}>
                                
                            </div>

                            <div className='profile-add-name-container'>
                                <input 
                                    type="text"
                                    value={name}
                                    placeholder='Name'
                                    className={`profile-name-input ${errorActive}`}
                                    onBlur={handleNameValidation}
                                    onChange={onChangeHandlerInput(setName)}
                                />
                                <p className={`profile-name-error ${errorActive}`}>
                                    Please enter a name
                                </p>
                            </div>
                        </div>

                        <div className='profile-form-buttons'>
                            <button
                                className='save-profile profile-button'
                                onClick={handleSubmit}
                            >
                                Save
                            </button>

                            <button
                                className='cancel profile-button'
                                onClick={() => dispatch(closeModal())}
                            >
                                Cancel
                            </button>

                            {profiles.length > 1 ? (
                                <button
                                    className='delete profile-button'
                                    onClick={handleDelete}
                                >
                                    Delete
                                </button>
                            ): (
                                ''
                            )}
                        </div>
                    </div>
                </>
            )
        }
    }

    return (
        renderForm()
    )
}

export default ProfileForm