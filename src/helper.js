const ASPECT_RATIO = 16 / 9;
const GRID_GAP = 10;

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

export const getGridItemWidth = () =>  {
    let itemWidth;

    return count => {
        const itemsPerRow = Math.floor(viewportWidth / itemWidth) || 1;
        const rowsCount = Math.ceil(count / itemsPerRow);

        const itemHeight = itemWidth / ASPECT_RATIO;
        const heightTakenByItems = rowsCount * (itemHeight + GRID_GAP);
        const lackOfHeight = heightTakenByItems - viewportHeight;

        const resizingCoefficient = viewportHeight / (viewportHeight + lackOfHeight);

        const itemResizingRequired =
            heightTakenByItems > viewportHeight || Math.abs(lackOfHeight) > itemHeight + GRID_GAP;

        if (itemResizingRequired) {
            itemWidth = ASPECT_RATIO * (resizingCoefficient * heightTakenByItems / rowsCount) + GRID_GAP;
        }
        if (count === 0 || count === 1) itemWidth = viewportWidth - 4 * GRID_GAP
        return itemWidth;
    }
}

export const getSafeString = str => str.replace(/\W/gi, "");