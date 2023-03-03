import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
	const tags = req.body.tags;
	const promptPrefix =
		"Extract all nouns, and adjectives related to emotions, from these: ";
	const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: promptPrefix + tags,
		temperature: 0.1,
		max_tokens: 256,
	});
	const filteredTags = completion.data.choices[0].text
		.replace(/\n/g, " ")
		.split(/[:\s, ]/)
		.filter((tag) => tag !== "Nouns" && tag !== "Adjectives" && tag !== "");
	res.status(200).json({ result: filteredTags.join(", ") });
	return;
}
