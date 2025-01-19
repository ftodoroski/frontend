const onChangeHandlerInput = stateHookSetter => event => {
    stateHookSetter(event.target.value)
}

export default onChangeHandlerInput