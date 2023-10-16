import { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';

export default function Player({ option, getInstance, url, ...rest }) {
  const artRef = useRef();
  useEffect(() => {
    var art = new Artplayer({
      container: artRef.current,
      autoplay: true,
      preload: 'metadata',
      url: url,
      isLive: false,
      muted: false,
      pip: true,
      autoSize: true,
      autoMini: true,
      screenshot: true,
      setting: true,
      loop: true,
      flip: true,
      playbackRate: true,
      aspectRatio: true,
      fullscreenWeb: true,
      mutex: true,
      backdrop: true,
      playsInline: true,
      airplay: true,
      theme: '#23ade5',
      lang: navigator.language.toLowerCase(),
      whitelist: ['*'],
      customType: {
        m3u8: function(video, url) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(url);
            hls.attachMedia(video);
          } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
            video.src = url;
          } else {
            art.notice.show = 'Does not support playback of m3u8';
          }
        },
      },
    });
  }, [url]);
  return <div ref={artRef} {...rest}></div>;
}
