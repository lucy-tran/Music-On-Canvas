export async function generatePrompt(tags) {
	const res = await fetch("http://localhost:3000/api/openai/generatePrompt", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ tags }),
	});
	const jsonResponse = await res.json();
	return jsonResponse.result;
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

// const openaiResponse = await openai.createImage({
// 	n: 4,
// 	prompt: generatePrompt(tagsStr),
// 	size: "1024x1024",
// });
// res
// 	.status(200)
// 	.json({ tags: tagsStr, imageUrl: openaiResponse["data"][0]["url"] });
