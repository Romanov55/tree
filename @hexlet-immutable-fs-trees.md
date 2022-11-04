mkdir
Make directory node

Parameters
name
children (optional, default [])
meta (optional, default {})
Examples
mkdir('etc');
// {
//   name: 'etc',
//   children: [],
//   meta: {},
//   type: 'directory',
// }
 
mkdir('etc', [mkfile('config'), mkfile('hosts')], { owner: 'user' });
// {
//   name: 'etc',
//   children: [
//     { name: 'config', meta: {}, type: 'file' },
//     { name: 'hosts', meta: {}, type: 'file' }
//   ],
//   meta: { owner: 'user' },
//   type: 'directory',
// }
mkfile
Make file node

Parameters
name
meta (optional, default {})
Examples
mkfile('config.json');
// {
//   name: 'config.json',
//   meta: {},
//   type: 'file',
// }
 
mkfile('config.json', { size: 1200 });
// {
//   name: 'config.json',
//   meta: { size: 1200 },
//   type: 'file',
// }
isFile
Check is node a file

Parameters
node
Examples
isFile(mkfile('config')); // true
isFile(mkdir('etc')); // false
getChildren
Return children

Parameters
directory
Examples
getChildren(mkdir('etc')); // []
getChildren(mkdir('etc', [mkfile('name')])); // [<file>]
getName
Return name

Parameters
node
Examples
getName(mkfile('etc')); // etc
getName(mkdir('/')); // /
getMeta
Return meta

Parameters
node
Examples
getMeta(mkfile('etc')); // {}
getMeta(mkfile('etc', { owner: 'root' })); // { owner: 'root' }
