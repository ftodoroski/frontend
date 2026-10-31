import React, { useState, useEffect, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../../assets/stylesheets/browse.scss'
import { selectWatchlist } from '../../features/entities/watchlist_slice'; 
import { selectAreProgramsLoading } from '../../features/ui/loading_slice';
import Billboard from './components/billboard';
import MediaRow from './components/media_row';
import BrowseDataOrchestrator from './components/browse_data_orchestrator';
import { useEntityFocus } from '../../hooks/useEntityFocus';
import { selectAllPrograms } from '../../features/entities/programs_slice';
import { lockScreenView } from '../../util/dom/screen_lock';

const Browse = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()

    const watchlist = useSelector(selectWatchlist)
    const areProgramsLoading = useSelector(selectAreProgramsLoading)
    const programs = useSelector(selectAllPrograms)

    const { loadDetailsOnPageMount } = useEntityFocus()

    useEffect(() => {
        if (Object.keys(programs).length === 0) {
            return;
        }

        if (location.pathname.includes('/title')) {
            const programId = location.pathname.split('/').at(-1)
            
            if (programId) {
                lockScreenView()
                loadDetailsOnPageMount(programId)
            }
        }

    }, [location.pathname, programs])

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        if (params.has('jbv')) {
            const titleNum = params.get('jbv')
            navigate(`/title/${titleNum}`)
        }

    }, [location.pathname])

    useEffect(() => {
        window.scrollTo(0, 0)
        
    }, [])
    
    const browseRenderer = () => {
        return (
            <main className='browse'>
                <BrowseDataOrchestrator />

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

