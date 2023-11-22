const ASPECT_RATIO = 16 / 9;
const GRID_GAP = 10;

const viewportHeight = window.innerHeight;
const viewportWidth = window.innerWidth;

export const getGridItemWidth = () => {
    let itemWidth;

    return count => {
        if (count === 1) {
            itemWidth = ASPECT_RATIO * viewportHeight
            return itemWidth;
        }

        const itemsPerRow = Math.floor(viewportWidth / itemWidth) || 1;
        const rowsCount = Math.ceil(count / itemsPerRow);

        const itemHeight = itemWidth / ASPECT_RATIO;
        const heightOccupiedByItems = rowsCount * (itemHeight + GRID_GAP);
        const heightDifference = heightOccupiedByItems - viewportHeight;

        const resizingCoefficient = viewportHeight / (viewportHeight + heightDifference);

        const shouldItemsGrow = heightOccupiedByItems > viewportHeight;
        const shouldItemsShrink = !shouldItemsGrow && Math.abs(heightDifference) > itemHeight + GRID_GAP;

        if (shouldItemsGrow || shouldItemsShrink) {
            itemWidth = ASPECT_RATIO * resizingCoefficient * heightOccupiedByItems / rowsCount + GRID_GAP;
        }
        return itemWidth;
    }
};