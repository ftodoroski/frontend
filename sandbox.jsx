const layoutAnchors = {
    card: null, 
    preview: null, 
    details: null,
}

layoutAnchors.card.width
layoutAnchors.preview.x
layoutAnchors.preview.left
layoutAnchors.details.y



layoutAnchor.card = {
    pageX: targetElementRect.left + window.scrollX,
    pageY: anchorY + window.scrollY + Y_OFFSET,

    clientLeft: targetElementRect.left,
    clientTop: targetElementRect.top,

    width: targetElementRect.width,
    height: anchorHeight,
}