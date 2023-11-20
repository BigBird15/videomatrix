const ASPECT_RATIO = 16 / 9;
const GRID_GAP = 10;

const viewportHeight = window.innerHeight;

export const getWidth = function () {
    let itemWidth = window.innerWidth;

    return function (count) {
        // const itemSquare = width ** 2 / ASPECT_RATIO;
        const itemsPerRow = Math.floor(window.innerWidth / itemWidth) || 1;
        const rowsCount = Math.ceil(count / itemsPerRow);
        const itemHeight = itemWidth / ASPECT_RATIO;
        const heightTakenByItems = rowsCount * (itemHeight + GRID_GAP);
        const lackOfHeight = heightTakenByItems - viewportHeight;
        const heightProportion = viewportHeight / (viewportHeight + lackOfHeight);

        if (heightTakenByItems > window.innerHeight) {
            itemWidth = ASPECT_RATIO * (heightProportion * heightTakenByItems / rowsCount);
        }
        return itemWidth;
    }
}