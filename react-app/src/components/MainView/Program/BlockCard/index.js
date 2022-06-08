import { useHistory } from "react-router-dom";
import "./BlockCard.css";

const BlockCard = ({ block, number }) => {
  const history = useHistory();

  const handleBlockClick = (blockId) => {
    history.push(`/program/block/${blockId}`);
  };
  return (
    <div className="block-card">
      <h1 onClick={() => handleBlockClick(block.id)}>{`Block ${number}`}</h1>
    </div>
  );
};

export default BlockCard;
