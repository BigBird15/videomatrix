import {useDispatch} from "react-redux";
import {addSource, removeSource} from "./Store/VisiblePlayerSlice";
import "./App/App.css";
import videojs from "video.js";
import {getSafeString} from "./helper";

const PlayersSelectMenu = props => {
    const {sources} = props;
    const dispatch = useDispatch();

    const handleChange = source => event => {
        if (event.target.checked) {
            dispatch(addSource(source));
        } else {
            // TODO errors `cannot read properties of null (reading "load")` happen sometimes
            const playerId = getSafeString(source);
            videojs(playerId).dispose();
            dispatch(removeSource(source));
        }
    };

    return (
        <form>
            <fieldset className={"players-menu"}>
                {sources.map((source, index) => (
                    <div key={getSafeString(source)}>
                        <input
                            type={"checkbox"}
                            id={source}
                            onChange={handleChange(source)}
                            className={"option"}
                        />
                        <label
                            htmlFor={source}
                            className={"option"}
                        >
                            {index}
                        </label>
                    </div>
                ))}
            </fieldset>
        </form>
    )
}

export default PlayersSelectMenu;