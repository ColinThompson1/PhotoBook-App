
function getElementOffset(el) {
    const rect = el.getBoundingClientRect();
    return {top: rect.top, left: rect.left};
}

export {
    getElementOffset
}