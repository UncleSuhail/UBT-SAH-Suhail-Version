/* SAH V9 — Manual data management layer for the interactive prototype.
   Production note: replace Local Storage persistence with authenticated API/database writes. */
(function(){
  const STORAGE_KEY='sah-manual-data-v1';
  const ROLE_KEY='sah-active-role-v1';
  const DATASETS={
    students:'الطلاب والطالبات والمنح',
    profiles:'ملفات الرياضيين',
    championships:'البطولات الرياضية',
    events:'التقويم والأحداث',
    opportunities:'الفرص والشواغر',
    applications:'طلبات التسجيل',
    clubs:'الأندية الطلابية',
    evidenceRecords:'الشواهد وتوثيق الأنشطة',
    indicatorFields:'مجالات مؤشر الأداء الرياضي',
    audit:'سجل العمليات'
  };
  const ROLE_INFO={
    system:{name:'حسام الحسين',role:'مسؤول النظام — صلاحية كاملة',avatar:'ح'},
    indicator:{name:'مسؤول مؤشر الأداء الرياضي',role:'صلاحية كاملة على المنصة والمؤشر',avatar:'م'},
    dean:{name:'د. محمد المقدم',role:'العميد — صلاحية كاملة واعتماد',avatar:'د'}
  };
  let currentDataset='students', editIndex=null;

  function clone(v){return JSON.parse(JSON.stringify(v));}
  function restoreSaved(){
    try{const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null'); if(saved&&typeof saved==='object') Object.entries(saved).forEach(([k,v])=>{if(Array.isArray(v)) SAH_DATA[k]=v;});}catch(e){console.warn('SAH saved data could not be restored',e);}
  }
  function persist(){
    const out={}; Object.keys(DATASETS).forEach(k=>{if(Array.isArray(SAH_DATA[k])) out[k]=SAH_DATA[k];});
    localStorage.setItem(STORAGE_KEY,JSON.stringify(out));
  }
  function activeRole(){return localStorage.getItem(ROLE_KEY)||'system';}
  function setRole(role){
    localStorage.setItem(ROLE_KEY,role); const i=ROLE_INFO[role]||ROLE_INFO.system;
    const n=document.getElementById('activeUserName'),r=document.getElementById('activeUserRole'),a=document.getElementById('activeUserAvatar');
    if(n)n.textContent=i.name;if(r)r.textContent=i.role;if(a)a.textContent=i.avatar;
    logAction('إدارة المستخدمين',`تم تبديل المستخدم النشط إلى ${i.name}`);
  }
  function logAction(unit,action){
    SAH_DATA.audit=SAH_DATA.audit||[];
    const i=ROLE_INFO[activeRole()]||ROLE_INFO.system;
    SAH_DATA.audit.unshift({time:new Date().toLocaleString('ar-SA'),user:i.name,unit,action});
    persist();
    if(typeof renderAudit==='function') try{renderAudit();}catch(_e){}
  }
  function fieldsFor(rows){
    const s=new Set(); rows.slice(0,50).forEach(r=>Object.keys(r||{}).forEach(k=>s.add(k)));
    return [...s];
  }
  function safe(v){return String(v??'—').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
  function normalized(v){return String(v??'').toLowerCase().replace(/[أإآا]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[^\p{L}\p{N}]+/gu,' ').trim();}
  function filteredRows(){
    const q=normalized(document.getElementById('adminSearch')?.value||''); const rows=SAH_DATA[currentDataset]||[];
    return rows.map((r,i)=>({r,i})).filter(x=>!q||normalized(JSON.stringify(x.r)).includes(q));
  }
  function refresh(){
    const rows=filteredRows(), all=SAH_DATA[currentDataset]||[], fields=fieldsFor(all); const shown=fields.slice(0,6);
    const h=document.getElementById('adminHead'),b=document.getElementById('adminRows'); if(!h||!b)return;
    h.innerHTML='<tr>'+shown.map(f=>`<th>${safe(f)}</th>`).join('')+'<th>العمليات</th></tr>';
    b.innerHTML=rows.map(({r,i})=>'<tr>'+shown.map(f=>`<td>${safe(typeof r[f]==='object'?JSON.stringify(r[f]):r[f])}</td>`).join('')+`<td class="row-actions"><button class="btn outline admin-edit" data-index="${i}">تعديل</button><button class="btn danger admin-delete" data-index="${i}">حذف</button></td></tr>`).join('');
    document.getElementById('adminDatasetName').textContent=DATASETS[currentDataset]; document.getElementById('adminRecordCount').textContent=rows.length.toLocaleString('en-US');
    b.querySelectorAll('.admin-edit').forEach(x=>x.onclick=()=>openModal(+x.dataset.index));
    b.querySelectorAll('.admin-delete').forEach(x=>x.onclick=()=>removeRecord(+x.dataset.index));
  }
  function makeField(key,value){
    const wrap=document.createElement('label'); wrap.className='dynamic-field'; const span=document.createElement('span');span.textContent=key;wrap.appendChild(span);
    let input; const long=String(value??'').length>100;
    if(long){input=document.createElement('textarea');input.rows=4;}else{input=document.createElement('input');input.type=typeof value==='number'?'number':'text';}
    input.name=key; input.value=typeof value==='object'?JSON.stringify(value):String(value??''); wrap.appendChild(input);return wrap;
  }
  function openModal(index=null){
    editIndex=index; const rows=SAH_DATA[currentDataset]||[]; const record=index===null?{}:clone(rows[index]||{}); let fields=fieldsFor(rows);
    if(!fields.length) fields=['name','id','status'];
    const form=document.getElementById('adminForm'); form.innerHTML=''; fields.forEach(f=>form.appendChild(makeField(f,record[f])));
    document.getElementById('adminModalTitle').textContent=index===null?`إضافة سجل — ${DATASETS[currentDataset]}`:`تعديل سجل — ${DATASETS[currentDataset]}`;
    document.getElementById('adminModal').classList.remove('hidden');
  }
  function closeModal(){document.getElementById('adminModal')?.classList.add('hidden');editIndex=null;}
  function saveModal(){
    const rows=SAH_DATA[currentDataset]=SAH_DATA[currentDataset]||[], record={};
    document.querySelectorAll('#adminForm [name]').forEach(el=>{let v=el.value.trim(); if(el.type==='number'&&v!=='')v=Number(v); else if((v.startsWith('{')||v.startsWith('['))){try{v=JSON.parse(v);}catch(_e){}} record[el.name]=v;});
    if(editIndex===null){rows.unshift(record);logAction(DATASETS[currentDataset],'إضافة سجل جديد');}else{rows[editIndex]=record;logAction(DATASETS[currentDataset],`تعديل السجل رقم ${editIndex+1}`);}
    persist();closeModal();refresh(); if(window.showToast)showToast('تم حفظ التعديل محليًا');
  }
  function removeRecord(index){
    if(!confirm('هل تريد حذف هذا السجل؟ يمكن استرجاع البيانات الأصلية من زر إلغاء التعديلات المحلية.'))return;
    (SAH_DATA[currentDataset]||[]).splice(index,1);logAction(DATASETS[currentDataset],`حذف السجل رقم ${index+1}`);persist();refresh();if(window.showToast)showToast('تم حذف السجل');
  }
  function exportData(){
    const out={exportedAt:new Date().toISOString(),exportedBy:(ROLE_INFO[activeRole()]||ROLE_INFO.system).name,data:{}};Object.keys(DATASETS).forEach(k=>out.data[k]=SAH_DATA[k]||[]);
    const blob=new Blob([JSON.stringify(out,null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='SAH-Manual-Data-Backup.json';a.click();URL.revokeObjectURL(a.href);logAction('إدارة البيانات','تصدير نسخة احتياطية JSON');
  }
  function importData(file){
    const reader=new FileReader();reader.onload=()=>{try{const parsed=JSON.parse(reader.result),data=parsed.data||parsed;Object.keys(DATASETS).forEach(k=>{if(Array.isArray(data[k]))SAH_DATA[k]=data[k];});persist();refresh();logAction('إدارة البيانات','استيراد نسخة احتياطية JSON');if(window.showToast)showToast('تم استيراد النسخة الاحتياطية');}catch(e){alert('الملف غير صالح');}};reader.readAsText(file);
  }
  function init(){
    const select=document.getElementById('adminDataset'); if(!select)return;
    Object.entries(DATASETS).forEach(([k,v])=>select.insertAdjacentHTML('beforeend',`<option value="${k}">${v}</option>`)); select.value=currentDataset;
    select.onchange=()=>{currentDataset=select.value;refresh();}; document.getElementById('adminSearch').oninput=refresh; document.getElementById('adminRefresh').onclick=refresh; document.getElementById('adminAddRecord').onclick=()=>openModal(null); document.getElementById('adminSave').onclick=saveModal;
    document.querySelectorAll('[data-close-admin]').forEach(x=>x.onclick=closeModal); document.getElementById('adminExportData').onclick=exportData; document.getElementById('adminImportData').onchange=e=>e.target.files[0]&&importData(e.target.files[0]);
    document.getElementById('adminResetData').onclick=()=>{if(confirm('سيتم حذف جميع التعديلات المحلية والعودة إلى بيانات المشروع الأصلية بعد تحديث الصفحة.')){localStorage.removeItem(STORAGE_KEY);location.reload();}};
    const role=document.getElementById('activeRole');role.value=activeRole();role.onchange=()=>setRole(role.value);setRole(role.value);refresh();
  }
  restoreSaved(); window.SAH_ADMIN={persist,logAction,refresh}; window.addEventListener('DOMContentLoaded',init);
})();
