
function getElementOffset(el) {
    const rect = el.getBoundingClientRect();
    return {top: rect.top, left: rect.left};
}

// https://stackoverflow.com/questions/42118296/dynamically-import-images-from-a-directory-using-webpack
function importAll(r, filterBy) {
    const images = {};
    r.keys().filter((item, index) => {
        return item.includes(filterBy)
    }).map((item, index) => {
        images[item.replace('./', '')] = r(item);
    });
    return images;
}

/*
 images[item.replace('./', '')] = {
            src: r(item),
            dir: images[item.match(/[^./][^/]*/

export {
    getElementOffset,
    importAll
}