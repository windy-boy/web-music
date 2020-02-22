import dataTools from "./dateTools";
import { getSongUrl } from "@/api/index";

let songUtils = {};

songUtils.getSongTime = id => {
  return new Promise(resolve => {
    getSongUrl({ id: id }).then(res => {
      if (res.data.code === 200) {
        const audio = new Audio(res.data.data[0].url);
        if (!res.data.data[0].url) {
          resolve("00:00");
          return;
        }
        audio.oncanplay = () => {
          resolve(dataTools.SecondToMS(audio.duration));
        };
      }
    });
  });
};

export default songUtils;
