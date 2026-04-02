#!/bin/bash
# Generate iOS App Store icons from public/icon-512.png
# Requires ImageMagick (brew install imagemagick)

set -e

SOURCE="public/icon-512.png"
OUTPUT_DIR="ios/App/App/Assets.xcassets/AppIcon.appiconset"

if [ ! -f "$SOURCE" ]; then
  echo "Error: $SOURCE not found"
  exit 1
fi

if [ ! -d "$OUTPUT_DIR" ]; then
  echo "Error: $OUTPUT_DIR not found. Run 'npx cap add ios' first."
  exit 1
fi

SIZES="20 29 40 58 60 76 80 87 120 152 167 180 1024"

for size in $SIZES; do
  echo "Generating ${size}x${size}..."
  convert "$SOURCE" -resize "${size}x${size}" "$OUTPUT_DIR/icon-${size}.png"
done

echo "Done! Icons generated in $OUTPUT_DIR"
