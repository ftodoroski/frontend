import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom"
import { loginUser } from '../../util/session_api_util'


const HomePage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const loginAsDemoUser = e => {
        dispatch(loginUser({ email: 'demo102@gmail.com', password: '0000' }))
        .then(() => navigate('/profiles'))
    }

    return (
        <main className='homepage-background'>
            <section className='homepage'>
                <div className='welcome'>
                    <h1>All of Animeflix</h1>
                    <h1>Right on your browser!</h1>
                </div>

                <Link to='/signup'>
                    <button className='free'>Sign up for a Free Trial</button>
                </Link>

                <button className='demo' onClick={loginAsDemoUser}>Demo</button>
            </section>
        </main>
    )
}

export default HomePage