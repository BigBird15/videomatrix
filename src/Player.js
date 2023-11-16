import React from "react";
import videojs from "video.js";
import "./App/App.css";

const BASIC_PLAYER_OPTIONS = {
    autoplay: false,
    controls: true,
    muted: true,
    aspectRatio: "1:1"
};

const getOptions = (src) => (
    {
        ...BASIC_PLAYER_OPTIONS,
        sources: [{
            src,
            type: 'application/x-mpegURL'
        }]
    }
);

export const Player = (props) => {
    const {source, onReady} = props;

    const videoRef = React.useRef(null);
    const playerRef = React.useRef(null);

    const options = getOptions(source);

    React.useEffect(() => {
        if (!playerRef.current) {
            const videoElement = document.createElement("video-js");
            videoRef.current.appendChild(videoElement);

            const player = playerRef.current = videojs(videoElement, options, () => {
                // videojs.log('player is ready');
                onReady && onReady(player);
            });

        } else {
            const player = playerRef.current;
            const {autoplay, sources} = options;

            player.autoplay(autoplay);
            player.src(sources);
        }
    }, [source, videoRef]);

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
        />
    );
}

export default Player;