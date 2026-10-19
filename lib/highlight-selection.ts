import type { HighlightSegment } from "@/lib/highlights";

export function captureSelection(root: HTMLElement) {
  const selection = window.getSelection();

  if (
    !selection ||
    selection.isCollapsed ||
    !selection.rangeCount ||
    !selection.anchorNode ||
    !selection.focusNode ||
    !root.contains(selection.anchorNode) ||
    !root.contains(selection.focusNode)
  ) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const segments: HighlightSegment[] = [];

  for (const block of root.querySelectorAll<HTMLElement>("[data-block-id]")) {
    if (!range.intersectsNode(block)) continue;

    const blockRange = document.createRange();
    blockRange.selectNodeContents(block);

    const intersection = blockRange.cloneRange();

    if (range.compareBoundaryPoints(Range.START_TO_START, blockRange) > 0) {
      intersection.setStart(range.startContainer, range.startOffset);
    }

    if (range.compareBoundaryPoints(Range.END_TO_END, blockRange) < 0) {
      intersection.setEnd(range.endContainer, range.endOffset);
    }

    const text = intersection.toString();

    if (!text.trim()) continue;

    const prefix = blockRange.cloneRange();
    prefix.setEnd(intersection.startContainer, intersection.startOffset);

    const start = prefix.toString().length;

    segments.push({
      blockId: block.dataset.blockId!,
      start,
      end: start + text.length,
      text,
    });
  }

  if (!segments.length) return null;

  const rect = range.getBoundingClientRect();

  return {
    segments,
    quote: segments.map((segment) => segment.text).join("\n\n"),

    x: Math.max(
      85,
      Math.min(window.innerWidth - 85, rect.left + rect.width / 2),
    ),

    y: Math.max(82, Math.min(window.innerHeight - 60, rect.top - 48)),
  };
}
