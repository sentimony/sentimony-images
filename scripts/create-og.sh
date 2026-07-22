#!/bin/sh
# Generates a 1200x630 _og.jpg (Open Graph) image from one or more _xl.jpg
# sources, saved next to each. Each source is scaled to cover 1200x630, then
# cropped to that box. Requires ImageMagick (`brew install imagemagick`).
# Usage: sh scripts/create-og.sh <path>/<name>_xl.jpg [more _xl.jpg ...] [-c|-t|-b [±N]] [-q 69] [-f]
#   -c  keep the center, crop the rest (default)
#   -t  keep the top
#   -b  keep the bottom
#   ±N  optional vertical offset in % after -c/-t/-b: -N moves the crop down,
#       +N moves it up (e.g. `-t -10` = start 10% below the top edge)
#   -q <0..100>  JPEG quality (default 69)
#   -f  overwrite existing images
# Non-_xl.jpg arguments (e.g. from a `dir/*` glob) are skipped. Generated files
# are handed to ImageOptim at the end.
set -eu

GRAVITY=Center
OFFSET=0
QUALITY=69
FORCE=0
FILES=""

while [ $# -gt 0 ]; do
  case "$1" in
    -c|-t|-b)
      case "$1" in -c) GRAVITY=Center ;; -t) GRAVITY=North ;; -b) GRAVITY=South ;; esac
      shift
      case "${1:-}" in
        [+-][0-9]*) OFFSET="$1"; shift ;;
      esac
      ;;
    -q) QUALITY="$2"; shift 2 ;;
    -f) FORCE=1; shift ;;
    -*) echo "Unknown option: $1" >&2; exit 1 ;;
    *) FILES="$FILES $1"; shift ;;
  esac
done

[ -n "$FILES" ] || { echo "Usage: sh scripts/create-og.sh <path>/<name>_xl.jpg [...] [-c|-t|-b [±N]] [-q 69] [-f]" >&2; exit 1; }

TMP="$(mktemp -t create-og).miff"
trap 'rm -f "$TMP"' EXIT

OUTS=""
for SRC in $FILES; do
  case "$SRC" in *_xl.jpg) ;; *) continue ;; esac
  [ -f "$SRC" ] || { echo "Not found: $SRC" >&2; continue; }

  OUT="${SRC%_xl.jpg}_og.jpg"
  if [ -f "$OUT" ] && [ "$FORCE" -eq 0 ]; then
    echo "Image already exists: $OUT (use -f to overwrite)" >&2
    continue
  fi

  # Resize to cover 1200x630 into a lossless temp, then crop from exact
  # dimensions so the offset can be clamped without producing a short image.
  magick "$SRC" -resize 1200x630^ "$TMP"
  read -r NW NH <<EOF
$(magick identify -format '%w %h' "$TMP")
EOF
  read -r X Y <<EOF
$(awk -v nw="$NW" -v nh="$NH" -v g="$GRAVITY" -v off="$OFFSET" 'BEGIN {
  tw = 1200; th = 630
  if (g == "North") by = 0
  else if (g == "South") by = nh - th
  else by = (nh - th) / 2
  y = by + (-off / 100 * nh)
  if (y < 0) y = 0; if (y > nh - th) y = nh - th
  x = (nw - tw) / 2
  if (x < 0) x = 0; if (x > nw - tw) x = nw - tw
  printf "%d %d", x + 0.5, y + 0.5
}')
EOF

  magick "$TMP" -crop "1200x630+${X}+${Y}" +repage -quality "$QUALITY" "$OUT"
  echo "✓ $OUT (1200x630, ${GRAVITY} ${OFFSET}%, q${QUALITY})"
  OUTS="$OUTS $OUT"
done

# Hand the results to ImageOptim for lossless squeezing (optimizes in place,
# async; quit the app manually when it is done).
[ -n "$OUTS" ] && open -a ImageOptim $OUTS
