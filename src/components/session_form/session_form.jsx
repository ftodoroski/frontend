import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { removeErrors, signUpIntentionalError } from '../../features/errors/session_errors_slice';
import onChangeHandlerInput from '../../util/on_change_handler_input_util';
import { loginUser } from '../../util/session_api_util';
import '../../../assets/stylesheets/session.scss'
import { ImCheckboxChecked } from 'react-icons/im'


const SessionForm = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const session = useSelector(state => state)
    const dispatch = useDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailCaption, setEmailCaption] = useState('deactivated')
    const [passwordCaption, setPasswordCaption] = useState('deactivated')

    const formType = location.pathname
    const errors = session.errors
    const header = formType === '/login' ? 'Sign In' : 'Sign Up'

    const handleBlur = type => e => {
        e.preventDefault()
        
        if (type === 'email') {
            if (email === '' || !email.includes('@')) {
                setEmailCaption('active')
            } else {
                setEmailCaption('deactivated')
            }
        } else if (type === 'password') {
            if (password === '' || password.length < 6) {
                setPasswordCaption('active')
            } else {
                setPasswordCaption('deactivated')
            }
        }
    }

    const handleRedirect = e => {
        e.preventDefault()

        console.log('handleRedirect Called');
        formType === '/login' ? navigate('/signup') : navigate('/login')
        dispatch(removeErrors())
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log('handleSubmit Called');

        if (formType === '/signup') {
            dispatch(signUpIntentionalError())
        } else {
            dispatch(loginUser({ email, password }))
            .then(() => navigate('/profiles'))
        }
    }

    const loginDemo = e => {
        e.preventDefault()

        console.log('loginDemo called from SessionForm')
        dispatch(loginUser({ email: 'demo102@gmail.com', password: '0000' }))
        .then(() => navigate('/profiles'))
    }

    const redirector = () => {
        const signupRedirect = (
            <section className='redirect'>
                New to Animeflix?{' '}
                <div id='form-redirect' onClick={handleRedirect}>
                    {`${' '}Sign up now!`}
                </div>
            </section>  
        )

        const loginRedirect = (
            <section className='redirect'>
                Have an account? {' '}
                <div id='form-redirect' onClick={handleRedirect}>
                    {`${' '}Sign in!`}
                </div>
            </section>
        )

        return formType === '/login' ? signupRedirect : loginRedirect
    }

    const errorMessage = () => {
        if (errors.session && formType === '/login') {
            return (
                <section className='session-error'>
                    Sorry, the email or password you entered was not recognized. Please try again or
                    <span id='form-redirect' onClick={handleRedirect}>
                        <u>create a new account.</u>
                    </span>
                </section>
            )
        } else if (errors.session && formType == '/signup') {
            return (
                <section className='session-error'>
                    Sorry, signing up is not available at this moment. Please check out our demo.
                </section>
            )
        } else {
            return ''
        }
    }

    const captcha = () => {
        return (
            <p className='captcha-section'>
                This page is protected by Google reCAPTCHA to ensure you're not a bot. <span className='learn-more'>Learn more.</span>
            </p>
        )
    }

    return (
        <main className='session-form-background'>
            <section className='session-form-container'>
                <h2>{header}</h2>

                <form className='session-form' onSubmit={handleSubmit}>
                    {errorMessage()}

                    <div className='form-group-container'>
                        <div className={`form-group ${emailCaption === 'deactivated' ? '' : emailCaption}`}>
                            <input
                                type="text"
                                value={email}
                                onChange={onChangeHandlerInput(setEmail)}
                                onBlur={handleBlur('email')}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <p className={emailCaption}>Please enter a valid email</p>
                    </div>
                
                    <div className='form-group-container'>
                        <div className={`form-group ${passwordCaption === 'deactivated' ? '' : passwordCaption}`}>
                            <input 
                                type="password"
                                value={password}
                                onChange={onChangeHandlerInput(setPassword)}
                                onBlur={handleBlur('password')}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <p className={passwordCaption}>
                            Your password must be at least 6 characters long
                        </p>
                    </div>

                    <button type='submit' className='session-auth-button'>{header}</button>
                    <button className='session-demo-button' onClick={loginDemo}>Demo</button>

                    <div className='remember-container'>
                        <div className="remember">
                            <ImCheckboxChecked className='remember-svg'/>
                            <label className='remember-me'>Remember Me</label>
                        </div>
                        <p className='need-help'>Need help?</p>
                    </div>
                </form>

                {redirector()}
                {captcha()}
            </section>
        </main>
    )
}

export default SessionForm


//  - Some front-end endpoints shoudl not be accesibel once the user has logged in
//          /
//          /login
//          /signup

// - when the user sign in they need to be taken to the profile page, 
//      if they try to get to some other endpoints they will be redirected towards the profile endpoint
//      until a profile is chosen



// When the user logs in you can do a loading creen with the animelix logo in the middle with a red loading circle
// until the image and video is fetched