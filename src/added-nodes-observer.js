const CHILD_LIST_MUTATION = 'childList';
const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

export function createAddedNodesMutationObserver(handleAddedNode) {
  return new MutationObserver(mutations => {
    // filter only subtree modification mutations
    mutations.filter(mutation => mutation.type === CHILD_LIST_MUTATION)
      .map(mutation => Array.from(mutation.addedNodes))
      // flatten
      .reduce((addedNodes, currentAddedNodes) => addedNodes.concat(currentAddedNodes), [])
      .forEach(handleAddedNode);
  });
}
