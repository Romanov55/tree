import _ from 'lodash';
import {
  mkdir, mkfile, isFile, getChildren, getName, getMeta, isDirectory,
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [
  mkdir('etc', [
    mkfile('bashrc'),
    mkfile('consul.cfg'),
  ]),
  mkfile('hexletrc'),
  mkdir('bin', [
    mkfile('ls'),
    mkfile('cat'),
  ]),
]);

// В реализации используем рекурсивный процесс,
// чтобы добраться до самого дна дерева.
const getNodesCount = (tree) => {
  if (isFile(tree)) {
    // Возвращаем 1 для учёта текущего файла
    return 1;
  }

  // Если узел — директория, получаем его детей
  const children = getChildren(tree);
  // Самая сложная часть
  // Считаем количество потомков для каждого из детей,
  // вызывая рекурсивно нашу функцию getNodesCount
  const descendantCounts = children.map(getNodesCount);
  // Возвращаем 1 (текущая директория) + общее количество потомков
  return 1 + _.sum(descendantCounts);
};

console.log(getNodesCount(tree));