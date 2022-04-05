
function footerPeriod(){
  const currentYear = new Date().getFullYear(); 
  const periodTags = document.querySelectorAll('.period');
  if(currentYear == '2021'){
    periodTags.forEach(tag => tag.innerHTML = '2021')
  } else {
    periodTags.forEach(tag => tag.innerHTML = `2021-${currentYear}`)
  }  
}
footerPeriod();
