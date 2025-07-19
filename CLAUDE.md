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
pnpm install              # Install dependencies
pnpm start               # Preview video in browser (Remotion dev server)
pnpm lint                # Run ESLint
pnpm lint:fix            # Fix ESLint issues
pnpm test                # Run linting + TypeScript type checking
```

### Building & Deployment
```bash
pnpm fetch               # Fetch Product Hunt data → saves to data/today.json
pnpm build               # Render video → outputs to out/video.mp4
pnpm post-tweet          # Post video to Twitter
```

### Single Test/Component Development
```bash
# To work on specific video components:
pnpm start               # Opens Remotion preview at localhost:3001
# Navigate to specific compositions in the preview UI
```

## Architecture Overview

### Core Technologies
- **Remotion** (v4.0.324): React-based video generation framework
- **React** (v19.1.0) with TypeScript (v5.8.3)
- **Tailwind CSS** (v4.1.11): Modern utility-first CSS framework
- **zx** (v8.7.1): Modern shell scripting for automation
- **pnpm** (v10.13.1): Fast, disk space efficient package manager
- **Node.js** (v22 LTS): JavaScript runtime

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
- The project uses pnpm as the package manager
- Uses ESM modules throughout (`"type": "module"` in package.json)
- ESLint uses flat config format (eslint.config.js)
- Tailwind CSS v4 uses @import syntax and CSS-based configuration
- Video rendering timeout is set to 1000000ms due to complex animations
- The bot posts to @ProductHunToday Twitter account
- GitHub Actions workflow uses Node.js version from .nvmrc file