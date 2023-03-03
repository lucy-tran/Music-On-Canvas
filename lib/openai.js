/**
 * Generate the prompt that Dall-E will use to draw images
 *
 * @param {string[]} tags - An array of tags
 * @param {string} mode - A number from 1 to 4, which will decide how the prompt is generated:
 * 	1: use ** unfiltered **  tags
 * 	2. use full sentences based on ** unfiltered ** tags
 * 	3. use ** filtered ** tags
 * 	4. use full sentences based on ** filtered ** tags
 * @returns A string that is the prompt for Dall-E
 */
export async function generatePrompt(tags, mode) {
	const tagsStr = tags.join(", ");
	if (mode === 1) {
		return "Draw a digital art painting based on these keywords:" + tagsStr;
	}

	if (mode === 2) {
		return await generateFullSentences(tagsStr);
	}

	// Filter and get only tags that are related to emotion
	const filteredTags = await filterTags(tagsStr);
	console.log("Nouns and adjectives related to emotions: ", filteredTags);

	if (mode === 3) {
		return (
			"Draw a digital art painting based on these keywords: " + filteredTags
		);
	}

	if (mode === 4) {
		return await generateFullSentences(filteredTags);
	}
}

export async function generateImages(prompt) {
	const res = await fetch("http://localhost:3000/api/openai/generateImages", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ prompt }),
	});
	const jsonResponse = await res.json();

	return jsonResponse.result;
}

// ----------------------- HTTP HELPER FUNCTIONS -----------------------
async function generateFullSentences(tags) {
	const res = await fetch(
		"http://localhost:3000/api/openai/generateFullSentences",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ tags }),
		}
	);
	const jsonResponse = await res.json();
	return jsonResponse.result;
}

async function filterTags(tags) {
	const res = await fetch("http://localhost:3000/api/openai/filterTags", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ tags }),
	});
	const jsonResponse = await res.json();
	return jsonResponse.result;
}
