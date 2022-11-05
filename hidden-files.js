import _ from 'lodash';
import {
  mkdir, mkfile, isFile, getChildren, getName,
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('.nginx.conf', { size: 800 }),
    ]),
    mkdir('.consul', [
      mkfile('.config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('.hosts', { size: 3500 }),
  mkfile('resolve', { size: 1000 }),
]);

const getNodesCount = (tree) => {
  const name = getName(tree);

  if (isFile(tree)) {
    return name.startsWith('.') ? 1 : 0;
  }

  const children = getChildren(tree);

  const descendantCounts = children.map(getNodesCount);
  return _.sum(descendantCounts);
};

getNodesCount(tree);