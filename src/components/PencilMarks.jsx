const CornerPencilMark = ({ corner }) => (
  <span className="pencil-mark-item" data-is-pencil-mark-corner>
    {corner}
  </span>
);

const CenterSinglePencilMark = ({ value }) => (
  <span key={`center-${value}`} data-is-pencil-mark-center>
    {value}
  </span>
);

const CenterPencilMarks = ({ center }) => (
  <span className="pencil-mark-item">
    {center.map((value) => (
      <CenterSinglePencilMark key={`center-${value}`} value={value} />
    ))}
  </span>
);

export default function PencilMarks(props) {
  const {
    cell: {
      pencilMarks: {center, corners},
    },
    className = "",
    ...rest
  } = props;

  const cells = [];
  let nextCornerElementIndex = 0;

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const isCenter = i === 1 && j === 1;
      const corner = isCenter ? null : corners[nextCornerElementIndex++];
      const props = { center, corner };
      const Component = isCenter ? CenterPencilMarks : CornerPencilMark;
      cells.push(<Component key={`pencil-mark-${i}-${j}`} {...props} />);
    }
  }

  return (
    <div {...rest} className={`pencil-marked ${className}`} data-is-pencil-mark>
      {cells}
    </div>
  );
}
