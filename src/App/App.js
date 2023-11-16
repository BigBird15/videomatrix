import React, {useEffect} from "react";
import Player from "../Player";
import "./App.css";
import {OKKO_TV_URL, PLAYLIST_URL} from "../resoures";

const App = () => {
    const playerRef = React.useRef(null);
    const [sources, setSources] = React.useState(null);

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

    let fetchSources = async () => {
        let sourcesData = await fetch(PLAYLIST_URL);
        let sourcesText = await sourcesData.text();

        setSources([
            OKKO_TV_URL,
            ...sourcesText.split("\n")
        ]);
    }

    useEffect(() => {
        fetchSources();
    }, []);

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
