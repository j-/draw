import { useCallback, useRef, useState } from 'react';
import { ContiguousLine } from './contiguous-line';
import { CompositeLine } from './composite-line';
import { generateCursorProperty } from './cursor';
import { useDrawLines } from './use-draw-lines';
import ContiguousLinePath from './ContiguousLinePath';
import CompositeLinePath from './CompositeLinePath';
import { LineStyles, isSameStyle, Drawing, StyledLine } from './drawing';
import ColorButton from './ColorButton';
import './App.css';

declare global {
  export interface PointerEvent {
    getCoalescedEvents?: () => PointerEvent[];
  }
}

const App: React.FC = () => {
  const containerRef = useRef<SVGSVGElement>(null);
  const [currentLines, setCurrentLines] = useState<Map<number, ContiguousLine>>(new Map());
  const [drawing, setDrawing] = useState<Drawing>([]);
  const [currentStyles, setStyles] = useState<LineStyles>({
    strokeColor: 'black',
    strokeWidth: 5,
  });

  /** Pop the last line off the stack. */
  const undo = useCallback(() => {
    setDrawing((drawing) => {
      if (drawing.length === 0) {
        // Drawing is already empty. No-op.
        return drawing;
      }
      const styledLines: StyledLine[] = drawing.slice(0, -1);
      const lastStyledLine: StyledLine = drawing[drawing.length - 1];
      if (lastStyledLine[1].length === 1) {
        // Last styled line only had one composite line.
        // Remove the whole styled line.
        return styledLines;
      } else {
        // Last styled line had multiple composite lines.
        // Remove the last composite line.
        const compositeLine: CompositeLine = lastStyledLine[1].slice(0, -1);
        const newStyledLine: StyledLine = [lastStyledLine[0], compositeLine];
        return [...styledLines, newStyledLine];
      }
    });
  }, []);

  /** Clear all lines. */
  const clear = useCallback(() => {
    setDrawing([]);
  }, []);

  /** Called when changing brush size. */
  const handleUpdateStrokeColor = useCallback<React.MouseEventHandler<HTMLButtonElement>>((e) => {
    const { value } = e.currentTarget;
    setStyles((currentStyles) => ({
      ...currentStyles,
      strokeColor: value,
    }));
  }, []);

  /** Called when changing brush size. */
  const handleUpdateStrokeWidth = useCallback<React.MouseEventHandler<HTMLButtonElement>>((e) => {
    const { value } = e.currentTarget;
    setStyles((currentStyles) => ({
      ...currentStyles,
      strokeWidth: Number(value),
    }));
  }, []);

  /** Called when pointer begins to capture movement. */
  const startLine = useCallback((id: number, line: ContiguousLine) => {
    setCurrentLines((currentLines) => {
      const newLines = new Map(currentLines);
      newLines.set(id, line);
      return newLines;
    });
  }, []);

  /** Called when the pointer moves during capture. */
  const updateLine = useCallback((id: number, line: ContiguousLine) => {
    setCurrentLines((currentLines) => {
      const newLines = new Map(currentLines);
      newLines.set(id, line);
      return newLines;
    });
  }, []);
  
  /** Called when the pointer no longer captures movement. */
  const endLine = useCallback((id: number, line: ContiguousLine) => {
    setCurrentLines((currentLines) => {
      const newLines = new Map(currentLines);
      newLines.delete(id);
      return newLines;
    });
    setDrawing((drawing) => {
      if (drawing.length < 1) {
        // Drawing does not already exist. Start it.
        const newCompositeLine: CompositeLine = [line];
        const newStyledLine: StyledLine = [currentStyles, newCompositeLine];
        const newDrawing: Drawing = [newStyledLine];
        return newDrawing;
      }
      const styledLines: StyledLine[] = drawing.slice(0, -1);
      const lastStyledLine: StyledLine = drawing[drawing.length - 1];
      const lastStyles: LineStyles = lastStyledLine[0];
      if (isSameStyle(currentStyles, lastStyles)) {
        // Drawing exists and line style has not changed. Add to it.
        const newCompositeLine: CompositeLine = [...lastStyledLine[1], line];
        const newStyledLine: StyledLine =  [lastStyles, newCompositeLine];
        const newDrawing: Drawing = [...styledLines, newStyledLine];
        return newDrawing;
      } else {
        // Drawing exists and line style is different. Add new line.
        const newCompositeLine: CompositeLine = [line];
        const newStyledLine: StyledLine = [currentStyles, newCompositeLine];
        const newDrawing: Drawing = [...styledLines, lastStyledLine, newStyledLine];
        return newDrawing;
      }
    });
  }, [currentStyles]);

  /** Called when the line is destroyed. */
  const cancelLine = useCallback((id) => {
    setCurrentLines((currentLines) => {
      const newLines = new Map(currentLines);
      newLines.delete(id);
      return newLines;
    });
  }, []);

  useDrawLines({
    ref: containerRef,
    startLine,
    updateLine,
    endLine,
    cancelLine,
    pollRectInterval: 1000,
  });

  const hues = 7;
  
  return (
    <div className="App">
      <button type="button" onClick={undo}>Undo</button>
      <button type="button" onClick={clear}>Clear</button>

      <button type="button" value="5" onClick={handleUpdateStrokeWidth}>Brush size: 5</button>
      <button type="button" value="10" onClick={handleUpdateStrokeWidth}>Brush size: 10</button>
      <button type="button" value="15" onClick={handleUpdateStrokeWidth}>Brush size: 15</button>
      <button type="button" value="20" onClick={handleUpdateStrokeWidth}>Brush size: 20</button>

      <br />

      <ColorButton value="white" onClick={handleUpdateStrokeColor} />
      {Array.from({ length: hues }).map((_, i) => (
        <ColorButton key={i} value={`hsl(${360 / hues * i}, 80%, 70%)`} onClick={handleUpdateStrokeColor} />
      ))}
      <br />
      <ColorButton value="black" onClick={handleUpdateStrokeColor} />
      {Array.from({ length: hues }).map((_, i) => (
        <ColorButton key={i} value={`hsl(${360 / hues * i}, 80%, 50%)`} onClick={handleUpdateStrokeColor} />
      ))}

      <h2>Composite line</h2>
      <svg
        ref={containerRef}
        className="App-canvas"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-250 -250 500 500"
        width={500}
        height={500}
        style={{
          cursor: generateCursorProperty(currentStyles.strokeWidth, currentStyles.strokeColor),
        }}
      >
        {drawing.map((styledLine, i) => (
          <CompositeLinePath key={i} line={styledLine[1]} stroke={styledLine[0].strokeColor} strokeWidth={styledLine[0].strokeWidth} />
        ))}
        {Array.from(currentLines.entries(), ([id, line]) => (
          <ContiguousLinePath key={id} line={line} stroke={currentStyles.strokeColor} strokeWidth={currentStyles.strokeWidth} />
        ))}
      </svg>
    </div>
  );
};

export default App;
