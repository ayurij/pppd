const defaultLanguage = 'en';

export async function loadPage(pageId) {
  if (!document.querySelector(`#${pageId}`)){
    console.log(`loading ${pageId}...`);
    const response = await fetch(`${pageId}.html`);
    if (response.ok) {
      const text = await response.text(); 
      document.querySelector('#pages').innerHTML += text;
    } else { console.log(`${pageId} can not be loaded`) }
  }
}  

export async function openPage(language = defaultLanguage, pageName = 'main', anchor = '') {
  //hide all
  const pageContentBlocks2 = document.querySelectorAll('.hidden'); 
  pageContentBlocks2.forEach(element => element.style.display = 'none'); //or element.classList.add('hidden'), element.classList.remove('hidden')
  //show menu & footer
  let menu = document.querySelector(`#menu-${language}`);
  if (!menu) menu = document.querySelector(`#menu-${defaultLanguage}`);
  menu.style.display = 'block';
  let footer = document.querySelector(`#footer-${language}`);
  if (!footer) footer = document.querySelector(`#footer-${defaultLanguage}`);
  footer.style.display = 'block';
  //show page
  const pageId = pageName+'-'+language;
  await loadPage(pageId); 
  let page = document.querySelector(`#${pageId}`);
  if (!page) page = document.querySelector(`#main-${defaultLanguage}`); 
  page.style.display = 'block';
  //change meta information
  const pageTitle = page.querySelector('.page-title').textContent;
  const pageDescription = page.querySelector('.page-description').textContent;
  const title = document.querySelector('head title');
  title.textContent = pageTitle; 
  const description = document.querySelector('head meta[name="description"]');
  description.setAttribute('content', pageDescription);
  const ogTitle = document.querySelector('head meta[property="og:title"]');
  ogTitle.setAttribute('content', pageTitle);
  const ogDescription = document.querySelector('head meta[property="og:description"]');
  ogDescription.setAttribute('content', pageDescription);
  //---locale meta information
  const ogLocale = document.querySelector('head meta[property="og:locale"]');
  const ogLocaleContent = language + '-' + language.toUpperCase();
  ogLocale.setAttribute('content', ogLocaleContent);
  //anchor
  if(anchor){
    window.scrollTo(0, 0); //reset to zero
    const distanceFromTop = document.querySelector(`#${anchor}-${language}`).getBoundingClientRect().top;
    console.log(`distanceFromTop ${distanceFromTop}`);
    window.scrollTo(0, distanceFromTop - 50);
  }
}
