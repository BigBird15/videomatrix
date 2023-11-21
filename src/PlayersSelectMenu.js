import {useDispatch} from "react-redux";
import {addSource, removeSource} from "./Store/VisiblePlayerSlice";
import "./App/App.css";
import videojs from "video.js";
import {getSafeString} from "./helper";

const PlayersSelectMenu = props => {
    const {sources} = props;
    const dispatch = useDispatch();

    const handleChange = source => event => {
        const action = event.target.checked
            ? addSource(source)
            : removeSource(source);
        dispatch(action);
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