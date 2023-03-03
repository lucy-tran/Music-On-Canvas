const lastfm_apiKey = process.env.LASTFM_API_KEY;
const lastfm_rootURL = "http://ws.audioscrobbler.com/2.0/";

export async function getAllTracks() {
	// Returns an array that looks like this:
	// [
	//   {
	//     params: {
	//       artist: 'Taylor Swift'
	//       track: 'Bejeweled'
	//     }
	//   },
	//   {
	//     params: {
	//       artist: 'Sam Smith'
	//       track: 'I'm not the only one'
	//     }
	//   }
	// ]
	const chartTopTracks = await fetch(
		`${lastfm_rootURL}?method=chart.gettoptracks&api_key=${lastfm_apiKey}&format=json`
	);
	const jsonResponse = await chartTopTracks.json();
	const trackArray = jsonResponse.tracks.track;
	return trackArray.map((track) => {
		return {
			params: {
				artist: track.artist.name,
				track: track.name,
			},
		};
	});
}

export async function getPopularTrackTags(artist, track) {
	const countThreshold = 10;
	const topTags = await fetch(
		`${lastfm_rootURL}?method=track.gettoptags&artist=${artist}&track=${track}&api_key=${lastfm_apiKey}&format=json`
	);
	const jsonResponse = await topTags.json();
	const tagArray = await jsonResponse.toptags?.tag;
	console.log(tagArray);
	return tagArray
		.filter((tag) => tag.count >= countThreshold)
		.map((tag) => tag.name);
}

export async function getTrackContent(artist, track) {
	const info = await fetch(
		`${lastfm_rootURL}?method=track.getInfo&artist=${artist}&track=${track}&api_key=${lastfm_apiKey}&format=json`
	);
	const jsonResponse = await info.json();
	const content = jsonResponse.track?.wiki?.content;
	return content;
}
