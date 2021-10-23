type Props = Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'value'> & {
  value: string;
};

const ColorButton: React.FC<Props> = ({ value, ...props }) => (
  <button type="button" value={value} {...props}>
    <span
      style={{
        display: 'inline-block',
        width: '2em',
        height: '2em',
        backgroundColor: value,
      }}
    />
  </button>
);

export default ColorButton;
