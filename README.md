# Music On Canvas: From Song Tags to Art

This repo is an implementation of the second method from the Music On Canvas Honors project.

To launch a localhost website, navigate to the project directory and run

```
npm run dev
```

This will start both a local server and the frontend website. This website is built using Next.js, which enables frontend and backend code to stay in the same project and eases the deployment process.

Once the website is launched, enter a song title + " by " + the artist name(s) in the input box and press Enter (or click `Draw`). You'll be directed to a new page while the images are being generated. Possible unaddressed problems can happen, which leads to no outputs on the website, such as the prompt for Dall-E being too long (happens in mode 2 and 4).

As an experiment, there are currently 4 modes, which are 4 ways in which the prompt for Dall-E is constructed:

- Mode 1: "Draw a digital art painting based on these keywords: " + tags with "count" > 10.

- Mode 2: An full-sentenced image description generated based on tags with "count" > 10.

- Mode 3: "Draw a digital art painting based on these keywords: " + tags with "count" > 10 and are adjectives related to emotions, or nouns.

- Mode 4: An full-sentenced image description generated based on tags with "count" > 10 and are adjectives related to emotions, or nouns.

Mode can be changed in pages/results/[artist]/[track].js, line 75.
