import _ from 'lodash';
import {
  mkdir, mkfile, isFile, getChildren, getName, getMeta, isDirectory,
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [
  mkdir('etc', [
    mkdir('apache'),
    mkdir('nginx', [
      mkfile('nginx.conf', { size: 800 }),
    ]),
    mkdir('consul', [
      mkfile('config.json', { size: 1200 }),
      mkfile('data', { size: 8200 }),
      mkfile('raft', { size: 80 }),
    ]),
  ]),
  mkfile('resolve', { size: 1000 }),
  mkfile('hosts', { size: 3500 }),
]);

const getFilesCount = (node) => {
  const newMeta = getMeta(node)

  if (isFile(node)) {
    return newMeta.size;
  }

  const children = getChildren(node);
  const descendantCounts = children.map(getFilesCount);
  return _.sum(descendantCounts);
};

const du = (tree) => {
  const children = getChildren(tree);
  const result = children

  .map((child) => [getName(child), getFilesCount(child)]);

  result.sort(([, size1], [, size2]) => size2 - size1);
  return result
};

console.log(JSON.stringify(du(getChildren(tree)[0])));