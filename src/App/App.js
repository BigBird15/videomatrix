import React, {useEffect} from "react";
import Player from "../Player";
import "./App.css";
import PlayersSelectMenu from "../PlayersSelectMenu";
import {useSelector} from "react-redux";
import {getSafeString, getGridItemWidth} from "../helper";

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
    const visiblePlayersCount = visiblePlayers.length;

    const playerWidthGetter = React.useRef(() => {});
    const playerWidth = React.useState(0);

    useEffect(() => {
        fetchSources().then(sources => setSources(sources));
        playerWidthGetter.current = getGridItemWidth();
    }, []);

    const handlePlayerReady = player => {
        playerRef.current = player;

        player.on("error", function () {
            this.addClass("vjs-custom-waiting");
            setTimeout(() => !this.isDisposed() && this.load(), 10_000);
        });

        player.on("playing", function () {
            this.removeClass("vjs-custom-waiting");
        });
    };

    playerWidth.current = playerWidthGetter.current(visiblePlayersCount);

    return (
        <div className={"container"}>
            <PlayersSelectMenu sources={sources}/>
            <div className={"players-grid"}>
                {visiblePlayers.map(source => (
                    <Player
                        source={source}
                        key={getSafeString(source)}
                        onReady={handlePlayerReady}
                        width={playerWidth.current}
                    />
                ))}
            </div>
        </div>
    );
}

export default App;
