import "./styles.css";

type Props = {
  onClick: VoidFunction;
  img: string;
};

const Image: React.FC<Props> = ({ onClick, img }) => {
  return (
    <div onClick={onClick} className="card">
      <img src={img} alt="" />
    </div>
  );
};

export default Image;
