import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../features/ui/modal_slice';
import ProfileForm from '../session_form/profile_form';
import '../../../assets/stylesheets/profile.scss'


const ProfileFormModal = () => {
    const modal = useSelector(state => state.ui.modal)
    const dispatch = useDispatch()

    const modalBackClass = 'profile-form-modal'
    const modalChildClass = 'profile-fill-out-form'

    if (!modal) return modal

    return (
        <div className={modalBackClass} onClick={() => dispatch(closeModal())}>
            <section className={modalChildClass} onClick={e => e.stopPropagation()}>
                <ProfileForm />
            </section>
        </div>
    )
}

export default ProfileFormModal