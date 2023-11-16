import React, {useEffect} from "react";
import Player from "../Player";
import "./App.css";

const PLAYLIST_URL = "http://localhost:3000/iptvlist.ru-movies.m3u";

const fetchSources = async () => {
    const sourcesData = await fetch(PLAYLIST_URL);
    return await sourcesData.text();
}

const App = () => {
    const playerRef = React.useRef(null);
    const [sources, setSources] = React.useState(null);

    useEffect(() => {
        fetchSources().then(sourcesText => (
            setSources(sourcesText.split("\n"))
        ))
    }, []);

    const handlePlayerReady = (player) => {
        playerRef.current = player;

        player.on("error", function () {
            this.addClass("vjs-custom-waiting");
            setTimeout(() => player.initChildren(), 10000);
        });

        player.on("playing", function () {
            this.removeClass("vjs-custom-waiting");
        });
    };

    return (
        <div className={"wrapper"}>
            {sources?.map(source => (
                <Player
                    source={source}
                    key={source}
                    onReady={handlePlayerReady}
                />
            ))}
        </div>
    );
}

export default App;
