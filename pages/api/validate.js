const lastfm_apiKey = process.env.LASTFM_API_KEY;
const lastfm_rootURL = "http://ws.audioscrobbler.com/2.0/";

export default async function validate(req, res) {
	const { track, artist } = req.body;
	try {
		const api_url = `${lastfm_rootURL}?method=track.getInfo&artist=${artist}&track=${track}&format=json&api_key=${lastfm_apiKey}`;
		const trackTopTags = await fetch(api_url, {
			method: "GET",
		});
		const jsonResponse = await trackTopTags.json();
		if (jsonResponse.error) {
			res.status(404).json({
				error:
					"The track does not exist in our database. Please try a different one.",
			});
		}
		const mbid = jsonResponse.track.mbid;
		res.status(200).json({ mbid });
	} catch (error) {
		console.log(error);
		res
			.status(500)
			.json({ error: "There was a server error. Please try again later." });
	}
}

function generatePrompt(tagsStr) {
	return `Generate an image based on these keywords: ${tagsStr}`;
}
