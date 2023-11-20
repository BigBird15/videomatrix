import React from "react";
import videojs from "video.js";
import "./App/App.css";
import {getSafeString} from "./helper";

videojs.log.level("off");

const SOURCE_TYPE = "application/x-mpegURL";

const BASIC_PLAYER_OPTIONS = {
    autoplay: true,
    controls: true,
    muted: true,
    aspectRatio: "16:9",
    errorDisplay: false
};

const getOptions = src => (
    {
        ...BASIC_PLAYER_OPTIONS,
        sources: [{
            src,
            type: SOURCE_TYPE
        }],
        id: getSafeString(src)
    }
);

export const Player = props => {
    const {source, onReady, width} = props;

    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);

    const options = getOptions(source);

    React.useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");
            videoElement.style.width = width;
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                onReady && onReady(player);
            });
        }
    }, []);

    React.useEffect(() => {
        const player = playerRef.current;

        return () => {
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [playerRef]);

    return (
        <div
            data-vjs-player
            className={"player"}
            ref={videoRef}
            style={{width}}
        />
    );
}

export default Player;