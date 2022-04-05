import {openPage} from './main.js';

function emitAction(path){
  location.hash = path;
  console.log(`emitted action: ${path}`);
}

function getPath(){
  let path = [];
  const pathString = location.hash.split('#/')[1];
  if (pathString) path = pathString.split('/');
  console.log(`[path] lang: ${path[0]}; page: ${path[1]}; anchor: ${path[2]}`);
  return path;
}

/*
* enter point
*/
function checkLanguage(){
    if (location.hash === '') {
        const navigatorLanguage =  window.navigator.language.slice(0, 2);
        emitAction(`/${navigatorLanguage}`);
    } else router()
}
checkLanguage();

function router(){
  const path = getPath();
  openPage(...path);      
}
window.addEventListener("hashchange", router);

function changeLanguage(language){
  const path = getPath();
  path[0] = language;
  const pathString = path.join('/')
  emitAction(`/${pathString}`);
}
window.changeLanguage = changeLanguage;

