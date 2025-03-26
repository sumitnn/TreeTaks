const NodeOptions = ({ node, level = 0 }) => {
  return (
    <>
      <option key={node.id} value={node.id}>
        {"— ".repeat(level)} {node.name} 
      </option>
      {node.children &&
        node.children.map((child) => (
          <NodeOptions key={child.id} node={child} level={level + 1} />
        ))}
    </>
  );
};

export default NodeOptions;
