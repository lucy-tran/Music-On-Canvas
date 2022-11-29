/* eslint-disable import/no-anonymous-default-export */
import { Configuration, OpenAIApi } from "openai";

const openai_configuration = new Configuration({
	openAI_apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(openai_configuration);

// const openaiResponse = await openai.createImage({
// 	n: 4,
// 	prompt: generatePrompt(tagsStr),
// 	size: "1024x1024",
// });
// res
// 	.status(200)
// 	.json({ tags: tagsStr, imageUrl: openaiResponse["data"][0]["url"] });
