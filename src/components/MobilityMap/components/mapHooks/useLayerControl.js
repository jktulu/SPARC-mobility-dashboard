import { useEffect, useMemo, useState } from "react";
import { layerConfig } from "../../../../config/map/mainLayerConfig";

const isLeaf = (node) => !node.children || node.children.length === 0;

const leafIdsOf = (node) =>
  isLeaf(node) ? [node.id] : node.children.flatMap(leafIdsOf);

const findInNode = (node, id) => {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findInNode(child, id);
      if (found) return found;
    }
  }
  return null;
};

const findLayerById = (id) => {
  for (const theme of layerConfig) {
    for (const root of theme.layers) {
      const found = findInNode(root, id);
      if (found) return found;
    }
  }
  return null;
};

export const useLayerControl = (onLayerToggle) => {
  const { initialCheckedState, initialDropdownState, initialOpenGroups } =
    useMemo(() => {
      const checked = {};
      const dropdowns = {};
      const open = {};

      const walk = (node) => {
        if (node.isGroup) open[node.id] = true; 
        if (isLeaf(node) && node.defaultChecked) checked[node.id] = true;
        if (node.children) node.children.forEach(walk);
      };

      layerConfig.forEach((theme) => {
        if (theme.controlType === "dropdown") dropdowns[theme.theme] = "none";
        theme.layers.forEach(walk);
      });

      return {
        initialCheckedState: checked,
        initialDropdownState: dropdowns,
        initialOpenGroups: open,
      };
    }, []);

  const [checkedState, setCheckedState] = useState(initialCheckedState);
  const [openGroups, setOpenGroups] = useState(initialOpenGroups);
  const [dropdownSelection, setDropdownSelection] =
    useState(initialDropdownState);

  useEffect(() => {
    Object.entries(initialCheckedState).forEach(([leafId, val]) => {
      const layer = findLayerById(leafId);
      if (layer) onLayerToggle(layer, !!val);
    });
  }, []);

  // Toggle a node (group, parent, or leaf) -> affects only leaves
  const toggleNode = (node, isChecked) => {
    const leaves = leafIdsOf(node);

    setCheckedState((prev) => {
      const updates = {};
      leaves.forEach((id) => (updates[id] = isChecked));
      return { ...prev, ...updates };
    });

    leaves.forEach((leafId) => {
      const layer = findLayerById(leafId);
      if (layer) onLayerToggle(layer, isChecked);
    });
  };

  const computeNodeState = (node) => {
    const leaves = leafIdsOf(node);
    const count = leaves.filter((id) => !!checkedState[id]).length;
    return {
      checked: count > 0 && count === leaves.length,
      indeterminate: count > 0 && count < leaves.length,
    };
  };

  const handleGroupToggle = (groupId) =>
    setOpenGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));

  // Dropdown: switch parent nodes (turn off previous, turn on new)
  const handleDropdownChange = (event, theme) => {
    const newParentId = event.target.value;
    const prevParentId = dropdownSelection[theme.theme];

    if (prevParentId && prevParentId !== "none") {
      const prevParent = theme.layers.find((l) => l.id === prevParentId);
      if (prevParent) toggleNode(prevParent, false);
    }

    setDropdownSelection((prev) => ({ ...prev, [theme.theme]: newParentId }));

    if (newParentId !== "none") {
      const nextParent = theme.layers.find((l) => l.id === newParentId);
      if (nextParent) toggleNode(nextParent, true);
    }
  };

  return {
    checkedState,
    openGroups,
    dropdownSelection,
    toggleNode,
    computeNodeState,
    handleGroupToggle,
    handleDropdownChange,
  };
};
