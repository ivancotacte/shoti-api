import { readData } from '../db/mongoConnection.js';
import axios from 'axios';

let videosData = [];

refreshData();
setInterval(refreshData, 1000 * 60 * 1);

async function getVideo(req, res) {
    try {
        const randomIndex = Math.floor(Math.random() * videosData.length);
        const video = videosData[randomIndex];

        const response = await axios.get(`https://tikwm.com/api?url=${video.url}`, { url: video.url });
        const videoInfo = response.data;

        res.status(200).json({
            code: 200,
            message: 'Video fetched successfully',
            data: {
                region: videoInfo.data?.region,
                url: videoInfo.data?.play,
                thumbnail: videoInfo.data?.origin_cover,
                userInfo: {
                    userID: videoInfo.data?.author?.id,
                    username: videoInfo.data?.author?.unique_id,
                    nickname: videoInfo.data?.author?.nickname,
                },
                musicInfo: {
                    musicId: videoInfo.data?.music_info?.id,
                    musicTitle: videoInfo.data?.music_info?.title,
                    musicUrl: videoInfo.data?.music_info?.play,
                }
            }
        });
    } catch (error) {
        res.status(500).json({
            code: 500,
            message: 'Failed to fetch video',
            error: error.message,
        });
    }
}

async function refreshData() {
    try {
        videosData = await readData('videos');
    } catch (error) {
        console.error('Error occurred while refreshing data:', error);
    }
}

export { getVideo };