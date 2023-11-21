const ASPECT_RATIO = 16 / 9;
const GRID_GAP = 10;

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

// TODO could use spare space more efficiently
// TODO get rid of scroll
export const getGridItemWidth = () => {
    let itemWidth;

    return count => {
        if (count === 1) {
            itemWidth = viewportWidth - 4 * GRID_GAP
            return itemWidth;
        }

        const itemsPerRow = Math.floor(viewportWidth / itemWidth) || 1;
        const rowsCount = Math.ceil(count / itemsPerRow);

        const itemHeight = itemWidth / ASPECT_RATIO;
        const heightOccupiedByItems = rowsCount * (itemHeight + GRID_GAP);
        const heightDifference = heightOccupiedByItems - viewportHeight;

        const resizingCoefficient = viewportHeight / (viewportHeight + heightDifference);

        const itemsNeedToGrow = heightOccupiedByItems > viewportHeight;
        const itemsNeedToShrink = !itemsNeedToGrow && Math.abs(heightDifference) > itemHeight + GRID_GAP;

        if (itemsNeedToGrow || itemsNeedToShrink) {
            itemWidth = ASPECT_RATIO * (resizingCoefficient * heightOccupiedByItems / rowsCount) + GRID_GAP;
        }
        return itemWidth;
    }
}

export const getSafeString = str => str.replace(/\W/gi, "");