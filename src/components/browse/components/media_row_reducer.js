const mediaRowReducer = (state, action) => {
    switch (action.type) {
        case 'initial_reducer_set_up': {
            const { itemsInRow, programsByGenre, selectInitialProgramsWindow } = action.payload
            const initialState = {}
            for (const genre in programsByGenre) {
                initialState[genre] = {
                    hasMovedOnce: false,
                    itemsInRow,
                    lowestVisibleItemIndex: 0,
                    getSliderItemWidth: 100 / itemsInRow,
                    totalItems: programsByGenre[genre].length,
                    rescaledProgramsArray: selectInitialProgramsWindow(0, itemsInRow, programsByGenre[genre]),
                    animating: false,
                    sliderButtonHasCooledDown: true,
                    movementTriggered: false,
                    positioningAmount: 0,
                }
            }
            return initialState
        }
        case 'reposition_lowestVisibleItemIndex': {
            const { genre, index } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    lowestVisibleItemIndex: index
                }
            }
        }
        case 'increment_lowestVisibleItemIndex': {
            const { genre, amount } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    lowestVisibleItemIndex: state[genre]['lowestVisibleItemIndex'] + amount
                }
            }
        }
        case 'decrement_lowestVisibleItemIndex': {
            const { genre, amount } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    lowestVisibleItemIndex: state[genre]['lowestVisibleItemIndex'] - amount
                }
            }
        }
        case 'rescaledProgramsArray_initial_partial_update': {
            // also not doing any checks for the slice
            const { genre, initialPartialUpdateProgramsArray } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    rescaledProgramsArray: initialPartialUpdateProgramsArray
                }
            }
        }
        case 'rescaledProgramsArray_update_array': {
            const { genre, updatedPrograms } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    rescaledProgramsArray: updatedPrograms
                }
            }
        }
        case 'activate_slider_animation': {
            const { genre } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    animating: true
                }
            }
        }
        case 'deactivate_slider_animation': {
            const { genre } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    animating: false
                }
            }
        }
        case 'activate_movementTriggered': {
            const { genre } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    movementTriggered: true
                }
            }
        }
        case 'deactivate_movementTriggered': {
            const { genre } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    movementTriggered: false
                }
            }
        }
        case 'deactivate_sliderButtonHasCooledDown': {
            const { genre } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    sliderButtonHasCooledDown: false
                }
            }
        }
        case 'activate_sliderButtonHasCooledDown': {
            const { genre } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    sliderButtonHasCooledDown: true
                }
            }
        }
        case 'hasMovedOnce': {
            const { genre } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    hasMovedOnce: true
                }
            }
        }
        case 'change_positioningAmount': {
            const { genre, positioningAmount } = action.payload
            return {
                ...state,
                [genre]: {
                    ...state[genre],
                    positioningAmount
                }
            }
        }
    }

    console.log(Error('Unknown action: ' + action.type))
    // For some of these that the same thing to reduce code you can refactor to toggle or toggle and pass in the value you want
}

export default mediaRowReducer
