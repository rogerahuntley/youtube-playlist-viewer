# azlef trip report landing page

I made this for my friend [azlef900](https://www.youtube.com/channel/UCkZjdCdkmeF2ebOGHQOF1gA).

You can check the live version of the site at [azlef900.neocities.org][https://azlef900.neocities.org/]

## Uses:

- svelte/kit
- sass
- typescript
- Youtube Data API
- Neocities API

## Using:

1. Clone the project. Run `npm i` in the main directory. (I use node 16 if that helps).
2. Rename `.env-example` to `.env` and add your Google API key.
3. Change the playlist ID if you want to generate a different playlist.
4. Change the background ID if you want to change the video in the background
5. Run command `npm run dev` and navigate to localhost:3000

## Deploying

1. Run `npm run build` and `npm run preview`. Check localhost:3000 to make sure it's working.
2. Add your neocities API key to the `.env`
3. Run `npm run deploy`