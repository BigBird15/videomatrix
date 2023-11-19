import React, {useEffect} from "react";
import Player from "../Player";
import "./App.css";
import PlayersSelectMenu from "../PlayersSelectMenu";
import {useSelector} from "react-redux";

const PATH_TO_RESOURCES = "http://localhost:3000/iptvlist.ru-movies.m3u";

const fetchSources = async () => {
    return fetch(PATH_TO_RESOURCES)
        .then(data => data.text())
        .then(text => text.split("\n"));
}

const App = () => {
    const playerRef = React.useRef(null);
    const [sources, setSources] = React.useState([]);

    const visiblePlayers = useSelector(state => state.visiblePlayers) || [];

    useEffect(() => {
        fetchSources().then(sources => setSources(sources))
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

    return (
        <div>
            <PlayersSelectMenu sources={sources}/>
            <div className={"players-wrapper"}>
                {visiblePlayers.map(source => (
                    <Player
                        source={source}
                        key={source}
                        onReady={handlePlayerReady}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
