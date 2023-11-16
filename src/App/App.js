import React, {useEffect} from "react";
import Player from "../Player";
import "./App.css";
import Loader from "../Loader";
import {OKKO_TV_URL, PLAYLIST_URL} from "../resoures";

const App = () => {
    const playerRef = React.useRef(null);
    const [sources, setSources] = React.useState(null);
    const [isLoading, setIsLoading] = React.useState(true);

    const handlePlayerReady = (player) => {
        playerRef.current = player;
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
        fetchSources().then(() => setIsLoading(false));
    }, []);

    return (
        <div>
            {isLoading
                ? <Loader/>
                : (
                    <div className={"wrapper"}>
                        {sources?.map(source => (
                            <Player
                                source={source}
                                key={source}
                                onReady={handlePlayerReady}
                            />
                        ))}
                    </div>
                )}
        </div>
    );
}

export default App;
