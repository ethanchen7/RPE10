import { useHistory } from "react-router-dom";
import "./BlockCard.css";

const BlockCard = ({ block, number }) => {
  const history = useHistory();

  const handleBlockClick = (blockId) => {
    history.push({
      pathname: `/program/block/${blockId}`,
      state: { blockNumber: number },
    });
  };
  return (
    <div className="block-card" onClick={() => handleBlockClick(block.id)}>
      <h1>{`Block ${number}`}</h1>
      {block.name ? <p>{block.name}</p> : ""}
    </div>
  );
};

export default BlockCard;
