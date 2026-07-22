#!/bin/sh
# Generates a _th.jpg thumbnail (longest side 240px, aspect ratio preserved)
# from one or more _xl.jpg sources, saved next to each. macOS only (uses `sips`).
# Usage: sh scripts/create-th.sh <path>/<name>_xl.jpg [more _xl.jpg ...] [-q 69] [-f]
#   -q <0..100>  JPEG quality (default 69)
#   -f           overwrite existing thumbnails
# Non-_xl.jpg arguments (e.g. from a `dir/*` glob) are skipped. Generated files
# are handed to ImageOptim at the end.
set -eu

SIZE=240
QUALITY=69
FORCE=0
FILES=""

while [ $# -gt 0 ]; do
  case "$1" in
    -q) QUALITY="$2"; shift 2 ;;
    -f) FORCE=1; shift ;;
    -*) echo "Unknown option: $1" >&2; exit 1 ;;
    *) FILES="$FILES $1"; shift ;;
  esac
done

[ -n "$FILES" ] || { echo "Usage: sh scripts/create-th.sh <path>/<name>_xl.jpg [...] [-q 69] [-f]" >&2; exit 1; }

OUTS=""
for SRC in $FILES; do
  case "$SRC" in *_xl.jpg) ;; *) continue ;; esac
  [ -f "$SRC" ] || { echo "Not found: $SRC" >&2; continue; }

  OUT="${SRC%_xl.jpg}_th.jpg"
  if [ -f "$OUT" ] && [ "$FORCE" -eq 0 ]; then
    echo "Thumbnail already exists: $OUT (use -f to overwrite)" >&2
    continue
  fi

  sips -s format jpeg -s formatOptions "$QUALITY" -Z "$SIZE" "$SRC" --out "$OUT" >/dev/null
  echo "✓ $OUT (<=${SIZE}px, q${QUALITY})"
  OUTS="$OUTS $OUT"
done

# Hand the results to ImageOptim for lossless squeezing (optimizes in place,
# async; quit the app manually when it is done).
[ -n "$OUTS" ] && open -a ImageOptim $OUTS
