# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Product Hunt Today is a Twitter bot that automatically:
1. Fetches the top 5 trending products from Product Hunt daily
2. Generates a 35-second video showcasing these products using React and Remotion
3. Posts the video to Twitter (@ProductHunToday)
4. Runs automatically via GitHub Actions at 00:05 Pacific Time

## Essential Commands

### Development
```bash
yarn install              # Install dependencies
yarn start               # Preview video in browser (Remotion dev server)
yarn lint                # Run ESLint
yarn lint:fix            # Fix ESLint issues
yarn test                # Run linting + TypeScript type checking
```

### Building & Deployment
```bash
yarn fetch               # Fetch Product Hunt data → saves to data/today.json
yarn build               # Render video → outputs to out/video.mp4
yarn post-tweet          # Post video to Twitter
```

### Single Test/Component Development
```bash
# To work on specific video components:
yarn start               # Opens Remotion preview at localhost:3000
# Navigate to specific compositions in the preview UI
```

## Architecture Overview

### Core Technologies
- **Remotion** (v2.6.11): React-based video generation framework
- **React** (v17.0.2) with TypeScript
- **Tailwind CSS** (v2): Utility-first styling
- **zx**: Modern shell scripting for automation

### Key Directories
- `/src`: Video components and rendering logic
  - `ProductHuntToday.tsx`: Main video composition (35 seconds, 1080x1920)
  - `Video.tsx`: Root video configuration
  - `components/`: Reusable video elements (ProductCard, WrappedImage, etc.)
  - `hooks/`: Custom hooks (useProductHuntData)
  
- `/scripts`: Automation scripts
  - `fetchProductHunt.mjs`: GraphQL API integration
  - `postTweet.mjs`: Twitter API v2 integration

- `/data`: Fetched Product Hunt data storage

### Data Flow
1. **Fetch**: `fetchProductHunt.mjs` → GraphQL query → `data/today.json`
2. **Render**: Remotion reads JSON → React components → MP4 video
3. **Post**: `postTweet.mjs` → Twitter API with video upload

### API Configuration
Environment variables required in `.env`:
- `REACT_APP_PRODUCT_HUNT_API_KEY`: Product Hunt API access
- `TWITTER_CONSUMER_KEY`, `TWITTER_CONSUMER_SECRET`: Twitter app credentials
- `TWITTER_ACCESS_TOKEN_KEY`, `TWITTER_ACCESS_TOKEN_SECRET`: Twitter user auth

### Remotion Configuration
- Output: JPEG image format, MP4 video
- Dimensions: 1080x1920 (vertical video)
- Duration: 35 seconds (875 frames at 25 FPS)
- Webpack customized for Tailwind CSS support

### GitHub Actions Workflow
The `tweet-daily-video.yml` workflow:
1. Runs at 8:05 UTC (00:05 PST) daily
2. Installs ffmpeg for video processing
3. Executes: fetch → build → post-tweet
4. Archives generated video as artifact

### Important Notes
- The project uses Yarn (not npm) as the package manager
- Remotion v2.6.11 is an older version - be aware of API differences if consulting docs
- Video rendering timeout is set to 1000000ms due to complex animations
- The bot posts to @ProductHunToday Twitter account