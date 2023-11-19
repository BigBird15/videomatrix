import {useDispatch} from "react-redux";
import {addSource, removeSource} from "./Store/VisiblePlayerSlice";

const PlayersSelectMenu = (props) => {
    const {sources} = props;

    const dispatch = useDispatch();

    const handleChange = source => event => {
        if (event.target.checked) {
            dispatch(addSource(source));
        } else {
            dispatch(removeSource(source))
        }
    };

    return (
        <form>
            <fieldset>
                {sources.map((source, index) => (
                    <span>
                        <input
                            type={"checkbox"}
                            id={source}
                            onChange={handleChange(source)}
                        />
                        <label htmlFor={source}>{index}</label>
                    </span>
                ))}
            </fieldset>
        </form>
    )
}

export default PlayersSelectMenu;