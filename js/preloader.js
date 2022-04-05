import {loadPage} from './main.js';

const pages = [
  'about-ru', 
  'about-en', 
  'production-ru', 
  'production-en',
];
  
function preLoader(pages){
  pages.forEach(async pageId => await loadPage(pageId))
}
preLoader(pages);  
