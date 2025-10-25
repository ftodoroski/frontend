import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal, selectProfileManagerOverlay } from '../../features/ui/profile_manager_overlay_slice';
import ProfileForm from '../session_form/profile_form';
import '../../../assets/stylesheets/profile.scss'


const ProfileFormModal = () => {
    const profileOverlay = useSelector(selectProfileManagerOverlay)
    const dispatch = useDispatch()

    if (!profileOverlay) return profileOverlay

    return (
        <div className='profile-form-modal' onClick={() => dispatch(closeModal())}>
            <section className='profile-fill-out-form' onClick={e => e.stopPropagation()}>
                <ProfileForm />
            </section>
        </div>
    )
}

export default ProfileFormModal