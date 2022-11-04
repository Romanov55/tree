import {
  mkdir, mkfile, isFile, getChildren, getName, getMeta,
} from '../tree/@hexlet-immutable-fs-trees.md'
const tree = mkdir('my documents', [
  mkfile('avatar.jpg', { size: 100 }),
  mkfile('passport.jpg', { size: 200 }),
  mkfile('family.jpg', { size: 150 }),
  mkfile('addresses', { size: 125 }),
  mkdir('presentations')
]);

export const compressImages = (node) => {
  const children = getChildren(node);
  const newChildren = children.map((child) => {
    const name = getName(child);
    if (!isFile(child) || !name.endsWith('.jpg')) {
      return child;
    }
    const meta = getMeta(child);
    const newMeta = _.cloneDeep(meta);
    newMeta.size /= 2
    return mkfile(name, newMeta)
  });
  const newMeta = _.cloneDeep(getMeta(node));
  return mkdir(getName(node), newChildren, newMeta)
}

console.log(compressImages(tree))
