# Product Hunt Today

<img alt="Product Hunt Today Twitter account" src="https://user-images.githubusercontent.com/8737381/159538213-f5763a39-e12e-4613-af9d-674ab0ce83f0.png">

A Twitter bot [@ProductHunToday](https://twitter.com/ProductHunToday) that tweets trending [Product Hunt](https://www.producthunt.com/) products every day, in short video!

## Tech stack

- [Remotion v4](https://www.remotion.dev/): Generate short video in React!
- [React v19](https://react.dev/): Latest React with improved performance
- [TypeScript v5](https://www.typescriptlang.org/): Type-safe development
- [Tailwind CSS v4](https://tailwindcss.com/): Modern utility-first CSS framework
- [Product Hunt API 2.0 (GraphQL)](https://api.producthunt.com/v2/docs): Fetch trending products
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api): Tweet post thread with video
- [GitHub Actions](https://github.com/features/actions): Run scheduled job everyday (fetch data from Product Hunt -> generate video -> post Twitter)
- [google/zx v8](https://github.com/google/zx): Write modern shell script in JavaScript
- [pnpm v10](https://pnpm.io/): Fast, disk space efficient package manager
- Node.js: v22 LTS

## Sample tweet

https://twitter.com/ProductHunToday/status/1506186218714849287

<img alt="Twitter post from Product Hunt Today" src="https://user-images.githubusercontent.com/8737381/159538226-27f92c63-b072-4dde-a1f9-865d7df3b8e8.png">

## Get started

### Install dependencies

First, ensure you have Node.js v22 LTS installed (or use `nvm` with the `.nvmrc` file):

```console
nvm use  # If using nvm
pnpm install
```

### Setup environment variables

Create `.env` file, with your [Product Hunt](https://api.producthunt.com/v2/docs) & [Twitter](https://developer.twitter.com/en/docs/twitter-api) API key

```env
REACT_APP_PRODUCT_HUNT_API_KEY="<your-key>"
TWITTER_CONSUMER_KEY="<your-key>"
TWITTER_CONSUMER_SECRET="<your-key>"
TWITTER_ACCESS_TOKEN_KEY="<your-key>"
TWITTER_ACCESS_TOKEN_SECRET="<your-key>"
```

### Fetch products

This will call Product Hunt API, and store result in `<ProjectRoot>/data/today.json`

```console
pnpm fetch
```

### Start preview

This will open browser to preview video

```console
pnpm start
```

### Render video

This will store generated video in `<ProjectRoot>/out/video.mp4`

```console
pnpm build
```

### Post to Twitter

```console
pnpm post-tweet
```

### Run tests

```console
pnpm test  # Run linting and type checking
pnpm lint  # Run ESLint only
pnpm lint:fix  # Fix ESLint issues
```

## Contribute

PRs are welcome!

Feel free to DM me on Twitter [@EasonChang_me](https://twitter.com/EasonChang_me) if any suggestions

## Support

Support me in creating more awesome projects!

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/easonchang)
