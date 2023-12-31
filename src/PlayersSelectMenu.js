import React from "react";
import {useDispatch} from "react-redux";
import {addSource, removeSource} from "./Store/VisiblePlayerSlice";
import "./App/App.css";

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
                    <div key={source}>
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

export default React.memo(PlayersSelectMenu);