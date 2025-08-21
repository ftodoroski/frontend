import React, { useState, useEffect, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../../assets/stylesheets/browse.scss'
import { selectWatchlist } from '../../features/entities/watchlist_slice'; 
import { selectAreProgramsLoading } from '../../features/ui/loading_slice';
import Billboard from './components/billboard';
import MediaRow from './components/media_row';


const Browse = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const watchlist = useSelector(selectWatchlist)
    const areProgramsLoading = useSelector(selectAreProgramsLoading)

    useEffect(() => {
        window.scrollTo(0, 0)
        
    }, [])
    
    const browseRenderer = () => {
        return (
            <main className='browse'>
                <Billboard />

                {watchlist.length && <MediaRow genre={'Watchlist'} />}
                {<MediaRow genre={'Action'} />}
                {<MediaRow genre={'Adventure'} />}
                {<MediaRow genre={'Supernatural'} />}
                {<MediaRow genre={'Fantasy'} />}
                {<MediaRow genre={'Sci-Fi'} />}
                {<MediaRow genre={'Thriller'} />}
                {<MediaRow genre={'Mystery'} />}
                {<MediaRow genre={'Romance'} />}
                {<MediaRow genre={'Horror'} />}
                {<MediaRow genre={'Crime'} />}
                {<MediaRow genre={'Drama'} />}
                {<MediaRow genre={'Comedy'} />}
                {<MediaRow genre={'War'} />}
                {<MediaRow genre={'Historical'} />}
                {<MediaRow genre={'Family'} />}
                {<MediaRow genre={'School'} />}
            </main>
        )
    }

    return (
        areProgramsLoading ? 'Loading Component' : browseRenderer()
    )
}


export default Browse






