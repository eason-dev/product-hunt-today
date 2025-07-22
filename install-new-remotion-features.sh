#!/bin/bash

echo "Installing new Remotion v4 features..."

# Install Google Fonts support
pnpm add @remotion/google-fonts

# Install Motion Blur for smoother animations
pnpm add @remotion/motion-blur

# Install Noise for texture effects
pnpm add @remotion/noise

# Install Paths for animated SVG graphics
pnpm add @remotion/paths

echo "✅ New Remotion features installed!"
echo ""
echo "Next steps:"
echo "1. Import GoogleFonts component for typography"
echo "2. Replace ImagesCarousel with EnhancedImagesCarousel for motion blur"
echo "3. Check REMOTION_V4_IMPROVEMENTS.md for full implementation guide"