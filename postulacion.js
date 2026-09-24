(() => {
 const form=document.getElementById('employment-form');
 if(!form)return;
 const cv=document.getElementById('cv'),error=document.getElementById('cv-error');
 function validateCV(){
  let message='';const file=cv.files[0];
  if(file){if(!/\.(pdf|doc|docx)$/i.test(file.name))message='Adjuntá un currículum en formato PDF, DOC o DOCX.';
   else if(file.size===0)message='El archivo está vacío. Seleccioná tu currículum.';
   else if(file.size>5*1024*1024)message='El archivo supera los 5 MB. Seleccioná una versión más liviana.';}
  cv.setCustomValidity(message);error.textContent=message;cv.setAttribute('aria-invalid',String(Boolean(message)));return !message;
 }
 cv.addEventListener('change',validateCV);
 form.querySelectorAll('input:not([type=hidden]):not([type=file]):not([type=checkbox]),textarea').forEach(field=>{
  const check=()=>field.setCustomValidity(field.required&&!field.value.trim()?'Completá este campo.':'');field.addEventListener('input',check);field.addEventListener('blur',()=>{field.value=field.value.trim();check()});
 });
 form.addEventListener('submit',event=>{validateCV();if(!form.checkValidity()){event.preventDefault();form.reportValidity();}});
})();