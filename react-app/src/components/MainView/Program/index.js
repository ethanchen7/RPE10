import { useSelector } from "react-redux";
import SideBar from "../SideBar";
import BlockCard from "./BlockCard";
import WeekContainer from "./BlockCreation/WeekContainer";
const Program = () => {
  const blockObjects = useSelector((state) => state.block);
  const allBlocks = Object.keys(blockObjects);
  return (
    <>
      <SideBar />
      <div className="page-container">
        <div className="page-container-header">Select a block to edit.</div>

        <div className="divider"></div>
        {/* <WeekContainer /> */}
        {allBlocks?.map((blockId, id) => (
          <BlockCard block={blockObjects[blockId]} number={id + 1} />
        ))}
      </div>
    </>
  );
};

export default Program;
