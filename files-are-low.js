import _ from 'lodash';
import {
  mkdir, mkfile, isFile, getChildren, getName, getMeta, isDirectory,
} from '@hexlet/immutable-fs-trees';

const tree = mkdir('/', [
  mkdir('eTc', [
    mkdir('NgiNx'),
    mkdir('CONSUL', [
      mkfile('config.json'),
    ]),
  ]),
  mkfile('hOsts'),
]);

const changeOwner = (tree) => {
  const name = getName(tree);
  const newMeta = _.cloneDeep(getMeta(tree));

  if (isFile(tree)) {
    // Возвращаем обновлённый файл
    return mkfile(name.toLowerCase(), newMeta);
  }

  const children = getChildren(tree);

  // Ключевая строчка
  // Вызываем рекурсивное обновление каждого ребёнка
  const newChildren = children.map(changeOwner);
  return mkdir(name, newChildren, newMeta);

};

console.log(JSON.stringify(changeOwner(tree)))
