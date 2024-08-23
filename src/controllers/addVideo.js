import { writeData, readData } from '../db/mongoConnection.js';

let videosData = [];

async function addVideo(req, res) {
    try {
        const { url } = req.body;
        if (!url) {
            return res.status(400).send({ code: 400, error: 'URL is required' });
        }

        let video = videosData.find(vid => vid.url === url);
        if (video) {
            return res.status(400).send({ 
                code: 400, 
                error: 'Video already exists' 
            });
        }

        await writeData('videos', {
            url: url,
            createdAt: new Date(),
        });

        await refreshData(); 

        return res.json({ code: 200, message: 'Video added successfully' });
    } catch (error) {
        res.status(500).json({ code: 500, message: 'Error adding video', error: error.message });
    }
}

async function refreshData() {
    try {
        videosData = await readData('videos');
        console.log('Data refreshed.');
    } catch (error) {
        console.error('Error occurred while refreshing data:', error);
    }
}

export { addVideo };