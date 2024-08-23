import { refreshData } from '../db/mongoConnection.js';

let videosData = [];

async function getVideo(req, res) {
    try {
        const randomIndex = Math.floor(Math.random() * videosData.length);
        const video = videosData[randomIndex];

        const videoInfo = await getVideoInfo(video.url);
        res.json({
            code: 200,
            message: 'Video fetched successfully',
            data: {
                region: videoInfo.data?.region,
                url: videoInfo.data?.play,
                thumbnail: videoInfo.data?.origin_cover,
                duration: videoInfo.data?.duration,
                userInfo: {
                    userID: videoInfo.data?.author?.id,
                    username: videoInfo.data?.author?.unique_id,
                    nickname: videoInfo.data?.author?.nickname,
                },
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

export { getVideo };