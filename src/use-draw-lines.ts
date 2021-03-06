import { RefObject, useEffect } from 'react';
import { ContiguousLine } from './contiguous-line';
import { Point } from './point';

export type UseDrawLinesOptions = {
  ref: RefObject<Element & Pick<SVGSVGElement, 'getBoundingClientRect' | 'addEventListener' | 'removeEventListener' | 'viewBox'>>,
  startLine: (id: number, line: ContiguousLine) => void;
  updateLine: (id: number, line: ContiguousLine) => void;
  endLine: (id: number, line: ContiguousLine) => void;
  cancelLine: (id: number) => void;
};

export type UseDrawLines = {
  (options: UseDrawLinesOptions): void;
};

export const useDrawLines: UseDrawLines = ({
  ref,
  startLine,
  updateLine,
  endLine,
  cancelLine,
}) => {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let report: string[] = [];

    let clientRect = container.getBoundingClientRect();
    const viewBoxRect = container.viewBox.baseVal;

    const getPoint = (e: PointerEvent | Touch): Point => [
      Math.round(
        (e.clientX - clientRect.left + viewBoxRect.x + window.scrollX) *
        viewBoxRect.width / clientRect.width
      ),
      Math.round(
        (e.clientY - clientRect.top + viewBoxRect.y + window.scrollY) *
        viewBoxRect.height / clientRect.height
      ),
    ];

    const currentLines = new Map<number, ContiguousLine>();

    const doStartLine = (id: number, line: ContiguousLine) => {
      startLine(id, line);
      currentLines.set(id, line);
    };

    const doUpdateLine = (id: number, line: ContiguousLine) => {
      updateLine(id, line);
    };

    const doCancelLine = (id: number) => {
      cancelLine(id);
      currentLines.delete(id);
    };

    const doEndLine = (id: number, line: ContiguousLine) => {
      if (line.length === 0) {
        // Line ended with no points. Cancel it.
        return doCancelLine(id);
      }
      if (line.length === 1) {
        // Line ended with a single point. Duplicate it to make a line.
        line.push(line[0]);
      }
      endLine(id, line);
      currentLines.delete(id);
    };

    const handlePointerMove = (e: PointerEvent) => {
      // Touch events handled by touch handlers. Exit.
      if (e.pointerType === 'touch') return;
      const currentLine = currentLines.get(-1);
      // Line was not initialized. Exit.
      if (!currentLine) return;
      if ((e.buttons & 1) !== 1) {
        // Mouse moved without the button being down. Cancel line.
        doEndLine(-1, currentLine);
        return;
      }
      e.preventDefault();
      const points: ContiguousLine = typeof e.getCoalescedEvents === 'function' ?
        e.getCoalescedEvents().map(getPoint) :
        [getPoint(e)];
      currentLine.push(...points);
      report.push(`${e.type} ${points}`);
      doUpdateLine(-1, currentLine);
    };

    const handlePointerUp = (e: PointerEvent) => {
      // Touch events handled by touch handlers. Exit.
      if (e.pointerType === 'touch') return;
      window.removeEventListener('pointermove', handlePointerMove);
      const currentLine = currentLines.get(-1);
      // Line was not initialized. Exit.
      if (!currentLine) return;
      report.push(e.type);
      console.log(report);
      report = [];
      doEndLine(-1, currentLine);
    };

    const handlePointerDown = (e: PointerEvent) => {
      // Touch events handled by touch handlers. Exit.
      if (e.pointerType === 'touch') return;
      // Was a mouse button press but not M1. Exit.
      if (e.pointerType === 'mouse' && (e.buttons & 1) !== 1) return;
      e.preventDefault();
      const currentLine = [getPoint(e)];
      report.push(`${e.type} ${currentLine}`);
      doStartLine(-1, currentLine);
      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
    };

    const handleTouchMove = (e: TouchEvent) => {
      for (const touch of Array.from(e.changedTouches)) {
        const currentLine = currentLines.get(touch.identifier);
        if (!currentLine) continue;
        const point = getPoint(touch);
        currentLine.push(point);
        doUpdateLine(touch.identifier, currentLine);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      for (const touch of Array.from(e.changedTouches)) {
        const currentLine = currentLines.get(touch.identifier);
        if (!currentLine) continue;
        doEndLine(touch.identifier, currentLine);
      }
    };

    const handleTouchCancel = (e: TouchEvent) => {
      for (const touch of Array.from(e.changedTouches)) {
        const currentLine = currentLines.get(touch.identifier);
        if (!currentLine) continue;
        doCancelLine(touch.identifier);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      for (const touch of Array.from(e.changedTouches)) {
        const line = [getPoint(touch)];
        doStartLine(touch.identifier, line);
      }
    };

    const observer = new ResizeObserver(() => {
      clientRect = container.getBoundingClientRect();
    });
    observer.observe(container);

    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchcancel', handleTouchCancel);

    return () => {
      container.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchcancel', handleTouchCancel);
      observer.unobserve(container);
    };
  }, [ref, startLine, updateLine, endLine, cancelLine]);
};
