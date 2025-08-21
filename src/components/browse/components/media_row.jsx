import React, { useState, useEffect, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../../../assets/stylesheets/browse.scss'
import { GrNext, GrFormNext, GrPrevious } from 'react-icons/gr'
import _ from 'lodash';
import returnRemainder from '../../../util/browse/return_remainder'
import isDivisible from '../../../util/browse/is_divisible'
import isUnderTransitionThreshold from '../../../util/browse/is_under_transition_threshold'
import { selectAllPrograms } from '../../../features/entities/programs_slice';
import { selectAllGenres } from '../../../features/entities/genres_slice';
import { selectWatchlist } from '../../../features/entities/watchlist_slice';
import mediaRowReducer from './media_row_reducer';
import { 
    truncateProgramsByGenre, groupProgramsByGenre, 
    matchProgramsToWatchlist, shuffleProgramsByGenre, 
    selectInitialProgramsWindow 
} from '../utils/programDataUtils'


const MediaRow = ({ genre }) => {
    const programs = useSelector(selectAllPrograms)
    const genres = useSelector(selectAllGenres)
    const watchlist = useSelector(selectWatchlist)

    const [programsByGenre, setProgramsByGenre] = useState({})
    const [sliderHoverStyles, setSliderHoverStyles] = useState({})

    const [reducerSetupDispatchHasRun, setReducerSetupDispatchHasRun] = useState(false)
    const [genreSlidersDetailState, dispatchGenreSlidersDetail] = useReducer(mediaRowReducer, {})
    const timerRef = useRef(null);

    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ])
    const [itemsInRow, setItemsInRow] = useState(null)

    useEffect(() => {
        if (itemsInRow && !_.isEmpty(programsByGenre) && !reducerSetupDispatchHasRun) {
            setReducerSetupDispatchHasRun(true)

            dispatchGenreSlidersDetail({
                type: 'initial_reducer_set_up', 
                payload: {itemsInRow, programsByGenre, selectInitialProgramsWindow}
            })
        }
    })

    useEffect(() => {
        // This is where you might want to do that dispatch update
        return () => clearTimeout(timerRef.current);
    }, [])

    useEffect(() => {
        if (windowSize[0] >= 1400) {
            // And this is when you change the itemsInRow, i guess a good thing would be to
            // make the initial value null. Will need a component that handles the loading
            setItemsInRow(6)
        }
        // You want to make a conditional for the other widths
    }, [windowSize])

    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        }
    })

    useEffect(() => {
        let programsByGenre = groupProgramsByGenre(genres, programs)
        programsByGenre['Watchlist'] = matchProgramsToWatchlist(watchlist, programs)
        programsByGenre = truncateProgramsByGenre(programsByGenre)
        shuffleProgramsByGenre(programsByGenre)

        setProgramsByGenre(programsByGenre)
    }, []);

    const sliderItem = (program, idx) => {
        return (
            <div key={idx} className='slider-item'>
                <Link to='' className='slider-link'>
                    <div className='boxart-container'>
                        <img src={program.thumbnail} alt={program.title} className='boxart-img'/>
                        <div className='fallback-text-container'>
                            <p className='fallback-text'>{program.title}</p>
                        </div>
                    </div>
                </Link>
            </div>
        )
    }

    const handleGenreHeaderHoverEnter = () => {
        setSliderHoverStyles({
            [genre]: {
                'displayChevron': { 'display': 'inline-block' }
            }
        })
    }

    const handleGenreHeaderHoverLeave = () => {
        const { [genre]: displayChevron, ...props } = sliderHoverStyles
        setSliderHoverStyles({ ...props })
    }

    const handleTitleExploreAllHoverEnter = () => {
        setSliderHoverStyles({
            [genre]: {
                'displayExploreAll': {
                    'max-width': '200px',
                    'opacity': 1,
                    'transform': 'translate(1vw)',
                },
                'displayChevron': {
                    'display': 'inline-block',
                    'transform': 'translate(.7vw)'
                },
            }
        })
    }

    const handleTitleExploreAllHoverLeave = () => {
        const { [genre]: { displayChevron } } = sliderHoverStyles
        const { display } = displayChevron

        setSliderHoverStyles({
            [genre]: { 'displayChevron': { display } }
        })
    }

    const handleSliderHoverEnter = () => {
        setSliderHoverStyles({
            [genre]: {
                'displayChevron': {
                    'display': 'inline-block',
                },
                'displayChevronNext': {
                    'display': 'block'
                },
                'displayChevronPrevious': {
                    'display': 'block',
                },
                'displayPagination': {
                    'display': 'block'
                }
            }
        })
    }

    const handleSliderHoverLeave = () => {
        const { [genre]: {
            displayChevron,
            displayChevronNext,
            displayChevronPrevious,
            displayPagination
        }, ...props } = sliderHoverStyles
        setSliderHoverStyles({ ...props })
    }

    const handleNextButtonHoverEnter = () => {
        const { [genre]: props } = sliderHoverStyles

        setSliderHoverStyles({
            [genre]: {
                ...props,
                'displayChevronNext': {
                    'display': 'block',
                    'transform': 'scale(1.25)',
                },
                'displayChevronNextContainer': {
                    'background': 'hsla(0,0%,8%,.7)'
                },
                'displayChevron': {
                    'display': 'inline-block',
                },
                'displayChevronPrevious': {
                    'display': 'block',
                },
                'displayPagination': {
                    'display': 'block'
                }
            }
        })
    }

    const handleNextButtonHoverLeave = () => {
        const {
            [genre]: {
                displayChevronNext,
                displayChevronNextContainer,
                ...genreProps
            }
            , ...props
        } = sliderHoverStyles
        const { transform, ...remainingChevronNextProps } = displayChevronNext

        setSliderHoverStyles({ [genre]: { ...genreProps, 'displayChevronNext': { ...remainingChevronNextProps } }, ...props })
    }

    const handlePrevButtonHoverEnter = () => {
        const { [genre]: props } = sliderHoverStyles

        setSliderHoverStyles({
            [genre]: {
                ...props,
                'displayChevronPrevious': {
                    'display': 'block',
                    'transform': 'scale(1.25)',
                },
                'displayChevronPreviousContainer': {
                    'background': 'hsla(0,0%,8%,.7)'
                },
                'displayChevron': {
                    'display': 'inline-block',
                },
                'displayChevronNext': {
                    'display': 'block'
                },
                'displayPagination': {
                    'display': 'block'
                }
            }
        })
    }

    const handlePrevButtonHoverLeave = () => {
        const {
            [genre]: {
                displayChevronPrevious,
                displayChevronPreviousContainer,
                ...genreProps
            }
            , ...props
        } = sliderHoverStyles
        const { transform, ...remainingChevronPreviousProps } = displayChevronPrevious

        setSliderHoverStyles({ [genre]: { ...genreProps, 'displayChevronPrevious': { ...remainingChevronPreviousProps } }, ...props })
    }

    const handleNext = () => {
        const UPDATE_PROGRAMS_DELAY_IN_MILLISECONDS = 1000

        let updatedPrograms = []

        const totalItems = genreSlidersDetailState[genre]['totalItems']
        const itemsInRow = genreSlidersDetailState[genre]['itemsInRow']
        const getSliderItemWidth = genreSlidersDetailState[genre]['getSliderItemWidth']
        let lowestVisibleItemIndex = genreSlidersDetailState[genre]['lowestVisibleItemIndex']
        let nextLowestVisibleItemIndex = lowestVisibleItemIndex + itemsInRow

        let incrementIndexByAmount = genreSlidersDetailState[genre]['itemsInRow']

        let leftOffset
        let leftSide
        let viewRow
        let rightSide
        let rightOffset

        const RTLMultiplier = -1
        const viewportItemsAmount = itemsInRow
        const rightSideItemsAmount = itemsInRow
        const rightOffsetItemsAmount = 1
        const transitioningItemsAmount = (
            viewportItemsAmount + rightSideItemsAmount + rightOffsetItemsAmount
        )

        const sliderButtonHasNotCooledDown = !(genreSlidersDetailState[genre]['sliderButtonHasCooledDown'])
        const sliderHasNotMovedAtLeastOnce = !(genreSlidersDetailState[genre]['hasMovedOnce'])
        const isTotalBelowTransitioningAmount = isUnderTransitionThreshold(
            totalItems, transitioningItemsAmount
        )
        const isTotalAboveTransitioningAmount = !(isUnderTransitionThreshold(
            totalItems, transitioningItemsAmount
        ))
        const totalContainsNoRemainder = isDivisible(totalItems, itemsInRow)
        const totalContainsRemainder = !(isDivisible(totalItems, itemsInRow))


        if (sliderButtonHasNotCooledDown) {
            console.log('Button has not cooldown yet')
            return
        }

        if (sliderHasNotMovedAtLeastOnce) {
            console.log('Checking for the lowestVisibleItemIndex', lowestVisibleItemIndex);

            dispatchGenreSlidersDetail({
                type: 'activate_slider_animation',
                payload: { genre }
            })

            dispatchGenreSlidersDetail({
                type: 'deactivate_sliderButtonHasCooledDown',
                payload: { genre }
            })

            if (isTotalBelowTransitioningAmount) {
                let initialPartialUpdateProgramsArray = [...programsByGenre[genre], ...programsByGenre[genre].slice(0, returnRemainder(totalItems, itemsInRow))]
                let positioningAmount = returnRemainder(totalItems, itemsInRow) * getSliderItemWidth * RTLMultiplier
                nextLowestVisibleItemIndex = lowestVisibleItemIndex + returnRemainder(totalItems, itemsInRow)

                if (totalContainsNoRemainder) {
                    positioningAmount = itemsInRow * getSliderItemWidth * RTLMultiplier
                    nextLowestVisibleItemIndex = lowestVisibleItemIndex + itemsInRow
                    initialPartialUpdateProgramsArray = [...initialPartialUpdateProgramsArray, ...programsByGenre[genre].slice(0, 1)]
                }

                dispatchGenreSlidersDetail({
                    type: 'rescaledProgramsArray_initial_partial_update',
                    payload: { genre, initialPartialUpdateProgramsArray }
                })

                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })
            } else {

                let initialPartialUpdateProgramsArray = [...programsByGenre[genre].slice(0, transitioningItemsAmount)]
                const positioningAmount = itemsInRow * getSliderItemWidth * RTLMultiplier

                dispatchGenreSlidersDetail({
                    type: 'rescaledProgramsArray_initial_partial_update',
                    payload: { genre, initialPartialUpdateProgramsArray }
                })

                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })
            }

            timerRef.current = setTimeout(() => {
                dispatchGenreSlidersDetail({
                    type: 'deactivate_slider_animation',
                    payload: { genre }
                })

                dispatchGenreSlidersDetail({
                    type: 'activate_sliderButtonHasCooledDown',
                    payload: { genre }
                })

                dispatchGenreSlidersDetail({
                    type: 'hasMovedOnce',
                    payload: { genre }
                })

                leftOffset = programsByGenre[genre].slice(totalItems - 1, totalItems)
                leftSide = programsByGenre[genre].slice(lowestVisibleItemIndex, itemsInRow)
                viewRow = programsByGenre[genre].slice(lowestVisibleItemIndex + itemsInRow, lowestVisibleItemIndex + itemsInRow + itemsInRow)
                rightSide = programsByGenre[genre].slice((lowestVisibleItemIndex + itemsInRow) + itemsInRow, (lowestVisibleItemIndex + itemsInRow) + itemsInRow + itemsInRow)
                rightOffset = programsByGenre[genre].slice((lowestVisibleItemIndex + itemsInRow) + itemsInRow + itemsInRow, (lowestVisibleItemIndex + itemsInRow) + itemsInRow + itemsInRow + 1)

                if (isTotalBelowTransitioningAmount) {
                    const nextHighestVisibleItemIndex = nextLowestVisibleItemIndex + itemsInRow

                    leftOffset = programsByGenre[genre].slice(totalItems - 1, totalItems)
                    leftSide = programsByGenre[genre].slice(lowestVisibleItemIndex, nextLowestVisibleItemIndex)
                    viewRow = programsByGenre[genre].slice(nextLowestVisibleItemIndex, nextHighestVisibleItemIndex)
                    rightSide = programsByGenre[genre].slice(0, itemsInRow)
                    rightOffset = programsByGenre[genre].slice(itemsInRow, itemsInRow + 1)

                    if (totalContainsRemainder) {
                        incrementIndexByAmount = returnRemainder(
                            totalItems, itemsInRow
                        )
                    }

                    dispatchGenreSlidersDetail({
                        type: 'increment_lowestVisibleItemIndex',
                        payload: { genre, amount: incrementIndexByAmount }
                    })
                } else {
                    const totalItemsInSliderLimit = 1 + (itemsInRow * 3) + 1

                    if (totalContainsRemainder && totalItems < totalItemsInSliderLimit) {
                        rightOffset.push(...programsByGenre[genre].slice(0, 1))
                    }

                    dispatchGenreSlidersDetail({
                        type: 'increment_lowestVisibleItemIndex',
                        payload: { genre, amount: incrementIndexByAmount }
                    })
                }

                const leftOffscreenItemsAmount = leftOffset.length + leftSide.length
                const positioningAmount = leftOffscreenItemsAmount * getSliderItemWidth * RTLMultiplier
                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })

                updatedPrograms = [...leftOffset, ...leftSide, ...viewRow, ...rightSide, ...rightOffset]
                dispatchGenreSlidersDetail({
                    type: 'rescaledProgramsArray_update_array',
                    payload: { genre, updatedPrograms }
                })
            }, UPDATE_PROGRAMS_DELAY_IN_MILLISECONDS);

        } else {

            // console.log('Checking for the lowestVisibleItemIndex', lowestVisibleItemIndex);

            let nextHighestVisibleItemIndex = nextLowestVisibleItemIndex + itemsInRow
            // console.log('Checking for nextHighestVisibleItemIndex is ', nextHighestVisibleItemIndex);

            dispatchGenreSlidersDetail({
                type: 'activate_slider_animation',
                payload: { genre }
            })

            dispatchGenreSlidersDetail({
                type: 'deactivate_sliderButtonHasCooledDown',
                payload: { genre }
            })

            dispatchGenreSlidersDetail({
                type: 'activate_movementTriggered',
                payload: { genre }
            })


            const subsequentEndRangeIndexOutOfBound = (
                (nextLowestVisibleItemIndex < totalItems) &&
                (nextHighestVisibleItemIndex > totalItems)
            )
            const subsequentRangeIndexOutOfBound = (
                (nextLowestVisibleItemIndex >= totalItems) &&
                (nextHighestVisibleItemIndex > totalItems)
            )

            if (
                totalContainsRemainder &&
                subsequentEndRangeIndexOutOfBound &&
                totalItems >= transitioningItemsAmount
            ) {
                const leftOffscreenItemsAmount = returnRemainder(totalItems, itemsInRow) + itemsInRow + 1
                const positioningAmount = leftOffscreenItemsAmount * getSliderItemWidth * RTLMultiplier

                nextLowestVisibleItemIndex = lowestVisibleItemIndex + returnRemainder(totalItems, itemsInRow)
                nextHighestVisibleItemIndex = nextLowestVisibleItemIndex + itemsInRow
                lowestVisibleItemIndex = nextLowestVisibleItemIndex - itemsInRow

                incrementIndexByAmount = returnRemainder(totalItems, itemsInRow)

                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })

            } else if (
                totalContainsRemainder &&
                isTotalBelowTransitioningAmount &&
                subsequentRangeIndexOutOfBound
            ) {
                const leftOffscreenItemsAmount = returnRemainder(totalItems, itemsInRow) + itemsInRow + 1
                const positioningAmount = leftOffscreenItemsAmount * getSliderItemWidth * RTLMultiplier

                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })

            } else if (
                totalContainsRemainder &&
                isTotalBelowTransitioningAmount &&
                subsequentEndRangeIndexOutOfBound
            ) {
                const leftOffscreenItemsAmount = returnRemainder(totalItems, itemsInRow) + itemsInRow + 1
                const positioningAmount = leftOffscreenItemsAmount * getSliderItemWidth * RTLMultiplier

                nextLowestVisibleItemIndex = lowestVisibleItemIndex + returnRemainder(totalItems, itemsInRow)
                nextHighestVisibleItemIndex = nextLowestVisibleItemIndex + itemsInRow

                incrementIndexByAmount = returnRemainder(totalItems, itemsInRow)

                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })


            } else if (totalContainsRemainder && isTotalAboveTransitioningAmount && lowestVisibleItemIndex === returnRemainder(totalItems, itemsInRow)) {
                // rewrite this statement to be more meanigful
                // console.log('Our Condition Checks Out');
                // console.log('lowestVisibleItemIndex', lowestVisibleItemIndex);

                const leftOffscreenItemsAmount = returnRemainder(totalItems, itemsInRow) + itemsInRow + 1
                const positioningAmount = leftOffscreenItemsAmount * getSliderItemWidth * RTLMultiplier

                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })

            } else {

                const positioningAmount = transitioningItemsAmount * getSliderItemWidth * RTLMultiplier

                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })
            }

            timerRef.current = setTimeout(() => {
                dispatchGenreSlidersDetail({
                    type: 'deactivate_slider_animation',
                    payload: { genre }
                })

                dispatchGenreSlidersDetail({
                    type: 'activate_sliderButtonHasCooledDown',
                    payload: { genre }
                })

                const isBeginningOfInfiniteScroll = nextLowestVisibleItemIndex >= totalItems
                if (isBeginningOfInfiniteScroll) {
                    leftOffset = programsByGenre[genre].slice(lowestVisibleItemIndex - 1, lowestVisibleItemIndex)
                    leftSide = programsByGenre[genre].slice(lowestVisibleItemIndex, nextLowestVisibleItemIndex)
                    viewRow = programsByGenre[genre].slice(0, itemsInRow)
                    rightSide = programsByGenre[genre].slice(0 + itemsInRow, 0 + itemsInRow + itemsInRow)
                    rightOffset = programsByGenre[genre].slice(0 + itemsInRow + itemsInRow, 0 + itemsInRow + itemsInRow + 1)

                    if (isTotalBelowTransitioningAmount) {
                        rightOffset = programsByGenre[genre].slice(0, 1)
                    }

                    const beginningIndex = 0
                    dispatchGenreSlidersDetail({
                        type: 'reposition_lowestVisibleItemIndex',
                        payload: { genre, index: beginningIndex }
                    })

                    nextLowestVisibleItemIndex = 0
                    nextHighestVisibleItemIndex = itemsInRow

                    const leftOffscreenItemsAmount = itemsInRow + 1
                    const positioningAmount = leftOffscreenItemsAmount * getSliderItemWidth * RTLMultiplier
                    dispatchGenreSlidersDetail({
                        type: 'change_positioningAmount',
                        payload: { genre, positioningAmount }
                    })
                } else {

                    leftOffset = programsByGenre[genre].slice(lowestVisibleItemIndex - 1, lowestVisibleItemIndex)
                    leftSide = programsByGenre[genre].slice(lowestVisibleItemIndex, lowestVisibleItemIndex + itemsInRow)
                    viewRow = programsByGenre[genre].slice(lowestVisibleItemIndex + itemsInRow, lowestVisibleItemIndex + itemsInRow + itemsInRow)
                    rightSide = programsByGenre[genre].slice((lowestVisibleItemIndex + itemsInRow) + itemsInRow, (lowestVisibleItemIndex + itemsInRow) + itemsInRow + itemsInRow)
                    rightOffset = programsByGenre[genre].slice((lowestVisibleItemIndex + itemsInRow) + itemsInRow + itemsInRow, (lowestVisibleItemIndex + itemsInRow) + itemsInRow + itemsInRow + 1)

                    const isSliderOneCycleBeforeInfiniteScroll = nextLowestVisibleItemIndex + itemsInRow >= totalItems
                    const isSliderTwoCyclesBeforeInfiniteScroll = nextLowestVisibleItemIndex + itemsInRow + itemsInRow + 1 > totalItems
                    if (isSliderOneCycleBeforeInfiniteScroll) {
                        rightSide = programsByGenre[genre].slice(0, itemsInRow)
                        rightOffset = programsByGenre[genre].slice(itemsInRow, itemsInRow + 1)
                    } else if (isSliderTwoCyclesBeforeInfiniteScroll) {
                        rightOffset = programsByGenre[genre].slice(0, 1)
                    }

                    const isLowestVisibleItemIndexZero = lowestVisibleItemIndex === 0
                    if (isLowestVisibleItemIndexZero) {
                        leftOffset = programsByGenre[genre].slice(totalItems - 1, totalItems)
                    }

                    if (
                        totalContainsRemainder &&
                        isTotalBelowTransitioningAmount &&
                        nextLowestVisibleItemIndex === returnRemainder(totalItems, itemsInRow)
                    ) {
                        leftOffset = programsByGenre[genre].slice(totalItems - 1, totalItems)
                        leftSide = programsByGenre[genre].slice(lowestVisibleItemIndex, nextLowestVisibleItemIndex)
                        viewRow = programsByGenre[genre].slice(nextLowestVisibleItemIndex, nextHighestVisibleItemIndex)
                        rightSide = programsByGenre[genre].slice(0, itemsInRow)
                        rightOffset = programsByGenre[genre].slice(itemsInRow, itemsInRow + 1)
                    }

                    dispatchGenreSlidersDetail({
                        type: 'increment_lowestVisibleItemIndex',
                        payload: { genre, amount: incrementIndexByAmount }
                    })

                    const leftOffscreenItemsAmount = leftOffset.length + leftSide.length
                    const positioningAmount = leftOffscreenItemsAmount * getSliderItemWidth * RTLMultiplier
                    dispatchGenreSlidersDetail({
                        type: 'change_positioningAmount',
                        payload: { genre, positioningAmount }
                    })
                }

                updatedPrograms = [...leftOffset, ...leftSide, ...viewRow, ...rightSide, ...rightOffset]
                dispatchGenreSlidersDetail({
                    type: 'rescaledProgramsArray_update_array',
                    payload: { genre, updatedPrograms }
                })

                dispatchGenreSlidersDetail({
                    type: 'deactivate_movementTriggered',
                    payload: { genre }
                })

            }, UPDATE_PROGRAMS_DELAY_IN_MILLISECONDS);
        }
    }

    const handlePrev = () => {
        const UPDATE_PROGRAMS_DELAY_IN_MILLISECONDS = 1000

        let updatedPrograms = []

        const totalItems = genreSlidersDetailState[genre]['totalItems']
        const itemsInRow = genreSlidersDetailState[genre]['itemsInRow']
        const getSliderItemWidth = genreSlidersDetailState[genre]['getSliderItemWidth']
        let lowestVisibleItemIndex = genreSlidersDetailState[genre]['lowestVisibleItemIndex']
        let previousVisibleItemIndex = lowestVisibleItemIndex - itemsInRow

        let decrementIndexByAmount = genreSlidersDetailState[genre]['itemsInRow']

        let leftOffset
        let leftSide
        let viewRow
        let rightSide
        let rightOffset

        const LTRMultiplier = -1
        const viewportItemsAmount = itemsInRow
        const rightSideItemsAmount = itemsInRow
        const rightOffsetItemsAmount = 1
        const transitioningItemsAmount = (
            viewportItemsAmount + rightSideItemsAmount + rightOffsetItemsAmount
        )

        const sliderButtonHasNotCooledDown = !(genreSlidersDetailState[genre]['sliderButtonHasCooledDown'])

        const leftOffsetItemsAmount = 1
        let positioningAmount = leftOffsetItemsAmount * getSliderItemWidth * LTRMultiplier

        const totalContainsNoRemainder = isDivisible(totalItems, itemsInRow)
        const totalContainsRemainder = !(isDivisible(totalItems, itemsInRow))

        const isTotalBelowTransitioningAmount = isUnderTransitionThreshold(
            totalItems, transitioningItemsAmount
        )
        const isTotalAboveTransitioningAmount = !(isUnderTransitionThreshold(
            totalItems, transitioningItemsAmount
        ))
        const sliderRemainder = returnRemainder(totalItems, itemsInRow)

        if (sliderButtonHasNotCooledDown) {
            console.log('Button has not cooldown yet')
            return
        }

        dispatchGenreSlidersDetail({
            type: 'activate_slider_animation',
            payload: { genre }
        })

        dispatchGenreSlidersDetail({
            type: 'deactivate_sliderButtonHasCooledDown',
            payload: { genre }
        })

        dispatchGenreSlidersDetail({
            type: 'change_positioningAmount',
            payload: { genre, positioningAmount }
        })

        dispatchGenreSlidersDetail({
            type: 'activate_movementTriggered',
            payload: { genre }
        })

        timerRef.current = setTimeout(() => {
            dispatchGenreSlidersDetail({
                type: 'deactivate_slider_animation',
                payload: { genre }
            })

            dispatchGenreSlidersDetail({
                type: 'activate_sliderButtonHasCooledDown',
                payload: { genre }
            })


            const startIndex = 0
            const startingReverseInfiniteScroll = (
                (previousVisibleItemIndex < startIndex) &&
                (lowestVisibleItemIndex === 0)
            )
            if (startingReverseInfiniteScroll) {

                const index = totalItems - itemsInRow
                previousVisibleItemIndex = index

                leftOffset = programsByGenre[genre].slice(previousVisibleItemIndex - itemsInRow - 1, previousVisibleItemIndex - itemsInRow)
                leftSide = programsByGenre[genre].slice(previousVisibleItemIndex - itemsInRow, previousVisibleItemIndex)
                viewRow = programsByGenre[genre].slice(previousVisibleItemIndex, totalItems)
                rightSide = programsByGenre[genre].slice(0, itemsInRow)
                rightOffset = programsByGenre[genre].slice(itemsInRow, itemsInRow + 1)

                // For Testing out the edge cases
                let leftOffsetRange = `(${previousVisibleItemIndex - itemsInRow - 1}, ${previousVisibleItemIndex - itemsInRow})`
                let leftSideRange = `(${previousVisibleItemIndex - itemsInRow}, ${previousVisibleItemIndex})`
                let viewRowRange = `(${previousVisibleItemIndex}, ${totalItems})`
                let rightSideRange = `(${0}, ${itemsInRow})`
                let rightOffsetRange = `(${itemsInRow}, ${itemsInRow + 1})`

                const leftOffsetOutOfRange = (previousVisibleItemIndex - itemsInRow - 1) < startIndex
                if (totalContainsNoRemainder && isTotalBelowTransitioningAmount && leftOffsetOutOfRange) {
                    leftOffset = programsByGenre[genre].slice(totalItems - 1, totalItems)

                    // Testing Here (For Testing Edge Cases)
                    leftOffsetRange = `(${totalItems - 1}, ${totalItems})`
                }

                if (totalContainsRemainder && isTotalBelowTransitioningAmount) {

                    leftOffset = programsByGenre[genre].slice(totalItems - 1, totalItems)
                    leftSide = programsByGenre[genre].slice(0, totalItems - itemsInRow)
                    viewRow = programsByGenre[genre].slice(totalItems - itemsInRow, totalItems)
                    rightSide = programsByGenre[genre].slice(0, itemsInRow)
                    rightOffset = programsByGenre[genre].slice(itemsInRow, itemsInRow + 1)

                    // Testing Edge Cases Here
                    leftOffsetRange = `(${totalItems - 1}, ${totalItems})`
                    leftSideRange = `(${0}, ${totalItems - itemsInRow})`
                    viewRowRange = `(${totalItems - itemsInRow}, ${totalItems})`
                    rightSideRange = `(${0}, ${itemsInRow})`
                    rightOffsetRange = `(${itemsInRow}, ${itemsInRow + 1})`
                }

                // Testing for Edge Cases
                console.log('leftOffsetRange is', leftOffsetRange)
                console.log('leftSideRange is', leftSideRange)
                console.log('viewRowRange is', viewRowRange)
                console.log('rightSideRange is', rightSideRange)
                console.log('rightOffsetRange is', rightOffsetRange)

                // Checking for length
                console.log('\n');
                console.log('Checking for length');
                console.log('\n');

                // For Testing Edge Cases
                console.log('leftOffset', leftOffset.length)
                console.log('leftSide', leftSide.length)
                console.log('viewRow', viewRow.length)
                console.log('rightSide', rightSide.length)
                console.log('rightOffset', rightOffset.length)
                console.log('Inside prev startingReverseInfiniteScroll')

                dispatchGenreSlidersDetail({
                    type: 'reposition_lowestVisibleItemIndex',
                    payload: { genre, index }
                })

                const leftOffscreenItemsAmount = leftOffset.length + leftSide.length
                const positioningAmount = leftOffscreenItemsAmount * getSliderItemWidth * LTRMultiplier
                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })

            } else {

                leftOffset = programsByGenre[genre].slice(previousVisibleItemIndex - itemsInRow - 1, previousVisibleItemIndex - itemsInRow)
                leftSide = programsByGenre[genre].slice(previousVisibleItemIndex - itemsInRow, previousVisibleItemIndex)
                viewRow = programsByGenre[genre].slice(previousVisibleItemIndex, lowestVisibleItemIndex)
                rightSide = programsByGenre[genre].slice(lowestVisibleItemIndex, lowestVisibleItemIndex + itemsInRow)
                rightOffset = programsByGenre[genre].slice(lowestVisibleItemIndex + itemsInRow, lowestVisibleItemIndex + itemsInRow + 1)

                // For Testing out the edge cases
                let leftOffsetRange = `(${previousVisibleItemIndex - itemsInRow - 1}, ${previousVisibleItemIndex - itemsInRow})`
                let leftSideRange = `(${previousVisibleItemIndex - itemsInRow}, ${previousVisibleItemIndex})`
                let viewRowRange = `(${previousVisibleItemIndex}, ${lowestVisibleItemIndex})`
                let rightSideRange = `(${lowestVisibleItemIndex}, ${lowestVisibleItemIndex + itemsInRow})`
                let rightOffsetRange = `(${lowestVisibleItemIndex + itemsInRow}, ${lowestVisibleItemIndex + itemsInRow + 1})`

                // Checking weather certain variables are out of bound based on where the index is
                const leftOffsetOutOfRange = (previousVisibleItemIndex - itemsInRow - 1) < startIndex
                const leftSideOutOfRange = (previousVisibleItemIndex - itemsInRow) < startIndex
                const rightOffsetOutOfRange = (lowestVisibleItemIndex + itemsInRow + 1) >= totalItems
                if (leftOffsetOutOfRange && !leftSideOutOfRange) {
                    leftOffset = programsByGenre[genre].slice(totalItems - 1, totalItems)

                    // Testing Here (For Testing Edge Cases)
                    leftOffsetRange = `(${totalItems - 1}, ${totalItems})`

                } else if (leftOffsetOutOfRange && leftSideOutOfRange) {
                    leftOffset = programsByGenre[genre].slice(totalItems - itemsInRow - 1, totalItems - itemsInRow)
                    leftSide = programsByGenre[genre].slice(totalItems - itemsInRow, totalItems)

                    // Testing Here (For Testing Edge Cases)
                    leftOffsetRange = `(${totalItems - itemsInRow - 1}, ${totalItems - itemsInRow})`
                    leftSideRange = `(${totalItems - itemsInRow}, ${totalItems})`

                } else if (rightOffsetOutOfRange) {
                    rightOffset = programsByGenre[genre].slice(0, 1)

                    // Testing Here (For Testing Edge Cases)
                    rightOffsetRange = `(${0}, ${1})`
                }


                if (totalContainsNoRemainder && isTotalBelowTransitioningAmount && rightOffsetOutOfRange) {
                    rightOffset = programsByGenre[genre].slice(0, 1)

                    // Testing Here (For Testing Edge Cases)
                    rightOffsetRange = `(${0}, ${1})`
                }


                const isSliderOneCycleBeforeReverseInfiniteScroll = (
                    totalContainsRemainder &&
                    (previousVisibleItemIndex < startIndex) &&
                    (lowestVisibleItemIndex > 0)
                )
                const isSliderTwoCyclesBeforeReverseInfiniteScroll = (
                    totalContainsRemainder &&
                    (previousVisibleItemIndex === sliderRemainder)
                )

                if ((
                    isSliderOneCycleBeforeReverseInfiniteScroll &&
                    isTotalBelowTransitioningAmount
                )) {

                    leftOffset = programsByGenre[genre].slice(totalItems - itemsInRow - 1, totalItems - itemsInRow)
                    leftSide = programsByGenre[genre].slice(totalItems - itemsInRow, totalItems)
                    viewRow = programsByGenre[genre].slice(0, itemsInRow)
                    rightSide = programsByGenre[genre].slice(itemsInRow, itemsInRow + itemsInRow)
                    rightOffset = programsByGenre[genre].slice(0, 1)


                    // Testing Here (For Testing Edge Cases)
                    leftOffsetRange = `(${totalItems - itemsInRow - 1}, ${totalItems - itemsInRow})`
                    leftSideRange = `(${totalItems - itemsInRow}, ${totalItems})`
                    viewRowRange = `(${0}, ${itemsInRow})`
                    rightSideRange = `(${itemsInRow}, ${itemsInRow + itemsInRow})`
                    rightOffsetRange = `(${0}, ${1})`

                    const startingIndex = 0
                    dispatchGenreSlidersDetail({
                        type: 'reposition_lowestVisibleItemIndex',
                        payload: { genre, index: startingIndex }
                    })

                } else if ((
                    isSliderOneCycleBeforeReverseInfiniteScroll &&
                    isTotalAboveTransitioningAmount
                )) {

                    leftOffset = programsByGenre[genre].slice(totalItems - itemsInRow - 1, totalItems - itemsInRow)
                    leftSide = programsByGenre[genre].slice(totalItems - itemsInRow, totalItems)
                    viewRow = programsByGenre[genre].slice(0, itemsInRow)
                    rightSide = programsByGenre[genre].slice(itemsInRow, itemsInRow + itemsInRow)
                    rightOffset = programsByGenre[genre].slice(itemsInRow + itemsInRow, itemsInRow + itemsInRow + 1)


                    // Testing Here (For Testing Edge Cases)
                    leftOffsetRange = `(${totalItems - itemsInRow - 1}, ${totalItems - itemsInRow})`
                    leftSideRange = `(${totalItems - itemsInRow}, ${totalItems})`
                    viewRowRange = `(${0}, ${itemsInRow})`
                    rightSideRange = `(${itemsInRow}, ${itemsInRow + itemsInRow})`
                    rightOffsetRange = `(${itemsInRow + itemsInRow}, ${itemsInRow + itemsInRow + 1})`

                    const startingIndex = 0
                    dispatchGenreSlidersDetail({
                        type: 'reposition_lowestVisibleItemIndex',
                        payload: { genre, index: startingIndex }
                    })

                } else if ((
                    isSliderTwoCyclesBeforeReverseInfiniteScroll &&
                    isTotalAboveTransitioningAmount
                )) {

                    leftOffset = programsByGenre[genre].slice(totalItems - 1, totalItems)
                    leftSide = programsByGenre[genre].slice(0, previousVisibleItemIndex)
                    viewRow = programsByGenre[genre].slice(previousVisibleItemIndex, lowestVisibleItemIndex)
                    rightSide = programsByGenre[genre].slice(lowestVisibleItemIndex, lowestVisibleItemIndex + itemsInRow)
                    rightOffset = programsByGenre[genre].slice(0, 1)


                    // Testing Here (For Testing Edge Cases)
                    leftOffsetRange = `(${totalItems - 1}, ${totalItems})`
                    leftSideRange = `(${0}, ${previousVisibleItemIndex})`
                    viewRowRange = `(${previousVisibleItemIndex}, ${lowestVisibleItemIndex})`
                    rightSideRange = `(${lowestVisibleItemIndex}, ${lowestVisibleItemIndex + itemsInRow})`
                    rightOffsetRange = `(${0}, ${1})`

                    dispatchGenreSlidersDetail({
                        type: 'decrement_lowestVisibleItemIndex',
                        payload: { genre, amount: decrementIndexByAmount }
                    })
                } else {

                    dispatchGenreSlidersDetail({
                        type: 'decrement_lowestVisibleItemIndex',
                        payload: { genre, amount: decrementIndexByAmount }
                    })
                }

                // For Testing Edge Cases
                console.log('leftOffsetRange is', leftOffsetRange)
                console.log('leftSideRange is', leftSideRange)
                console.log('viewRowRange is', viewRowRange)
                console.log('rightSideRange is', rightSideRange)
                console.log('rightOffsetRange is', rightOffsetRange)

                // Checking for length
                console.log('\n');
                console.log('Checking for length');
                console.log('\n');

                // For Testing Edge Cases
                console.log('leftOffset', leftOffset.length)
                console.log('leftSide', leftSide.length)
                console.log('viewRow', viewRow.length)
                console.log('rightSide', rightSide.length)
                console.log('rightOffset', rightOffset.length)
                console.log('Inside default if statement')

                const leftOffscreenItemsAmount = leftOffset.length + leftSide.length
                const positioningAmount = leftOffscreenItemsAmount * getSliderItemWidth * LTRMultiplier
                dispatchGenreSlidersDetail({
                    type: 'change_positioningAmount',
                    payload: { genre, positioningAmount }
                })
            }

            updatedPrograms = [...leftOffset, ...leftSide, ...viewRow, ...rightSide, ...rightOffset]
            dispatchGenreSlidersDetail({
                type: 'rescaledProgramsArray_update_array',
                payload: { genre, updatedPrograms }
            })

            dispatchGenreSlidersDetail({
                type: 'deactivate_movementTriggered',
                payload: { genre }
            })

        }, UPDATE_PROGRAMS_DELAY_IN_MILLISECONDS);

    }

    const spanPreviousContainerElement = () => {
        return (
            <span
                className='previous-caret-container'
                style={
                    sliderHoverStyles[genre]?.displayChevronPreviousContainer ?? {}
                }
                onClick={handlePrev}
                onMouseEnter={handlePrevButtonHoverEnter}
                onMouseLeave={handlePrevButtonHoverLeave}
            >
                <GrPrevious
                    style={
                        sliderHoverStyles[genre]?.displayChevronPrevious ?? {}
                    }
                />
            </span>
        )
    }

    const handlePagination = () => {
        const totalItems = genreSlidersDetailState[genre]['totalItems']
        const itemsInRow = genreSlidersDetailState[genre]['itemsInRow']
        const lowestVisibleItemIndex = genreSlidersDetailState[genre]['lowestVisibleItemIndex']

        const paginationAmount = Math.ceil(totalItems / itemsInRow)

        const pagination = (
            <ul className='pagination-indicator' style={sliderHoverStyles[genre]['displayPagination']}>
                {Array(paginationAmount).fill(0).map((_, idx) => {
                    const currentPageNumber = Math.ceil(lowestVisibleItemIndex / itemsInRow)
                    const isLowestEqualToPageNumber = (currentPageNumber === idx)

                    if (isLowestEqualToPageNumber) {
                        return (
                            <li key={idx} className='active'></li>
                        )
                    }

                    return (
                        <li key={idx}></li>
                    )
                })}
            </ul>
        )

        return pagination
    }

    return (
        <div className="slider-container">
            <h2
                className="row-header"
                onMouseEnter={handleGenreHeaderHoverEnter}
                onMouseLeave={handleGenreHeaderHoverLeave}
            >
                <div
                    className="row-content"
                    onMouseEnter={handleTitleExploreAllHoverEnter}
                    onMouseLeave={handleTitleExploreAllHoverLeave}
                >
                    <div className="row-content-title">{genre}</div>
                    <div className='arrow-row-header'>
                        <div
                            className="see-all-link"
                            style={
                                sliderHoverStyles[genre]?.displayExploreAll ?? {}
                            }
                        >
                            Explore All
                        </div>
                        <div
                            className="arrow-chevron-container"
                            style={
                                sliderHoverStyles[genre]?.displayChevron ?? {}
                            }
                        >
                            <GrFormNext
                                viewBox='0 0 21 21'
                                className={
                                    sliderHoverStyles[genre]?.displayExploreAll
                                        ? 'minimizedChevron' : ''
                                }
                            />
                        </div>
                    </div>
                </div>
            </h2>
            <div className="row-container">
                <div
                    className="slider"
                    onMouseEnter={handleSliderHoverEnter}
                    onMouseLeave={handleSliderHoverLeave}
                >
                    {
                        genreSlidersDetailState[genre]?.hasMovedOnce
                            ? spanPreviousContainerElement() : ''
                    }

                    {/* - pagination ul **the slide bars to see how many are there  */}
                    {
                        sliderHoverStyles[genre]?.displayPagination
                            ? handlePagination() : ''
                    }

                    {/* CHECKING FOR MOVEMENT OF SLIDER */}
                    <div className="slider-mask">
                        <div
                            // This is where when the next button is pressed the logic is for what is viewed

                            className={`slider-content ${genreSlidersDetailState[genre]?.animating
                                    ? 'animating' : ''
                                }`}
                            style={
                                // HANDLES INITIAL MODIFYING OF ARRAY
                                genreSlidersDetailState[genre] &&
                                    !genreSlidersDetailState[genre]['hasMovedOnce'] &&
                                    (
                                        Math.abs(genreSlidersDetailState[genre]['positioningAmount']) >
                                        0
                                        // Need to make a variable for the 3 no hardcoding or constant
                                    )
                                    ?
                                    {
                                        'transform': `translate3d(${genreSlidersDetailState[genre]['positioningAmount']
                                            }%, 0px, 0px)`
                                    }
                                    :
                                    // HANDLES CHANGED ARRAY
                                    genreSlidersDetailState[genre] &&
                                        genreSlidersDetailState[genre]['hasMovedOnce'] &&
                                        !genreSlidersDetailState[genre]['movementTriggered']
                                        ?
                                        {
                                            'transform': `translate3d(${genreSlidersDetailState[genre]['positioningAmount']
                                                }%, 0px, 0px)`
                                        }
                                        :
                                        // HANDLES UNCHANGED ARRAY
                                        genreSlidersDetailState[genre] &&
                                            genreSlidersDetailState[genre]['hasMovedOnce'] &&
                                            genreSlidersDetailState[genre]['movementTriggered']
                                            ?
                                            {
                                                'transform': `translate3d(${genreSlidersDetailState[genre]['positioningAmount']
                                                    }%, 0px, 0px)`
                                            }
                                            :
                                            {}
                            }

                        >
                            {
                                genreSlidersDetailState[genre] &&
                                genreSlidersDetailState[genre]['rescaledProgramsArray']
                                    .map((program, idx) => {
                                        return sliderItem(program, idx)
                                    })
                            }
                        </div>
                    </div>

                    {/* next-caret-container  */}
                    {
                        genreSlidersDetailState[genre] &&
                            (genreSlidersDetailState[genre]['totalItems'] <= genreSlidersDetailState[genre]['itemsInRow'])
                            ?
                            ''
                            :
                            (
                                <span
                                    className='next-caret-container'
                                    style={
                                        sliderHoverStyles[genre]?.displayChevronNextContainer ?? {}
                                    }
                                    onMouseEnter={handleNextButtonHoverEnter}
                                    onMouseLeave={handleNextButtonHoverLeave}
                                    onClick={handleNext}
                                >
                                    {/* Icon for the next caret */}
                                    <GrNext
                                        style={
                                            sliderHoverStyles[genre]?.displayChevronNext ?? {}
                                        }
                                    />
                                </span>
                            )
                    }
                </div>
            </div>
        </div>
    )
}

export default MediaRow

// (Ticket it)
// TODO
// - Refactor the handlePrev and handleNext functions
// - Clean up memory leaks in useEffects
// - Check if useless rerenders are happening and then refactor










































