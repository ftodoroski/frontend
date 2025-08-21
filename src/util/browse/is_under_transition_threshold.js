const isUnderTransitionThreshold = (totalItems, transitioningItemsAmount) => {
    return totalItems < transitioningItemsAmount
}

export default isUnderTransitionThreshold