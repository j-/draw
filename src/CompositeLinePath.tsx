import { buildCompositeLinePathDefinitionAbsolute, CompositeLine } from "./composite-line"

type Props = {
  line: CompositeLine;
  stroke: string;
  strokeWidth: number;
}

const CompositeLinePath: React.FC<Props> = ({ line, stroke, strokeWidth }) => {
  return (
    <path
      d={buildCompositeLinePathDefinitionAbsolute(line)}
      stroke={stroke}
      fill="transparent"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
};

export default CompositeLinePath;
