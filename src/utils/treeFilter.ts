export function filter<T = any>(tree: T[], func: (n: T) => boolean): T[] {
  const children = 'children';
  function listFilter(list: T[]) {
    return list.filter((node) => {
      if (node[children]) {
        node[children] = listFilter(node[children]);
      }
      return func(node);
    });
  }
  return listFilter(tree);
}
