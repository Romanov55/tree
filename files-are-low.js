import _ from 'lodash';
import {
  mkdir, mkfile, isFile, getChildren, getName, getMeta,
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

    return mkfile(name.toLowerCase(), newMeta);
  }

  const children = getChildren(tree);

  const newChildren = children.map(changeOwner);
  return mkdir(name, newChildren, newMeta);

};

changeOwner(tree)
