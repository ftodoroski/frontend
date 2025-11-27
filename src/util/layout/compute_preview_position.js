const computePreviewPosition = (anchorRect) => {
    let { x, y, width, height } = anchorRect

    // Viewport measurements
    const viewportWidth = document.documentElement.clientWidth
    const marginBoundaryFactor = .06
    const sideMarginFactor = .04
    const rightInsetFactor = .00285

    const edgeLimits = {
        left: (viewportWidth * marginBoundaryFactor), 
        right: (viewportWidth * (1 - marginBoundaryFactor))
    }

    // Program geometry
    const program = {
        width, 
        height, 
        top: y, 
        left: x, 
        right: x + width
    }

    // Modal layout constants
    const verticalLiftFactor = .89
    const horizontalCenteringDivisor = 4.45
    const modalScaleFactor = 1.45

    // Vertical positioning
    const top = program.top - (program.height * verticalLiftFactor)

    // Horizontal positioning
    let left;
    const isNearLeftEdge = program.left <= edgeLimits.left
    const isNearRightEdge = program.right >= edgeLimits.right


    if (isNearLeftEdge) {
        left = program.left

    } else if (isNearRightEdge) {
        const modalWidthEstimate = program.width * modalScaleFactor
        const totalSideMargin = viewportWidth * sideMarginFactor
        const proposedOffsetPosition = (viewportWidth - (modalWidthEstimate + totalSideMargin))

        left = proposedOffsetPosition - (proposedOffsetPosition * rightInsetFactor)

    } else {
        left = program.left - (program.width / horizontalCenteringDivisor)

    }

    return { top, left }
}

export default computePreviewPosition