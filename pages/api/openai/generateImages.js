import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
	const prompt = req.body.prompt;

	// "images" is in this format:
	// {
	//     "created": 1589478378,
	//     "data": [
	//       {
	//         "url": "https://..."https://via.placeholder.com/
	//       },
	//       {
	//         "url": "https://..."
	//       }
	//     ]
	//   }
	// const images = await openai.createImage({
	// 	prompt: prompt,
	// 	n: 4,
	// 	size: "512x512",
	// });

	// console.log("images.data.data: " + images.data.data);
	// res.status(200).json({ result: images.data.data });

	res.status(200).json({
		result: [
			{ url: "https://via.placeholder.com/512.png" },
			{ url: "https://via.placeholder.com/512.png" },
			{ url: "https://via.placeholder.com/512.png" },
			{ url: "https://via.placeholder.com/512.png" },
		],
	});
	return;
}
