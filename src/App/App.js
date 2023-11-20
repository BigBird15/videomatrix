import React, {useEffect} from "react";
import Player from "../Player";
import "./App.css";
import PlayersSelectMenu from "../PlayersSelectMenu";
import {useSelector} from "react-redux";
import {getWidth} from "../helper";

const PATH_TO_RESOURCES = "http://localhost:3000/iptvlist.ru-movies.m3u";

const fetchSources = async () => {
    return fetch(PATH_TO_RESOURCES)
        .then(data => data.text())
        .then(text => text.split("\n"));
}

const App = () => {
    const playerRef = React.useRef(null);
    const [sources, setSources] = React.useState([]);
    const widthGetter = React.useRef();
    const width = React.useState(0);

    const visiblePlayers = useSelector(state => state.visiblePlayers) || [];

    useEffect(() => {
        fetchSources().then(sources => setSources(sources));
        widthGetter.current = getWidth();
    }, []);

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on("error", function () {
            this.addClass("vjs-custom-waiting");
            setTimeout(() => this.load(), 10_000);
        });

        player.on("playing", function () {
            this.removeClass("vjs-custom-waiting");
        });
    };

    width.current = widthGetter.current?.(visiblePlayers.length);

    return (
        <div className={"container"}>
            <PlayersSelectMenu sources={sources}/>
            <div className={"players-grid"}>
                {visiblePlayers.map(source => (
                    <Player
                        source={source}
                        key={source}
                        onReady={handlePlayerReady}
                        width={width.current}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
