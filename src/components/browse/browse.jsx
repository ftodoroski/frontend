import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link, useSearchParams, useMatch } from 'react-router-dom';
import '../../../assets/stylesheets/browse.scss'
import { selectWatchlist } from '../../features/entities/watchlist_slice'; 
import { selectAreProgramsLoading } from '../../features/ui/loading_slice';
import Billboard from './components/billboard';
import MediaRow from './components/media_row';
import BrowseDataOrchestrator from './components/browse_data_orchestrator';
import { useEntityFocus } from '../../hooks/useEntityFocus';
import { selectAllPrograms } from '../../features/entities/programs_slice';
import { selectCardAnchor, selectIsMediaOverlayOpen, selectModalType } from '../../features/ui/media_overlay_slice';
import { scrollUpdated, selectScrollY } from '../../features/ui/scroll_slice';
import findProgram from '../../util/search/find_program';

const Browse = () => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const [ searchParams, _ ] = useSearchParams()
    const titleMatch = useMatch('/title/:id');
    const routeTitleId = titleMatch?.params?.id;
    
    const watchlist = useSelector(selectWatchlist)
    const areProgramsLoading = useSelector(selectAreProgramsLoading)
    const programs = useSelector(selectAllPrograms)
    const isModalOverlayOpen = useSelector(selectIsMediaOverlayOpen)
    const modalType = useSelector(selectModalType)
    const anchorCard = useSelector(selectCardAnchor)
    const scrollY = useSelector(selectScrollY)

    const { closeDetailsView, loadDetailsOnPageMount } = useEntityFocus()

    const hasInitializedRef = useRef(false);

    useEffect(() => {
        const isBrowseRoute = location.pathname === '/browse';
        const jbvId = searchParams.get('jbv');
        const isDetailsOpen = modalType === 'details' && isModalOverlayOpen

        if (Object.keys(programs).length === 0) return;

        if (routeTitleId && !hasInitializedRef.current) {
            if (!findProgram(Number(routeTitleId), programs)) {
                navigate('/browse', { replace: true })
                return
            }

            const scrollY = 0

            hasInitializedRef.current = true
            loadDetailsOnPageMount(routeTitleId, scrollY)
            return
        }

        if (isBrowseRoute) {
            hasInitializedRef.current = false

            if (!location.search.includes('jbv') && isDetailsOpen) {
                closeDetailsView({ scrollY })
                return
            }

            if (location.search.includes('jbv') && !anchorCard) {
                const currentScrollY = window.scrollY                    

                dispatch(scrollUpdated({ x: 0, y: currentScrollY }));
                loadDetailsOnPageMount(jbvId, currentScrollY)
            }
        }
    }, [
        location.pathname,
        location.search,
        programs, 
        routeTitleId, 
    ])

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

