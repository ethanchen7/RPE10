import "./index.css";
const VolumeTag = ({ volume }) => {
  return (
    <div className="tag volume">
      <p>{`Volume: ${volume}`}</p>
    </div>
  );
};

export default VolumeTag;
