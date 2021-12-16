import { buildContiguousLinePathDefinitionAbsolute, ContiguousLine } from "./contiguous-line"

type Props = {
  line: ContiguousLine;
  stroke: string;
  strokeWidth: number;
}

const ContiguousLinePath: React.FC<Props> = ({ line, stroke, strokeWidth }) => {
  return (
    <path
      d={buildContiguousLinePathDefinitionAbsolute(line)}
      stroke={stroke}
      fill="transparent"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  )
};

export default ContiguousLinePath;
