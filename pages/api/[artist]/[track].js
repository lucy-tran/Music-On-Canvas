const lastfm_rootURL = "http://ws.audioscrobbler.com/2.0/";
const lastfm_apiKey = process.env.LASTFM_API_KEY;

export default async function getCorrectTrackInfo(req, res) {
	const { track, artist } = req.query;

	try {
		const api_url = `${lastfm_rootURL}?method=track.getInfo&artist=${artist}&track=${track}&format=json&api_key=${lastfm_apiKey}&autocorrect=1`;
		const trackInfo = await fetch(api_url, {
			method: "GET",
		});
		const jsonResponse = await trackInfo.json();

		if (jsonResponse.error) {
			res.status(404).json({
				error: "Track not found. Please try a different one.",
			});
			return;
		}

		const tagsExist = jsonResponse.track?.toptags?.tag?.length;
		if (!tagsExist) {
			res.status(502).json({
				error:
					"There is not enough information to draw this track. Please try a different one.",
			});
			return;
		}

		const correctTrack = jsonResponse.track?.name;
		const correctArtist = jsonResponse.track?.artist?.name;

		if (!correctTrack || !correctArtist) {
			res.status(502).json({
				error: "Track or artist is invalid. Please try a different track.",
			});
			return;
		}

		res.status(200).json({ correctArtist, correctTrack });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "There was a server error. Please try again later." });
	}
}
