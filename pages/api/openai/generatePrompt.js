import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
	const tags = req.body.tags;
	const promptPrefix = "Write an image description based on these keywords: ";
	const tagsStr = tags.join(", ");
	const completion = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: promptPrefix + tagsStr,
		temperature: 0.15,
		max_tokens: 100,
	});
	res.status(200).json({ result: completion.data.choices[0].text });
	return;
}
