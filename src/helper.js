const ASPECT_RATIO = 16 / 9;
const GRID_GAP = 10;

const viewportHeight = window.innerHeight;

export const getWidth = function () {
    let itemWidth;

    return function (count) {
        const itemsPerRow = Math.floor(window.innerWidth / itemWidth) || 1;
        const rowsCount = Math.ceil(count / itemsPerRow);
        const itemHeight = itemWidth / ASPECT_RATIO;
        const heightTakenByItems = rowsCount * (itemHeight + GRID_GAP);
        const lackOfHeight = heightTakenByItems - viewportHeight;
        const resizingCoefficient = viewportHeight / (viewportHeight + lackOfHeight);

        const itemResizingRequired = heightTakenByItems > viewportHeight || Math.abs(lackOfHeight) > itemHeight + GRID_GAP;
        if (itemResizingRequired) {
            itemWidth = ASPECT_RATIO * (resizingCoefficient * heightTakenByItems / rowsCount) + GRID_GAP;
        }
        if (count === 0 || count === 1) itemWidth = window.innerWidth - 2 * GRID_GAP
        return itemWidth;
    }
}

export const getPlayerId = source => source.replace(/\W/gi, "");