import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
	const completion = await openai.createImage({
		n: 4,
		prompt: "a white siamese cat",
		size: "1024x1024",
	});
	res.status(200).json({ result: completion.data.data[0] });
}

function generatePrompt(animal) {
	const capitalizedAnimal =
		animal[0].toUpperCase() + animal.slice(1).toLowerCase();
	return `Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: ${capitalizedAnimal}
Names:`;
}
