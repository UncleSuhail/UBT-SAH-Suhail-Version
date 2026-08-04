const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const fmt = n => Number(n||0).toLocaleString('en-US');
const pct = (n,d) => d ? Math.round((Number(n)||0)/(Number(d)||1)*100) : 0;
const norm = v => String(v ?? '').toLowerCase().replace(/[أإآا]/g,'ا').replace(/ى/g,'ي').replace(/ة/g,'ه').replace(/[ًٌٍَُِّْـ]/g,'').replace(/[^\p{L}\p{N}]+/gu,' ').trim();
const match = (obj, q) => !norm(q) || norm(JSON.stringify(obj)).includes(norm(q));

function icon(name){
 const set={
  home:'M3 11l9-8 9 8v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1V11z',
  trophy:'M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z M17 6h3a3 3 0 0 1-3 3M7 6H4a3 3 0 0 0 3 3',
  users:'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75',
  calendar:'M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z',
  chart:'M3 3v18h18M7 15v3M12 9v9M17 5v13',
  file:'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M8 13h8 M8 17h8 M8 9h2',
  heart:'M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z',
  activity:'M22 12h-4l-3 9L9 3l-3 9H2',
  upload:'M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4 M17 8l-5-5-5 5 M12 3v12',
  search:'M21 21l-4.35-4.35M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z',
  briefcase:'M10 6V5a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v1 M3 8h18v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8z M3 13h18',
  target:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z',
  info:'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 16v-4 M12 8h.01',
  award:'M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M8.5 14.5 7 22l5-3 5 3-1.5-7.5',
  pen:'M12 20h9 M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z',
  student:'M22 10 12 5 2 10l10 5 10-5z M6 12v5c3 2 9 2 12 0v-5',
  inbox:'M22 12h-6l-2 3h-4l-2-3H2 M5 4h14l3 8v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6l3-8z',
  log:'M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h5',
  menu:'M4 6h16M4 12h16M4 18h16'
 };
 return `<svg class="icon" viewBox="0 0 24 24"><path d="${set[name]||set.info}"></path></svg>`;
}
function renderIcons(){ $$('[data-icon]').forEach(el=>el.innerHTML=icon(el.dataset.icon)); }
function route(id){
 $$('.page').forEach(p=>p.classList.remove('active'));
 const page = document.getElementById('page-'+id) || $('#page-home');
 page.classList.add('active');
 $$('.nav button').forEach(b=>b.classList.toggle('active', b.dataset.page===id));
 history.replaceState(null,'','#'+id);
 window.scrollTo({top:0,behavior:'smooth'});
 $('.sidebar')?.classList.remove('open');
}
function showToast(text){ const t=$('#toast'); if(!t) return; t.textContent=text; t.classList.add('show'); setTimeout(()=>t.classList.remove('show'),2800); }
function setText(id, val){ const el=$(id); if(el) el.textContent=val; }

function initLogin(){ $('#enterApp')?.addEventListener('click',()=>{document.body.classList.remove('login-mode');$('#login').classList.add('hidden');$('#app').classList.remove('hidden'); route((location.hash||'#home').replace('#','')||'home');}); }
function initNavigation(){
 $$('.nav button,[data-route]').forEach(btn=>btn.addEventListener('click',()=> route(btn.dataset.page||btn.dataset.route)));
 $('#mobileMenu')?.addEventListener('click',()=>$('.sidebar').classList.toggle('open'));
}

function initSummary(){
 const s=SAH_DATA.stats;
 const events=SAH_DATA.events?.length||0;
 setText('#homeMaleScholarships', fmt(s.maleScholarships)); setText('#homeFemaleScholarships', fmt(s.femaleScholarships)); setText('#homeEvents', fmt(events));
 setText('#sportsMale', fmt(s.maleScholarships)); setText('#sportsFemale', fmt(s.femaleScholarships)); setText('#sportsEventsCount', fmt((SAH_DATA.championships||[]).length)); setText('#profilesCount', fmt(s.totalProfiles));
 setText('#uniqueActivities', fmt(s.uniqueActivities));
 setText('#scholarTotal', fmt(s.totalScholarships)); setText('#scholarBoys', fmt(s.maleScholarships)); setText('#scholarGirls', fmt(s.femaleScholarships));
 setText('#agreementsDone', fmt(s.femaleAgreementsComplete)); setText('#agreementsMissing', fmt(s.femaleAgreementsMissing));
 setText('#volunteerOpps', fmt((SAH_DATA.opportunities||[]).filter(o=>o.type==='volunteer').length));
 setText('#volunteerRequests', fmt((SAH_DATA.applications||[]).filter(a=>a.target==='volunteer').length));
 setText('#studentSportsOpps', fmt((SAH_DATA.opportunities||[]).filter(o=>o.type==='sports').length));
 setText('#studentActivityOpps', fmt((SAH_DATA.opportunities||[]).filter(o=>o.type==='activities').length));
 setText('#studentApps', fmt((SAH_DATA.applications||[]).length));
}


function currentUiLanguage(){
  return document.documentElement.lang==='en' ? 'en' : 'ar';
}

function formatPointValue(value){
  const number=typeof value==='number'
    ? value.toLocaleString('en-US')
    : String(value??'');

  return currentUiLanguage()==='en'
    ? `${number} points`
    : `${number} نقطة`;
}

function formatPointRatio(achieved,maximum){
  const achievedText=typeof achieved==='number'
    ? achieved.toLocaleString('en-US')
    : String(achieved??'');

  const maximumText=typeof maximum==='number'
    ? maximum.toLocaleString('en-US')
    : String(maximum??'');

  return currentUiLanguage()==='en'
    ? `${achievedText} / ${maximumText} points`
    : `${achievedText} / ${maximumText} نقطة`;
}

function calcIndicators(){
 const fields=SAH_DATA.indicatorFields||[];
 const max=fields.reduce((a,b)=>a+(+b.max||0),0), male=fields.reduce((a,b)=>a+(+b.male||0),0), female=fields.reduce((a,b)=>a+(+b.female||0),0);
 const mp=pct(male,max), fp=pct(female,max);
 setText('#malePoints', formatPointRatio(male,max)); setText('#femalePoints', formatPointRatio(female,max));
 setText('#malePct', `${mp}%`); setText('#femalePct', `${fp}%`);
 $('#maleDonut')?.style.setProperty('--p', mp); $('#femaleDonut')?.style.setProperty('--p', fp);
 setText('#maleAchieved', fmt(male)); setText('#femaleAchieved', fmt(female)); setText('#maleRemaining', fmt(max-male)); setText('#femaleRemaining', fmt(max-female));
 const tbody=$('#indicatorRows'); if(!tbody) return; tbody.innerHTML='';
 fields.forEach(f=>{
  const tr=document.createElement('tr');
  const mpct=pct(f.male,f.max), fpct=pct(f.female,f.max);
  tr.innerHTML=`<td>${f.track}</td><td>${f.field}</td><td>${fmt(f.max)}</td><td>${fmt(f.male)}</td><td><div class="progress"><span style="width:${mpct}%"></span></div><small>${mpct}%</small></td><td>${fmt(f.female)}</td><td><div class="progress burg"><span style="width:${fpct}%"></span></div><small>${fpct}%</small></td>`;
  tbody.appendChild(tr);
 });
}

function barline(label,value,max,color){ return `<div class="barline"><span>${label}</span><div class="progress"><span style="width:${pct(value,max)}%;background:${color||''}"></span></div><b>${fmt(value)}</b></div>`; }
function renderBars(){
 const s=SAH_DATA.stats;
 const db=Object.entries(s.discounts||{}).map(([k,v])=>[`${k}% خصم`,v]);
 const maxD=Math.max(1,...db.map(x=>x[1]));
 const colors=['#0a8f63','#0b55d9','#d98a00','#ad2348'];
 const box=$('#scholarBars'); if(box){ box.innerHTML=db.map((x,i)=>barline(x[0],x[1],maxD,colors[i%colors.length])).join(''); }
 const colleges=Object.entries(s.colleges||{}).sort((a,b)=>b[1]-a[1]);
 const maxC=Math.max(1,...colleges.map(x=>x[1]));
 const cb=$('#collegeBars'); if(cb){ cb.innerHTML=colleges.map((x,i)=>barline(x[0],x[1],maxC,i%2?'#ad2348':'#0b55d9')).join(''); }
}

function scholarshipStats(){
 const rows=SAH_DATA.students||[];
 const boys=rows.filter(r=>r.gender==='طلاب'), girls=rows.filter(r=>r.gender==='طالبات');
 const byCollege=Object.entries(SAH_DATA.stats?.colleges||{}).sort((a,b)=>b[1]-a[1]);
 const topCollege=byCollege[0]||['—',0];
 const topDiscount=Object.entries(SAH_DATA.stats?.discounts||{}).sort((a,b)=>b[1]-a[1])[0]||['—',0];
 return {boys,girls,rows,topCollege,topDiscount};
}
function renderScholarInsight(mode='summary'){
 const box=$('#scholarInsight'); if(!box) return;
 const st=scholarshipStats();
 if(mode==='compare'){
  box.innerHTML=`<h3>مقارنة المنح الرياضية</h3><p>عدد طلاب المنح: <b>${fmt(st.boys.length)}</b>، وعدد طالبات المنح: <b>${fmt(st.girls.length)}</b>. أعلى كلية من حيث عدد المستفيدين هي <b>${st.topCollege[0]}</b> بعدد <b>${fmt(st.topCollege[1])}</b> مستفيد.</p><div class="profile-meta"><div class="meta-box"><span>طلاب</span><b>${fmt(st.boys.length)}</b></div><div class="meta-box"><span>طالبات</span><b>${fmt(st.girls.length)}</b></div><div class="meta-box"><span>أكثر نسبة خصم</span><b>${st.topDiscount[0]}%</b></div><div class="meta-box"><span>إجمالي المستفيدين</span><b>${fmt(st.rows.length)}</b></div></div>`;
 } else if(mode==='action'){
  box.innerHTML=`<h3>ملخص المتابعة</h3><p>الأولوية التشغيلية: متابعة الإقرارات الناقصة للطالبات وعددها <b>${fmt(SAH_DATA.stats.femaleAgreementsMissing||0)}</b>، ومراجعة بيانات الإقرار للطلاب لأنها غير متوفرة في ملف الطلاب الحالي.</p><button class="btn primary" data-route="agreement">فتح الإقرار الإلكتروني للمنح</button>`;
  box.querySelector('[data-route]')?.addEventListener('click', e=>route(e.currentTarget.dataset.route));
 } else {
  box.innerHTML=`<h3>الملخص التنفيذي للمنح</h3><p>تم تحميل <b>${fmt(st.rows.length)}</b> سجل من ملفات المنح للفصل الدراسي ربيع 2026. القائمة قابلة للبحث بالاسم أو الرقم الجامعي أو الكلية أو نوع المشاركة، والبيانات مفصولة بين الطلاب والطالبات.</p><div class="profile-meta"><div class="meta-box"><span>طلاب المنح</span><b>${fmt(st.boys.length)}</b></div><div class="meta-box"><span>طالبات المنح</span><b>${fmt(st.girls.length)}</b></div><div class="meta-box"><span>أنشطة مختلفة</span><b>${fmt(SAH_DATA.stats.uniqueActivities)}</b></div><div class="meta-box"><span>إقرارات مكتملة</span><b>${fmt(SAH_DATA.stats.femaleAgreementsComplete||0)}</b></div></div>`;
 }
}
function renderScholarRows(){
 const tbody=$('#scholarRows'); if(!tbody) return;
 const q=$('#scholarSearch')?.value||'';
 const gender=$('#scholarGender button.active')?.dataset.gender || 'all';
 let rows=(SAH_DATA.students||[]).filter(r=>(gender==='all'||r.gender===gender));
 rows=rows.filter(r=>match(r,q));
 tbody.innerHTML='';
 rows.forEach(r=>tbody.insertAdjacentHTML('beforeend',`<tr><td>${r.name}</td><td>${r.id}</td><td><span class="pill ${r.gender==='طالبات'?'burg':''}">${r.gender}</span></td><td>${r.college}</td><td>${r.activity}</td><td>${r.discount}%</td><td>${r.agreement||'—'}</td></tr>`));
}
function initScholarships(){
 $('#scholarSearch')?.addEventListener('input',renderScholarRows);
 $$('#scholarGender button').forEach(b=>b.addEventListener('click',()=>{$$('#scholarGender button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderScholarRows();}));
 $$('#scholarAnalysisBtns button').forEach(b=>b.addEventListener('click',()=>{$$('#scholarAnalysisBtns button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderScholarInsight(b.dataset.mode);}));
 $('#scholarImport')?.addEventListener('change',()=>showToast('تم استيراد ملف Excel وربطه بقائمة المنح.'));
 renderScholarRows(); renderScholarInsight('summary');
}

function renderAgreements(){
 const tbody=$('#agreementRows'); if(!tbody) return;
 const q=$('#agreementSearch')?.value||'';
 tbody.innerHTML='';
 (SAH_DATA.girls||[]).filter(r=>match(r,q)).forEach(r=>tbody.insertAdjacentHTML('beforeend',`<tr><td>${r.name}</td><td>${r.id}</td><td>${r.college}</td><td><span class="pill ${r.agreement==='مكتمل'?'':'burg'}">${r.agreement}</span></td></tr>`));
}
function initAgreements(){ $('#agreementSearch')?.addEventListener('input',renderAgreements); renderAgreements(); }

function renderChampionships(){
 const cards=$('#championshipCards'), rows=$('#championshipRows'); if(cards) cards.innerHTML=''; if(rows) rows.innerHTML='';
 const q=$('#championshipSearch')?.value||'';
 const champs=SAH_DATA.championships||[];
 const grouped={طلاب:champs.filter(c=>c.scope==='طلاب').length, طالبات:champs.filter(c=>c.scope==='طالبات').length, UBT:champs.filter(c=>(c.place||'').includes('الأعمال')||(c.place||'').includes('التكنولوجيا')).length};
 if(cards){
  cards.innerHTML=`<div class="card stat"><div class="label">بطولات الطلاب</div><div class="value">${fmt(grouped['طلاب'])}</div><div class="sub">من روزنامة الاتحاد</div></div><div class="card stat burg"><div class="label">بطولات الطالبات</div><div class="value">${fmt(grouped['طالبات'])}</div><div class="sub">من روزنامة الاتحاد</div></div><div class="card stat"><div class="label">بطولات تستضيفها UBT</div><div class="value">${fmt(grouped.UBT)}</div><div class="sub">حسب الملف المرفوع</div></div>`;
 }
 if(rows){ champs.filter(c=>match(c,q)).forEach(c=>rows.insertAdjacentHTML('beforeend',`<tr><td>${c.date}</td><td>${c.title}</td><td><span class="pill ${c.scope==='طالبات'?'burg':''}">${c.scope}</span></td><td>${c.place||'يحدد لاحقًا'}</td><td><button class="btn outline" onclick="showToast('تم فتح تفاصيل البطولة')">عرض</button></td></tr>`)); }
}
function initChampionships(){ $('#championshipSearch')?.addEventListener('input',renderChampionships); renderChampionships(); }

function renderProfiles(){
 const list=$('#profileList'), details=$('#profileDetails'); if(!list||!details) return;
 const drawList=()=>{
  const q=$('#profileSearch')?.value||'';
  const profiles=(SAH_DATA.profiles||[]).filter(p=>match(p,q) || (p.activities||[]).some(a=>match(a,q)));
  list.innerHTML='';
  profiles.forEach((p,i)=>{
   const btn=document.createElement('button');
   btn.innerHTML=`<b>${p.name}</b><br><small>${p.id} • ${p.college} • ${p.gender} • ${p.activitiesCount} مشاركة</small>`;
   btn.addEventListener('click',()=>{ $$('#profileList button').forEach(b=>b.classList.remove('active')); btn.classList.add('active'); drawDetails(p); });
   list.appendChild(btn);
   if(i===0) { setTimeout(()=>btn.click(),0); }
  });
  if(!profiles.length) details.innerHTML='<h4>لا توجد نتائج</h4><p>جرّب البحث بالاسم أو الرقم الجامعي أو اسم البطولة، والبحث لا يفرق بين الأحرف الكبيرة والصغيرة.</p>';
 };
 const drawDetails=(p)=>{
  const rows=(p.activities||[]).map((a,idx)=>`<tr><td>${idx+1}</td><td>${a.activity||'—'}</td><td>${a.season||a.term||'—'}</td><td>${a.dateFrom||'—'} ${a.dateTo?'إلى '+a.dateTo:''}</td><td>${a.place||'—'}</td><td>${a.organizer||'—'}</td><td>${a.level||'—'}</td><td>${a.rank||'—'}</td><td>${a.discount||0}%</td></tr>`).join('');
  details.innerHTML=`<div class="profile-head"><div class="profile-avatar">${(p.name||'ح').slice(0,1)}</div><div><h4>${p.name}</h4><p>${p.id} • ${p.college} • ${p.gender}</p></div></div><div class="profile-meta"><div class="meta-box"><span>عدد المشاركات</span><b>${fmt(p.activitiesCount)}</b></div><div class="meta-box"><span>نسبة المنحة</span><b>${p.discount||0}%</b></div><div class="meta-box"><span>الإقرار</span><b>${p.agreement||'—'}</b></div><div class="meta-box"><span>الجوال</span><b>${p.mobile||'—'}</b></div></div><h4>سجل المشاركات والبطولات</h4><div class="table-wrap"><table><thead><tr><th>#</th><th>البطولة / المشاركة</th><th>الموسم</th><th>التاريخ</th><th>المكان</th><th>الجهة المنفذة</th><th>التصنيف</th><th>المركز</th><th>المنحة</th></tr></thead><tbody>${rows}</tbody></table></div>`;
 };
 $('#profileSearch')?.addEventListener('input',drawList);
 drawList();
}

function renderClubs(){ const box=$('#clubsList'); if(!box) return; box.innerHTML=(SAH_DATA.clubs||[]).map(c=>`<div class="mini-item"><div><b>${c.name}</b><br><small>${c.gender}</small></div><span class="pill">${c.members} عضو</span></div>`).join(''); }
function renderOpportunities(filter='all'){
 const box=$('#opportunityCards'); if(!box) return; box.innerHTML='';
 const rows=(SAH_DATA.opportunities||[]).filter(o=>filter==='all'||o.type===filter);
 rows.forEach(o=>box.insertAdjacentHTML('beforeend',`<div class="card service"><span data-icon="${o.type==='sports'?'trophy':o.type==='volunteer'?'heart':'activity'}"></span><h4>${o.title}</h4><p>${o.date} • ${o.seats} مقعد • الطلب يذهب إلى ${o.destination}</p><button class="btn primary" onclick="showToast('تم إرسال الطلب للجهة المختصة')">قدّم الآن</button></div>`));
 renderIcons();
}
function initOpportunities(){
 $$('#oppFilters button').forEach(b=>b.addEventListener('click',()=>{$$('#oppFilters button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); renderOpportunities(b.dataset.filter)}));
 renderOpportunities('all');
}

function typeName(t){return {sports:'رياضي',academic:'أكاديمي',national:'رسمي',islamic:'إسلامي',activities:'أنشطة طلابية',volunteer:'تطوعي'}[t]||t;}
function renderEvents(filter='all'){
 const list=$('#eventList'); if(!list) return; list.innerHTML='';
 const events=(SAH_DATA.events||[]).filter(e=>filter==='all'||e.type===filter);
 events.forEach(e=>list.insertAdjacentHTML('beforeend',`<div class="event"><div class="date">${e.date}</div><div><h4>${e.title}</h4><p>${e.place||'—'} • ${e.scope||'—'}</p></div><span class="tag ${e.type}">${typeName(e.type)}</span></div>`));
}
function initCalendar(){
 $$('#calFilters button').forEach(b=>b.addEventListener('click',()=>{$$('#calFilters button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); renderEvents(b.dataset.filter)}));
 $('#importCalendar')?.addEventListener('change',()=>showToast('تمت قراءة ملف التقويم، وسيتم عرض الأحداث للمراجعة قبل الاعتماد.'));
 renderEvents('all');
}

function renderRequests(filter='all'){
 const tbody=$('#requestRows'); if(!tbody) return; tbody.innerHTML='';
 const q=$('#requestSearch')?.value||'';
 let apps=SAH_DATA.applications||[]; if(filter!=='all') apps=apps.filter(a=>a.target===filter);
 apps.filter(a=>match(a,q)).forEach(a=>tbody.insertAdjacentHTML('beforeend',`<tr><td>${a.student}</td><td>${a.id}</td><td>${a.opportunity}</td><td>${a.destination}</td><td><span class="pill ${a.status==='مقبول'?'':'burg'}">${a.status}</span></td><td><button class="btn outline" onclick="showToast('تم تحديث حالة الطلب')">قبول / رفض</button></td></tr>`));
}
function initRequests(){ $('#requestSearch')?.addEventListener('input',()=>renderRequests($('#requestFilters button.active')?.dataset.filter||'all')); $$('#requestFilters button').forEach(b=>b.addEventListener('click',()=>{$$('#requestFilters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderRequests(b.dataset.filter)})); renderRequests('all'); }


function evidenceStatusClass(status){ return status==='مكتمل'?'approved':status==='جزئي'?'partial':'missing'; }
function getFilteredEvidence(){
 const q=$('#evidenceSearch')?.value||'';
 const gender=$('#evidenceGender button.active')?.dataset.gender||'all';
 const status=$('#evidenceStatus')?.value||'all';
 return (SAH_DATA.evidenceRecords||[]).filter(r=>(gender==='all'||r.gender===gender)&&(status==='all'||r.status===status)&&match(r,q));
}
function renderEvidenceStats(){
 const rows=SAH_DATA.evidenceRecords||[];
 setText('#evidenceTotal',fmt(rows.length));
 setText('#evidenceComplete',fmt(rows.filter(r=>r.status==='مكتمل').length));
 setText('#evidencePartial',fmt(rows.filter(r=>r.status==='جزئي').length));
 setText('#evidenceMissing',fmt(rows.filter(r=>r.status==='ناقص').length));
}
function renderEvidence(){
 const tbody=$('#evidenceRows'); if(!tbody) return;
 const rows=getFilteredEvidence(); tbody.innerHTML='';
 rows.forEach((r,i)=>{
  const tr=document.createElement('tr');
  tr.innerHTML=`<td>${r.id||i+1}</td><td><b>${r.activity||'—'}</b></td><td class="ltr-cell">${r.date||'—'}</td><td>${r.days||'—'}</td><td>${fmt(r.beneficiaries||0)}</td><td>${fmt(r.players||0)}</td><td>${r.gender||'—'}</td><td>${r.activityType||'—'}</td><td>${r.subCategory||'—'}</td><td>${r.gameType||'—'}</td><td>${fmt(r.points||0)}</td><td><span class="pill evidence-status ${evidenceStatusClass(r.status)}">${r.status}</span></td><td><button class="btn outline evidence-view" data-index="${(SAH_DATA.evidenceRecords||[]).indexOf(r)}">عرض</button></td>`;
  tbody.appendChild(tr);
 });
 $$('.evidence-view',tbody).forEach(b=>b.addEventListener('click',()=>showEvidenceDetails((SAH_DATA.evidenceRecords||[])[+b.dataset.index])));
 relocalizeSoon();
}
function evidenceLink(value,label){
 if(!value||String(value).trim()==='-'||String(value).trim()==='—') return `<span class="muted">غير متوفر</span>`;
 const s=String(value).trim(); const isUrl=/^https?:\/\//i.test(s);
 return isUrl?`<a class="btn outline" href="${s}" target="_blank" rel="noopener">${label}</a>`:`<div class="evidence-text"><b>${label}</b><span>${s}</span></div>`;
}
function showEvidenceDetails(r){
 const box=$('#evidenceDetails'); if(!box||!r) return;
 box.innerHTML=`<div class="section-title compact-title"><div><h3>${r.activity||'—'}</h3><p>${r.date||'—'} • ${r.gender||'—'} • ${r.activityType||'—'} • ${r.subCategory||'—'}</p></div><span class="pill evidence-status ${evidenceStatusClass(r.status)}">${r.status}</span></div><div class="profile-meta evidence-meta"><div class="meta-box"><span>عدد أيام الفعالية</span><b>${r.days||'—'}</b></div><div class="meta-box"><span>عدد المستفيدين</span><b>${fmt(r.beneficiaries||0)}</b></div><div class="meta-box"><span>عدد اللاعبين</span><b>${fmt(r.players||0)}</b></div><div class="meta-box"><span>إجمالي النقاط</span><b>${fmt(r.points||0)}</b></div></div><div class="evidence-links">${evidenceLink(r.newsDocumentation,'توثيق الخبر')}${evidenceLink(r.newsLink,'رابط / وصف الخبر')}${evidenceLink(r.imagesLink,'رابط / وصف الصور')}${evidenceLink(r.publishLink,'رابط / وصف النشر')}</div>`;
 relocalizeSoon(); box.scrollIntoView({behavior:'smooth',block:'nearest'});
}
function csvEscape(v){ const s=String(v??''); return `"${s.replace(/"/g,'""')}"`; }
function exportEvidenceCsv(){
 const headers=['رقم','اسم النشاط','التاريخ','عدد أيام الفعالية','عدد المستفيدين','عدد اللاعبين','الفئة المستهدفة','نوع النشاط','التصنيف الفرعي','نوع اللعبة','إجمالي النقاط','توثيق الخبر','رابط الخبر','رابط الصور','رابط النشر','حالة الشاهد'];
 const rows=getFilteredEvidence().map(r=>[r.id,r.activity,r.date,r.days,r.beneficiaries,r.players,r.gender,r.activityType,r.subCategory,r.gameType,r.points,r.newsDocumentation,r.newsLink,r.imagesLink,r.publishLink,r.status]);
 const csv='\ufeff'+[headers,...rows].map(row=>row.map(csvEscape).join(',')).join('\n');
 const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='SAH-Activity-Evidence-Report.csv'; a.click(); URL.revokeObjectURL(a.href); showToast('تم تصدير تقرير الشواهد بصيغة متوافقة مع Excel');
}
function printEvidenceReport(){
 const rows=getFilteredEvidence(); const w=window.open('','_blank'); if(!w) return showToast('يرجى السماح بالنوافذ المنبثقة لتوليد التقرير');
 const body=rows.map((r,i)=>`<tr><td>${i+1}</td><td>${r.activity||'—'}</td><td>${r.date||'—'}</td><td>${r.gender||'—'}</td><td>${r.activityType||'—'}</td><td>${r.subCategory||'—'}</td><td>${r.points||0}</td><td>${r.status}</td><td>${r.newsLink||'—'}</td><td>${r.imagesLink||'—'}</td><td>${r.publishLink||'—'}</td></tr>`).join('');
 w.document.write(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>تقرير الشواهد</title><style>body{font-family:Tahoma,Arial;padding:24px;color:#102d5c}header{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0b3475;padding-bottom:16px;margin-bottom:20px}h1{font-size:24px}p{color:#566070}table{width:100%;border-collapse:collapse;font-size:11px}th,td{border:1px solid #ccd6e5;padding:7px;text-align:right;vertical-align:top}th{background:#eef4ff}@media print{body{padding:0}button{display:none}}</style></head><body><header><div><h1>تقرير توثيق الأنشطة والشواهد</h1><p>Student Activities Platform — جامعة الأعمال والتكنولوجيا</p></div><div><b>عدد السجلات: ${rows.length}</b><br><small>${new Date().toLocaleDateString('ar-SA')}</small></div></header><button onclick="window.print()">طباعة / حفظ PDF</button><table><thead><tr><th>#</th><th>النشاط</th><th>التاريخ</th><th>الفئة</th><th>النوع</th><th>التصنيف</th><th>النقاط</th><th>الحالة</th><th>الخبر</th><th>الصور</th><th>النشر</th></tr></thead><tbody>${body}</tbody></table><script>setTimeout(()=>window.print(),500)<\/script></body></html>`); w.document.close();
}
function initEvidence(){
 renderEvidenceStats(); renderEvidence();
 $('#evidenceSearch')?.addEventListener('input',renderEvidence);
 $('#evidenceStatus')?.addEventListener('change',renderEvidence);
 $$('#evidenceGender button').forEach(b=>b.addEventListener('click',()=>{$$('#evidenceGender button').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderEvidence();}));
 $('#exportEvidenceCsv')?.addEventListener('click',exportEvidenceCsv);
 $('#printEvidenceReport')?.addEventListener('click',printEvidenceReport);
 $('#scrollEvidence')?.addEventListener('click',()=>$('#evidenceCenter')?.scrollIntoView({behavior:'smooth'}));
 
}

function renderAudit(){ const tbody=$('#auditRows'); if(!tbody) return; const q=$('#auditSearch')?.value||''; tbody.innerHTML=''; (SAH_DATA.audit||[]).filter(a=>match(a,q)).forEach(a=>tbody.insertAdjacentHTML('beforeend',`<tr><td>${a.time}</td><td>${a.user}</td><td>${a.module}</td><td>${a.action}</td></tr>`)); }
function initAudit(){ $('#auditSearch')?.addEventListener('input',renderAudit); renderAudit(); }
function initDecisionCenter(){
 const max=(SAH_DATA.indicatorFields||[]).reduce((a,b)=>a+(+b.max||0),0), male=(SAH_DATA.indicatorFields||[]).reduce((a,b)=>a+(+b.male||0),0), female=(SAH_DATA.indicatorFields||[]).reduce((a,b)=>a+(+b.female||0),0);
 const content={general:['ملخص الأداء الحالي',`يعرض النظام مؤشرين مستقلين: الطلاب ${fmt(male)} / ${fmt(max)} نقطة، والطالبات ${fmt(female)} / ${fmt(max)} نقطة. لا يتم جمع المؤشرين في رقم واحد.`],male:['تحليل الطلاب',`حقق الطلاب ${pct(male,max)}% من إجمالي نقاط دليل المؤشر. الأولوية: رفع نقاط الأنشطة المركزية والداخلية وتوثيق شواهد الإنجاز.`],female:['تحليل الطالبات',`حققت الطالبات ${pct(female,max)}% من إجمالي نقاط دليل المؤشر. الأولوية: تعزيز البطولات الوطنية والأنشطة المركزية وتوسيع المشاركات الرياضية.`]};
 $$('#decisionBtns button').forEach(b=>b.addEventListener('click',()=>{$$('#decisionBtns button').forEach(x=>x.classList.remove('active'));b.classList.add('active'); const c=content[b.dataset.mode]; setText('#decisionTitle',c[0]); setText('#decisionText',c[1]);}));
}


// Main application initialization. Language/theme preferences are initialized afterwards.
window.addEventListener('DOMContentLoaded',()=>{
 renderIcons(); initLogin(); initNavigation();
 initSummary(); calcIndicators(); renderBars(); initScholarships(); initAgreements(); initChampionships(); renderProfiles(); renderClubs(); initOpportunities(); initCalendar(); initRequests(); initEvidence(); initAudit(); initDecisionCenter();
});


// === SAH V6: full UI translation layer ===
const SAH_TEXT_EN = {
  'منصة موحدة لإدارة خدمات وأنشطة عمادة شؤون الطلاب.':'A unified platform for managing Deanship of Student Affairs services and activities.',
  'تسجيل الدخول عبر Microsoft':'Sign in with Microsoft',
  'منصة الأنشطة الطلابية':'Student Activities Platform',
  'الرئيسية':'Home','الإدارة الرياضية':'Sports Administration','مؤشر الأداء الرياضي':'Sports Performance Indicator','المنح الرياضية':'Sports Scholarships','الإقرار الإلكتروني للمنح':'Scholarship E-Agreement','البطولات الرياضية':'Sports Championships','ملف الطالب الرياضي':'Athlete Profile','الأنشطة الطلابية العامة':'General Student Activities','العمل التطوعي':'Volunteering','بوابة الطالب':'Student Portal','التقويم الموحد':'Unified Calendar','طلبات التسجيل':'Registration Requests','التقارير والتحليلات':'Reports & Analytics','سجل العمليات':'Audit Log',
  'عمادة شؤون الطلاب':'Deanship of Student Affairs','مرحباً، حسام الحسين':'Welcome, Hussam Alhussain','مسؤول تطوير منصة الأنشطة الطلابية':'Student Activities Platform Development Officer',
  'منصة واحدة لإدارة الأنشطة والخدمات الطلابية':'One platform for managing student activities and services','الدخول للإدارة الرياضية':'Open Sports Administration','عرض بوابة الطالب':'View Student Portal','وحدات المنصة':'Platform Modules','ملخص البيانات المستوردة':'Imported Data Summary',
  'وحدة مستقلة':'Independent Module','طلاب / طالبات':'Male / Female Students','محرك ساعات':'Hours Engine','طلاب المنح الرياضية':'Male Sports Scholarship Students','طالبات المنح الرياضية':'Female Sports Scholarship Students','ربيع 2026':'Spring 2026','مجالات مؤشر الأداء الرياضي':'Sports Performance Indicator Fields','حسب دليل المؤشر':'Based on the Indicator Guide','أحداث التقويم المستوردة':'Imported Calendar Events','رياضي، أكاديمي، رسمي':'Sports, Academic, Official',
  'وحدة الإدارة الرياضية':'Sports Administration Module','كل ما يخص الرياضة في صفحة واحدة':'Everything related to sports in one place','طلاب المنح':'Male Scholarship Students','من ملف الطلاب':'From male students file','طالبات المنح':'Female Scholarship Students','من ملف الطالبات':'From female students file','بطولات الاتحاد المدرجة':'Listed Federation Championships','من روزنامة الاتحاد':'From SUSF Calendar','ملفات رياضيين':'Athlete Profiles','طلاب وطالبات':'Male and female students','خدمات الإدارة الرياضية':'Sports Administration Services','كل عنصر يفتح صفحة متخصصة بنفس البيانات والصلاحيات.':'Each item opens a specialized page with the same data and permissions.','مؤشر الطلاب والطالبات مستقلين حسب دليل المؤشر.':'Male and female indicators are separate according to the guide.','إحصائيات وقوائم المنح ونسب الخصم.':'Scholarship statistics, lists, and discount rates.','متابعة التوقيع والاعتماد.':'Track signatures and approvals.','روزنامة الاتحاد والبطولات المستضافة.':'SUSF calendar and hosted championships.','بيانات الطالب ومشاركاته وسجل بطولاته.':'Student details, participations, and championship history.','تتبع الاستيراد والتحديثات والاعتمادات.':'Track imports, updates, and approvals.',
  'مركز القرار التنفيذي':'Executive Decision Center','تحليل ومقارنة بدون دمج مؤشر الطلاب مع الطالبات.':'Analysis and comparison without merging male and female indicators.','نظرة عامة':'Overview','تحليل الطلاب':'Male Students Analysis','تحليل الطالبات':'Female Students Analysis','ملخص الأداء الحالي':'Current Performance Summary','فتح صفحة المؤشر':'Open Indicator Page',
  'مرجعية احتساب المؤشر':'Indicator Calculation Reference','يعتمد احتساب المؤشر على دليل مؤشر الأداء الرياضي الصادر من الاتحاد السعودي للرياضة الجامعية.':'The indicator is calculated based on the Sports Performance Indicator Guide issued by the Saudi Universities Sports Federation.','مؤشر الأداء الرياضي - الطلاب':'Sports Performance Indicator - Male Students','مؤشر الأداء الرياضي - الطالبات':'Sports Performance Indicator - Female Students','النقاط المحققة':'Achieved Points','نسبة الإنجاز':'Achievement Rate','المتبقي':'Remaining','جدول مجالات المؤشر':'Indicator Fields Table','المسار':'Track','المجال':'Field','النقاط الممكنة':'Maximum Points','نقاط الطلاب':'Male Points','نقاط الطالبات':'Female Points',
  'المنح الرياضية':'Sports Scholarships','قوائم المنح للفصل الدراسي ربيع 2026 بناءً على ملفات Excel المرفوعة للطلاب والطالبات.':'Spring 2026 scholarship lists based on uploaded Excel files for male and female students.','إجمالي المستفيدين':'Total Beneficiaries','نسبة الخصم الأكثر تكرارًا':'Most Common Discount Rate','أعلى كلية':'Top College','تحليل المنح':'Scholarship Analysis','مقارنة الطلاب والطالبات':'Male vs Female Comparison','ملخص المتابعة':'Follow-up Summary','قائمة الطلاب والطالبات':'Male and Female Students List','بحث بالاسم أو الرقم الجامعي أو الكلية أو النشاط أو الإقرار':'Search by name, university ID, college, activity, or agreement','الكل':'All','طلاب':'Male Students','طالبات':'Female Students','الاسم':'Name','الرقم الجامعي':'University ID','الفئة':'Category','الكلية':'College','النشاط':'Activity','الخصم':'Discount','الإقرار':'Agreement','توزيع المنح حسب نسبة الخصم':'Scholarships by Discount Rate','توزيع المستفيدين حسب الكلية':'Beneficiaries by College',
  'الإقرار الإلكتروني للمنح الرياضية':'Sports Scholarship E-Agreement','المقصود: توقيع الطالب/الطالبة على إقرار وشروط المنحة الرياضية ومتابعة حالة الاعتماد.':'Purpose: student signs the sports scholarship terms and agreement and the approval status is tracked.','إقرارات مكتملة':'Completed Agreements','إقرارات ناقصة':'Missing Agreements','تحتاج متابعة':'Needs Follow-up','إقرارات الطلاب':'Male Students Agreements','غير متوفر في ملف الطلاب الحالي':'Not available in the current male students file','نموذج الإقرار الإلكتروني':'E-Agreement Form','اسم الطالب / الطالبة':'Student Name','رقم الجوال':'Mobile Number','أقر بالاطلاع على شروط المنحة الرياضية والالتزام بها.':'I acknowledge reading and complying with the sports scholarship terms.','توقيع الطالب':'Student Signature','حفظ الإقرار':'Save Agreement','فتح النموذج الرسمي PDF':'Open Official PDF Form','النموذج الرسمي للإقرار والتعهد':'Official Agreement Form','يعرض للطالب نفس نموذج الإقرار الرسمي الخاص بمنح المتميزين رياضيًا.':'Displays the official agreement form for outstanding sports scholarship students.','متابعة الإقرارات':'Agreement Tracking','بحث بالاسم أو الرقم الجامعي أو الكلية أو الحالة':'Search by name, ID, college, or status','الحالة':'Status',
  'البطولات الرياضية':'Sports Championships','روزنامة بطولات الاتحاد السعودي للرياضة الجامعية، مع فصل الطلاب والطالبات.':'Saudi Universities Sports Federation championship calendar, separated by male and female students.','عرض روزنامة الاتحاد':'View SUSF Calendar','قائمة البطولات':'Championships List','بحث باسم البطولة أو التاريخ أو المكان أو الفئة':'Search by championship, date, location, or category','التاريخ':'Date','البطولة':'Championship','المكان':'Location','الإجراء':'Action','بطولات الطلاب':'Male Championships','بطولات الطالبات':'Female Championships','بطولات تستضيفها UBT':'Championships Hosted by UBT','حسب الملف المرفوع':'Based on uploaded file','عرض':'View',
  'ملف الطالب الرياضي':'Athlete Profile','البحث عن طالب أو طالبة ومعرفة بياناته، المنحة، البطولات، وسجل المشاركات.':'Search for a student and view profile, scholarship, championships, and participation history.','البحث':'Search','اختر طالبًا لعرض الملف':'Select a student to view the profile','سيظهر هنا سجل المشاركات والبطولات والبيانات الأساسية.':'Participation history, championships, and basic details will appear here.','عدد المشاركات':'Number of Participations','نسبة المنحة':'Scholarship Rate','الجوال':'Mobile','سجل المشاركات والبطولات':'Participation and Championships History','البطولة / المشاركة':'Championship / Participation','الموسم':'Season','الجهة المنفذة':'Organizer','التصنيف':'Classification','المركز':'Rank','المنحة':'Scholarship','لا توجد نتائج':'No Results','جرّب البحث بالاسم أو الرقم الجامعي أو اسم البطولة، والبحث لا يفرق بين الأحرف الكبيرة والصغيرة.':'Try searching by name, university ID, or championship name. Search is case-insensitive.',
  'وحدة الأنشطة الطلابية العامة':'General Student Activities Module','الأندية، الفعاليات، المبادرات والبرامج':'Clubs, events, initiatives, and programs','إدارة الأنشطة العامة منفصلة عن الإدارة الرياضية، مع استقبال طلبات الطلاب الخاصة بها فقط.':'General activities are managed separately from sports, with their own student requests.','مجالات الأنشطة الطلابية':'Student Activity Fields','تصنيف الأنشطة حسب المجالات المعتمدة داخل عمادة شؤون الطلاب.':'Activities are classified by the approved Deanship fields.','الأنشطة التوعوية':'Awareness Activities','الأنشطة والبرامج المجتمعية والتطوعية':'Community and Voluntary Programs','الأنشطة الثقافية':'Cultural Activities','الأنشطة العلمية':'Scientific Activities','الأنشطة الفنية':'Art Activities','الأنشطة الرياضية':'Sports Activities','البرامج التدريبية':'Training Programs','برامج عامة على مستوى الجامعة':'University-wide Programs','إضافة نادي طلابي':'Add Student Club','اسم النادي':'Club Name','مشرف النادي':'Club Supervisor','إضافة نادي':'Add Club','إضافة فعالية / مبادرة':'Add Event / Initiative','اسم الفعالية':'Event Name','أنشطة طلابية':'Student Activities','مبادرة':'Initiative','فعالية':'Event','تمنح ساعات تطوعية':'Grants volunteering hours','إضافة فعالية':'Add Event','الأندية المسجلة':'Registered Clubs',
  'الفرص التطوعية':'Volunteering Opportunities','فرص تطوعية واحتساب ساعات حسب الضوابط اللاصفية وآلية احتساب الساعات التطوعية.':'Volunteering opportunities and hour calculation based on approved extracurricular regulations.','عرض الدليل الكامل':'View Full Guide','فرص مفتوحة':'Open Opportunities','في المنصة':'In Platform','ساعات مقترحة':'Suggested Hours','حسب الفرص الحالية':'Based on current opportunities','طلبات تحت المراجعة':'Requests Under Review','مرتبطة بالفرص':'Linked to opportunities','آلية احتساب الساعات التطوعية':'Volunteering Hours Calculation Mechanism','تعرض داخل الصفحة حتى يفهمها الطالب والمسؤول بدون الرجوع للملف.':'Shown on this page so students and staff understand it without opening the file.','الأنشطة والفعاليات العامة':'General Activities and Events','الساعات':'Hours','نقاط الحضور':'Attendance Points','نقاط التنظيم':'Organization Points','أكثر من 16':'More than 16','عضوية اللجان والأندية':'Committees and Clubs Membership','نسبة المشاركة':'Participation Rate','النقاط':'Points','المسابقات':'Competitions','داخلية':'Internal','محلية':'Local','دولية':'International','الأول':'First','الثاني':'Second','الثالث':'Third','مشاركة فقط':'Participation Only',
  'بوابة الطالب':'Student Portal','الطالب يرى كل الفرص التي تهمه في مكان واحد، والإدارة تستقبل الطلب حسب نوع الفرصة.':'The student sees all relevant opportunities in one place, while each department receives requests based on opportunity type.','فرص رياضية':'Sports Opportunities','تذهب للإدارة الرياضية':'Goes to Sports Administration','فرص أنشطة':'Activity Opportunities','تذهب للأنشطة الطلابية':'Goes to Student Activities','طلبات الطالب':'Student Requests','قيد المراجعة أو مقبولة':'Pending or Accepted','الفرص المتاحة':'Available Opportunities','شواغر، فعاليات، مبادرات، وفرص تطوعية.':'Vacancies, events, initiatives, and volunteering opportunities.','رياضية':'Sports','أنشطة':'Activities','تطوع':'Volunteering','قدّم الآن':'Apply Now',
  'التقويم الموحد':'Unified Calendar','تقويم مركزي مع فلاتر. وداخل كل وحدة يظهر تقويمها الخاص فقط.':'Central calendar with filters. Each module also shows its own related calendar.','استيراد التقويم':'Import Calendar','كل الأحداث':'All Events','الأكاديمي':'Academic','الرسمي':'Official','الإسلامي':'Islamic','الأنشطة':'Activities','التطوعي':'Volunteering',
  'طلبات التسجيل':'Registration Requests','كل طلب يذهب للجهة المختصة حسب نوع الفرصة، بدون خلط بين الإدارة الرياضية والأنشطة الطلابية.':'Each request goes to the relevant department based on opportunity type, with no mixing between sports and general activities.','طلبات رياضية':'Sports Requests','طلبات الأنشطة':'Activity Requests','طلبات التطوع':'Volunteering Requests','بحث باسم الطالب أو الرقم أو الفرصة أو الحالة':'Search by student, ID, opportunity, or status','الطالب':'Student','الفرصة':'Opportunity','الجهة المختصة':'Responsible Unit','قبول / رفض':'Accept / Reject',
  'التقارير والتحليلات':'Reports & Analytics','تقارير جاهزة للإدارة والعمادة مع تصدير PDF / Excel في النسخة الفعلية.':'Ready reports for the department and deanship with PDF / Excel export in the production version.','تقرير المنح':'Scholarship Report','يعرض توزيع المنح حسب الكلية والنسبة والفئة.':'Shows scholarships by college, rate, and category.','تقرير المؤشر':'Indicator Report','يعرض الطلاب والطالبات كلٌ على حدة حسب دليل المؤشر.':'Shows male and female students separately according to the guide.','تقرير البطولات':'Championship Report','يعرض المشاركات والنتائج والبطولات المستضافة.':'Shows participations, results, and hosted championships.','تقرير العمل التطوعي':'Volunteering Report','يعرض الفرص والساعات وطلبات الاعتماد.':'Shows opportunities, hours, and approval requests.','توليد تقرير':'Generate Report',
  'سجل العمليات':'Audit Log','يوضح آخر عمليات الاستيراد والتحديث والاعتماد داخل المنصة.':'Shows the latest imports, updates, and approvals inside the platform.','بحث في سجل العمليات':'Search audit log','الوقت':'Time','المستخدم':'User','الوحدة':'Module','العملية':'Action',
  'الملخص التنفيذي للمنح':'Scholarship Executive Summary','مقارنة المنح الرياضية':'Sports Scholarships Comparison','الأولوية التشغيلية':'Operational Priority','فتح الإقرار الإلكتروني للمنح':'Open Scholarship E-Agreement','إجمالي المستفيدين':'Total Beneficiaries','أكثر نسبة خصم':'Most Common Discount','أنشطة مختلفة':'Different Activities','إقرارات مكتملة':'Completed Agreements',
  'عضو':'Member','مقعد':'Seats','الطلب يذهب إلى':'Request goes to','تم إرسال الطلب للجهة المختصة':'Request sent to the relevant unit','تم فتح تفاصيل البطولة':'Championship details opened','تم تحديث حالة الطلب':'Request status updated','تمت قراءة ملف التقويم، وسيتم عرض الأحداث للمراجعة قبل الاعتماد.':'Calendar file has been read and events will be shown for review before approval.',
  'كل وحدة لها صلاحياتها وبياناتها، والطالب يشاهد ما يهمه في بوابة واحدة.':'Each module has its own permissions and data, while students see what matters to them in one portal.',
  'المؤشر، المنح، الإقرار الإلكتروني، البطولات، ملفات الرياضيين، والتقارير.':'Indicator, scholarships, e-agreements, championships, athlete profiles, and reports.',
  'الأندية، الفعاليات، المبادرات، الأعضاء، وفرص المشاركة.':'Clubs, events, initiatives, members, and participation opportunities.',
  'فرص تطوعية واحتساب ساعات بناءً على الضوابط اللاصفية المعتمدة.':'Volunteer opportunities and hour calculation based on approved extracurricular regulations.',
  'المنشآت الرياضية':'Sports Facilities','إدارة البطولات والفعاليات الرياضية من داخل المنصة.':'Manage sports championships and events from inside the platform.','عرض الدليل':'View Guide',
  'لا يتم جمع هذا المؤشر مع مؤشر الطالبات.':'This indicator is not combined with the female students indicator.','مؤشر مستقل حسب نفس المجالات والمسارات.':'An independent indicator based on the same fields and tracks.','من أصل نقاط الدليل':'Out of the guide points','المتبقي للطلاب':'Remaining for male students','المتبقي للطالبات':'Remaining for female students','نقطة':'Point','تحليل المسارات والمجالات الـ16':'Analysis of the 16 tracks and fields','الحد الأعلى':'Maximum','إنجاز الطلاب':'Male Achievement','إنجاز الطالبات':'Female Achievement',
  'استيراد Excel':'Import Excel','إجمالي مستحقي المنح':'Total Scholarship Beneficiaries','طلاب + طالبات':'Male + Female Students','ملف الطلاب':'Male Students File','ملف الطالبات':'Female Students File','حسب ملفات المنح':'Based on Scholarship Files','توزيع الطلاب والطالبات حسب الكلية':'Male and Female Students by College','ملخص ومقارنة وتشخيص سريع مبني على ملفات المنح المرفوعة.':'A summary, comparison, and quick analysis based on the uploaded scholarship files.','الملخص':'Summary','المقارنة':'Comparison','المتابعة':'Follow-up','قائمة المنح':'Scholarship List','طالب':'Male Student','طالبة':'Female Student','الرقم':'ID',
  'برامج توعوية موجهة للطلبة.':'Awareness programs for students.','فعاليات ثقافية ومشاركات طلابية.':'Cultural events and student participation.','برامج ومسابقات وورش علمية.':'Scientific programs, competitions, and workshops.','فعاليات فنية وإبداعية.':'Artistic and creative events.','دورات وورش لتطوير مهارات الطلبة.':'Courses and workshops to develop student skills.','برامج مركزية تشمل جميع الطلبة.':'University-wide programs for all students.',
  'تقويم واحد مع فلاتر: أكاديمي، مناسبات رسمية، إسلامية، أنشطة، رياضة، تطوع.':'One calendar with filters for academic events, official occasions, Islamic occasions, student activities, sports, and volunteering.','استيراد Calendar':'Import Calendar','أكاديمي':'Academic','مناسبات رسمية':'Official Occasions','إسلامية':'Islamic Occasions',
  'الطلبات مفصولة حسب الجهة: الرياضة للإدارة الرياضية، والأنشطة للأنشطة الطلابية.':'Requests are separated by unit: sports requests go to Sports Administration and activity requests go to Student Activities.','الجهة المستقبلة':'Receiving Unit','إجراء':'Action','تصدير PDF':'Export PDF','حسب الكلية ونسبة الخصم والفئة.':'By college, discount rate, and category.','تصدير Excel':'Export Excel','الفرص والساعات والطلبات.':'Opportunities, hours, and requests.','تتبع عمليات الاستيراد والتعديل والاعتماد داخل المنصة.':'Track imports, edits, and approvals inside the platform.','بحث بالوقت أو المستخدم أو الوحدة أو العملية':'Search by time, user, module, or action',
  'مكتمل':'Completed','ناقص':'Missing','مقبول':'Accepted','قيد المراجعة':'Pending Review','مرفوض':'Rejected','معتمد':'Approved','بانتظار التوقيع':'Awaiting Signature','يحدد لاحقًا':'To be determined','—':'—','إلى':'to',
  'إدارة الأعمال':'Business Administration','كلية إدارة الأعمال':'College of Business Administration','كلية الهندسة':'College of Engineering','الهندسة':'Engineering','كلية الإعلان':'College of Advertising','كلية القانون':'College of Law','القانون':'Law','كلية جدة للإعلان':'Jeddah College of Advertising','كلية الهندسة وتقنية المعلومات':'College of Engineering and Information Technology',
  'كرة القدم':'Football','كرة السلة':'Basketball','كرة الطائرة':'Volleyball','كرة الطاولة':'Table Tennis','الريشة الطائرة':'Badminton','الشطرنج':'Chess','السباحة':'Swimming','التايكوندو':'Taekwondo','الكاراتيه':'Karate','البادل':'Padel','السهام':'Archery','ألعاب القوى':'Athletics','الرياضات الإلكترونية':'Esports','كرة القدم صالات':'Futsal','كرة القدم مصغرة':'Mini Football','كرة المناورة':'Dodgeball',
  'طلاب':'Male Students','طالبات':'Female Students','ذكر':'Male','أنثى':'Female','داخلي':'Internal','محلي':'Local','دولي':'International','جامعة الأعمال والتكنولوجيا':'University of Business and Technology','الإدارة الرياضية':'Sports Administration','الأنشطة الطلابية':'Student Activities','العمل التطوعي':'Volunteering',
  'معايير وشروط المنح الجزئية للطلبة الرياضيين':'Criteria and Conditions for Partial Scholarships for Student Athletes','النسخة المحدثة المعتمدة بالعربية والإنجليزية، وتشمل شروط الاستحقاق ونسب المنح 10% و20% و30%.':'The updated approved Arabic and English version, including eligibility requirements and scholarship rates of 10%, 20%, and 30%.','عرض الملف المحدث':'View Updated File','فتح نموذج الإقرار PDF':'Open Agreement PDF','فتح معايير وشروط المنح':'Open Scholarship Criteria','أقر بالاطلاع على معايير وشروط المنحة الرياضية والالتزام بها.':'I acknowledge reading and complying with the sports scholarship criteria and conditions.',
  'تقرير الشواهد':'Evidence Report','تقرير توثيق الأنشطة وفق متطلبات مؤشر الأداء.':'Activity documentation report based on performance indicator requirements.','فتح مركز الشواهد':'Open Evidence Center','مركز الشواهد وتوثيق الأنشطة':'Evidence and Activity Documentation Center','مبني على نموذج توثيق الأنشطة الطلابية وفق متطلبات مؤشر الأداء، ويتيح البحث والمراجعة واستخراج التقرير بنفس الحقول المعتمدة.':'Based on the student activities documentation template for performance indicator requirements, with search, review, and report generation using the approved fields.','تحميل نموذج Excel':'Download Excel Template','استيراد شواهد':'Import Evidence','توليد تقرير الشواهد':'Generate Evidence Report','تصدير Excel / CSV':'Export Excel / CSV','إجمالي سجلات الشواهد':'Total Evidence Records','سجل نشاط':'Activity records','شواهد مكتملة':'Complete Evidence','تحتوي على روابط توثيق كافية':'Contains sufficient documentation links','شواهد جزئية':'Partial Evidence','تحتاج استكمال بعض المرفقات':'Some attachments need completion','شواهد ناقصة':'Missing Evidence','لا تحتوي على توثيق كافٍ':'Does not contain sufficient documentation','كل الحالات':'All Statuses','الأيام':'Days','المستفيدون':'Beneficiaries','اللاعبون':'Players','نوع النشاط':'Activity Type','التصنيف الفرعي':'Subcategory','نوع اللعبة':'Game Type','النقاط':'Points','التفاصيل':'Details','تفاصيل الشاهد':'Evidence Details','اختر سجلًا من الجدول لعرض روابط الخبر والصور والنشر وحالة اكتمال التوثيق.':'Select a record to view news, images, publication links, and documentation status.','عدد أيام الفعالية':'Event Days','عدد المستفيدين':'Number of Beneficiaries','عدد اللاعبين':'Number of Players','إجمالي النقاط':'Total Points','توثيق الخبر':'News Documentation','رابط / وصف الخبر':'News Link / Description','رابط / وصف الصور':'Images Link / Description','رابط / وصف النشر':'Publication Link / Description','جزئي':'Partial','غير متوفر':'Not Available'
};

Object.assign(SAH_TEXT_EN,{"المستخدم الحالي":"Current User","مسؤول النظام":"System Administrator","مسؤول مؤشر الأداء الرياضي":"Sports Performance Indicator Officer","مسؤول المؤشر":"Indicator Officer","مدير النادي الرياضي":"Sports Club Manager","عميد شؤون الطلاب":"Dean of Student Affairs","مدرب رياضي":"Sports Coach","مدير الأنشطة الطلابية":"Student Activities Manager","حساب طالب":"Student Account","عضو هيئة التدريس":"Faculty Member","المؤشر العام":"General Dashboard","لوحة المؤشر العام":"General Dashboard","الشؤون الرياضية":"Sports Affairs","تقديم طلب تنفيذ بطولة/حدث":"Submit Championship / Event Request","تقديم طلب تنفيذ بطولة / حدث":"Submit Championship / Event Request","خدمات الطلبة":"Student Services","الأنشطة والفعاليات":"Activities & Events","الأندية الطلابية":"Student Clubs","صلاحيات عمادة شؤون الطلاب":"Student Affairs Approval Center","الخلاصة التنفيذية للمنصة":"Platform Executive Summary","آخر تحديث":"Last Updated","إجمالي الأنشطة المسجلة":"Total Registered Activities","جميع الأنشطة والشواهد":"All Activities and Evidence","أنشطة الطلاب":"Male Student Activities","أنشطة الطالبات":"Female Student Activities","إجمالي المستفيدين":"Total Beneficiaries","الطلاب والطالبات":"Male and Female Students","الطلبات قيد المراجعة":"Requests Under Review","نسبة الموافقة":"Approval Rate","توزيع الأنشطة":"Activity Distribution","عرض التفاصيل":"View Details","التوثيق العام":"Overall Documentation","اكتمال الشواهد":"Evidence Completion","مركز الشواهد":"Evidence Center","مكتمل":"Complete","غير مكتمل":"Incomplete","طلبات المنح الرياضية":"Sports Scholarship Applications","حالة المنح المقدمة":"Submitted Scholarship Status","إدارة المنح":"Manage Scholarships","طلب منحة":"Scholarship Application","موافق عليها":"Approved","مرفوضة":"Rejected","تحت المراجعة":"Under Review","الملخص التنفيذي للطلبات":"Executive Requests Summary","موافقات الأنشطة والأندية والطلبات":"Activity, Club, and Request Approvals","فتح صفحة الصلاحيات":"Open Approval Center","إجمالي الطلبات":"Total Requests","تمت الموافقة":"Approved","البطولات والأحداث الرياضية":"Sports Championships and Events","طلبات التنفيذ والمشاركة":"Execution and Participation Requests","تسجيل الأندية والمبادرات":"Club Registration and Initiatives","الفرص والطلبات التطوعية":"Volunteer Opportunities and Requests","إقرارات وطلبات اعتماد المنح":"Scholarship Agreements and Approval Requests","الطلبات المرتبطة بالأنشطة العامة":"General Activity Requests","المجالات الرئيسية":"Main Fields","توزيع الأنشطة حسب المجال":"Activities by Main Field","المؤشرات الرياضية":"Sports Indicators","الطلاب مقابل الطالبات":"Male vs Female Students","البطولات":"Championships","ملفات الرياضيين":"Athlete Profiles","الإدارة الرياضية":"Sports Administration","طلبات البطولات والأحداث":"Championship and Event Requests","حالة طلبات البطولات":"Championship Request Status","عرض الطلبات":"View Requests","طلب":"Request","مقبولة":"Approved","حالة المنح الرياضية":"Sports Scholarship Status","عرض المنح":"View Scholarships","التقارير والشواهد":"Reports and Evidence","اكتمال التقارير":"Report Completion","فتح التقارير":"Open Reports","مكتملة":"Complete","غير مكتملة":"Incomplete","البيانات المرتبطة بالإحصائية":"Records Related to the Selected Statistic","جميع طلبات البطولات":"All Championship Requests","عرض الكل":"Show All","وصول سريع إلى الصفحات المتخصصة.":"Quick access to specialized pages.","مؤشرات الطلاب والطالبات ونقاط المجالات.":"Male and female indicators and field points.","طلبات المنح ونسب الاستحقاق والاعتمادات.":"Scholarship requests, eligibility rates, and approvals.","تقديم الإقرار ومتابعة حالته.":"Submit the agreement and track its status.","بيانات الرياضيين والمشاركات والسجل الرياضي.":"Athlete data, participations, and sports history.","الشواهد والتوثيق وتحليل الأنشطة الرياضية.":"Evidence, documentation, and sports activity analysis.","تقديم الطلبات ومتابعة حالات الاعتماد.":"Submit requests and track approval status.","تعديل حاسبة النقاط":"Edit Points Calculator","إدارة المجالات":"Manage Fields","إجمالي اللاعبين":"Total Players","نقاط الطلاب المحققة":"Male Students' Achieved Points","نقاط الطالبات المحققة":"Female Students' Achieved Points","فتح نموذج الإقرار الإلكتروني":"Open Electronic Agreement Form","توزيع المنح":"Scholarship Distribution","حسب النسبة المستحقة":"By Eligible Rate","التوزيع الأكاديمي":"Academic Distribution","حسب الكلية":"By College","طلبات الإقرار والمنح":"Agreement and Scholarship Requests","مقبول مبدئيًا":"Preliminarily Approved","محال للعمادة":"Referred to the Deanship","معتمد نهائيًا":"Finally Approved","حالة الإقرار":"Agreement Status","النسبة المستحقة":"Eligible Rate","النموذج الإلكتروني":"Electronic Form","إقرار المنحة الرياضية":"Sports Scholarship Agreement","رقم الهوية":"National ID","الجنسية":"Nationality","اختر الفئة":"Select Category","اختر الكلية":"Select College","رفع الهوية":"Upload ID","التوقيع":"Signature","الاطلاع على نموذج الإقرار":"View Agreement Form","إرسال الإقرار للمراجعة":"Submit Agreement for Review","الإقرارات المرسلة":"Submitted Agreements","إجمالي أنشطة الفئة":"Total Category Activities","مستفيدو الطلاب":"Male Student Beneficiaries","مستفيدات الطالبات":"Female Student Beneficiaries","إجمالي مستفيدي الفئة":"Total Category Beneficiaries","توزيع الفئة المحددة":"Selected Category Distribution","التوزيع العام لجميع الأنشطة":"Overall Distribution of All Activities","الإحصائيات الشاملة":"Overall Statistics","الفئات النشطة":"Active Categories","موثقة بالكامل":"Fully Documented","تحتاج استكمال":"Needs Completion","اسم النشاط":"Activity Name","التوثيق":"Documentation","إنشاء فرصة تطوعية وإرسالها للاعتماد.":"Create a volunteer opportunity and submit it for approval.","نوع العمل التطوعي":"Volunteer Work Type","عدد الأفراد المطلوبين":"Required Number of Volunteers","اسم الحدث":"Event Name","وصف الحدث":"Event Description","تاريخ الحدث":"Event Date","الجهة الراعية":"Sponsor","الجهة المسؤولة":"Responsible Department","مكان الحدث":"Event Location","إرسال الطلب":"Submit Request","طلبات الفرص التطوعية":"Volunteer Opportunity Requests","المقبولة":"Approved","المرفوضة":"Rejected","الحدث":"Event","السعة":"Capacity","سبب الرفض":"Rejection Reason","الفعاليات المعتمدة المتاحة للتقديم":"Approved Events Available for Application","عدد الفعاليات التي شاركت فيها":"Events Participated In","عدد الفعاليات التي قدمت إليها":"Events Applied To","الفعاليات المقبولة والمتاحة":"Approved and Available Events","الفعالية":"Event","النوع":"Type","تاريخ التقديم":"Application Date","اسم الحدث/البطولة":"Event / Championship Name","اختر نوع اللعبة":"Select Sport","رياضة أخرى":"Other Sport","عدد المشاركين":"Number of Participants","عدد الفرق المشاركة":"Participating Teams","عدد الجامعات المشاركة":"Participating Universities","الحد الأقصى للمتقدمين":"Maximum Applicants","الفئة المستهدفة":"Target Category","اختر الفئة المستهدفة":"Select Target Category","الاثنان معًا":"Both","طلبات تنفيذ البطولات والأحداث":"Championship and Event Execution Requests","اللعبة":"Sport","طلبات الطلبة":"Student Applications","الإيميل":"Email","العمر":"Age","الجنس":"Gender","القرار":"Decision","إطلع على القواعد التنظيمية للأندية الطلابية":"View Student Club Regulations","عرض اللائحة":"View Regulations","تقديم طلب تسجيل نادي جديد":"Submit New Club Registration","مسؤول النادي":"Club Officer","هدف النادي":"Club Objective","شعار النادي":"Club Logo","إرسال طلب النادي":"Submit Club Request","تقديم طلب مبادرة / فعالية تابعة للنادي":"Submit Club Initiative / Event","النادي":"Club","اختر النادي المسجل":"Select Registered Club","الأفراد المشاركون وبياناتهم":"Participants and Their Details","المشرف المسؤول":"Responsible Supervisor","إرسال طلب الفعالية":"Submit Event Request","طلبات الأندية":"Club Requests","المشرف":"Supervisor","المسؤول":"Officer","الأعضاء":"Members","طلبات المبادرات والفعاليات":"Initiative and Event Requests","مراجعة واعتماد أو رفض جميع الطلبات.":"Review, approve, or reject all requests.","الموافقات":"Approvals","الرفض":"Rejections","عدد النوادي المسجلة":"Registered Clubs","قرارات الطلبات":"Request Decisions","نسبة الموافقات من إجمالي الطلبات":"Approval Rate of Total Requests","أنشطة الطالبات مقارنة بالطلاب":"Female vs Male Student Activities","توزيع أنشطة النوادي":"Club Activity Distribution","تفاصيل أنشطة النادي":"Club Activity Details","إغلاق":"Close","إجمالي الأنشطة":"Total Activities","المعتمدة":"Approved","عدد الأنشطة":"Number of Activities","الأنشطة المرتبطة":"Linked Activities","الإدارة":"Management","جميع الطلبات والقرارات":"All Requests and Decisions","كل أنواع الطلبات":"All Request Types","بطولة/حدث رياضي":"Sports Championship / Event","فرصة تطوعية":"Volunteer Opportunity","بحث":"Search","فلترة":"Filter","حفظ":"Save","إلغاء":"Cancel","تعديل":"Edit","حذف":"Delete","موافقة":"Approve","رفض":"Reject","تأكيد الرفض":"Confirm Rejection","سبب الرفض إلزامي.":"Rejection reason is required.","لا توجد نتائج مطابقة.":"No matching results.","لا توجد بيانات.":"No data available.","إضافة نشاط جديد":"Add New Activity","حفظ النشاط وإضافة النقاط":"Save Activity and Add Points","فئة الحدث":"Event Category","المجال الرئيسي":"Main Field","المجال الفرعي":"Subfield","نوع المشاركة":"Participation Type","ضيف":"Guest","مستضيف":"Host","رابط التوثيق":"Documentation Link","تقرير الاتحاد":"Federation Report","الجدول الزمني":"Schedule","النقاط المحتسبة":"Calculated Points","جميع الحقول أدناه إلزامية، بما فيها رابط التوثيق والملفات المرفقة.":"All fields below are required, including the documentation link and attachments.","يرجى تعبئة جميع البيانات المطلوبة.":"Please complete all required fields.","تم الحفظ بنجاح.":"Saved successfully.","تم إرسال الطلب بنجاح.":"Request submitted successfully.","لوحة موحدة تجمع أهم نتائج الشؤون الرياضية، الأنشطة الطلابية، الأندية، التطوع، الطلبات والتوثيق.":"A unified dashboard combining the key results of sports affairs, student activities, clubs, volunteering, requests, and documentation.","يشمل طلبات الأنشطة الطلابية، الأندية، البطولات الرياضية، الفرص التطوعية، والمنح الرياضية.":"Includes student activity, club, sports championship, volunteer opportunity, and sports scholarship requests.","ملخص إحصائي مباشر لطلبات البطولات والمنح والتقارير، مع إمكانية عرض البيانات المرتبطة بكل نتيجة.":"A live statistical summary of championship requests, scholarships, and reports, with direct access to the records behind each result.","اضغط على أي جزء من الرسوم أو النتائج أعلاه لعرض السجلات المرتبطة مباشرة.":"Select any chart segment or result above to display the related records directly.","مراجعة طلبات الإقرار، تحديد نسبة الاستحقاق، ثم إحالتها إلى صلاحيات عمادة شؤون الطلاب.":"Review agreement requests, determine the eligible rate, then refer them to the Student Affairs approval center.","تحديد النسبة شرط أساسي قبل الموافقة، وسبب الرفض إلزامي عند الرفض.":"Selecting the rate is required before approval, and a rejection reason is mandatory.","تظهر الطلبات فور إرسال النموذج وتتابع حالتها من هنا.":"Requests appear immediately after submission, and their status can be tracked here.","تتحدث البيانات مباشرة من جدول التقارير والتحليلات حسب فئة الحدث.":"Data updates directly from the Reports & Analytics table according to event category.","يشترط ثلاثة أيام على الأقل بين التقديم والحدث.":"At least three days are required between submission and the event date.","تأسيس نادٍ جديد أو تقديم مبادرة/فعالية تابعة لنادٍ.":"Create a new club or submit a club initiative/event.","اضغط لفتح اللائحة التنظيمية في نافذة جديدة":"Select to open the regulations in a new window.","تظهر هنا النوادي المفعلة والنوادي التي تمت الموافقة عليها.":"Active and approved clubs appear here.","المنح الرياضية":"Sports Scholarships","الطلاب":"Students","الطالبات":"Female students","إدارة المنح ←":"Manage scholarships ←","عرض الطلبات ←":"View requests ←","عرض المنح ←":"View scholarships ←","فتح التقارير ←":"Open reports ←","المجال":"Field","الفئة":"Category","الكلية":"College","التاريخ":"Date","المكان":"Location","الأنشطة الرياضية":"Activities sports","إجمالي الطلاب المستفيدين":"Total students beneficiaries","الأنشطة المسجلة":"Activities registered","عدد المستفيدين":"Number of beneficiaries","لا توجد طلبات مطابقة.":"No matching requests.","لا توجد طلبات منح مطابقة.":"No matching scholarship applications.","لا توجد تقارير مطابقة.":"No matching reports.","طلبات البطولات":"Championship Requests","تقارير الطلاب":"Male Student Reports","تقارير الطالبات":"Female Student Reports","حالة التوثيق":"Documentation Status","نسبة الاكتمال":"Completion Rate","غير محدد":"Not Specified","غير متوفرة":"Not Available","غير محددة":"Not Specified","جميع السجلات":"All Records","تأكيد":"Confirm","تم القبول":"Approved","تم الرفض":"Rejected","لا يمكن رفض الطلب دون كتابة السبب.":"A rejection reason is required.","اكتب سبب الرفض هنا...":"Enter the rejection reason...","كل الحالات":"All Statuses","كل الأعمدة":"All Columns","ابحث داخل بيانات الأنشطة":"Search activity data"});
Object.assign(SAH_TEXT_EN,{"0 / 0 نقطة":"0 / 0 points","0 / 35 كلمة":"0 / 35 words","0 معتمدة":"0 approved","0 نشاط":"0 activities","0 نشاط نادي":"0 club activities","0 نقطة":"0 points","0% من الأنشطة":"0% of activities","0% نسبة الموافقة":"0% approval rate","أدوات النظام":"System Tools","إجمالي الطالبات المستفيدات":"Total Female Beneficiaries","إدارة البيانات والتعديل اليدوي":"Data Management and Manual Editing","إدارة مجالات مؤشر الأداء الرياضي":"Manage Sports Performance Indicator Fields","إضافة سجل":"Add Record","إضافة نشاط":"Add Activity","إضافة وتعديل وحذف بيانات المنصة من الواجهة دون فتح الكود، مع حفظ التعديلات محليًا في هذه النسخة.":"Add, edit, and delete platform data from the interface without opening the code; changes are saved locally in this version.","إضافة، تعديل، حذف، اعتماد":"Add, Edit, Delete, Approve","إلغاء التعديلات المحلية":"Discard Local Changes","اختر فئة":"Select Category","اختر فئة الحدث":"Select Event Category","اختر من القائمة أدناه":"Select from the list below","اختر ناديًا لعرض أنشطته":"Select a club to view its activities","اختر نوع المشاركة":"Select Participation Type","استعادة الإعدادات الافتراضية":"Restore Default Settings","استعادة الإعدادات السابقة":"Restore Previous Settings","استعادة القيم الأصلية":"Restore Original Values","استيراد نسخة احتياطية":"Import Backup","اضغط على أي نسبة أو بطاقة أو مجال لعرض السجلات المرتبطة مباشرة في الجدول أدناه.":"Select any percentage, card, or field to display the related records in the table below.","اضغط لعرض النوادي وأنشطتها":"Select to view clubs and their activities","اعتمادات المنح الرياضية":"Sports Scholarship Approvals","الأرقام التالية مستخرجة من الملفات المعتمدة المرفوعة: قوائم المنح، روزنامة الاتحاد، ودليل مؤشر الأداء الرياضي.":"The following figures are extracted from the approved uploaded files: scholarship lists, federation calendar, and sports performance indicator guide.","الأعضاء (10 على الأقل، كل اسم في سطر)":"Members (at least 10, one name per line)","الأنشطة حسب المجالات الرئيسية":"Activities by Main Fields","الأنشطة و البرامج المجتمعية و التطوعية":"Community and Volunteer Activities and Programs","الإجراءات":"Actions","الاحتساب مبني على دليل مؤشر الأداء الرياضي فقط.":"Calculation is based only on the Sports Performance Indicator Guide.","البلياردو":"Billiards","البيانات غير المكتملة":"Incomplete Data","التقارير والتحليلات ←":"Reports & Analytics ←","التنس":"Tennis","التوزيع الديناميكي":"Dynamic Distribution","الجامعات المشاركة":"Participating Universities","الجودو":"Judo","الشعارات":"Logos","الصف الأول: البحث + عمود البحث + فلتر الاكتمال + حذف المحدد":"First row: search + search column + completion filter + delete selected","الصف الثاني: تحديد الكل + الفئة + الحالة":"Second row: select all + category + status","الطلبات المحالة من صفحة المنح الرياضية لاعتماد النسبة النهائية أو رفضها مع السبب.":"Requests referred from the Sports Scholarships page to approve the final rate or reject with a reason.","العنوان":"Title","الفئة/السعة":"Category / Capacity","الفعاليات المعتمدة المتاحة للتقديم ومتابعة حالة الطلبات.":"Approved events available for application and request status tracking.","الكرة الطائرة":"Volleyball","المجال المرتبط":"Linked Field","المستخدمون الرئيسيون":"Primary Users","المعبأة بالكامل فقط":"Fully Completed Only","النسبة المقترحة":"Proposed Rate","النوادي المسجلة والمفعلة":"Registered and Active Clubs","بالضغط على الزر فإنني أقر بأنني قرأت الإقرار وأوافق على شروطه.":"By selecting this checkbox, I confirm that I have read the agreement and accept its terms.","بعد البحث والتصفية":"After Search and Filtering","بوابة مؤسسية تجمع الإدارة الرياضية، الأنشطة الطلابية، العمل التطوعي، التقويم، وبوابة الطالب بهوية جامعة الأعمال والتكنولوجيا.":"An institutional portal combining sports administration, student activities, volunteering, calendar, and the student portal under UBT identity.","تتحدث القائمة تلقائيًا عند اعتماد نادي جديد، ويمكن تعديل النادي أو حذفه.":"The list updates automatically when a new club is approved; clubs can be edited or deleted.","تحديث العرض":"Refresh View","تحديد الكل":"Select All","تختفي الفعالية من القائمة بعد الضغط على قدم الآن.":"The event is removed from the list after selecting Apply Now.","تسجيل نادي جديد":"Register New Club","تصدير نسخة احتياطية":"Export Backup","تظهر الأنشطة القديمة والجديدة تلقائيًا.":"Old and new activities appear automatically.","تعديل حاسبة النقاط للمجالات":"Edit Field Points Calculator","تنس الطاولة":"Table Tennis","توثيق أنشطة الطالبات":"Female Student Activity Documentation","توثيق أنشطة الطلاب":"Male Student Activity Documentation","تُحسب النقاط تلقائيًا حسب المجال والفئة ونوع المشاركة، ثم تُضاف مباشرة إلى مؤشر الطلاب أو الطالبات.":"Points are calculated automatically by field, category, and participation type, then added directly to the male or female indicator.","جميع الأعمدة":"All Columns","جميع الأنشطة المسجلة":"All Registered Activities","ح":"H","حدد قيمة كل نوع من النقاط وحده الأقصى لكل مجال فرعي، ثم احفظ لإعادة حساب جميع الأنشطة.":"Set each point value and its maximum for every subfield, then save to recalculate all activities.","حذف المحدد":"Delete Selected","حفظ التعديلات":"Save Changes","حفظ الحاسبة":"Save Calculator","حفظ المجالات وتحديث الأقسام":"Save Fields and Update Sections","حفظ وتحديث المؤشر":"Save and Update Indicator","صلاحية المستخدم":"User Role","ضمن الفئة المحددة":"Within the Selected Category","طلب تنفيذ بطولة / حدث":"Championship / Event Execution Request","عدد الأيام":"Number of Days","عدد السجلات":"Number of Records","عدد اللاعبين المشاركين":"Participating Players","عدّل اسم المجال أو المسار، احذف مجالًا، أو أضف مجالًا جديدًا. تنعكس التغييرات تلقائيًا على التقارير ونموذج إضافة النشاط.":"Edit a field or track name, delete a field, or add a new one. Changes are reflected automatically in reports and the Add Activity form.","عدّل الحد الأعلى لكل مجال. يُعاد احتساب الإجمالي والنسب والرسوم مباشرة بعد الحفظ.":"Edit the maximum for each field. Totals, percentages, and charts are recalculated immediately after saving.","عدّل الحقول ثم اضغط حفظ.":"Edit the fields, then select Save.","عرض التفاصيل ←":"View Details ←","عرض اللائحة ↗":"View Regulations ↗","عرض المعايير والشروط ↗":"View Criteria and Conditions ↗","عنوان المنصة":"Platform Title","فتح صفحة الصلاحيات ←":"Open Approval Center ←","كاملة":"Complete","كرة اليد":"Handball","كل تعديل في هذه النسخة يُحفظ داخل المتصفح عبر Local Storage. عند التنفيذ الرسمي تُستبدل هذه الطبقة بقاعدة بيانات وصلاحيات دخول Microsoft.":"Every change in this version is saved in the browser using Local Storage. In production, this layer will be replaced by a database and Microsoft sign-in permissions.","كل مجال يعرض الحد الأعلى والنقاط المحققة للطلاب والطالبات بشكل منفصل.":"Each field displays its maximum and the points achieved by male and female students separately.","كل مستويات الاكتمال":"All Completion Levels","مؤشر الأداء ←":"Performance Indicator ←","ما لم تتم إضافته":"Not Yet Added","مبادرة/فعالية نادي":"Club Initiative / Event","مجموعة البيانات الحالية":"Current Dataset","مركز الشواهد ←":"Evidence Center ←","مسؤول النظام، مسؤول المؤشر، العميد":"System Administrator, Indicator Officer, Dean","مقدم الطلب":"Submitted By","مكتملة التوثيق":"Fully Documented","منح تحت المراجعة":"Scholarships Under Review","منح مرفوضة":"Rejected Scholarships","منح موافق عليها":"Approved Scholarships","نسبة أنشطة الطالبات من الأنشطة المعتمدة":"Female activity percentage of approved activities","نسبة أنشطة الطلاب من إجمالي أنشطة الفئة":"Male activity percentage of total category activities","نسبة أنشطة الطلاب من جميع الأنشطة المسجلة":"Male activity percentage of all registered activities","نسبة اكتمال الحدث":"Event Completion Rate","نسبة مساهمة كل نادٍ من إجمالي أنشطة النوادي":"Each club's contribution to total club activities","نشاط":"Activity","نموذج التقرير":"Report Template","نموذج الجدول الزمني":"Schedule Template","نوع الطلب":"Request Type","نوع اللعبة / النشاط":"Sport / Activity Type","هذه الصلاحية متاحة لمسؤول مؤشر الأداء الرياضي فقط. تحفظ القيم في المتصفح لهذه النسخة التجريبية.":"This permission is available only to the Sports Performance Indicator Officer. Values are stored in the browser for this demo version.","يتحدث المخطط تلقائيًا عند إضافة مجال رئيسي جديد أو تعديل المجالات الحالية.":"The chart updates automatically when a new main field is added or existing fields are edited.","يتم ضبط كل بند على شكل قيمتين: قيمة النقاط، والحد الأقصى الذي لا يمكن تجاوزه. اجعل الحد الأقصى (0) إذا أردت عدم تطبيق حد على ذلك البند.":"Each item has two values: points and a maximum cap. Set the maximum to 0 to apply no cap.","✎ إدارة المجالات والمسارات":"✎ Manage Fields and Tracks","✎ تعديل النوادي":"✎ Edit Clubs","＋ إضافة مجال إلى المسار المحدد":"＋ Add Field to Selected Track","＋ إضافة مجال فرعي":"＋ Add Subfield","＋ إضافة مجال ومسار جديد":"＋ Add New Field and Track"});
Object.assign(SAH_TEXT_EN,{"مسار البطولات الوطنية":"National Championships Track","مسار الأنشطة المركزية":"Central Activities Track","مسار الأنشطة الرياضية الداخلية":"Internal Sports Activities Track","مسار المشاركات الدولية":"International Participation Track","البطولات الوطنية":"National Championships","استضافة البطولات الوطنية":"Hosting National Championships","البطولات التنشيطية":"Recreational Championships","البرامج التدريبية المركزية":"Central Training Programs","الشراكة المجتمعية":"Community Partnership","اللقاءات والفعاليات الرياضية التبادلية":"Exchange Sports Meetings and Events","تشغيل المرافق":"Facility Operations","النشاط الرياضي التنافسي الداخلي":"Internal Competitive Sports Activity","النشاط البدني والترويحي الداخلي":"Internal Physical and Recreational Activity","الأيام العالمية":"International Days","البرامج التدريبية الداخلية":"Internal Training Programs","البرامج التوعوية":"Awareness Programs","الكوادر العاملة في النشاط الرياضي":"Sports Activity Staff","التطوع":"Volunteering","مشاركة الجامعات في المنتخبات الجامعية في المناسبات الدولية":"University Participation in National University Teams at International Events","استضافة المشاركات الدولية للجامعات":"Hosting International University Participation","بطولة وطنية":"National Championship","استضافة بطولة وطنية":"Hosting a National Championship","تنفيذ بطولة تنشيطية":"Conducting a Recreational Championship","دورة مركزية ( حضورية )":"Central Course (In Person)","ورشة عمل مركزية ( حضورية )":"Central Workshop (In Person)","دورة مركزية ( عن بعد )":"Central Course (Online)","ورشة عمل مركزية ( عن بعد )":"Central Workshop (Online)","شراكة مجتمعية":"Community Partnership","لقاء تبادلي":"Exchange Meeting","تشغيل مرافق":"Facility Operations","جماعية":"Team","فردية":"Individual","ذوي الإعاقة":"Persons with Disabilities","خطة تشغيلية":"Operational Plan","نشاط ترويحي":"Recreational Activity","نشاط بدني":"Physical Activity","يوم عالمي":"International Day","يوم وطني":"National Day","ورشة عمل":"Workshop","دورة تدريبية":"Training Course","محاضرة":"Lecture","نشرة توعوية":"Awareness Bulletin","فيديو توعوي":"Awareness Video","الكوادر":"Staff","متطوع":"Volunteer","فرق متطوعين":"Volunteer Teams","مشاركة اللاعبين في منتخبات المملكة دوليًا":"Players Participating in National Teams Internationally","لقاء ودي بين الجامعات الدولية":"Friendly Match Between International Universities","استضافة بطولة دولية":"Hosting an International Championship","مجال تجريبي":"Test Field","المسار التجريبي":"Test Track","مجال":"Field","مسار":"Track","الحد الأعلى":"Maximum","نقاط الطلاب":"Male Points","إنجاز الطلاب":"Male Achievement","نقاط الطالبات":"Female Points","إنجاز الطالبات":"Female Achievement","المجال الرئيسي المرتبط":"Linked Main Field","اسم المجال الفرعي":"Subfield Name","نقاط المشاركة كضيف":"Guest Participation Points","نقاط المشاركة كمستضيف":"Host Participation Points","نقاط كل جامعة مشاركة":"Points per Participating University","نقاط كل لاعب مشارك":"Points per Participating Player","الحد الأقصى":"Maximum","النقاط":"Points","غير مرتبط":"Not Linked","مجال جديد":"New Field","مسار جديد":"New Track","حفظ المجالات وتحديث الأقسام":"Save Fields and Update Sections","إضافة مجال إلى المسار المحدد":"Add Field to Selected Track","إضافة مجال ومسار جديد":"Add New Field and Track","إضافة مجال فرعي":"Add Subfield"});
const SAH_TEXT_AR = Object.fromEntries(Object.entries(SAH_TEXT_EN).map(([ar,en])=>[en,ar]));
const SAH_PHRASES = Object.entries(SAH_TEXT_EN).sort((a,b)=>b[0].length-a[0].length);
function translateLoose(text,lang){
  const raw=String(text??'');
  const trimmed=raw.trim();
  if(!trimmed)return raw;

  const lead=raw.match(/^\s*/)?.[0]||'';
  const trail=raw.match(/\s*$/)?.[0]||'';

  if(lang==='ar'){
    return lead+(SAH_TEXT_AR[trimmed]||trimmed)+trail;
  }

  if(SAH_TEXT_EN[trimmed]){
    return lead+SAH_TEXT_EN[trimmed]+trail;
  }

  // Translate only safe numeric system labels. Never partially translate
  // arbitrary Arabic text or entered data.
  const numericPatterns=[
    [/^(\d[\d,]*)\s*نشاط$/,'$1 activities'],
    [/^(\d[\d,]*)\s*نشاط نادي$/,'$1 club activities'],
    [/^(\d[\d,]*)\s*طلب$/,'$1 requests'],
    [/^(\d[\d,]*)\s*طلب منحة$/,'$1 scholarship applications'],
    [/^(\d[\d,]*)\s*\/\s*(\d[\d,]*)\s*نقطة$/,'$1 / $2 points'],
    [/^(\d[\d,]*)\s*نقطة$/,'$1 points'],
    [/^(\d[\d,]*)\s*مقعد$/,'$1 seats'],
    [/^(\d[\d,]*)\s*عضو$/,'$1 members'],
    [/^(\d[\d,]*)\s*طالب$/,'$1 male students'],
    [/^(\d[\d,]*)\s*طالبة$/,'$1 female students'],
    [/^(\d[\d,]*)\s*طلاب$/,'$1 male students'],
    [/^(\d[\d,]*)\s*طالبات$/,'$1 female students'],
    [/^(\d[\d,]*)\s*مجال$/,'$1 fields'],
    [/^(\d[\d,]*)\s*سجل$/,'$1 records'],
    [/^(\d[\d,]*)\s*معتمدة$/,'$1 approved'],
    [/^(\d[\d,]*)\s*مكتمل$/,'$1 complete'],
    [/^(\d[\d,]*)\s*غير مكتمل$/,'$1 incomplete']
  ];

  for(const [pattern,replacement] of numericPatterns){
    if(pattern.test(trimmed)){
      return lead+trimmed.replace(pattern,replacement)+trail;
    }
  }

  return raw;
}

const SAH_ORIGINAL_TEXT=new WeakMap();
const SAH_ORIGINAL_PLACEHOLDER=new WeakMap();
const SAH_ORIGINAL_OPTION_TEXT=new WeakMap();

function rememberOriginalText(node){
  if(!SAH_ORIGINAL_TEXT.has(node)){
    SAH_ORIGINAL_TEXT.set(node,node.textContent);
  }
  return SAH_ORIGINAL_TEXT.get(node);
}

function translatePlaceholders(lang){
  $$('input[placeholder],textarea[placeholder]').forEach(element=>{
    if(!SAH_ORIGINAL_PLACEHOLDER.has(element)){
      SAH_ORIGINAL_PLACEHOLDER.set(
        element,
        element.getAttribute('placeholder')||''
      );
    }
    const original=SAH_ORIGINAL_PLACEHOLDER.get(element);
    element.setAttribute(
      'placeholder',
      lang==='en'?translateLoose(original,'en'):original
    );
  });

  $$('option').forEach(option=>{
    if(!SAH_ORIGINAL_OPTION_TEXT.has(option)){
      SAH_ORIGINAL_OPTION_TEXT.set(option,option.textContent);
    }
    const original=SAH_ORIGINAL_OPTION_TEXT.get(option);
    option.textContent=lang==='en'
      ? translateLoose(original,'en')
      : original;
  });
}

function shouldSkipTranslationNode(node){
  const parent=node.parentElement;
  if(!parent)return true;
  if(['SCRIPT','STYLE','SVG','PATH','CANVAS'].includes(parent.tagName))return true;
  if(parent.closest('[data-no-translate],.identity-card'))return true;
  if(parent.matches('input,textarea'))return true;
  return !node.textContent.trim();
}

function translateStatic(lang,root=document){
  const roots=root===document
    ? [$('#app'),$('#login')].filter(Boolean)
    : [root];

  roots.forEach(currentRoot=>{
    const walker=document.createTreeWalker(
      currentRoot,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node){
          return shouldSkipTranslationNode(node)
            ? NodeFilter.FILTER_REJECT
            : NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    const nodes=[];
    while(walker.nextNode())nodes.push(walker.currentNode);

    nodes.forEach(node=>{
      const original=rememberOriginalText(node);
      node.textContent=lang==='en'
        ? translateLoose(original,'en')
        : original;
    });
  });

  translatePlaceholders(lang);
}

function relocalizeSoon(){
  clearTimeout(window.__sahI18nTimer);
  window.__sahI18nTimer=setTimeout(()=>{
    translateStatic(document.documentElement.lang||'ar');
  },30);
}

function observeDynamicTranslations(){
  window.__sahTranslationObserver?.disconnect();

  const observer=new MutationObserver(mutations=>{
    const lang=document.documentElement.lang||'ar';

    mutations.forEach(mutation=>{
      mutation.addedNodes.forEach(node=>{
        if(node.nodeType===Node.TEXT_NODE){
          if(!shouldSkipTranslationNode(node)){
            const original=rememberOriginalText(node);
            node.textContent=lang==='en'
              ? translateLoose(original,'en')
              : original;
          }
          return;
        }

        if(node.nodeType===Node.ELEMENT_NODE){
          translateStatic(lang,node);
        }
      });
    });
  });

  observer.observe(document.body,{
    childList:true,
    subtree:true
  });

  window.__sahTranslationObserver=observer;
}

// === SAH V5: theme + bilingual UI ===
const SAH_I18N = {
  ar: {
    'nav.home':'الرئيسية','nav.sports':'الإدارة الرياضية','nav.indicator':'مؤشر الأداء الرياضي','nav.scholarships':'المنح الرياضية','nav.agreement':'الإقرار الإلكتروني للمنح','nav.championships':'البطولات الرياضية','nav.athletes':'ملف الطالب الرياضي','nav.activities':'الأنشطة الطلابية العامة','nav.volunteer':'العمل التطوعي','nav.student':'بوابة الطالب','nav.calendar':'التقويم الموحد','nav.requests':'طلبات التسجيل','nav.reports':'التقارير والتحليلات',
    'brand.en':'Student Activities Platform','brand.ar':'منصة الأنشطة الطلابية','user.hello':'مرحباً، حسام الحسين','user.role':'مسؤول تطوير منصة الأنشطة الطلابية','home.eyebrow':'عمادة شؤون الطلاب','home.title':'منصة واحدة لإدارة الأنشطة والخدمات الطلابية','btn.sports':'الدخول للإدارة الرياضية','btn.student':'عرض بوابة الطالب','home.modules':'وحدات المنصة','home.dataSummary':'ملخص البيانات المستوردة','indicator.title':'مؤشر الأداء الرياضي','indicator.referenceTitle':'مرجعية احتساب المؤشر','indicator.referenceText':'يعتمد احتساب المؤشر على دليل مؤشر الأداء الرياضي الصادر من الاتحاد السعودي للرياضة الجامعية.','indicator.male':'مؤشر الأداء الرياضي - الطلاب','indicator.female':'مؤشر الأداء الرياضي - الطالبات','sports.title':'الإدارة الرياضية','sports.eyebrow':'وحدة الإدارة الرياضية','sports.heroTitle':'كل ما يخص الرياضة في صفحة واحدة'
  },
  en: {
    'nav.home':'Home','nav.sports':'Sports Administration','nav.indicator':'Sports Performance Indicator','nav.scholarships':'Sports Scholarships','nav.agreement':'Scholarship E-Agreement','nav.championships':'Sports Championships','nav.athletes':'Athlete Profile','nav.activities':'General Student Activities','nav.volunteer':'Volunteering','nav.student':'Student Portal','nav.calendar':'Unified Calendar','nav.requests':'Registration Requests','nav.reports':'Reports & Analytics',
    'brand.en':'Student Activities Platform','brand.ar':'Student Activities Platform','user.hello':'Welcome, Hussam Alhussain','user.role':'Student Activities Platform Development Officer','home.eyebrow':'Deanship of Student Affairs','home.title':'One platform for student activities and services','btn.sports':'Open Sports Administration','btn.student':'View Student Portal','home.modules':'Platform modules','home.dataSummary':'Imported data summary','indicator.title':'Sports Performance Indicator','indicator.referenceTitle':'Indicator calculation reference','indicator.referenceText':'The indicator is calculated based on the Sports Performance Indicator Guide issued by the Saudi Universities Sports Federation.','indicator.male':'Sports Performance Indicator - Male students','indicator.female':'Sports Performance Indicator - Female students','sports.title':'Sports Administration','sports.eyebrow':'Sports Administration Module','sports.heroTitle':'Everything related to sports in one place'
  }
};
function applyLanguage(lang){
  const selected=lang==='en'?'en':'ar';
  const dict=SAH_I18N[selected]||SAH_I18N.ar;

  document.documentElement.lang=selected;
  document.documentElement.dir=selected==='en'?'ltr':'rtl';
  document.body.classList.toggle('lang-en',selected==='en');
  $('#app')?.classList.toggle('is-ltr',selected==='en');

  $$('[data-i18n]').forEach(element=>{
    const key=element.dataset.i18n;
    if(dict[key])element.textContent=dict[key];
  });

  translateStatic(selected);

  const button=$('#langToggle');
  if(button){
    button.textContent=selected==='en'?'AR':'EN';
    button.title=selected==='en'
      ? 'Switch to Arabic'
      : 'Switch to English';
  }

  document.title='Student Activities Platform | UBT';
  localStorage.setItem('sah-lang',selected);
}

function switchLanguage(){
  const next=document.documentElement.lang==='en'?'ar':'en';
  localStorage.setItem('sah-lang',next);
  window.location.reload();
}

function initPreferences(){
  document.body.classList.remove('theme-dark');
  localStorage.removeItem('sah-theme');

  const storedLang=localStorage.getItem('sah-lang')==='en'
    ? 'en'
    : 'ar';

  applyLanguage(storedLang);

  const button=$('#langToggle');
  if(button){
    button.replaceWith(button.cloneNode(true));
    $('#langToggle')?.addEventListener('click',switchLanguage);
  }

  observeDynamicTranslations();
}
window.addEventListener('DOMContentLoaded',initPreferences);

/* ==========================================================
   SAH V15 — unified roles, calculators, activities and evidence
   ========================================================== */
(function () {
  'use strict';

  const KEYS = {
    role: 'sah-v15-role',
    sidebar: 'sah-v15-sidebar-collapsed',
    limits: 'sah-v15-indicator-limits',
    limitsPrevious: 'sah-v15-indicator-limits-previous',
    calculator: 'sah-v15-field-calculator',
    calculatorPrevious: 'sah-v15-field-calculator-previous',
    activities: 'sah-v15-local-activities',
    fields: 'sah-v18-indicator-fields',
    subfields: 'sah-v20-9-indicator-subfields',
    fieldMigration: 'sah-v19-field-migration',
    overrides: 'sah-v15-evidence-overrides',
    deleted: 'sah-v15-evidence-deleted'
  };

  const ROLE_META = {
    system:{name:'حسام الحسين',description:'مسؤول النظام',avatar:'ح'},
    indicator:{name:'سهيل الكعكي',description:'مسؤول مؤشر الأداء الرياضي',avatar:'س'},
    sports_manager:{name:'مجدي البلوشي',description:'مدير النادي الرياضي',avatar:'م'},
    dean:{name:'د. محمد المقدم',description:'عميد شؤون الطلاب',avatar:'د'},
    coach:{name:'كابتن محمد نفار',description:'مدرب رياضي',avatar:'ن'},
    activities_manager:{name:'الأستاذ فهد',description:'مدير الأنشطة الطلابية',avatar:'ف'},
    student_account:{name:'فلان الفلاني',description:'حساب طالب',avatar:'ط'},
    faculty:{name:'د. كريم سليمان',description:'عضو هيئة التدريس',avatar:'ك'}
  };

  const SPORTS_MANAGER_PAGES = new Set([
    'sports', 'scholarships', 'championships',
    'athletes', 'reports', 'calendar'
  ]);

  const FILE_URLS = new Map();
  let baselineIndicator = [];
  let currentEvidenceRows = [];
  let originalLimits = [];

  function readJson(key, fallback) {
    try {
      const parsed = JSON.parse(localStorage.getItem(key) || 'null');
      return parsed ?? fallback;
    } catch (error) {
      console.warn(`تعذر قراءة ${key}`, error);
      return fallback;
    }
  }

  function writeJson(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function activeRole() {
    return document.getElementById('activeRole')?.value || 'system';
  }

  function isIndicatorOfficer() {
    return activeRole() === 'indicator';
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function closeAllFeatureModals() {
    ['indicatorSettingsModal', 'fieldPointsCalculatorModal', 'addActivityModal']
      .forEach(closeModal);
  }

  const REQUESTED_FIELDS = [
    {track:'مسار البطولات الوطنية',field:'البطولات الوطنية'},
    {track:'مسار البطولات الوطنية',field:'استضافة البطولات الوطنية'},
    {track:'مسار الأنشطة المركزية',field:'البطولات التنشيطية'},
    {track:'مسار الأنشطة المركزية',field:'البرامج التدريبية المركزية'},
    {track:'مسار الأنشطة المركزية',field:'الشراكة المجتمعية'},
    {track:'مسار الأنشطة المركزية',field:'اللقاءات والفعاليات الرياضية التبادلية'},
    {track:'مسار الأنشطة المركزية',field:'تشغيل المرافق'},
    {track:'مسار الأنشطة الرياضية الداخلية',field:'النشاط الرياضي التنافسي الداخلي'},
    {track:'مسار الأنشطة الرياضية الداخلية',field:'النشاط البدني والترويحي الداخلي'},
    {track:'مسار الأنشطة الرياضية الداخلية',field:'الأيام العالمية'},
    {track:'مسار الأنشطة الرياضية الداخلية',field:'البرامج التدريبية الداخلية'},
    {track:'مسار الأنشطة الرياضية الداخلية',field:'البرامج التوعوية'},
    {track:'مسار الأنشطة الرياضية الداخلية',field:'الكوادر العاملة في النشاط الرياضي'},
    {track:'مسار الأنشطة الرياضية الداخلية',field:'التطوع'},
    {track:'مسار المشاركات الدولية',field:'مشاركة الجامعات في المنتخبات الجامعية في المناسبات الدولية'},
    {track:'مسار المشاركات الدولية',field:'استضافة المشاركات الدولية للجامعات'}
  ];

  function defaultIndicatorFields(){
    const current = window.SAH_DATA?.indicatorFields || [];
    return REQUESTED_FIELDS.map((item,index)=>{
      const same = current.find(field=>field.field===item.field);
      const fallback = current[index] || {};
      return {
        track:item.track,
        field:item.field,
        max:Number(same?.max ?? fallback.max ?? 0),
        male:Number(same?.male ?? fallback.male ?? 0),
        female:Number(same?.female ?? fallback.female ?? 0)
      };
    });
  }

  function loadIndicatorFieldConfig(){
    const saved = readJson(KEYS.fields,null);
    if(!Array.isArray(saved) || !saved.length) return defaultIndicatorFields();
    return saved.map((item,index)=>({
      track:String(item.track||'مسار جديد').trim(),
      field:String(item.field||`مجال ${index+1}`).trim(),
      max:Math.max(0,Number(item.max)||0),
      male:0,
      female:0
    }));
  }

  function applyIndicatorFieldConfig(){
    const configured = loadIndicatorFieldConfig();
    const current = window.SAH_DATA?.indicatorFields || [];
    SAH_DATA.indicatorFields = configured.map((item,index)=>{
      const same = current.find(field=>field.field===item.field) || current[index] || {};
      return {
        ...item,
        male:Number(same.male)||0,
        female:Number(same.female)||0
      };
    });
  }

  function initializeIndicatorBaseline() {
    applyIndicatorFieldConfig();
    const fields = window.SAH_DATA?.indicatorFields || [];
    baselineIndicator = fields.map(field => ({
      male: Number(field.male) || 0,
      female: Number(field.female) || 0,
      max: Number(field.max) || 0
    }));
    originalLimits = baselineIndicator.map(field => field.max);
  }

  function applyRolePermissions() {
    const role = activeRole();
    localStorage.setItem(KEYS.role, role);

    const meta = ROLE_META[role] || ROLE_META.system;
    setText('#activeUserName', meta.name);
    setText('#activeUserRole', meta.description);
    setText('#activeUserAvatar', meta.avatar);

    document.querySelectorAll('.nav button[data-page]').forEach(button => {
      const allowed = role !== 'sports_manager' ||
        SPORTS_MANAGER_PAGES.has(button.dataset.page);
      button.classList.toggle('role-hidden', !allowed);
    });

    document.querySelectorAll('.nav-group').forEach(group => {
      const hasVisible = [...group.querySelectorAll('.nav-items button[data-page]')]
        .some(button => !button.classList.contains('role-hidden'));
      group.classList.toggle('empty-role-group', !hasVisible);
    });

    const indicatorOnly = isIndicatorOfficer();
    document.getElementById('indicatorPermissionSettings')
      ?.classList.toggle('hidden', !indicatorOnly);
    document.getElementById('openFieldPointsCalculator')
      ?.classList.toggle('hidden', !indicatorOnly);
    document.getElementById('indicatorFieldsManagerButton')
      ?.classList.toggle('hidden', !indicatorOnly);

    if (!indicatorOnly) {
      closeModal('indicatorSettingsModal');
      closeModal('fieldPointsCalculatorModal');
      closeModal('indicatorFieldsManagerModal');
    }

    const activePage = document.querySelector('.page.active')
      ?.id.replace('page-', '');
    if (role === 'sports_manager' &&
        activePage &&
        !SPORTS_MANAGER_PAGES.has(activePage)) {
      originalRoute('sports');
    }
  }

  const originalRoute = window.route;
  window.route = function (pageId) {
    if (activeRole() === 'sports_manager' &&
        !SPORTS_MANAGER_PAGES.has(pageId)) {
      showToast('هذه الصفحة غير متاحة لمدير النشاط الرياضي.');
      pageId = 'sports';
    }
    originalRoute(pageId);
  };

  function initSidebar() {
    document.querySelectorAll('.nav-group-title').forEach(title => {
      title.addEventListener('click', () => {
        const selected = title.closest('.nav-group');
        if (!selected) return;
        const open = !selected.classList.contains('open');

        document.querySelectorAll('.nav-group').forEach(group => {
          const state = group === selected && open;
          group.classList.toggle('open', state);
          group.querySelector('.nav-group-title')
            ?.setAttribute('aria-expanded', String(state));
        });
      });
    });

    const sidebar = document.querySelector('.sidebar');
    const layout = document.querySelector('.layout');
    const toggle = document.getElementById('toggleSidebar');
    if (!sidebar || !layout || !toggle) return;

    const apply = collapsed => {
      sidebar.classList.toggle('collapsed', collapsed);
      layout.classList.toggle('sidebar-mini', collapsed);
      toggle.title = collapsed ? 'توسيع القائمة' : 'تصغير القائمة';
      localStorage.setItem(KEYS.sidebar, collapsed ? '1' : '0');
    };

    apply(
      localStorage.getItem(KEYS.sidebar) === '1' &&
      window.matchMedia('(min-width:1101px)').matches
    );

    toggle.addEventListener('click', () => {
      if (window.matchMedia('(max-width:1100px)').matches) {
        sidebar.classList.toggle('open');
      } else {
        apply(!sidebar.classList.contains('collapsed'));
      }
    });
  }

  /* ---------- Main indicator limits calculator ---------- */

  function savedLimits() {
    const values = readJson(KEYS.limits, null);
    return Array.isArray(values) &&
      values.length === (SAH_DATA.indicatorFields || []).length
      ? values.map(value => Math.max(0, Number(value) || 0))
      : originalLimits.slice();
  }

  function applySavedLimits() {
    const values = savedLimits();
    (SAH_DATA.indicatorFields || []).forEach((field, index) => {
      field.max = values[index] ?? originalLimits[index] ?? 0;
    });
  }

  function renderIndicatorLimitForm() {
    const form = document.getElementById('indicatorSettingsForm');
    if (!form) return;
    form.innerHTML = '';

    (SAH_DATA.indicatorFields || []).forEach((field, index) => {
      const row = document.createElement('div');
      row.className = 'indicator-limit-row';
      row.innerHTML = `
        <div class="limit-track">${field.track || '—'}</div>
        <div class="limit-field">${field.field || '—'}</div>
        <label>
          <span class="hidden">الحد الأعلى</span>
          <input class="indicator-limit-input"
                 type="number" min="0" step="1"
                 data-index="${index}"
                 value="${Number(field.max) || 0}">
        </label>`;
      form.appendChild(row);
    });
  }

  function openIndicatorCalculator() {
    if (!isIndicatorOfficer()) {
      showToast('هذه الصلاحية متاحة لمسؤول مؤشر الأداء الرياضي فقط.');
      return;
    }
    renderIndicatorLimitForm();
    openModal('indicatorSettingsModal');
  }

  function saveIndicatorLimits() {
    if (!isIndicatorOfficer()) {
      showToast('لا تملك صلاحية تعديل حاسبة النقاط.');
      return;
    }

    const values = [...document.querySelectorAll('.indicator-limit-input')]
      .map(input => Number(input.value));

    if (values.length !== (SAH_DATA.indicatorFields || []).length ||
        values.some(value => !Number.isFinite(value) || value < 0)) {
      showToast('أدخل قيمًا صحيحة غير سالبة لجميع المجالات.');
      return;
    }

    const current = localStorage.getItem(KEYS.limits);
    if (current) localStorage.setItem(KEYS.limitsPrevious, current);
    writeJson(KEYS.limits, values);

    values.forEach((value, index) => {
      SAH_DATA.indicatorFields[index].max = value;
    });

    recalculateAllExistingActivities();
    closeModal('indicatorSettingsModal');
    showToast('تم حفظ الحدود وإعادة جدولة جميع البيانات السابقة.');
  }

  function restorePreviousLimits() {
    if (!isIndicatorOfficer()) return;
    const previous = readJson(KEYS.limitsPrevious, null);
    if (!Array.isArray(previous)) {
      showToast('لا توجد إعدادات سابقة محفوظة.');
      return;
    }
    writeJson(KEYS.limits, previous);
    previous.forEach((value, index) => {
      if (SAH_DATA.indicatorFields[index]) {
        SAH_DATA.indicatorFields[index].max = Math.max(0, Number(value) || 0);
      }
    });
    renderIndicatorLimitForm();
    recalculateAllExistingActivities();
    showToast('تمت استعادة الإعدادات السابقة وإعادة جدولة البيانات.');
  }

  function resetOriginalLimits() {
    if (!isIndicatorOfficer()) return;
    writeJson(KEYS.limits, originalLimits);
    originalLimits.forEach((value, index) => {
      if (SAH_DATA.indicatorFields[index]) {
        SAH_DATA.indicatorFields[index].max = value;
      }
    });
    renderIndicatorLimitForm();
    recalculateAllExistingActivities();
    showToast('تمت استعادة القيم الأصلية وإعادة جدولة البيانات.');
  }


  const DEFAULT_SUBFIELD_MAP = [
    {
      mainField:'البطولات الوطنية',
      subFields:['بطولة وطنية']
    },
    {
      mainField:'استضافة البطولات الوطنية',
      subFields:['استضافة بطولة وطنية']
    },
    {
      mainField:'البطولات التنشيطية',
      subFields:['تنفيذ بطولة تنشيطية']
    },
    {
      mainField:'البرامج التدريبية المركزية',
      subFields:[
        'دورة مركزية ( حضورية )',
        'ورشة عمل مركزية ( حضورية )',
        'دورة مركزية ( عن بعد )',
        'ورشة عمل مركزية ( عن بعد )'
      ]
    },
    {
      mainField:'الشراكة المجتمعية',
      subFields:['شراكة مجتمعية']
    },
    {
      mainField:'اللقاءات والفعاليات الرياضية التبادلية',
      subFields:['لقاء تبادلي']
    },
    {
      mainField:'تشغيل المرافق',
      subFields:['تشغيل مرافق']
    },
    {
      mainField:'النشاط الرياضي التنافسي الداخلي',
      subFields:['جماعية','فردية','ذوي الإعاقة','خطة تشغيلية']
    },
    {
      mainField:'النشاط البدني والترويحي الداخلي',
      subFields:['نشاط ترويحي','نشاط بدني']
    },
    {
      mainField:'الأيام العالمية',
      subFields:['يوم عالمي','يوم وطني']
    },
    {
      mainField:'البرامج التدريبية الداخلية',
      subFields:['ورشة عمل','دورة تدريبية','محاضرة']
    },
    {
      mainField:'البرامج التوعوية',
      subFields:['نشرة توعوية','فيديو توعوي']
    },
    {
      mainField:'الكوادر العاملة في النشاط الرياضي',
      subFields:['الكوادر']
    },
    {
      mainField:'التطوع',
      subFields:['متطوع','فرق متطوعين']
    },
    {
      mainField:'مشاركة الجامعات في المنتخبات الجامعية في المناسبات الدولية',
      subFields:['مشاركة اللاعبين في منتخبات المملكة دوليًا']
    },
    {
      mainField:'استضافة المشاركات الدولية للجامعات',
      subFields:['لقاء ودي بين الجامعات الدولية','استضافة بطولة دولية']
    }
  ];

  function defaultSubFields(){
    let counter=0;
    return DEFAULT_SUBFIELD_MAP.flatMap(group =>
      group.subFields.map(name => ({
        id:`sub-default-${counter++}`,
        name,
        mainField:group.mainField,
        guest:0,
        guestMax:0,
        host:0,
        hostMax:0,
        university:0,
        universityMax:0,
        player:0,
        playerMax:0
      }))
    );
  }

  function loadSubFields(){
    const defaults=defaultSubFields();
    const saved=readJson(KEYS.subfields,null);
    const validMain=new Set((SAH_DATA.indicatorFields||[]).map(field=>field.field));

    if(!Array.isArray(saved) || !saved.length){
      return defaults.filter(item=>validMain.has(item.mainField));
    }

    const normalizedSaved=saved
      .filter(item=>item && item.name)
      .map((item,index)=>({
        id:item.id||`sub-${Date.now()}-${index}`,
        name:String(item.name).trim(),
        mainField:validMain.has(item.mainField) ? item.mainField : '',
        guest:Math.max(0,Number(item.guest)||0),
        guestMax:Math.max(0,Number(item.guestMax)||0),
        host:Math.max(0,Number(item.host)||0),
        hostMax:Math.max(0,Number(item.hostMax)||0),
        university:Math.max(0,Number(item.university)||0),
        universityMax:Math.max(0,Number(item.universityMax)||0),
        player:Math.max(0,Number(item.player)||0),
        playerMax:Math.max(0,Number(item.playerMax)||0)
      }));

    const keyOf=item=>`${item.mainField}|||${item.name}`;
    const savedMap=new Map(normalizedSaved.map(item=>[keyOf(item),item]));

    const mergedDefaults=defaults
      .filter(item=>validMain.has(item.mainField))
      .map(item=>savedMap.get(keyOf(item)) || item);

    const defaultKeys=new Set(defaults.map(keyOf));
    const customRows=normalizedSaved.filter(item=>!defaultKeys.has(keyOf(item)));

    return [...mergedDefaults,...customRows];
  }

  function saveSubFields(items){
    writeJson(KEYS.subfields,items);
  }

  function subFieldsForMain(mainField){
    return loadSubFields().filter(item=>item.mainField===mainField);
  }

  /* ---------- Per-field activity points calculator ---------- */

  function defaultFieldCalculator() {
    return {
      guestParticipation: 0,
      hostParticipation: 0,
      university: 0,
      player: 0,
      fields: Object.fromEntries(
        (SAH_DATA.indicatorFields || []).map(field => [
          field.field,
          { guest: 0, host: 0 }
        ])
      ),
      subfields: Object.fromEntries(
        loadSubFields().map(item => [
          item.name,
          {
            guest:Number(item.guest)||0,
            guestMax:Number(item.guestMax)||0,
            host:Number(item.host)||0,
            hostMax:Number(item.hostMax)||0,
            university:Number(item.university)||0,
            universityMax:Number(item.universityMax)||0,
            player:Number(item.player)||0,
            playerMax:Number(item.playerMax)||0
          }
        ])
      )
    };
  }

  function loadFieldCalculator() {
    const defaults = defaultFieldCalculator();
    const saved = readJson(KEYS.calculator, {});
    return {
      ...defaults,
      ...saved,
      fields: { ...defaults.fields, ...(saved.fields || {}) },
      subfields: { ...defaults.subfields, ...(saved.subfields || {}) }
    };
  }

  function renderFieldCalculator() {
    const calculator = loadFieldCalculator();
    const setValue = (id, value) => {
      const element = document.getElementById(id);
      if (element) element.value = Number(value) || 0;
    };

    setValue('guestParticipationPoints', calculator.guestParticipation);
    setValue('hostParticipationPoints', calculator.hostParticipation);
    setValue('universityParticipationPoints', calculator.university);
    setValue('playerParticipationPoints', calculator.player);

    const tbody = document.getElementById('fieldPointsRows');
    if (tbody) {
      tbody.innerHTML = (SAH_DATA.indicatorFields || []).map((field, index) => {
        const values = calculator.fields[field.field] || { guest: 0, host: 0 };
        return `
          <tr>
            <td>${field.track}</td>
            <td>${field.field}</td>
            <td><input class="field-guest-points" data-index="${index}"
                       type="number" min="0" value="${Number(values.guest) || 0}"></td>
            <td><input class="field-host-points" data-index="${index}"
                       type="number" min="0" value="${Number(values.host) || 0}"></td>
          </tr>`;
      }).join('');
    }

    renderSubFieldCalculatorRows(calculator);
  }

  function subFieldRow(item,index,calculator){
    const mains=(SAH_DATA.indicatorFields||[]).map(field=>`<option value="${field.field}" ${field.field===item.mainField?'selected':''}>${field.field}</option>`).join('');
    const points=calculator.subfields?.[item.name] || item;

    const pair=(label,valueClass,maxClass,value,maxValue)=>`
      <div class="points-limit-group">
        <span class="points-limit-title">${label}</span>
        <label class="points-limit-field">
          <span>النقاط</span>
          <input class="${valueClass}" type="number" min="0"
                 value="${Math.max(0,Number(value)||0)}">
        </label>
        <label class="points-limit-field limit">
          <span>الحد الأقصى</span>
          <input class="${maxClass}" type="number" min="0"
                 value="${Math.max(0,Number(maxValue)||0)}"
                 title="القيمة 0 تعني بلا حد أقصى">
        </label>
      </div>`;

    return `<div class="subfield-calculator-row" data-id="${item.id}">
      <div class="subfield-identity">
        <label>
          <span>اسم المجال الفرعي</span>
          <input class="subfield-name" value="${item.name||''}" required>
        </label>
        <label>
          <span>المجال الرئيسي المرتبط</span>
          <select class="subfield-main">
            <option value="">غير مرتبط</option>${mains}
          </select>
        </label>
      </div>

      <div class="subfield-points-limits">
        ${pair('نقاط المشاركة كضيف','subfield-guest','subfield-guest-max',points.guest,points.guestMax)}
        ${pair('نقاط المشاركة كمستضيف','subfield-host','subfield-host-max',points.host,points.hostMax)}
        ${pair('نقاط كل جامعة مشاركة','subfield-university','subfield-university-max',points.university,points.universityMax)}
        ${pair('نقاط كل لاعب مشارك','subfield-player','subfield-player-max',points.player,points.playerMax)}
      </div>

      <button class="subfield-delete" type="button" title="حذف المجال الفرعي">🗑</button>
    </div>`;
  }

  function renderSubFieldCalculatorRows(calculator=loadFieldCalculator()){
    const box=document.getElementById('subFieldPointsRows');
    if(!box) return;
    box.innerHTML=loadSubFields().map((item,index)=>subFieldRow(item,index,calculator)).join('');
    box.querySelectorAll('.subfield-delete').forEach(button=>{
      button.addEventListener('click',()=>button.closest('.subfield-calculator-row')?.remove());
    });
  }

  function openFieldCalculator() {
    if (!isIndicatorOfficer()) {
      showToast('هذه الصلاحية متاحة لمسؤول مؤشر الأداء الرياضي فقط.');
      return;
    }
    renderFieldCalculator();
    openModal('fieldPointsCalculatorModal');
  }

  function collectFieldCalculator() {
    const calculator = {
      guestParticipation: Number(document.getElementById('guestParticipationPoints')?.value || 0),
      hostParticipation: Number(document.getElementById('hostParticipationPoints')?.value || 0),
      university: Number(document.getElementById('universityParticipationPoints')?.value || 0),
      player: Number(document.getElementById('playerParticipationPoints')?.value || 0),
      fields: {}
    };

    (SAH_DATA.indicatorFields || []).forEach((field, index) => {
      calculator.fields[field.field] = {
        guest: Number(document.querySelector(
          `.field-guest-points[data-index="${index}"]`)?.value || 0),
        host: Number(document.querySelector(
          `.field-host-points[data-index="${index}"]`)?.value || 0)
      };
    });

    calculator.subfields={};
    const subfields=[...document.querySelectorAll('#subFieldPointsRows .subfield-calculator-row')]
      .map((row,index)=>({
        id:row.dataset.id||`sub-${Date.now()}-${index}`,
        name:row.querySelector('.subfield-name')?.value.trim()||'',
        mainField:row.querySelector('.subfield-main')?.value||'',
        guest:Math.max(0,Number(row.querySelector('.subfield-guest')?.value)||0),
        guestMax:Math.max(0,Number(row.querySelector('.subfield-guest-max')?.value)||0),
        host:Math.max(0,Number(row.querySelector('.subfield-host')?.value)||0),
        hostMax:Math.max(0,Number(row.querySelector('.subfield-host-max')?.value)||0),
        university:Math.max(0,Number(row.querySelector('.subfield-university')?.value)||0),
        universityMax:Math.max(0,Number(row.querySelector('.subfield-university-max')?.value)||0),
        player:Math.max(0,Number(row.querySelector('.subfield-player')?.value)||0),
        playerMax:Math.max(0,Number(row.querySelector('.subfield-player-max')?.value)||0)
      }))
      .filter(item=>item.name);

    subfields.forEach(item=>{
      calculator.subfields[item.name]={
        guest:item.guest,
        guestMax:item.guestMax,
        host:item.host,
        hostMax:item.hostMax,
        university:item.university,
        universityMax:item.universityMax,
        player:item.player,
        playerMax:item.playerMax
      };
    });
    saveSubFields(subfields);

    return calculator;
  }

  function saveFieldCalculator() {
    if (!isIndicatorOfficer()) return;
    const current = localStorage.getItem(KEYS.calculator);
    if (current) localStorage.setItem(KEYS.calculatorPrevious, current);
    writeJson(KEYS.calculator, collectFieldCalculator());
    recalculateAllExistingActivities();
    closeModal('fieldPointsCalculatorModal');
    updateActivityPointsPreview();
    showToast('تم حفظ الحاسبة وإعادة جدولة نقاط جميع الأنشطة السابقة.');
  }

  function restorePreviousFieldCalculator() {
    if (!isIndicatorOfficer()) return;
    const previous = readJson(KEYS.calculatorPrevious, null);
    if (!previous) {
      showToast('لا توجد إعدادات سابقة محفوظة.');
      return;
    }
    writeJson(KEYS.calculator, previous);
    renderFieldCalculator();
    recalculateAllExistingActivities();
    updateActivityPointsPreview();
    showToast('تمت استعادة الإعدادات السابقة وإعادة حساب جميع الأنشطة.');
  }

  function resetFieldCalculator() {
    if (!isIndicatorOfficer()) return;
    localStorage.removeItem(KEYS.calculator);
    renderFieldCalculator();
    recalculateAllExistingActivities();
    updateActivityPointsPreview();
    showToast('تمت استعادة الإعدادات الافتراضية وإعادة حساب جميع الأنشطة.');
  }

  function calculateActivityPoints(activity) {
    const calculator = loadFieldCalculator();
    const p = calculator.subfields?.[activity.subField] || {
      guest:0,guestMax:0,
      host:0,hostMax:0,
      university:0,universityMax:0,
      player:0,playerMax:0
    };

    const cap=(value,max)=>{
      const safeValue=Math.max(0,Number(value)||0);
      const safeMax=Math.max(0,Number(max)||0);
      return safeMax>0 ? Math.min(safeValue,safeMax) : safeValue;
    };

    const isHost=activity.participationType==='host';
    const participationPoints=isHost
      ? cap(p.host,p.hostMax)
      : cap(p.guest,p.guestMax);

    const universityPoints=cap(
      Number(activity.universities||0)*Number(p.university||0),
      p.universityMax
    );

    const playerPoints=cap(
      Number(activity.players||0)*Number(p.player||0),
      p.playerMax
    );

    return Math.max(0,Math.round(
      participationPoints+universityPoints+playerPoints
    ));
  }

  /* ---------- Evidence data ---------- */

  function recordKey(row, index = 0) {
    return String(
      row.localActivityId ||
      row.recordKey ||
      `source-${row.id ?? index}-${row.activity || 'activity'}-${row.date || 'date'}`
    );
  }


  /*
    SAH V22.5:
    Required field normalization helpers. Earlier builds called these
    functions without defining them, which stopped rendering and saving.
  */
  function validFieldNames(){
    return new Set(
      (SAH_DATA.indicatorFields || [])
        .map(field => String(field.field || '').trim())
        .filter(Boolean)
    );
  }

  function fieldForIndex(index){
    const fields = SAH_DATA.indicatorFields || [];
    if(!fields.length) return null;
    return fields[Math.abs(Number(index) || 0) % fields.length] || null;
  }

  function normalizeRowField(row,index=0,force=false){
    if(!row || typeof row !== 'object') return row;

    const valid = validFieldNames();
    const current = String(
      row.mainField ||
      row.indicatorField ||
      row.field ||
      row.subCategory ||
      ''
    ).trim();

    let next = current;

    if(force || !valid.has(current)){
      next = fieldForIndex(index)?.field || '';
    }

    row.mainField = next;
    row.indicatorField = next;
    row.field = next;
    row.subCategory = next;

    return row;
  }

  function migrateExistingEvidenceFields(){
    /*
      Run once per field configuration. Preserve valid existing fields and
      only repair missing/invalid values. This avoids overwriting user data.
    */
    if(localStorage.getItem(KEYS.fieldMigration) === 'done') return;

    const locals = readJson(KEYS.activities,[]);
    locals.forEach((row,index)=>{
      normalizeRowField(row,index,false);
    });
    writeJson(KEYS.activities,locals);

    const overrides = readJson(KEYS.overrides,{});
    Object.entries(overrides).forEach(([key,row],index)=>{
      if(!row || typeof row !== 'object') return;
      normalizeRowField(row,index,false);
      overrides[key] = row;
    });
    writeJson(KEYS.overrides,overrides);

    localStorage.setItem(KEYS.fieldMigration,'done');
  }

  function sourceRows() {
    return (SAH_DATA.evidenceRecords || []).map((row, index) => {
      const normalized = normalizeRowField({...row},index,false);
      return {
        ...normalized,
        recordKey: recordKey(row, index),
        isLocal: Boolean(row.localActivityId)
      };
    });
  }

  function allEvidenceRows() {
    const overrides = readJson(KEYS.overrides, {});
    const deleted = new Set(readJson(KEYS.deleted, []));
    const localRows = readJson(KEYS.activities, []);

    const source = sourceRows()
      .filter(row => !row.isLocal)
      .map((row,index) => normalizeRowField(
        {...row, ...(overrides[row.recordKey] || {})},
        index,
        false
      ));

    const locals = localRows.map((row, index) => ({
      ...normalizeRowField({...row},index,false),
      recordKey: recordKey(row, index),
      isLocal: true
    }));

    return [...source, ...locals]
      .filter(row => !deleted.has(row.recordKey));
  }

  function hasValue(value, allowZero = false) {
    if (allowZero && value === 0) return true;
    const text = String(value ?? '').trim();
    return text !== '' && text !== '—' && text !== '-';
  }

  function completionPercent(row) {
    const checks = [
      hasValue(row.activity),
      hasValue(row.date),
      hasValue(row.days, true),
      hasValue(row.beneficiaries, true),
      hasValue(row.players, true),
      hasValue(row.gender),
      hasValue(row.eventCategory),
      hasValue(row.indicatorField || row.field || row.subCategory),
      hasValue(row.subField),
      hasValue(row.participationType),
      hasValue(row.universities, true),
      hasValue(row.gameType),
      hasValue(row.federationReportName),
      hasValue(row.scheduleFileName),
      hasValue(row.documentationUrl || row.publishLink || row.newsLink)
    ];
    return Math.round(checks.filter(Boolean).length / checks.length * 100);
  }

  function evidenceStatus(row) {
    const percent = completionPercent(row);
    return percent === 100 ? 'مكتمل' : percent === 0 ? 'ناقص' : 'جزئي';
  }

  function filteredEvidenceRows() {
    const query = (document.getElementById('evidenceSearch')?.value || '')
      .trim().toLowerCase();
    const column = document.getElementById('evidenceColumnFilter')?.value || 'all';
    const completion = document.getElementById('evidenceCompletionFilter')?.value || 'all';
    const status = document.getElementById('evidenceStatus')?.value || 'all';
    const gender = document.querySelector('#evidenceGender button.active')
      ?.dataset.gender || 'all';

    return allEvidenceRows().filter(row => {
      const percent = completionPercent(row);
      const rowStatus = evidenceStatus(row);

      if (gender !== 'all' && row.gender !== gender) return false;
      if (status !== 'all' && rowStatus !== status) return false;
      if (completion === 'complete' && percent !== 100) return false;
      if (completion === 'incomplete' && (percent === 100 || percent === 0)) return false;
      if (completion === 'missing' && percent !== 0) return false;
      if (window.__reportsExcludeComplete && percent === 100) return false;

      if (!query) return true;

      const mapped = {
        activity: row.activity,
        date: row.date,
        gender: row.gender,
        indicatorField: row.mainField || row.mainField || row.mainField || row.indicatorField || row.field || row.subCategory,
        participationType: row.participationType === 'host' ? 'مستضيف' : 'ضيف',
        status: rowStatus,
        documentation: row.documentationUrl || row.publishLink || row.newsLink
      };

      if (column !== 'all') {
        return String(mapped[column] || '').toLowerCase().includes(query);
      }

      return Object.values({ ...row, ...mapped })
        .some(value => String(value ?? '').toLowerCase().includes(query));
    });
  }

  window.getFilteredEvidence = filteredEvidenceRows;

  function fileCell(row, type) {
    const name = type === 'report'
      ? row.federationReportName || ''
      : row.scheduleFileName || '';
    const url = FILE_URLS.get(`${row.recordKey}:${type}`);

    if (url) {
      return `<a class="file-link" href="${url}" target="_blank"
                 download="${name}">${name}</a>`;
    }
    if (hasValue(name)) return `<span class="file-name">${name}</span>`;
    return '<span class="file-name missing">غير مرفوع</span>';
  }

  function documentationCell(row) {
    const url = row.documentationUrl || row.publishLink || row.newsLink || '';
    return /^https?:\/\//i.test(url)
      ? `<a class="file-link" href="${url}" target="_blank"
             rel="noopener">فتح التوثيق</a>`
      : '<span class="file-name missing">غير متوفر</span>';
  }

  window.renderEvidenceStats = function () {
    const rows = allEvidenceRows();

    const byGender = gender => {
      const genderRows = rows.filter(row => row.gender === gender);
      const complete = genderRows.filter(row => completionPercent(row) === 100).length;
      const incomplete = genderRows.length - complete;
      const percent = genderRows.length
        ? Math.round(complete / genderRows.length * 100)
        : 0;

      return {
        rows: genderRows,
        total: genderRows.length,
        complete,
        incomplete,
        percent
      };
    };

    const male = byGender('طلاب');
    const female = byGender('طالبات');

    const set = (id,value) => {
      const element = document.getElementById(id);
      if (element) element.textContent = value;
    };

    set('reportsMaleTotal', male.total);
    set('reportsMaleRegistered', male.total);
    set('reportsMaleComplete', male.complete);
    set('reportsMaleIncomplete', male.incomplete);
    set('reportsMalePercent', `${male.percent}%`);

    set('reportsFemaleTotal', female.total);
    set('reportsFemaleRegistered', female.total);
    set('reportsFemaleComplete', female.complete);
    set('reportsFemaleIncomplete', female.incomplete);
    set('reportsFemalePercent', `${female.percent}%`);

    set('reportsAllActivitiesTotal', rows.length);

    document.getElementById('reportsMaleDonut')
      ?.style.setProperty('--p', male.percent);

    document.getElementById('reportsFemaleDonut')
      ?.style.setProperty('--p', female.percent);

    const counts = new Map();

    rows.forEach(row => {
      const field = String(
        row.mainField ||
        row.indicatorField ||
        row.field ||
        row.subCategory ||
        'غير محدد'
      ).trim() || 'غير محدد';

      counts.set(field,(counts.get(field)||0)+1);
    });

    const configuredFields = (SAH_DATA.indicatorFields||[])
      .map(item => item.field)
      .filter(Boolean);

    configuredFields.forEach(field => {
      if (!counts.has(field)) counts.set(field,0);
    });

    const entries = [...counts.entries()]
      .sort((a,b) => b[1]-a[1] || a[0].localeCompare(b[0],'ar'));

    const max = Math.max(1,...entries.map(([,count])=>count));
    const chart = document.getElementById('reportsMainFieldsChart');

    if (chart) {
      chart.innerHTML = entries.length
        ? entries.map(([field,count],index) => {
            const width = Math.max(count ? 6 : 0,Math.round(count/max*100));
            const percent = rows.length
              ? Math.round(count/rows.length*100)
              : 0;

            return `<button class="reports-main-field-row"
                            type="button"
                            data-evidence-main-field="${field}"
                            title="عرض أنشطة ${field}">
              <span class="reports-main-field-rank">${index+1}</span>
              <span class="reports-main-field-name">${field}</span>
              <span class="reports-main-field-track">
                <i style="width:${width}%"></i>
              </span>
              <strong>${count}</strong>
              <small>${percent}%</small>
            </button>`;
          }).join('')
        : '<div class="reports-no-fields">لا توجد مجالات أو أنشطة مسجلة.</div>';
    }
  };
  function applyReportsDashboardFilter({gender='all',completion='all',mainField=''}) {
    const genderButtons = [...document.querySelectorAll('#evidenceGender button')];
    const targetGender = genderButtons.find(button=>button.dataset.gender===gender)
      || genderButtons.find(button=>button.dataset.gender==='all');

    genderButtons.forEach(button=>button.classList.toggle(
      'active',button===targetGender
    ));

    const completionSelect = document.getElementById('evidenceCompletionFilter');
    const statusSelect = document.getElementById('evidenceStatus');
    const columnSelect = document.getElementById('evidenceColumnFilter');
    const searchInput = document.getElementById('evidenceSearch');

    if (statusSelect) statusSelect.value='all';

    if (completionSelect) {
      completionSelect.value = completion==='complete'
        ? 'complete'
        : completion==='not-complete'
          ? 'all'
          : 'all';
    }

    if (columnSelect) {
      columnSelect.value = mainField ? 'indicatorField' : 'all';
    }

    if (searchInput) {
      searchInput.value = mainField || '';
    }

    window.__reportsExcludeComplete = completion==='not-complete';

    renderEvidence();

    document.querySelector('.evidence-card')
      ?.scrollIntoView({behavior:'smooth',block:'start'});
  }


  window.renderEvidence = function () {
    const tbody = document.getElementById('evidenceRows');
    if (!tbody) return;

    currentEvidenceRows = filteredEvidenceRows();
    tbody.innerHTML = '';

    currentEvidenceRows.forEach((row, index) => {
      const percent = completionPercent(row);
      const participation = row.participationType === 'host'
        ? 'مستضيف'
        : row.participationType === 'guest' ? 'ضيف' : '—';

      const tr = document.createElement('tr');
      tr.dataset.recordKey = row.recordKey;
      tr.innerHTML = `
        <td class="select-column">
          <input class="evidence-row-select" type="checkbox"
                 value="${row.recordKey}">
        </td>
        <td>${row.id || index + 1}</td>
        <td><b>${row.activity || '—'}</b></td>
        <td class="ltr-cell">${row.date || '—'}</td>
        <td>${row.days ?? '—'}</td>
        <td>${fmt(row.beneficiaries || 0)}</td>
        <td>${fmt(row.players || 0)}</td>
        <td>${row.gender || '—'}</td>
        <td>${row.eventCategory || 'الأنشطة الرياضية'}</td>
        <td>${row.mainField || row.indicatorField || row.field || row.subCategory || '—'}</td>
        <td>${row.subField || '—'}</td>
        <td>${participation}</td>
        <td>${fmt(row.universities || 0)}</td>
        <td>${fmt(row.points || 0)}</td>
        <td>
          <span class="pill evidence-status ${evidenceStatusClass(evidenceStatus(row))}">
            ${evidenceStatus(row)}
          </span>
        </td>
        <td>${fileCell(row, 'report')}</td>
        <td>${fileCell(row, 'schedule')}</td>
        <td>${documentationCell(row)}</td>
        <td>
          <div class="event-completion ${percent < 100 ? 'missing' : ''}">
            <div class="event-completion-value">
              <span>الاكتمال</span><b>${percent}%</b>
            </div>
            <div class="event-completion-track">
              <span style="width:${percent}%"></span>
            </div>
          </div>
        </td>
        <td>
          <div class="evidence-row-actions">
            <button class="evidence-action-icon edit"
                    type="button" data-edit-key="${row.recordKey}"
                    title="تعديل النشاط">✎</button>
            <button class="evidence-action-icon delete"
                    type="button" data-delete-key="${row.recordKey}"
                    title="حذف النشاط">🗑</button>
          </div>
        </td>`;
      tbody.appendChild(tr);
    });

    tbody.querySelectorAll('.evidence-row-select')
      .forEach(box => box.addEventListener('change', updateBulkSelection));

    tbody.querySelectorAll('[data-edit-key]')
      .forEach(button => button.addEventListener(
        'click', () => openEditActivity(button.dataset.editKey)));

    tbody.querySelectorAll('[data-delete-key]')
      .forEach(button => button.addEventListener(
        'click', () => deleteEvidenceRows([button.dataset.deleteKey])));

    updateBulkSelection();
  };

  function updateBulkSelection() {
    const boxes = [...document.querySelectorAll('.evidence-row-select')];
    const selected = boxes.filter(box => box.checked);
    const deleteButton = document.getElementById('deleteSelectedEvidence');

    if (deleteButton) {
      deleteButton.disabled = selected.length === 0;
      deleteButton.textContent = selected.length
        ? `حذف المحدد (${selected.length})`
        : 'حذف المحدد';
    }

    const all = boxes.length > 0 && selected.length === boxes.length;
    ['selectAllEvidence', 'selectAllEvidenceHead'].forEach(id => {
      const box = document.getElementById(id);
      if (box) box.checked = all;
    });
  }

  function selectAllVisible(checked) {
    document.querySelectorAll('.evidence-row-select')
      .forEach(box => { box.checked = checked; });
    updateBulkSelection();
  }

  function deleteEvidenceRows(keys) {
    if (!keys.length || !confirm(`هل تريد حذف ${keys.length} نشاط؟`)) return;

    const deleted = new Set(readJson(KEYS.deleted, []));
    const locals = readJson(KEYS.activities, [])
      .filter(row => !keys.includes(recordKey(row)));

    keys.forEach(key => deleted.add(key));
    writeJson(KEYS.deleted, [...deleted]);
    writeJson(KEYS.activities, locals);

    recalculateIndicator();
    renderEvidenceStats();
    renderEvidence();
    showToast('تم حذف الأنشطة المحددة.');
  }

  function populateActivityFields() {
    const mainSelect = document.getElementById('activityIndicatorField');
    if (!mainSelect) return;

    mainSelect.innerHTML = (SAH_DATA.indicatorFields || [])
      .map(field => `<option value="${field.field}">${field.field}</option>`)
      .join('');

    populateActivitySubFields();
  }

  function populateActivitySubFields(selectedValue=''){
    const main=document.getElementById('activityIndicatorField')?.value||'';
    const subSelect=document.getElementById('activitySubField');
    if(!subSelect) return;
    const rows=subFieldsForMain(main);
    subSelect.innerHTML=rows.length
      ? rows.map(item=>`<option value="${item.name}">${item.name}</option>`).join('')
      : '<option value="">لا توجد مجالات فرعية مرتبطة</option>';
    if(selectedValue && rows.some(item=>item.name===selectedValue)){
      subSelect.value=selectedValue;
    }
  }

  function setInput(id, value) {
    const input = document.getElementById(id);
    if (input) input.value = value ?? '';
  }

  function resetActivityForm() {
    document.getElementById('addActivityForm')?.reset();
    setInput('activityEditKey', '');
    setText('#addActivityTitle', 'إضافة نشاط جديد');
    const save = document.getElementById('saveNewActivity');
    if (save) save.textContent = 'حفظ النشاط وإضافة النقاط';
    updateActivityPointsPreview();
  }

  function openAddActivity() {
    populateActivityFields();
    resetActivityForm();
    openModal('addActivityModal');
  }

  function openEditActivity(key) {
    const row = allEvidenceRows().find(item => item.recordKey === key);
    if (!row) return;

    populateActivityFields();
    setInput('activityEditKey', key);
    setInput('activityName', row.activity);
    setInput('activityDate', row.date);
    setInput('activityDays', row.days);
    setInput('activityBeneficiaries', row.beneficiaries);
    setInput('activityPlayers', row.players);
    setInput('activityGender', row.gender);
    setInput('activityEventCategory', row.eventCategory || 'الأنشطة الرياضية');
    setInput('activityIndicatorField',
      row.mainField || row.indicatorField || row.field || row.subCategory);
    populateActivitySubFields(row.subField||'');
    setInput('activitySubField',row.subField||'');
    setInput('activityParticipationType', row.participationType || 'guest');
    setInput('activityUniversities', row.universities);
    setInput('activityGameType', row.gameType);
    setInput('activityDocumentationUrl',
      row.documentationUrl || row.publishLink || row.newsLink);

    setText('#addActivityTitle', 'تعديل النشاط');
    const save = document.getElementById('saveNewActivity');
    if (save) save.textContent = 'حفظ تعديلات النشاط';
    updateActivityPointsPreview();
    openModal('addActivityModal');
  }

  function activityFromForm(existing = {}) {
    const report = document.getElementById('activityFederationReport')?.files?.[0];
    const schedule = document.getElementById('activityScheduleFile')?.files?.[0];

    const row = {
      ...existing,
      activity: document.getElementById('activityName')?.value.trim() || '',
      date: document.getElementById('activityDate')?.value || '',
      days: Number(document.getElementById('activityDays')?.value || 0),
      beneficiaries: Number(document.getElementById('activityBeneficiaries')?.value || 0),
      players: Number(document.getElementById('activityPlayers')?.value || 0),
      gender: document.getElementById('activityGender')?.value || 'طلاب',
      eventCategory: document.getElementById('activityEventCategory')?.value || 'الأنشطة الرياضية',
      mainField: document.getElementById('activityIndicatorField')?.value || '',
      indicatorField: document.getElementById('activityIndicatorField')?.value || '',
      subField: document.getElementById('activitySubField')?.value || '',
      participationType: document.getElementById('activityParticipationType')?.value || 'guest',
      universities: Number(document.getElementById('activityUniversities')?.value || 0),
      gameType: document.getElementById('activityGameType')?.value.trim() || '',
      documentationUrl: document.getElementById('activityDocumentationUrl')
        ?.value.trim() || '',
      federationReportName: report?.name || existing.federationReportName || '',
      scheduleFileName: schedule?.name || existing.scheduleFileName || '',
      activityType: 'رياضي'
    };

    row.field = row.indicatorField;
    row.subCategory = row.indicatorField;
    row.points = calculateActivityPoints(row);
    row.status = evidenceStatus(row);

    return { row, report, schedule };
  }

  function saveActivity() {
    const editKey = document.getElementById('activityEditKey')?.value || '';
    const existing = editKey
      ? allEvidenceRows().find(row => row.recordKey === editKey)
      : null;

    const form=document.getElementById('addActivityForm');
    const valid=validateRequiredContainer(form,{
      allowExistingFiles:Boolean(existing),
      existingFileIds:['activityFederationReport','activityScheduleFile'],
      existingFileNames:{
        activityFederationReport:existing?.federationReportName||'',
        activityScheduleFile:existing?.scheduleFileName||''
      }
    });

    if(!valid)return;

    const { row, report, schedule } = activityFromForm(existing || {});

    if (
      !row.activity || !row.date || !row.days ||
      row.beneficiaries < 0 || row.players < 0 ||
      !row.gender || !row.eventCategory ||
      !row.indicatorField || !row.subField ||
      !row.participationType ||
      row.universities < 0 ||
      !row.gameType || !row.documentationUrl ||
      (!report && !existing?.federationReportName) ||
      (!schedule && !existing?.scheduleFileName)
    ) {
      showToast('لا يمكن حفظ النشاط قبل تعبئة جميع البيانات المطلوبة.');
      return;
    }

    if (existing?.isLocal) {
      const locals = readJson(KEYS.activities, []);
      const index = locals.findIndex(item => recordKey(item) === editKey);
      if (index >= 0) {
        row.localActivityId = existing.localActivityId;
        row.recordKey = editKey;
        locals[index] = row;
        writeJson(KEYS.activities, locals);
      }
    } else if (existing) {
      row.recordKey = editKey;
      const overrides = readJson(KEYS.overrides, {});
      overrides[editKey] = row;
      writeJson(KEYS.overrides, overrides);
    } else {
      row.localActivityId = `local-${Date.now()}`;
      row.recordKey = row.localActivityId;
      row.id = allEvidenceRows().length + 1;
      const locals = readJson(KEYS.activities, []);
      locals.push(row);
      writeJson(KEYS.activities, locals);
    }

    if (report) {
      FILE_URLS.set(`${row.recordKey}:report`, URL.createObjectURL(report));
    }
    if (schedule) {
      FILE_URLS.set(`${row.recordKey}:schedule`, URL.createObjectURL(schedule));
    }

    recalculateIndicator();
    renderEvidenceStats();
    renderEvidence();
    closeModal('addActivityModal');
    resetActivityForm();
    showToast(existing ? 'تم تعديل النشاط.' : 'تمت إضافة النشاط واحتساب نقاطه.');
  }

  function updateActivityPointsPreview() {
    const activity = {
      indicatorField: document.getElementById('activityIndicatorField')?.value || '',
      participationType: document.getElementById('activityParticipationType')?.value || 'guest',
      universities: Number(document.getElementById('activityUniversities')?.value || 0),
      players: Number(document.getElementById('activityPlayers')?.value || 0)
    };
    setText('#activityCalculatedPoints', fmt(calculateActivityPoints(activity)));
  }

  function recalculateIndicator() {
    const fields = SAH_DATA.indicatorFields || [];

    fields.forEach((field, index) => {
      field.male = baselineIndicator[index]?.male || 0;
      field.female = baselineIndicator[index]?.female || 0;
    });

    allEvidenceRows().forEach(row => {
      const fieldName = row.mainField ||
        row.indicatorField || row.field || row.subCategory;
      const field = fields.find(item => item.field === fieldName);
      if (!field) return;

      const genderKey = row.gender === 'طالبات' ? 'female' : 'male';
      const max = Math.max(0, Number(field.max) || 0);
      field[genderKey] = Math.min(
        max,
        Math.max(0, Number(field[genderKey]) || 0) + (Number(row.points) || 0)
      );
    });

    applySavedLimits();
    calcIndicators();
    updateIndicatorAudienceTotals();
  }

  function updateIndicatorAudienceTotals(){
    const totals = allEvidenceRows().reduce((acc,row)=>{
      const key = row.gender === 'طالبات' ? 'female' : 'male';
      acc[key].beneficiaries += Number(row.beneficiaries)||0;
      acc[key].players += Number(row.players)||0;
      return acc;
    },{
      male:{beneficiaries:0,players:0},
      female:{beneficiaries:0,players:0}
    });

    setText('#maleBeneficiariesTotal',fmt(totals.male.beneficiaries));
    setText('#malePlayersTotal',fmt(totals.male.players));
    setText('#femaleBeneficiariesTotal',fmt(totals.female.beneficiaries));
    setText('#femalePlayersTotal',fmt(totals.female.players));
  }

  /* ---------- Export ---------- */

  window.exportEvidenceCsv = function () {
    const headers = [
      'رقم', 'اسم النشاط', 'التاريخ', 'الأيام', 'المستفيدون',
      'اللاعبون', 'الفئة', 'المجال الرئيسي', 'المجال الفرعي', 'نوع المشاركة',
      'الجامعات المشاركة', 'النقاط', 'الحالة',
      'تقرير الاتحاد', 'الجدول الزمني', 'التوثيق', 'نسبة الاكتمال'
    ];

    const rows = filteredEvidenceRows().map((row, index) => [
      row.id || index + 1,
      row.activity, row.date, row.days, row.beneficiaries,
      row.players, row.gender,
      row.indicatorField || row.field || row.subCategory,
      row.participationType === 'host' ? 'مستضيف' : 'ضيف',
      row.universities, row.points, evidenceStatus(row),
      row.federationReportName, row.scheduleFileName,
      row.documentationUrl || row.publishLink || row.newsLink,
      `${completionPercent(row)}%`
    ]);

    const csv = '\ufeff' + [headers, ...rows]
      .map(row => row.map(csvEscape).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'SAH-Evidence-Report.csv';
    link.click();
    URL.revokeObjectURL(link.href);
  };


  function renderGroupedIndicatorTable(){
    const tbody = document.getElementById('indicatorRows');
    if(!tbody) return;
    tbody.innerHTML='';

    const groups = new Map();
    (SAH_DATA.indicatorFields||[]).forEach(field=>{
      if(!groups.has(field.track)) groups.set(field.track,[]);
      groups.get(field.track).push(field);
    });

    groups.forEach((fields,track)=>{
      const groupRow=document.createElement('tr');
      groupRow.className='indicator-track-row';
      groupRow.innerHTML=`<td colspan="6">
        <div class="indicator-track-card">
          <span>${track}</span>
          <small>${fields.length} مجال</small>
        </div>
      </td>`;
      tbody.appendChild(groupRow);

      fields.forEach(field=>{
        const malePct=pct(field.male,field.max);
        const femalePct=pct(field.female,field.max);
        const row=document.createElement('tr');
        row.className='indicator-field-row';
        row.innerHTML=`
          <td>${field.field}</td>
          <td>${fmt(field.max)}</td>
          <td>${fmt(field.male)}</td>
          <td><div class="progress"><span style="width:${malePct}%"></span></div><small>${malePct}%</small></td>
          <td>${fmt(field.female)}</td>
          <td><div class="progress burg"><span style="width:${femalePct}%"></span></div><small>${femalePct}%</small></td>`;
        tbody.appendChild(row);
      });
    });
  }

  const originalCalcIndicatorsGrouped = calcIndicators;
  calcIndicators = function(){
    originalCalcIndicatorsGrouped();
    renderGroupedIndicatorTable();
  };

  function managerRow(field,index){
    const tracks=[...new Set((SAH_DATA.indicatorFields||[]).map(item=>item.track).filter(Boolean))];
    const options=tracks.map(track=>
      `<option value="${track}" ${track===field.track?'selected':''}>${track}</option>`
    ).join('');
    const isNew=field.track && !tracks.includes(field.track);
    return `<div class="field-manager-row" data-original-name="${field.field||''}">
      <label class="field-manager-track-wrap"><span>المسار</span>
        <select class="manager-track">
          ${options}
          <option value="__new__" ${isNew?'selected':''}>＋ مسار جديد</option>
        </select>
        <input class="manager-track-custom ${isNew?'':'hidden'}"
               placeholder="اسم المسار الجديد" value="${isNew?field.track:''}">
      </label>
      <label><span>اسم المجال الرئيسي</span>
        <input class="manager-field" value="${field.field||''}" required>
      </label>
      <label><span>الحد الأعلى</span>
        <input class="manager-max" type="number" min="0" value="${Number(field.max)||0}">
      </label>
      <button class="field-manager-delete" type="button" title="حذف المجال">🗑</button>
    </div>`;
  }

  function bindManagerRow(row){
    row.querySelector('.field-manager-delete')
      ?.addEventListener('click',()=>row.remove());
    row.querySelector('.manager-track')
      ?.addEventListener('change',event=>{
        row.querySelector('.manager-track-custom')
          ?.classList.toggle('hidden',event.target.value!=='__new__');
      });
  }

  function refreshTrackChoices(){
    const tracks=[...new Set((SAH_DATA.indicatorFields||[]).map(item=>item.track).filter(Boolean))];
    const select=document.getElementById('existingTrackForNewField');
    if(select){
      select.innerHTML=tracks.map(track=>`<option value="${track}">${track}</option>`).join('');
    }
    const list=document.getElementById('indicatorTracksList');
    if(list){
      list.innerHTML=tracks.map(track=>`<option value="${track}"></option>`).join('');
    }
  }

  function renderFieldsManager(){
    const box=document.getElementById('indicatorFieldsManagerRows');
    if(!box) return;
    refreshTrackChoices();
    box.innerHTML=(SAH_DATA.indicatorFields||[])
      .map(managerRow).join('');
    box.querySelectorAll('.field-manager-row').forEach(bindManagerRow);
  }

  function openFieldsManager(){
    if(!isIndicatorOfficer()){
      showToast('هذه الصلاحية متاحة لمسؤول مؤشر الأداء الرياضي فقط.');
      return;
    }
    renderFieldsManager();
    openModal('indicatorFieldsManagerModal');
  }

  function appendManagerRow(field){
    const box=document.getElementById('indicatorFieldsManagerRows');
    if(!box) return;
    box.insertAdjacentHTML('beforeend',managerRow(field,box.children.length));
    bindManagerRow(box.lastElementChild);
    box.lastElementChild?.scrollIntoView({behavior:'smooth',block:'nearest'});
  }

  function addFieldManagerRow(){
    appendManagerRow({track:'مسار جديد',field:'مجال جديد',max:0});
  }

  function addFieldToExistingTrack(){
    const track=document.getElementById('existingTrackForNewField')?.value;
    if(!track){
      showToast('اختر مسارًا موجودًا أولًا.');
      return;
    }
    appendManagerRow({track,field:'مجال جديد',max:0});
  }

  function updateStoredActivitiesForFieldChanges(renameMap,validNames){
    const locals=readJson(KEYS.activities,[]);
    locals.forEach(row=>{
      const old=row.mainField||row.indicatorField||row.field||row.subCategory;
      const next=renameMap[old] || (validNames.has(old) ? old : '');
      row.mainField=next;
      row.indicatorField=next;
      row.field=next;
      row.subCategory=next;
    });
    writeJson(KEYS.activities,locals);

    const overrides=readJson(KEYS.overrides,{});
    Object.values(overrides).forEach(row=>{
      const old=row.mainField||row.indicatorField||row.field||row.subCategory;
      const next=renameMap[old] || (validNames.has(old) ? old : '');
      row.mainField=next;
      row.indicatorField=next;
      row.field=next;
      row.subCategory=next;
    });
    writeJson(KEYS.overrides,overrides);
  }

  function saveFieldsManager(){
    if(!isIndicatorOfficer()) return;
    const rows=[...document.querySelectorAll('#indicatorFieldsManagerRows .field-manager-row')];
    if(!rows.length){
      showToast('يجب الإبقاء على مجال واحد على الأقل.');
      return;
    }

    const fields=rows.map(row=>({
      original:row.dataset.originalName||'',
      track:(()=>{
        const selected=row.querySelector('.manager-track')?.value||'';
        return selected==='__new__'
          ? row.querySelector('.manager-track-custom')?.value.trim()||''
          : selected.trim();
      })(),
      field:row.querySelector('.manager-field')?.value.trim()||'',
      max:Math.max(0,Number(row.querySelector('.manager-max')?.value)||0)
    }));

    if(fields.some(item=>!item.track||!item.field)){
      showToast('أكمل أسماء المسارات والمجالات.');
      return;
    }
    const names=fields.map(item=>item.field);
    if(new Set(names).size!==names.length){
      showToast('لا يمكن تكرار اسم المجال.');
      return;
    }

    const renameMap={};
    fields.forEach(item=>{
      if(item.original && item.original!==item.field) renameMap[item.original]=item.field;
    });
    updateStoredActivitiesForFieldChanges(renameMap,new Set(names));

    writeJson(KEYS.fields,fields.map(({track,field,max})=>({track,field,max})));
    const validMainNames=new Set(fields.map(item=>item.field));
    const updatedSubs=loadSubFields().map(item=>({
      ...item,
      mainField:validMainNames.has(renameMap[item.mainField])
        ? renameMap[item.mainField]
        : (validMainNames.has(item.mainField)?item.mainField:'')
    }));
    saveSubFields(updatedSubs);
    localStorage.removeItem(KEYS.fieldMigration);
    applyIndicatorFieldConfig();
    baselineIndicator=SAH_DATA.indicatorFields.map(field=>({
      male:0,female:0,max:Number(field.max)||0
    }));
    originalLimits=SAH_DATA.indicatorFields.map(field=>Number(field.max)||0);
    writeJson(KEYS.limits,originalLimits);

    populateActivityFields();
    migrateExistingEvidenceFields();
    refreshStoredActivityPoints();
    recalculateIndicator();
    renderEvidenceStats();
    renderEvidence();
    closeModal('indicatorFieldsManagerModal');
    showToast('تم حفظ المجالات وتحديث مؤشر الأداء والتقارير.');
  }



  /*
    V22.2 repair:
    These functions were referenced by the calculators but were missing,
    which stopped initializeV15 with ReferenceError and prevented data,
    buttons and evidence tables from loading.
  */
  function refreshStoredActivityPoints(){
    const locals = readJson(KEYS.activities,[]);
    locals.forEach((row,index)=>{
      normalizeRowField(row,index,false);
      row.points = calculateActivityPoints(row);
    });
    writeJson(KEYS.activities,locals);

    /*
      Only recalculate records that already have explicit user overrides.
      Never generate an override for every imported data.js record.
    */
    const overrides = readJson(KEYS.overrides,{});
    Object.entries(overrides).forEach(([key,row],index)=>{
      if(!row || typeof row !== 'object') return;
      normalizeRowField(row,index,false);
      row.points = calculateActivityPoints(row);
      overrides[key] = row;
    });
    writeJson(KEYS.overrides,overrides);
  }

  function recalculateAllExistingActivities(){
    refreshStoredActivityPoints();
    recalculateIndicator();
    renderEvidenceStats();
    renderEvidence();
  }

  window.SAH_POINT_API = {
    openIndicatorCalculator,
    saveIndicatorLimits,
    restorePreviousLimits,
    resetOriginalLimits,
    openFieldCalculator,
    saveFieldCalculator,
    restorePreviousFieldCalculator,
    resetFieldCalculator,
    openFieldsManager,
    saveFieldsManager,
    addFieldManagerRow,
    addFieldToExistingTrack,
    recalculateAllExistingActivities,
    recalculateIndicator,
    renderEvidence,
    renderEvidenceStats,
    openModal,
    closeModal
  };

  /* ---------- Initialization ---------- */

  function bindEvents() {
    document.getElementById('activeRole')
      ?.addEventListener('change', applyRolePermissions);

    document.getElementById('indicatorFieldsManagerButton')
      ?.addEventListener('click', openFieldsManager);
    document.getElementById('addIndicatorFieldRow')
      ?.addEventListener('click', addFieldManagerRow);
    document.getElementById('addIndicatorFieldToExistingTrack')
      ?.addEventListener('click', addFieldToExistingTrack);
    document.getElementById('saveIndicatorFieldsManager')
      ?.addEventListener('click', saveFieldsManager);
    document.querySelectorAll('[data-close-fields-manager]')
      .forEach(element=>element.addEventListener('click',()=>closeModal('indicatorFieldsManagerModal')));

    document.getElementById('indicatorPermissionSettings')
      ?.addEventListener('click', openIndicatorCalculator);
    document.getElementById('indicatorSaveLimits')
      ?.addEventListener('click', saveIndicatorLimits);
    document.getElementById('restorePreviousIndicatorLimits')
      ?.addEventListener('click', restorePreviousLimits);
    document.getElementById('indicatorResetLimits')
      ?.addEventListener('click', resetOriginalLimits);
    document.querySelectorAll('[data-close-indicator-settings]')
      .forEach(element => element.addEventListener(
        'click', () => closeModal('indicatorSettingsModal')));

    
    document.getElementById('showMainFieldCalculator')
      ?.addEventListener('click',()=>{
        document.getElementById('mainFieldCalculatorPanel')?.classList.remove('hidden');
        document.getElementById('subFieldCalculatorPanel')?.classList.add('hidden');
        document.getElementById('showMainFieldCalculator')?.classList.add('primary','active');
        document.getElementById('showMainFieldCalculator')?.classList.remove('outline');
        document.getElementById('showSubFieldCalculator')?.classList.remove('primary','active');
        document.getElementById('showSubFieldCalculator')?.classList.add('outline');
      });

    document.getElementById('showSubFieldCalculator')
      ?.addEventListener('click',()=>{
        document.getElementById('subFieldCalculatorPanel')?.classList.remove('hidden');
        document.getElementById('mainFieldCalculatorPanel')?.classList.add('hidden');
        document.getElementById('showSubFieldCalculator')?.classList.add('primary','active');
        document.getElementById('showSubFieldCalculator')?.classList.remove('outline');
        document.getElementById('showMainFieldCalculator')?.classList.remove('primary','active');
        document.getElementById('showMainFieldCalculator')?.classList.add('outline');
      });

    document.getElementById('addSubFieldCalculatorRow')
      ?.addEventListener('click',()=>{
        const box=document.getElementById('subFieldPointsRows');
        if(!box) return;
        const item={
          id:`sub-${Date.now()}`,
          name:'مجال فرعي جديد',
          mainField:'',
          guest:0,
          host:0
        };
        box.insertAdjacentHTML('beforeend',subFieldRow(item,box.children.length,loadFieldCalculator()));
        box.lastElementChild.querySelector('.subfield-delete')
          ?.addEventListener('click',event=>event.currentTarget.closest('.subfield-calculator-row')?.remove());
      });

    document.getElementById('activityIndicatorField')
      ?.addEventListener('change',()=>populateActivitySubFields());

    document.getElementById('openFieldPointsCalculator')
      ?.addEventListener('click', openFieldCalculator);
    document.getElementById('saveFieldPointsCalculator')
      ?.addEventListener('click', saveFieldCalculator);
    document.getElementById('restorePreviousFieldPointsCalculator')
      ?.addEventListener('click', restorePreviousFieldCalculator);
    document.getElementById('resetFieldPointsCalculator')
      ?.addEventListener('click', resetFieldCalculator);
    document.querySelectorAll('[data-close-field-calculator]')
      .forEach(element => element.addEventListener(
        'click', () => closeModal('fieldPointsCalculatorModal')));

    document.getElementById('openAddActivity')
      ?.addEventListener('click', openAddActivity);
    document.getElementById('saveNewActivity')
      ?.addEventListener('click', saveActivity);
    document.querySelectorAll('[data-close-add-activity]')
      .forEach(element => element.addEventListener('click', () => {
        closeModal('addActivityModal');
        setTimeout(resetActivityForm, 280);
      }));

    ['activityIndicatorField', 'activitySubField', 'activityParticipationType',
     'activityUniversities', 'activityPlayers']
      .forEach(id => document.getElementById(id)
        ?.addEventListener('input', updateActivityPointsPreview));

    ['evidenceSearch', 'evidenceColumnFilter',
     'evidenceCompletionFilter', 'evidenceStatus']
      .forEach(id => {
        const element = document.getElementById(id);
        if (!element) return;
        element.addEventListener(
          id === 'evidenceSearch' ? 'input' : 'change',
          renderEvidence
        );
      });

    document.querySelectorAll('#evidenceGender button')
      .forEach(button => button.addEventListener('click', () => {
        document.querySelectorAll('#evidenceGender button')
          .forEach(item => item.classList.remove('active'));
        button.classList.add('active');
        renderEvidence();
      }));

    document.getElementById('selectAllEvidence')
      ?.addEventListener('change',
        event => selectAllVisible(event.target.checked));
    document.getElementById('selectAllEvidenceHead')
      ?.addEventListener('change',
        event => selectAllVisible(event.target.checked));
    document.getElementById('deleteSelectedEvidence')
      ?.addEventListener('click', () => {
        const keys = [...document.querySelectorAll(
          '.evidence-row-select:checked')].map(box => box.value);
        deleteEvidenceRows(keys);
      });

    document.getElementById('exportEvidenceCsv')
      ?.addEventListener('click', exportEvidenceCsv);

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeAllFeatureModals();
    });
  }

  function initializeV15() {
    initializeIndicatorBaseline();
    applySavedLimits();
    migrateExistingEvidenceFields();

    /*
      Preserve imported and previously saved points on startup.
      Recalculation runs only after the indicator officer saves a calculator.
    */
    const select = document.getElementById('activeRole');
    const savedRole = localStorage.getItem(KEYS.role);
    if (select && savedRole &&
        select.querySelector(`option[value="${savedRole}"]`)) {
      select.value = savedRole;
    }

    initSidebar();
    bindEvents();
    applyRolePermissions();
    recalculateIndicator();
    renderEvidenceStats();
    renderEvidence();
    renderGroupedIndicatorTable();
  }

  window.addEventListener('DOMContentLoaded', initializeV15);
})();

/* SAH V20 — mobile drawer behavior */
(function(){
  function closeMobileSidebar(){
    if(window.matchMedia('(max-width:1100px)').matches){
      document.querySelector('.sidebar')?.classList.remove('open');
    }
  }

  document.addEventListener('click',event=>{
    const sidebar=document.querySelector('.sidebar');
    const menu=document.getElementById('mobileMenu');
    if(!sidebar || !sidebar.classList.contains('open')) return;
    if(sidebar.contains(event.target) || menu?.contains(event.target)) return;
    closeMobileSidebar();
  });

  document.querySelectorAll('.nav button[data-page]').forEach(button=>{
    button.addEventListener('click',closeMobileSidebar);
  });

  window.addEventListener('resize',()=>{
    if(window.innerWidth>1100){
      document.querySelector('.sidebar')?.classList.remove('open');
    }
  });
})();

/* SAH V20.1 — deployment fingerprint and deterministic mobile drawer */
(function(){
  console.info('SAH build 20.1 loaded');

  function sidebar(){ return document.querySelector('.sidebar'); }
  function isMobile(){ return window.matchMedia('(max-width:1100px)').matches; }

  window.addEventListener('DOMContentLoaded',()=>{
    document.documentElement.dataset.sahBuild='20.1';

    const menu=document.getElementById('mobileMenu');
    if(menu){
      const clean=menu.cloneNode(true);
      menu.replaceWith(clean);
      clean.addEventListener('click',event=>{
        event.preventDefault();
        event.stopPropagation();
        if(isMobile()) sidebar()?.classList.toggle('open');
      });
    }

    document.querySelectorAll('.nav button[data-page]').forEach(button=>{
      button.addEventListener('click',()=>{
        if(isMobile()) sidebar()?.classList.remove('open');
      });
    });

    document.addEventListener('click',event=>{
      const side=sidebar();
      const menuButton=document.getElementById('mobileMenu');
      if(!isMobile() || !side?.classList.contains('open')) return;
      if(side.contains(event.target) || menuButton?.contains(event.target)) return;
      side.classList.remove('open');
    });
  });
})();

/* ==========================================================
   SAH V20.2 — cross-browser indicator data repair
   ========================================================== */
(function(){
  'use strict';

  const REPAIR_KEY='sah-v20-2-indicator-repair';
  const FIELDS_KEY='sah-v18-indicator-fields';
  const LIMITS_KEY='sah-v15-indicator-limits';
  const LIMITS_PREVIOUS_KEY='sah-v15-indicator-limits-previous';
  const MIGRATION_KEY='sah-v19-field-migration';

  function validPositiveTotal(values){
    return Array.isArray(values) &&
      values.length > 0 &&
      values.some(value => Number(value) > 0) &&
      values.reduce((sum,value)=>sum+(Number(value)||0),0) > 0;
  }

  function repairInvalidBrowserStorage(){
    let fields=null;
    let limits=null;

    try{ fields=JSON.parse(localStorage.getItem(FIELDS_KEY)||'null'); }catch{}
    try{ limits=JSON.parse(localStorage.getItem(LIMITS_KEY)||'null'); }catch{}

    const fieldMaximums=Array.isArray(fields)
      ? fields.map(field=>Number(field?.max)||0)
      : [];

    const invalidFields=Array.isArray(fields) && !validPositiveTotal(fieldMaximums);
    const invalidLimits=Array.isArray(limits) && !validPositiveTotal(limits);

    if(invalidFields) localStorage.removeItem(FIELDS_KEY);
    if(invalidLimits){
      localStorage.removeItem(LIMITS_KEY);
      localStorage.removeItem(LIMITS_PREVIOUS_KEY);
    }

    if(invalidFields || invalidLimits){
      localStorage.removeItem(MIGRATION_KEY);
      console.warn('SAH V20.2 repaired invalid indicator values saved by an older build.');
    }

    localStorage.setItem(REPAIR_KEY,'done');
  }

  function forceIndicatorRefresh(){
    if(!window.SAH_DATA || !Array.isArray(SAH_DATA.indicatorFields)) return;

    const fields=SAH_DATA.indicatorFields;
    const maximumTotal=fields.reduce((sum,field)=>sum+(Number(field.max)||0),0);

    if(maximumTotal <= 0){
      // The previous build may have overwritten current runtime values with zeros.
      localStorage.removeItem(FIELDS_KEY);
      localStorage.removeItem(LIMITS_KEY);
      localStorage.removeItem(LIMITS_PREVIOUS_KEY);
      localStorage.removeItem(MIGRATION_KEY);
      location.reload();
      return;
    }

    if(typeof window.calcIndicators==='function') window.calcIndicators();
    if(typeof window.renderEvidenceStats==='function') window.renderEvidenceStats();
    if(typeof window.renderEvidence==='function') window.renderEvidence();
  }

  repairInvalidBrowserStorage();

  window.addEventListener('DOMContentLoaded',()=>{
    document.documentElement.dataset.sahBuild='20.2';
    console.info('SAH build 20.2 loaded');
    setTimeout(forceIndicatorRefresh,50);
    setTimeout(forceIndicatorRefresh,400);
  });
})();

/* ==========================================================
   SAH V20.3 — mobile identity and manual cross-device data transfer
   ========================================================== */
(function(){
  'use strict';

  const MOBILE_ROLE_META={
    system:{name:'حسام الحسين',role:'مسؤول النظام',avatar:'ح'},
    indicator:{name:'سهيل الكعكي',role:'مسؤول مؤشر الأداء الرياضي',avatar:'س'},
    sports_manager:{name:'مجدي البلوشي',role:'مدير النادي الرياضي',avatar:'م'},
    dean:{name:'د. محمد المقدم',role:'عميد شؤون الطلاب',avatar:'د'}
  };

  function updateMobileIdentity(){
    const desktop=document.getElementById('activeRole');
    const mobile=document.getElementById('mobileActiveRole');
    const role=desktop?.value || mobile?.value || 'system';
    const meta=MOBILE_ROLE_META[role] || MOBILE_ROLE_META.system;

    if(mobile && mobile.value!==role) mobile.value=role;
    const name=document.getElementById('mobileUserName');
    const description=document.getElementById('mobileUserRole');
    const avatar=document.getElementById('mobileUserAvatar');
    if(name) name.textContent=meta.name;
    if(description) description.textContent=meta.role;
    if(avatar) avatar.textContent=meta.avatar;
  }

  function changeRoleFromMobile(){
    const desktop=document.getElementById('activeRole');
    const mobile=document.getElementById('mobileActiveRole');
    if(!desktop || !mobile) return;
    desktop.value=mobile.value;
    desktop.dispatchEvent(new Event('change',{bubbles:true}));
    updateMobileIdentity();
  }

  function exportDeviceData(){
    const data={};
    for(let index=0;index<localStorage.length;index++){
      const key=localStorage.key(index);
      if(key && key.startsWith('sah-')){
        data[key]=localStorage.getItem(key);
      }
    }

    const payload={
      app:'SAH',
      version:'20.3',
      exportedAt:new Date().toISOString(),
      localStorage:data
    };

    const blob=new Blob(
      [JSON.stringify(payload,null,2)],
      {type:'application/json;charset=utf-8'}
    );
    const link=document.createElement('a');
    link.href=URL.createObjectURL(blob);
    link.download=`SAH-device-data-${new Date().toISOString().slice(0,10)}.json`;
    link.click();
    URL.revokeObjectURL(link.href);
  }

  async function importDeviceData(file){
    if(!file) return;

    try{
      const text=await file.text();
      const payload=JSON.parse(text);
      if(payload?.app!=='SAH' || !payload.localStorage){
        throw new Error('Invalid SAH export');
      }

      Object.entries(payload.localStorage).forEach(([key,value])=>{
        if(key.startsWith('sah-') && typeof value==='string'){
          localStorage.setItem(key,value);
        }
      });

      alert('تم استيراد بيانات الجهاز بنجاح. ستتم إعادة تحميل الصفحة.');
      location.reload();
    }catch(error){
      console.error(error);
      alert('تعذر استيراد الملف. تأكد أنه ملف بيانات SAH صحيح.');
    }
  }

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 20.4 loaded');
    document.documentElement.dataset.sahBuild='20.4';

    const desktop=document.getElementById('activeRole');
    const mobile=document.getElementById('mobileActiveRole');

    desktop?.addEventListener('change',updateMobileIdentity);
    mobile?.addEventListener('change',changeRoleFromMobile);

    updateMobileIdentity();
  });
})();

/* SAH V20.4 — mobile menu cleanup */
(function(){
  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 20.4 loaded');

    const internalToggle=document.querySelector('.sidebar .sidebar-toggle');
    if(internalToggle){
      internalToggle.setAttribute('aria-hidden','true');
      internalToggle.tabIndex=-1;
    }
  });
})();

/* ==========================================================
   SAH V20.5 — keep mobile drawer open while expanding sections
   ========================================================== */
(function(){
  'use strict';

  function isMobile(){
    return window.matchMedia('(max-width:1100px)').matches;
  }

  function sidebar(){
    return document.querySelector('.sidebar');
  }

  function closeDrawer(){
    if(isMobile()) sidebar()?.classList.remove('open');
  }

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 20.5 loaded');
    document.documentElement.dataset.sahBuild='20.5';

    /*
      Replace accumulated accordion listeners with one predictable handler.
      Group titles expand/collapse without closing the mobile drawer.
    */
    document.querySelectorAll('.nav-group-title').forEach(oldTitle=>{
      const title=oldTitle.cloneNode(true);
      oldTitle.replaceWith(title);

      title.addEventListener('click',event=>{
        event.preventDefault();
        event.stopPropagation();

        const selected=title.closest('.nav-group');
        if(!selected) return;

        const willOpen=!selected.classList.contains('open');

        document.querySelectorAll('.sidebar .nav-group').forEach(group=>{
          const open=group===selected && willOpen;
          group.classList.toggle('open',open);
          group.querySelector('.nav-group-title')
            ?.setAttribute('aria-expanded',String(open));
        });

        if(isMobile()){
          sidebar()?.classList.add('open');
        }
      });
    });

    /*
      Close only after selecting a real destination.
      Clicking a section title never closes the drawer.
    */
    document.querySelectorAll('.sidebar .nav-items button[data-page]').forEach(oldButton=>{
      const button=oldButton.cloneNode(true);
      oldButton.replaceWith(button);

      button.addEventListener('click',event=>{
        event.stopPropagation();

        const page=button.dataset.page;
        if(page && typeof window.route==='function'){
          window.route(page);
        }

        document.querySelectorAll('.sidebar .nav-items button[data-page]')
          .forEach(item=>item.classList.toggle('active',item===button));

        window.setTimeout(closeDrawer,120);
      });
    });

    /*
      Do not let clicks inside the drawer reach older document-level
      handlers that may close it.
    */
    sidebar()?.addEventListener('click',event=>{
      event.stopPropagation();
    });
  });
})();

/* ==========================================================
   SAH V20.6 — stable mobile accordion and fixed-header offsets
   ========================================================== */
(function(){
  'use strict';

  function isMobile(){
    return window.matchMedia('(max-width:1100px)').matches;
  }

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 20.6 loaded');
    document.documentElement.dataset.sahBuild='20.6';

    /*
      Closed groups must consume only their title height.
      Open groups reveal their linked pages, without closing the drawer.
    */
    document.querySelectorAll('.sidebar .nav-group').forEach(group=>{
      const title=group.querySelector('.nav-group-title');
      if(!title) return;

      title.setAttribute(
        'aria-expanded',
        String(group.classList.contains('open'))
      );

      title.addEventListener('click',()=>{
        window.requestAnimationFrame(()=>{
          document.querySelectorAll('.sidebar .nav-group').forEach(item=>{
            item.querySelector('.nav-group-title')
              ?.setAttribute(
                'aria-expanded',
                String(item.classList.contains('open'))
              );
          });
        });
      });
    });

    /*
      Recalculate CSS viewport values after Safari's address bar changes.
    */
    const syncViewport=()=>{
      document.documentElement.style.setProperty(
        '--sah-real-vh',
        `${window.innerHeight * 0.01}px`
      );
    };

    syncViewport();
    window.addEventListener('resize',syncViewport,{passive:true});
    window.addEventListener('orientationchange',syncViewport,{passive:true});
  });
})();

/* ==========================================================
   SAH V20.7 — fixed stack verification
   ========================================================== */
(function(){
  'use strict';

  function syncFixedStack(){
    const root=document.documentElement;
    const header=document.querySelector('.topbar');
    const role=document.querySelector('.mobile-user-strip');

    if(window.innerWidth<=1100){
      const headerHeight=header?.getBoundingClientRect().height || 72;
      const roleHeight=role?.getBoundingClientRect().height || 58;
      root.style.setProperty('--sah-mobile-header-height',`${headerHeight}px`);
      root.style.setProperty('--sah-mobile-role-height',`${roleHeight}px`);
    }
  }

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 20.7 loaded');
    document.documentElement.dataset.sahBuild='20.7';
    syncFixedStack();
    setTimeout(syncFixedStack,150);
  });

  window.addEventListener('resize',syncFixedStack,{passive:true});
  window.addEventListener('orientationchange',()=>setTimeout(syncFixedStack,150),{passive:true});
})();

/* ==========================================================
   SAH V20.8 — measure fixed rows and reserve exact page space
   ========================================================== */
(function(){
  'use strict';

  let resizeObserver;

  function measureFixedStack(){
    const root=document.documentElement;
    const header=document.querySelector('.topbar');
    const role=document.querySelector('.mobile-user-strip');
    if(!header) return;

    const headerHeight=Math.ceil(header.getBoundingClientRect().height);
    const isMobile=window.matchMedia('(max-width:1100px)').matches;

    if(isMobile && role){
      /*
        Position the permissions row immediately after the true header
        height, then reserve the sum in normal page flow.
      */
      role.style.top=`${headerHeight}px`;

      const roleHeight=Math.ceil(role.getBoundingClientRect().height);
      const total=headerHeight+roleHeight;

      root.style.setProperty('--sah-mobile-header-height',`${headerHeight}px`);
      root.style.setProperty('--sah-mobile-role-height',`${roleHeight}px`);
      root.style.setProperty('--sah-fixed-stack-height',`${total}px`);
    }else{
      root.style.setProperty('--sah-fixed-stack-height',`${headerHeight}px`);
    }
  }

  function installObserver(){
    if(!('ResizeObserver' in window)) return;

    resizeObserver?.disconnect();
    resizeObserver=new ResizeObserver(()=>{
      window.requestAnimationFrame(measureFixedStack);
    });

    const header=document.querySelector('.topbar');
    const role=document.querySelector('.mobile-user-strip');
    if(header) resizeObserver.observe(header);
    if(role) resizeObserver.observe(role);
  }

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 20.8 loaded');
    document.documentElement.dataset.sahBuild='20.8';

    installObserver();
    measureFixedStack();
    setTimeout(measureFixedStack,100);
    setTimeout(measureFixedStack,400);

    document.getElementById('activeRole')
      ?.addEventListener('change',()=>setTimeout(measureFixedStack,0));

    document.getElementById('mobileActiveRole')
      ?.addEventListener('change',()=>setTimeout(measureFixedStack,0));
  });

  window.addEventListener('resize',measureFixedStack,{passive:true});
  window.addEventListener(
    'orientationchange',
    ()=>setTimeout(measureFixedStack,180),
    {passive:true}
  );

  if(document.fonts?.ready){
    document.fonts.ready.then(measureFixedStack);
  }
})();

/* ==========================================================
   SAH V21.0 — exact sub-field map and migration
   ========================================================== */
(function(){
  'use strict';

  const SUBFIELD_VERSION_KEY='sah-v21-subfields-seeded';

  const REQUIRED_SUBFIELDS = [
    ['البطولات الوطنية',['بطولة وطنية']],
    ['استضافة البطولات الوطنية',['استضافة بطولة وطنية']],
    ['البطولات التنشيطية',['تنفيذ بطولة تنشيطية']],
    ['البرامج التدريبية المركزية',[
      'دورة مركزية ( حضورية )',
      'ورشة عمل مركزية ( حضورية )',
      'دورة مركزية ( عن بعد )',
      'ورشة عمل مركزية ( عن بعد )'
    ]],
    ['الشراكة المجتمعية',['شراكة مجتمعية']],
    ['اللقاءات والفعاليات الرياضية التبادلية',['لقاء تبادلي']],
    ['تشغيل المرافق',['تشغيل مرافق']],
    ['النشاط الرياضي التنافسي الداخلي',[
      'جماعية','فردية','ذوي الإعاقة','خطة تشغيلية'
    ]],
    ['النشاط البدني والترويحي الداخلي',['نشاط ترويحي','نشاط بدني']],
    ['الأيام العالمية',['يوم عالمي','يوم وطني']],
    ['البرامج التدريبية الداخلية',['ورشة عمل','دورة تدريبية','محاضرة']],
    ['البرامج التوعوية',['نشرة توعوية','فيديو توعوي']],
    ['الكوادر العاملة في النشاط الرياضي',['الكوادر']],
    ['التطوع',['متطوع','فرق متطوعين']],
    ['مشاركة الجامعات في المنتخبات الجامعية في المناسبات الدولية',[
      'مشاركة اللاعبين في منتخبات المملكة دوليًا'
    ]],
    ['استضافة المشاركات الدولية للجامعات',[
      'لقاء ودي بين الجامعات الدولية',
      'استضافة بطولة دولية'
    ]]
  ];

  function requiredRows(){
    let index=0;
    return REQUIRED_SUBFIELDS.flatMap(([mainField,names])=>
      names.map(name=>({
        id:`sub-required-${index++}`,
        name,
        mainField,
        guest:0,
        host:0
      }))
    );
  }

  function read(key,fallback){
    try{return JSON.parse(localStorage.getItem(key)||'null') ?? fallback;}
    catch{return fallback;}
  }

  function mergeRequiredSubFields(){
    const subKey='sah-v20-9-indicator-subfields';
    const saved=read(subKey,[]);
    const required=requiredRows();
    const keyOf=item=>`${item.mainField}|||${item.name}`;
    const savedMap=new Map(saved.map(item=>[keyOf(item),item]));

    const mergedRequired=required.map(item=>{
      const old=savedMap.get(keyOf(item));
      return old ? {
        ...item,
        id:old.id||item.id,
        guest:Math.max(0,Number(old.guest)||0),
        host:Math.max(0,Number(old.host)||0)
      } : item;
    });

    const requiredKeys=new Set(required.map(keyOf));
    const custom=saved.filter(item=>
      item && item.name && !requiredKeys.has(keyOf(item)) && item.name!=='عام'
    );

    const merged=[...mergedRequired,...custom];
    localStorage.setItem(subKey,JSON.stringify(merged));
    return merged;
  }

  function migrateRows(subfields){
    const byMain=new Map();
    subfields.forEach(item=>{
      if(!byMain.has(item.mainField)) byMain.set(item.mainField,[]);
      byMain.get(item.mainField).push(item.name);
    });

    const ensure=row=>{
      const main=row.mainField||row.indicatorField||row.field||row.subCategory||'';
      const valid=byMain.get(main)||[];
      if(!valid.length) return row;

      if(!row.subField || row.subField==='عام' || !valid.includes(row.subField)){
        row.subField=valid[0];
      }
      return row;
    };

    const activityKey='sah-v15-local-activities';
    const overrideKey='sah-v15-evidence-overrides';

    const locals=read(activityKey,[]);
    locals.forEach(ensure);
    localStorage.setItem(activityKey,JSON.stringify(locals));

    const overrides=read(overrideKey,{});
    Object.values(overrides).forEach(ensure);
    localStorage.setItem(overrideKey,JSON.stringify(overrides));
  }

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 21.0 loaded');
    document.documentElement.dataset.sahBuild='21.0';

    const merged=mergeRequiredSubFields();
    migrateRows(merged);
    localStorage.setItem(SUBFIELD_VERSION_KEY,'done');

    setTimeout(()=>{
      if(typeof window.renderEvidenceStats==='function') window.renderEvidenceStats();
      if(typeof window.renderEvidence==='function') window.renderEvidence();
      if(typeof window.calcIndicators==='function') window.calcIndicators();
    },80);
  });
})();

(function(){
'use strict';
const CAT=["الأنشطة التوعوية","الأنشطة و البرامج المجتمعية و التطوعية","الأنشطة الثقافية","الأنشطة العلمية","الأنشطة الفنية","الأنشطة الرياضية","البرامج التدريبية","برامج عامة على مستوى الجامعة"];
const K={sports:'sah-v22-sports',clubs:'sah-v22-clubs',clubEvents:'sah-v22-club-events',vol:'sah-v22-vol',apps:'sah-v22-apps',grants:'sah-v24-8-grant-applications'};
const CLUB_REGISTRY_KEY='sah-v23-4-club-registry';
const CLUB_DELETED_KEY='sah-v23-4-deleted-clubs';
const DEFAULT_CLUB_REGISTRY=[{"name": "نادي الأمن السيبراني", "activities": ["مسابقة التقاط العلم", "ورشة الأمن الرقمي", "معسكر اختبار الاختراق"]}, {"name": "نادي البرمجة", "activities": ["هاكاثون البرمجة", "ورشة تطوير الويب", "تحدي الخوارزميات", "لقاء مطوري التطبيقات"]}, {"name": "نادي التنمية المستدامة", "activities": ["حملة الجامعة الخضراء", "مبادرة إعادة التدوير"]}, {"name": "نادي الهندسة المعمارية", "activities": ["معرض التصاميم المعمارية", "ورشة النمذجة ثلاثية الأبعاد"]}, {"name": "نادي الهندسة المدنية", "activities": ["زيارة مشروع إنشائي", "مسابقة الجسور المصغرة", "محاضرة البنية التحتية"]}, {"name": "نادي ريادة الأعمال", "activities": ["معسكر بناء المشاريع", "لقاء رواد الأعمال", "مسابقة نموذج العمل", "جلسة الاستثمار الجريء"]}, {"name": "نادي إدارة الأعمال", "activities": ["محاكاة إدارة الشركات", "ورشة القيادة الإدارية"]}, {"name": "نادي المالية", "activities": ["تحدي المحفظة الاستثمارية", "ورشة الثقافة المالية", "ملتقى الأسواق المالية"]}, {"name": "نادي المحاسبة", "activities": ["مسابقة المحاسب الواعد", "ورشة المعايير المحاسبية"]}];
const R=(k,f=[])=>{try{return JSON.parse(localStorage.getItem(k)||'null')??f}catch{return f}};
const W=(k,v)=>localStorage.setItem(k,JSON.stringify(v));
const id=p=>p+'-'+Date.now()+'-'+Math.random().toString(36).slice(2,6);
const td=()=>new Date().toISOString().slice(0,10);
const badge=s=>`<span class="request-status ${s==='مقبول'?'accepted':s==='مرفوض'?'rejected':'pending'}">${s}</span>`;
const later3=d=>{const x=new Date(d+'T00:00:00'),m=new Date();m.setHours(0,0,0,0);m.setDate(m.getDate()+3);return x>=m};


let clubManagementMode=false;

function seedClubRegistry(){
 const existing=R(CLUB_REGISTRY_KEY,null);
 if(Array.isArray(existing)&&existing.length)return existing;

 const seeded=DEFAULT_CLUB_REGISTRY.map((club,index)=>({
   id:`default-club-${index+1}`,
   name:club.name,
   status:'مفعل',
   source:'default',
   demoActivities:club.activities.map((name,activityIndex)=>({
     id:`demo-${index+1}-${activityIndex+1}`,
     name,
     status:'مقبول',
     demo:true
   }))
 }));

 W(CLUB_REGISTRY_KEY,seeded);
 return seeded;
}

function syncApprovedClubRequests(){
 const registry=seedClubRegistry();
 const deleted=new Set(R(CLUB_DELETED_KEY,[]));
 let changed=false;

 R(K.clubs)
   .filter(club=>club.status==='مقبول'&&club.name)
   .forEach(club=>{
     const name=club.name.trim();
     if(deleted.has(name))return;
     if(!registry.some(item=>item.name===name)){
       registry.push({
         id:club.id||id('club-registry'),
         name,
         status:'مفعل',
         source:'approved-request',
         demoActivities:[]
       });
       changed=true;
     }
   });

 if(changed)W(CLUB_REGISTRY_KEY,registry);
 return registry;
}

function clubRegistry(){
 return syncApprovedClubRequests();
}

function registeredClubs(){
 return clubRegistry().map(club=>club.name);
}

function realClubActivities(clubName){
 return R(K.clubEvents)
   .filter(event=>event.club===clubName)
   .sort((a,b)=>String(b.date||'').localeCompare(String(a.date||'')));
}

function allClubActivities(club){
 const demo=Array.isArray(club.demoActivities)?club.demoActivities:[];
 const real=realClubActivities(club.name);
 return [...demo,...real];
}

function populateClubEventSelect(){
 const select=document.getElementById('clubEventClub');
 if(!select)return;

 const current=select.value;
 const clubs=registeredClubs();

 select.innerHTML=
   '<option value="">اختر النادي المسجل</option>'+
   clubs.map(name=>`<option value="${name}">${name}</option>`).join('');

 if(current&&clubs.includes(current))select.value=current;
}

function clubColor(index){
 const colors=[
   '#1769c2','#7b4acb','#0e8b6d','#d28218','#b52b55',
   '#2c8ca8','#6c7b20','#a44b20','#4054a8','#088a9b'
 ];
 return colors[index%colors.length];
}

function renderClubShareChart(){
 const clubs=clubRegistry();
 const totals=clubs.map(club=>allClubActivities(club).length);
 const total=totals.reduce((sum,value)=>sum+value,0);
 const donut=document.getElementById('clubShareDonut');
 const legend=document.getElementById('clubShareLegend');

 const set=(id,value)=>{
   const element=document.getElementById(id);
   if(element)element.textContent=value;
 };

 set('clubShareTotal',total);
 set('clubActivitiesTotalText',`${total} نشاط`);

 if(donut){
   if(!total){
     donut.style.background='conic-gradient(#e9eff8 0deg 360deg)';
   }else{
     let start=0;
     const segments=totals.map((value,index)=>{
       const degrees=value/total*360;
       const end=start+degrees;
       const segment=`${clubColor(index)} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`;
       start=end;
       return segment;
     });
     donut.style.background=`conic-gradient(${segments.join(',')})`;
   }
 }

 if(legend){
   legend.innerHTML=clubs.map((club,index)=>{
     const count=totals[index];
     const percent=total?Math.round(count/total*100):0;
     return `<button class="club-chart-legend-item"
                     type="button"
                     data-club-id="${club.id}"
                     title="عرض أنشطة ${club.name}">
       <i style="background:${clubColor(index)}"></i>
       <span>${club.name}</span>
       <b>${count}</b>
       <small>${percent}%</small>
     </button>`;
   }).join('');
 }
}


let selectedClubDetailsId='';

function clubActivityRowsForDetails(club){
 const demo=(club.demoActivities||[]).map(item=>({
   name:item.name||'نشاط تجريبي',
   type:'نشاط تجريبي',
   date:'—',
   location:'—',
   gender:'الاثنان معًا',
   capacity:'—',
   status:item.status||'مقبول',
   demo:true
 }));

 const real=realClubActivities(club.name).map(item=>({
   name:item.name||'فعالية بدون اسم',
   type:'مبادرة/فعالية نادي',
   date:item.date||'—',
   location:item.location||'—',
   gender:item.gender||'—',
   capacity:Number(item.capacity)||'—',
   status:item.status||'تحت المراجعة',
   demo:false
 }));

 return [...real,...demo];
}

function renderClubActivityDetails(clubId,openPanel=true){
 const registry=clubRegistry();
 const club=registry.find(item=>item.id===clubId);
 const panel=document.getElementById('clubActivityDetailsPanel');
 const rowsBox=document.getElementById('clubActivityDetailsRows');

 if(!club||!panel||!rowsBox)return;

 selectedClubDetailsId=clubId;
 const activities=clubActivityRowsForDetails(club);
 const accepted=activities.filter(item=>item.status==='مقبول').length;
 const pending=activities.filter(item=>item.status==='تحت المراجعة').length;
 const rejected=activities.filter(item=>item.status==='مرفوض').length;

 const set=(id,value)=>{
   const element=document.getElementById(id);
   if(element)element.textContent=value;
 };

 set('clubActivityDetailsTitle',club.name);
 set('clubActivityDetailsSummary',
   `${activities.length} نشاطًا مرتبطًا — تتحدث البيانات تلقائيًا عند إضافة أو تعديل أي فعالية.`);
 set('clubDetailsTotal',activities.length);
 set('clubDetailsAccepted',accepted);
 set('clubDetailsPending',pending);
 set('clubDetailsRejected',rejected);

 rowsBox.innerHTML=activities.length
   ? activities.map(item=>`<tr>
       <td>
         <strong class="club-detail-activity-name">${item.name}</strong>
         ${item.demo?'<small class="demo-activity-tag">تجريبي</small>':''}
       </td>
       <td>${item.type}</td>
       <td>${item.date}</td>
       <td>${item.location}</td>
       <td>${item.gender}</td>
       <td>${item.capacity}</td>
       <td>
         <span class="request-status ${
           item.status==='مقبول'?'accepted':
           item.status==='مرفوض'?'rejected':'pending'
         }">${item.status}</span>
       </td>
     </tr>`).join('')
   : '<tr><td colspan="7">لا توجد أنشطة مرتبطة بهذا النادي حتى الآن.</td></tr>';

 if(openPanel){
   panel.classList.remove('hidden');
   panel.scrollIntoView({behavior:'smooth',block:'nearest'});
 }

 document.querySelectorAll('.club-chart-legend-item').forEach(button=>{
   button.classList.toggle('active',button.dataset.clubId===clubId);
 });
}

function refreshSelectedClubDetails(){
 if(!selectedClubDetailsId)return;

 const exists=clubRegistry().some(club=>club.id===selectedClubDetailsId);
 if(!exists){
   selectedClubDetailsId='';
   document.getElementById('clubActivityDetailsPanel')?.classList.add('hidden');
   return;
 }

 renderClubActivityDetails(selectedClubDetailsId,false);
}

function renderRegisteredClubs(){
 const clubs=clubRegistry();
 const count=document.getElementById('registeredClubsCount');
 if(count)count.textContent=clubs.length;

 const body=document.getElementById('registeredClubsRows');
 if(!body)return;

 body.innerHTML=clubs.map(club=>{
   const activities=allClubActivities(club);
   const activityText=activities.length
     ? activities.map(item=>`
        <span class="club-activity-chip ${item.status==='مقبول'?'accepted':item.status==='مرفوض'?'rejected':'pending'}">
          ${item.name||'فعالية بدون اسم'}
          <small>${item.demo?'تجريبي':(item.status||'تحت المراجعة')}</small>
        </span>`).join('')
     : '<span class="club-no-activities">لا توجد أنشطة مسجلة</span>';

   const nameCell=clubManagementMode
     ? `<input class="club-name-editor" data-club-id="${club.id}"
               value="${club.name}" aria-label="اسم النادي">`
     : `<strong class="registered-club-name">${club.name}</strong>`;

   return `<tr data-club-id="${club.id}">
     <td>${nameCell}</td>
     <td><span class="request-status accepted">${club.status||'مفعل'}</span></td>
     <td><strong class="club-activities-count">${activities.length}</strong></td>
     <td><div class="club-activities-list">${activityText}</div></td>
     <td class="club-management-column">
       <div class="club-management-actions">
         <button class="club-save-btn" data-club-id="${club.id}" type="button">حفظ</button>
         <button class="club-delete-btn" data-club-id="${club.id}" type="button">حذف</button>
       </div>
     </td>
   </tr>`;
 }).join('');

 document.getElementById('registeredClubsPanel')
   ?.classList.toggle('club-management-active',clubManagementMode);

 renderClubShareChart();
 refreshSelectedClubDetails();
}

function renameClub(clubId,newName){
 const trimmed=String(newName||'').trim();
 if(!trimmed){
   window.showToast?.('لا يمكن ترك اسم النادي فارغًا.');
   return false;
 }

 const registry=clubRegistry();
 const club=registry.find(item=>item.id===clubId);
 if(!club)return false;

 if(registry.some(item=>item.id!==clubId&&item.name===trimmed)){
   window.showToast?.('يوجد نادٍ آخر بالاسم نفسه.');
   return false;
 }

 const oldName=club.name;
 club.name=trimmed;
 W(CLUB_REGISTRY_KEY,registry);

 const events=R(K.clubEvents);
 events.forEach(event=>{
   if(event.club===oldName)event.club=trimmed;
 });
 W(K.clubEvents,events);

 const clubRequests=R(K.clubs);
 clubRequests.forEach(request=>{
   if(request.name===oldName)request.name=trimmed;
 });
 W(K.clubs,clubRequests);

 const deleted=new Set(R(CLUB_DELETED_KEY,[]));
 deleted.delete(trimmed);
 W(CLUB_DELETED_KEY,[...deleted]);

 populateClubEventSelect();
 renderAll();
 window.showToast?.('تم تعديل بيانات النادي.');
 return true;
}

function deleteClub(clubId){
 const registry=clubRegistry();
 const club=registry.find(item=>item.id===clubId);
 if(!club)return;

 if(!confirm(`هل تريد حذف "${club.name}" من النوادي المفعلة؟`))return;

 W(CLUB_REGISTRY_KEY,registry.filter(item=>item.id!==clubId));

 const deleted=new Set(R(CLUB_DELETED_KEY,[]));
 deleted.add(club.name);
 W(CLUB_DELETED_KEY,[...deleted]);

 const events=R(K.clubEvents).filter(event=>event.club!==club.name);
 W(K.clubEvents,events);

 renderAll();
 window.showToast?.('تم حذف النادي والأنشطة المرتبطة به.');
}

function approvalBeneficiaryTotals(requests){
 let male=0;
 let female=0;

 requests
   .filter(request=>request.status==='مقبول')
   .forEach(request=>{
     const amount=Math.max(
       0,
       Number(request.capacity)||
       Number(request.participants)||
       (Array.isArray(request.members)?request.members.length:0)||
       0
     );

     if(request.gender==='طلاب'){
       male+=amount;
     }else if(request.gender==='طالبات'){
       female+=amount;
     }else if(request.gender==='الاثنان معًا'){
       male+=Math.ceil(amount/2);
       female+=Math.floor(amount/2);
     }
   });

 return {male,female};
}

function allReq(){return[
 ...R(K.sports).map(x=>({...x,store:K.sports,kind:'بطولة/حدث رياضي'})),
 ...R(K.clubs).map(x=>({...x,store:K.clubs,kind:'تسجيل نادي جديد'})),
 ...R(K.clubEvents).map(x=>({...x,store:K.clubEvents,kind:'مبادرة/فعالية نادي'})),
 ...R(K.vol).map(x=>({...x,store:K.vol,kind:'فرصة تطوعية'})),
 ...R(K.grants).filter(x=>x.status==='محال للعمادة'||x.status==='معتمد نهائيًا'||x.status==='مرفوض من العمادة')
   .map(x=>({...x,store:K.grants,kind:'طلب اعتماد منحة رياضية',name:x.name,date:x.submittedAt,gender:x.gender}))
]}
function push(k,o){const a=R(k);a.push(o);W(k,a);renderAll();showToast?.('تم إرسال الطلب وحالته تحت المراجعة.')}
function evidence(){return window.getFilteredEvidence?window.getFilteredEvidence():(window.SAH_DATA?.evidenceRecords||[])}

function renderCategory(c){
 const allRows=evidence();
 const rows=allRows.filter(row=>(row.eventCategory||'الأنشطة الرياضية')===c);
 const maleRows=rows.filter(row=>row.gender==='طلاب');
 const femaleRows=rows.filter(row=>row.gender==='طالبات');

 const allMaleRows=allRows.filter(row=>row.gender==='طلاب');
 const allFemaleRows=allRows.filter(row=>row.gender==='طالبات');

 const sumBeneficiaries=list=>list.reduce(
   (total,row)=>total+(Number(row.beneficiaries)||0),0
 );

 const set=(id,value)=>{
   const element=document.getElementById(id);
   if(element)element.textContent=value;
 };

 const categoryMalePercent=rows.length
   ? Math.round(maleRows.length/rows.length*100)
   : 0;

 const allMalePercent=allRows.length
   ? Math.round(allMaleRows.length/allRows.length*100)
   : 0;

 const activeCategories=new Set(
   allRows.map(row=>row.eventCategory||'الأنشطة الرياضية').filter(Boolean)
 ).size;

 const isDocumented=row=>{
   const url=String(row.documentationUrl||'').trim();
   const status=String(row.status||'').trim();
   return /^https?:\/\//i.test(url)||status==='مكتمل';
 };

 const documentedCount=allRows.filter(isDocumented).length;
 const incompleteCount=Math.max(0,allRows.length-documentedCount);

 set('categoryMaleCount',maleRows.length);
 set('categoryFemaleCount',femaleRows.length);
 set('categoryTotalCount',rows.length);
 set('categoryBeneficiaries',sumBeneficiaries(rows));
 set('categoryMaleBeneficiaries',sumBeneficiaries(maleRows));
 set('categoryFemaleBeneficiaries',sumBeneficiaries(femaleRows));
 set('categoryCurrentName',c);

 set('categoryGenderPercent',`${categoryMalePercent}%`);
 set('categoryGenderPercentText',`${categoryMalePercent}%`);
 set('categoryChartMaleCount',maleRows.length);
 set('categoryChartFemaleCount',femaleRows.length);

 set('allActivitiesGenderPercent',`${allMalePercent}%`);
 set('allActivitiesGenderPercentText',`${allMalePercent}%`);
 set('allActivitiesMaleCount',allMaleRows.length);
 set('allActivitiesFemaleCount',allFemaleRows.length);
 set('allActivitiesTotal',allRows.length);
 set('allActivitiesBeneficiaries',sumBeneficiaries(allRows));
 set('allActivitiesCategories',activeCategories);
 set('allActivitiesDocumented',documentedCount);
 set('allActivitiesIncomplete',incompleteCount);

 document.getElementById('categoryGenderDonut')
   ?.style.setProperty('--p',categoryMalePercent);

 document.getElementById('allActivitiesGenderDonut')
   ?.style.setProperty('--p',allMalePercent);

 const body=document.getElementById('categoryActivityRows');
 if(body){
   body.innerHTML=rows.length
     ? rows.map(row=>`<tr>
         <td>${row.activity||'—'}</td>
         <td>${row.date||'—'}</td>
         <td>${row.days??'—'}</td>
         <td>${row.beneficiaries??0}</td>
         <td>${row.gender||'—'}</td>
         <td>${
           /^https?:/.test(row.documentationUrl||'')
             ? `<a href="${row.documentationUrl}" target="_blank" rel="noopener">فتح</a>`
             : 'غير متوفر'
         }</td>
       </tr>`).join('')
     : '<tr><td colspan="6">لا توجد أنشطة.</td></tr>';
 }
}

function normalizeEventDescription(value){
  return String(value||'').replace(/\s+/g,' ').trim();
}

function eventDescriptionWordCount(value){
  const normalized=normalizeEventDescription(value);
  return normalized ? normalized.split(' ').length : 0;
}

function enforceEventDescriptionLimit(textarea){
  if(!textarea)return 0;
  const limit=Number(textarea.dataset.wordLimit)||35;
  const words=normalizeEventDescription(textarea.value).split(' ').filter(Boolean);

  if(words.length>limit){
    textarea.value=words.slice(0,limit).join(' ');
  }

  const count=eventDescriptionWordCount(textarea.value);
  const counter=document.getElementById(textarea.dataset.wordCounter);

  if(counter){
    counter.textContent=`${count} / ${limit} كلمة`;
    counter.classList.toggle('limit-reached',count>=limit);
  }

  return count;
}


function clearRequiredFieldErrors(container){
  container?.querySelectorAll('.required-field-error').forEach(element=>{
    element.classList.remove('required-field-error');
  });
}

function requiredFieldHasValue(field){
  if(!field || field.disabled || field.type==='hidden')return true;

  if(field.type==='checkbox'||field.type==='radio'){
    return field.checked;
  }

  if(field.type==='file'){
    return Boolean(field.files?.length);
  }

  return String(field.value??'').trim()!=='';
}

function validateRequiredContainer(container,options={}){
  if(!container)return false;

  clearRequiredFieldErrors(container);

  const fields=[...container.querySelectorAll(
    'input[required],select[required],textarea[required]'
  )];

  const missing=fields.filter(field=>{
    if(
      options.allowExistingFiles &&
      field.type==='file' &&
      options.existingFileIds?.includes(field.id)
    ){
      const existingName=options.existingFileNames?.[field.id];
      return !field.files?.length && !existingName;
    }

    return !requiredFieldHasValue(field);
  });

  if(missing.length){
    missing.forEach(field=>{
      field.classList.add('required-field-error');
      field.closest('label')?.classList.add('required-field-error');
    });

    missing[0].focus();
    window.showToast?.(
      `يرجى تعبئة جميع البيانات المطلوبة. الحقول الناقصة: ${missing.length}`
    );
    return false;
  }

  const invalid=fields.find(field=>!field.checkValidity());
  if(invalid){
    invalid.classList.add('required-field-error');
    invalid.closest('label')?.classList.add('required-field-error');
    invalid.reportValidity();
    invalid.focus();
    return false;
  }

  return true;
}

function resetRequiredErrorOnInput(event){
  const field=event.target.closest(
    'input[required],select[required],textarea[required]'
  );
  if(!field)return;

  if(requiredFieldHasValue(field)){
    field.classList.remove('required-field-error');
    field.closest('label')?.classList.remove('required-field-error');
  }
}

function tableFilterValue(id,fallback=''){
 const element=document.getElementById(id);
 return element ? String(element.value||fallback) : fallback;
}

function rowMatchesSearch(row,query){
 return !query || match(row,query);
}

function rowMatchesStatus(row,status){
 return status==='all' || String(row.status||'تحت المراجعة')===status;
}

function filteredStoredRows(key,searchId,statusId){
 const query=tableFilterValue(searchId,'').trim();
 const status=tableFilterValue(statusId,'all');
 return R(key).filter(row=>rowMatchesStatus(row,status)&&rowMatchesSearch(row,query));
}

function tables(){
 const put=(id,rows,renderer,colspan)=>{
   const body=document.getElementById(id);
   if(!body)return;
   body.innerHTML=rows.length
     ? rows.map(renderer).join('')
     : `<tr><td colspan="${colspan}" class="empty-filtered-row">لا توجد نتائج مطابقة.</td></tr>`;
 };

 put(
   'sportsRequestRows',
   filteredStoredRows(K.sports,'sportsRequestSearch','sportsRequestStatus'),
   row=>`<tr><td>${row.name}</td><td>${row.date}</td><td>${row.game}</td><td>${row.capacity}</td><td>${badge(row.status)}</td><td>${row.reason||'—'}</td></tr>`,
   6
 );

 put(
   'clubRequestRows',
   filteredStoredRows(K.clubs,'clubRequestSearch','clubRequestStatus'),
   row=>`<tr><td>${row.name}</td><td>${row.supervisor}</td><td>${row.manager}</td><td>${row.members?.length||0}</td><td>${row.gender}</td><td>${badge(row.status)}</td><td>${row.reason||'—'}</td></tr>`,
   7
 );

 put(
   'clubEventRequestRows',
   filteredStoredRows(K.clubEvents,'clubEventSearch','clubEventStatus'),
   row=>`<tr><td>${row.name}</td><td>${row.club}</td><td>${row.date}</td><td>${row.location}</td><td>${row.capacity}</td><td>${badge(row.status)}</td><td>${row.reason||'—'}</td></tr>`,
   7
 );

 put(
   'volunteerRequestRows',
   filteredStoredRows(K.vol,'volunteerTableSearch','volunteerTableStatus'),
   row=>`<tr><td>${row.name}</td><td>${row.date}</td><td>${row.capacity}</td><td>${row.owner}</td><td>${badge(row.status)}</td><td>${row.reason||'—'}</td></tr>`,
   6
 );
}
function student(){
 const a=R(K.apps),used=new Set(a.map(x=>x.requestId)),ops=allReq().filter(r=>r.status==='مقبول'&&r.kind!=='تسجيل نادي جديد'&&!used.has(r.id));
 const c=document.getElementById('studentApprovedOpportunityCards');
 if(c)c.innerHTML=ops.length?ops.map(r=>{
   const appliedCount=a.filter(item=>item.requestId===r.id).length;
   const capacity=Math.max(0,Number(r.capacity)||Number(r.participants)||0);
   const remaining=Math.max(0,capacity-appliedCount);
   const location=r.location||r.game||'غير محدد';
   const eventType=r.kind||r.type||'فعالية';
   const isFull=capacity>0&&remaining<=0;

   return `<div class="card student-event-card ${isFull?'event-is-full':''}">
     <div class="student-event-card-head">
       <span class="student-event-kind">${eventType}</span>
       <span class="student-event-status">${isFull?'اكتملت المقاعد':'متاح للتقديم'}</span>
     </div>

     <div class="student-event-main">
       <span class="student-event-label">اسم الحدث</span>
       <h4>${r.name||'فعالية بدون اسم'}</h4>
       ${r.description?`<p class="student-event-description">${r.description}</p>`:''}
     </div>

     <div class="student-event-details">
       <div class="student-event-detail">
         <span>نوع الحدث</span>
         <strong>${eventType}</strong>
       </div>
       <div class="student-event-detail">
         <span>مكان الحدث</span>
         <strong>${location}</strong>
       </div>
       <div class="student-event-detail">
         <span>تاريخ الحدث</span>
         <strong>${r.date||'غير محدد'}</strong>
       </div>
     </div>

     <div class="student-event-seats ${isFull?'is-full':''}">
       <span>المقاعد المتبقية</span>
       <strong>${capacity>0?remaining:'غير محدد'}</strong>
       ${capacity>0?`<small>من أصل ${capacity} مقعدًا</small>`:'<small>لم يحدد الحد الأقصى بعد</small>'}
     </div>

     <button class="btn primary apply-event"
             data-id="${r.id}" type="button"
             ${isFull?'disabled aria-disabled="true"':''}>
       ${isFull?'اكتملت المقاعد':'قدم الآن'}
     </button>
   </div>`;
 }).join(''):'<div class="card empty-student-events">لا توجد فعاليات متاحة حاليًا.</div>';
 document.querySelectorAll('.apply-event').forEach(b=>b.onclick=()=>{
   if(b.disabled)return;
   const r=allReq().find(x=>x.id===b.dataset.id);
   if(!r)return;

   const x=R(K.apps);
   const capacity=Math.max(0,Number(r.capacity)||Number(r.participants)||0);
   const used=x.filter(item=>item.requestId===r.id).length;

   if(capacity>0&&used>=capacity){
     window.showToast?.('اكتملت جميع المقاعد المتاحة لهذا الحدث.');
     renderAll();
     return;
   }

   x.push({
     id:id('app'),
     requestId:r.id,
     eventName:r.name,
     kind:r.kind,
     appliedAt:td(),
     status:'تحت المراجعة',
     student:{
       name:'فلان الفلاني',
       studentId:'20260001',
       email:'student@ubt.edu.sa',
       age:21,
       gender:'ذكر',
       phone:'0500000000'
     }
   });
   W(K.apps,x);
   renderAll();
 });
 const body=document.getElementById('studentApplicationRows');if(body)body.innerHTML=a.length?a.map(x=>`<tr><td>${x.eventName}</td><td>${x.kind}</td><td>${x.appliedAt}</td><td>${badge(x.status)}</td></tr>`).join(''):'<tr><td colspan="4">لا توجد طلبات.</td></tr>';
 document.getElementById('studentAppliedCount').textContent=a.length;document.getElementById('studentJoinedCount').textContent=a.filter(x=>x.status==='مقبول').length;
}
function applicants(){
 const applications=R(K.apps);
 const requests=allReq();

 const actionMarkup=application=>{
   const isPending=!application.status||application.status==='تحت المراجعة';

   if(!isPending){
     const accepted=application.status==='مقبول';
     return `<div class="approval-final-decision ${accepted?'decision-approved':'decision-rejected'}">
       <span class="approval-final-icon">${accepted?'✓':'×'}</span>
       <div>
         <strong>${accepted?'تم القبول':'تم الرفض'}</strong>
         ${!accepted&&application.reason?`<small>${application.reason}</small>`:''}
       </div>
     </div>`;
   }

   return `<div class="approval-inline-decision applicant-inline-decision"
                data-application-id="${application.id}">
     <div class="approval-action-buttons applicant-initial-actions">
       <button class="approve-app approval-decision-btn approve"
               data-id="${application.id}" type="button"
               title="قبول طلب الطالب">
         <span class="approval-btn-icon">✓</span>
         <span>قبول</span>
       </button>

       <button class="open-app-rejection-editor approval-decision-btn reject"
               data-id="${application.id}" type="button"
               title="رفض طلب الطالب">
         <span class="approval-btn-icon">×</span>
         <span>رفض</span>
       </button>
     </div>

     <div class="approval-rejection-editor applicant-rejection-editor" hidden>
       <input class="approval-rejection-comment applicant-rejection-comment"
              data-id="${application.id}"
              type="text"
              placeholder="اكتب سبب الرفض هنا..."
              aria-label="سبب رفض طلب الطالب"
              maxlength="180">

       <div class="approval-rejection-editor-actions">
         <button class="confirm-reject-app"
                 data-id="${application.id}"
                 type="button">
           تأكيد الرفض
         </button>
         <button class="cancel-app-rejection-editor"
                 type="button">
           إلغاء
         </button>
       </div>

       <small class="approval-comment-hint">
         لا يمكن رفض الطلب دون كتابة السبب.
       </small>
     </div>
   </div>`;
 };

 const draw=(tbodyId,kind,searchId,statusId)=>{
   const tbody=document.getElementById(tbodyId);
   if(!tbody)return;

   const query=tableFilterValue(searchId,'').trim();
   const status=tableFilterValue(statusId,'all');

   const rows=applications.filter(application=>{
     const request=requests.find(item=>item.id===application.requestId);
     if(request?.kind!==kind)return false;
     if(status!=='all'&&String(application.status||'تحت المراجعة')!==status)return false;

     return rowMatchesSearch({
       ...application,
       eventName:application.eventName,
       club:request?.club||request?.name||'',
       eventDate:request?.date||'',
       requestType:request?.kind||''
     },query);
   });

   tbody.innerHTML=rows.length
     ? rows.map(application=>`<tr class="student-application-row ${
         application.status==='مقبول'?'is-accepted':
         application.status==='مرفوض'?'is-rejected':'is-pending'
       }">
         <td><strong>${application.eventName}</strong></td>
         <td>${application.student.name}</td>
         <td>${application.student.studentId}</td>
         <td>${application.student.email}</td>
         <td>${application.student.age}</td>
         <td>${application.student.gender}</td>
         <td>${application.student.phone}</td>
         <td class="student-application-action-cell">
           ${actionMarkup(application)}
         </td>
       </tr>`).join('')
     : '<tr><td colspan="8">لا توجد طلبات.</td></tr>';
 };

 draw('sportsApplicantRows','بطولة/حدث رياضي','sportsApplicantSearch','sportsApplicantStatus');
 draw('clubApplicantRows','مبادرة/فعالية نادي','clubApplicantSearch','clubApplicantStatus');

 document.querySelectorAll('.approve-app').forEach(button=>{
   button.onclick=()=>{
     const rows=R(K.apps);
     const application=rows.find(item=>item.id===button.dataset.id);
     if(!application||(
       application.status&&application.status!=='تحت المراجعة'
     ))return;

     application.status='مقبول';
     application.reason='';
     W(K.apps,rows);
     renderAll();
   };
 });

 document.querySelectorAll('.open-app-rejection-editor').forEach(button=>{
   button.onclick=()=>{
     const container=button.closest('.applicant-inline-decision');
     const editor=container?.querySelector('.applicant-rejection-editor');
     const actions=container?.querySelector('.applicant-initial-actions');
     const input=container?.querySelector('.applicant-rejection-comment');

     if(!editor||!actions)return;

     editor.hidden=false;
     actions.hidden=true;
     container.classList.add('rejection-editor-open');
     input?.focus();
   };
 });

 document.querySelectorAll('.cancel-app-rejection-editor').forEach(button=>{
   button.onclick=()=>{
     const container=button.closest('.applicant-inline-decision');
     const editor=container?.querySelector('.applicant-rejection-editor');
     const actions=container?.querySelector('.applicant-initial-actions');
     const input=container?.querySelector('.applicant-rejection-comment');

     if(!editor||!actions)return;

     editor.hidden=true;
     actions.hidden=false;
     container.classList.remove('rejection-editor-open');

     if(input){
       input.value='';
       input.classList.remove('invalid');
     }
   };
 });

 document.querySelectorAll('.confirm-reject-app').forEach(button=>{
   button.onclick=()=>{
     const rows=R(K.apps);
     const application=rows.find(item=>item.id===button.dataset.id);
     if(!application||(
       application.status&&application.status!=='تحت المراجعة'
     ))return;

     const container=button.closest('.applicant-inline-decision');
     const input=container?.querySelector('.applicant-rejection-comment');
     const reason=(input?.value||'').trim();

     if(!reason){
       input?.classList.add('invalid');
       input?.focus();
       window.showToast?.('اكتب سبب الرفض قبل تأكيد القرار.');
       return;
     }

     application.status='مرفوض';
     application.reason=reason;
     W(K.apps,rows);
     renderAll();
   };
 });
}

function approvals(){
 const query=tableFilterValue('approvalTableSearch','').trim();
 const status=tableFilterValue('approvalTableStatus','all');
 const type=tableFilterValue('approvalTableType','all');
 const all=allReq();
 const a=all.filter(request=>{
   if(status!=='all'&&String(request.status||'تحت المراجعة')!==status)return false;
   if(type!=='all'&&request.kind!==type)return false;
   return rowMatchesSearch({
     ...request,
     activityName:request.name||'',
     clubName:request.club||request.name||'',
     requester:request.submittedBy||''
   },query);
 });
 const b=document.getElementById('approvalRequestRows');
 if(b)b.innerHTML=a.length?a.map(r=>{
   const isPending=r.status==='تحت المراجعة';
   const decisionClass=r.status==='مقبول'?'decision-approved':'decision-rejected';
   const decisionIcon=r.status==='مقبول'?'✓':'×';
   const decisionText=r.status==='مقبول'?'تمت الموافقة':'تم الرفض';
   const actionHtml=isPending
     ? `<div class="approval-inline-decision" data-request-id="${r.id}">
          <div class="approval-action-buttons approval-initial-actions">
            <button class="approve-req approval-decision-btn approve"
                    data-store="${r.store}" data-id="${r.id}" type="button"
                    title="الموافقة على الطلب">
              <span class="approval-btn-icon">✓</span>
              <span>موافقة</span>
            </button>
            <button class="open-rejection-editor approval-decision-btn reject"
                    data-store="${r.store}" data-id="${r.id}" type="button"
                    title="رفض الطلب">
              <span class="approval-btn-icon">×</span>
              <span>رفض</span>
            </button>
          </div>

          <div class="approval-rejection-editor" hidden>
            <input class="approval-rejection-comment"
                   data-store="${r.store}"
                   data-id="${r.id}"
                   type="text"
                   placeholder="اكتب سبب الرفض هنا..."
                   aria-label="سبب الرفض"
                   maxlength="180">
            <div class="approval-rejection-editor-actions">
              <button class="confirm-reject-req"
                      data-store="${r.store}" data-id="${r.id}"
                      type="button">
                تأكيد الرفض
              </button>
              <button class="cancel-rejection-editor"
                      type="button">
                إلغاء
              </button>
            </div>
            <small class="approval-comment-hint">
              لا يمكن اعتماد الرفض دون كتابة السبب.
            </small>
          </div>
        </div>`
     : `<div class="approval-final-decision ${decisionClass}">
          <span class="approval-final-icon">${decisionIcon}</span>
          <div>
            <strong>${decisionText}</strong>
            ${r.status==='مرفوض'&&r.reason?`<small>${r.reason}</small>`:''}
          </div>
        </div>`;
   return `<tr class="approval-request-row ${isPending?'is-pending':'is-decided'}">
     <td>${r.kind}</td>
     <td><strong class="approval-request-title">${r.name}</strong></td>
     <td>${r.submittedBy||'المستخدم الحالي'}</td>
     <td>${r.date||r.submittedAt}</td>
     <td>${r.gender||r.capacity||'—'}</td>
     <td>${badge(r.status)}</td>
     <td class="approval-action-cell">${actionHtml}</td>
   </tr>`;
 }).join(''):'<tr><td colspan="7">لا توجد طلبات.</td></tr>';

 document.querySelectorAll('.approve-req').forEach(button=>button.onclick=()=>{
   const rows=R(button.dataset.store);
   const request=rows.find(item=>item.id===button.dataset.id);
   if(!request||request.status!=='تحت المراجعة')return;

   request.status='مقبول';
   request.reason='';
   W(button.dataset.store,rows);
   renderAll();
 });

 document.querySelectorAll('.open-rejection-editor').forEach(button=>button.onclick=()=>{
   const container=button.closest('.approval-inline-decision');
   const editor=container?.querySelector('.approval-rejection-editor');
   const initialActions=container?.querySelector('.approval-initial-actions');
   const input=container?.querySelector('.approval-rejection-comment');

   if(!editor||!initialActions)return;

   editor.hidden=false;
   initialActions.hidden=true;
   container.classList.add('rejection-editor-open');
   input?.focus();
 });

 document.querySelectorAll('.cancel-rejection-editor').forEach(button=>button.onclick=()=>{
   const container=button.closest('.approval-inline-decision');
   const editor=container?.querySelector('.approval-rejection-editor');
   const initialActions=container?.querySelector('.approval-initial-actions');
   const input=container?.querySelector('.approval-rejection-comment');

   if(!editor||!initialActions)return;

   editor.hidden=true;
   initialActions.hidden=false;
   container.classList.remove('rejection-editor-open');
   if(input){
     input.value='';
     input.classList.remove('invalid');
   }
 });

 document.querySelectorAll('.confirm-reject-req').forEach(button=>button.onclick=()=>{
   const rows=R(button.dataset.store);
   const request=rows.find(item=>item.id===button.dataset.id);
   if(!request||request.status!=='تحت المراجعة')return;

   const container=button.closest('.approval-inline-decision');
   const input=container?.querySelector('.approval-rejection-comment');
   const reason=(input?.value||'').trim();

   if(!reason){
     input?.classList.add('invalid');
     input?.focus();
     window.showToast?.('اكتب سبب الرفض قبل تأكيد القرار.');
     return;
   }

   input?.classList.remove('invalid');
   request.status='مرفوض';
   request.reason=reason;
   W(button.dataset.store,rows);
   renderAll();
 });
 const ac=all.filter(x=>x.status==='مقبول').length;
 const re=all.filter(x=>x.status==='مرفوض').length;
 const pe=all.length-ac-re;
 const p=all.length?Math.round(ac/all.length*100):0;
 const beneficiaryTotals=approvalBeneficiaryTotals(all);

 const approvedActivities=all.filter(item=>
   item.status==='مقبول'&&item.kind!=='تسجيل نادي جديد'
 );
 const maleActivities=approvedActivities.filter(item=>item.gender==='طلاب').length;
 const femaleActivities=approvedActivities.filter(item=>item.gender==='طالبات').length;
 const sharedActivities=approvedActivities.filter(item=>item.gender==='الاثنان معًا').length;
 const maleActivityTotal=maleActivities+Math.ceil(sharedActivities/2);
 const femaleActivityTotal=femaleActivities+Math.floor(sharedActivities/2);
 const genderTotal=maleActivityTotal+femaleActivityTotal;
 const femaleRatio=genderTotal?Math.round(femaleActivityTotal/genderTotal*100):0;

 [
   ['approvalTotal',all.length],
   ['approvalAccepted',ac],
   ['approvalRejected',re],
   ['approvalPending',pe],
   ['approvalPercent',p+'%'],
   ['approvalPercentText',p+'%'],
   ['approvalMaleBeneficiaries',beneficiaryTotals.male],
   ['approvalFemaleBeneficiaries',beneficiaryTotals.female],
   ['approvalChartAccepted',ac],
   ['approvalChartRejected',re],
   ['approvalChartPending',pe],
   ['approvalDecisionTotal',all.length],
   ['approvalFemaleRatioText',femaleRatio+'%'],
   ['approvalMaleActivityCount',maleActivityTotal],
   ['approvalFemaleActivityCount',femaleActivityTotal],
   ['approvalGenderTotal',genderTotal]
 ].forEach(([i,v])=>{
   const e=document.getElementById(i);
   if(e)e.textContent=v;
 });

 const decisionDonut=document.getElementById('approvalDecisionDonut');
 if(decisionDonut){
   const approvedDeg=all.length?ac/all.length*360:0;
   const rejectedDeg=all.length?re/all.length*360:0;
   decisionDonut.style.setProperty('--approved',`${approvedDeg}deg`);
   decisionDonut.style.setProperty('--rejected',`${rejectedDeg}deg`);
 }

 const genderDonut=document.getElementById('approvalGenderDonut');
 if(genderDonut){
   const maleDeg=genderTotal?maleActivityTotal/genderTotal*360:0;
   genderDonut.style.setProperty('--male',`${maleDeg}deg`);
 }

 renderRegisteredClubs();
 populateClubEventSelect();
}

function approvalExportRows(){
 return allReq().map((request,index)=>({
   sequence:index+1,
   type:request.kind||'—',
   title:request.name||'—',
   submittedBy:request.submittedBy||'المستخدم الحالي',
   date:request.date||request.submittedAt||'—',
   genderOrCapacity:request.gender||request.capacity||'—',
   status:request.status||'تحت المراجعة',
   reason:request.reason||'—'
 }));
}


function clubExportData(){
 return clubRegistry().map((club,index)=>{
   const request=R(K.clubs).find(item=>item.name===club.name&&item.status==='مقبول')||{};
   const activities=clubActivityRowsForDetails(club);

   return {
     sequence:index+1,
     name:club.name,
     status:club.status||'مفعل',
     supervisor:request.supervisor||'—',
     manager:request.manager||'—',
     members:Array.isArray(request.members)?request.members.length:'—',
     activityCount:activities.length,
     activities
   };
 });
}

function exportDashboardSummary(){
 const requests=approvalExportRows();
 const clubs=clubExportData();
 const activities=clubs.flatMap(club=>club.activities);

 return {
   requests:requests.length,
   approvedRequests:requests.filter(row=>row.status==='مقبول').length,
   rejectedRequests:requests.filter(row=>row.status==='مرفوض').length,
   pendingRequests:requests.filter(row=>row.status==='تحت المراجعة').length,
   clubs:clubs.length,
   clubActivities:activities.length,
   approvedActivities:activities.filter(item=>item.status==='مقبول').length,
   rejectedActivities:activities.filter(item=>item.status==='مرفوض').length,
   pendingActivities:activities.filter(item=>item.status==='تحت المراجعة').length
 };
}

function csvCell(value){
 const text=String(value??'').replace(/"/g,'""');
 return `"${text}"`;
}

function downloadTextFile(filename,content,type){
 const blob=new Blob(['\ufeff'+content],{type});
 const url=URL.createObjectURL(blob);
 const link=document.createElement('a');
 link.href=url;
 link.download=filename;
 document.body.appendChild(link);
 link.click();
 link.remove();
 setTimeout(()=>URL.revokeObjectURL(url),1000);
}

function exportApprovalsExcel(){
 const requests=approvalExportRows();
 const clubs=clubExportData();
 const summary=exportDashboardSummary();
 const lines=[];

 lines.push([csvCell('ملخص التقرير'),csvCell('القيمة')].join(','));
 [
   ['إجمالي الطلبات',summary.requests],
   ['الموافقات',summary.approvedRequests],
   ['الرفض',summary.rejectedRequests],
   ['قيد المراجعة',summary.pendingRequests],
   ['عدد الأندية المسجلة',summary.clubs],
   ['إجمالي أنشطة الأندية',summary.clubActivities],
   ['الأنشطة المعتمدة',summary.approvedActivities],
   ['الأنشطة المرفوضة',summary.rejectedActivities],
   ['الأنشطة قيد المراجعة',summary.pendingActivities]
 ].forEach(row=>lines.push(row.map(csvCell).join(',')));

 lines.push('');
 lines.push([
   '#','نوع الطلب','العنوان','مقدم الطلب','التاريخ',
   'الفئة/السعة','الحالة','سبب الرفض'
 ].map(csvCell).join(','));

 requests.forEach(row=>{
   lines.push([
     row.sequence,row.type,row.title,row.submittedBy,row.date,
     row.genderOrCapacity,row.status,row.reason
   ].map(csvCell).join(','));
 });

 lines.push('');
 lines.push(csvCell('الأندية الطلابية المسجلة'));
 lines.push([
   '#','اسم النادي','المشرف','المسؤول',
   'عدد الأعضاء','عدد الأنشطة','الحالة'
 ].map(csvCell).join(','));

 clubs.forEach(club=>{
   lines.push([
     club.sequence,club.name,club.supervisor,club.manager,
     club.members,club.activityCount,club.status
   ].map(csvCell).join(','));
 });

 clubs.forEach(club=>{
   lines.push('');
   lines.push(csvCell(`تفاصيل أنشطة ${club.name}`));
   lines.push([
     '#','اسم النشاط','النوع','التاريخ','المكان',
     'الفئة','السعة','الحالة','نوع السجل'
   ].map(csvCell).join(','));

   if(club.activities.length){
     club.activities.forEach((activity,index)=>{
       lines.push([
         index+1,activity.name,activity.type,activity.date,
         activity.location,activity.gender,activity.capacity,
         activity.status,activity.demo?'تجريبي':'فعلي'
       ].map(csvCell).join(','));
     });
   }else{
     lines.push([
       '—','لا توجد أنشطة مسجلة','—','—','—','—','—','—','—'
     ].map(csvCell).join(','));
   }
 });

 downloadTextFile(
   `تقرير-الطلبات-والأندية-${new Date().toISOString().slice(0,10)}.csv`,
   lines.join('\\r\\n'),
   'text/csv;charset=utf-8'
 );

 window.showToast?.('تم تجهيز ملف Excel شامل الطلبات والأندية والأنشطة.');
}

function escapeHtml(value){
 return String(value??'')
   .replace(/&/g,'&amp;')
   .replace(/</g,'&lt;')
   .replace(/>/g,'&gt;')
   .replace(/"/g,'&quot;')
   .replace(/'/g,'&#039;');
}

function exportApprovalsPdf(){
 const rows=approvalExportRows();
 const clubs=clubExportData();
 const summary=exportDashboardSummary();
 const generatedAt=new Date().toLocaleString('ar-SA');

 const reportWindow=window.open('','_blank','width=1280,height=900');
 if(!reportWindow){
   window.showToast?.('اسمح بفتح النوافذ المنبثقة لتصدير PDF.');
   return;
 }

 const requestRows=rows.map(row=>`
   <tr>
     <td>${row.sequence}</td>
     <td>${escapeHtml(row.type)}</td>
     <td class="title-cell">${escapeHtml(row.title)}</td>
     <td>${escapeHtml(row.submittedBy)}</td>
     <td>${escapeHtml(row.date)}</td>
     <td>${escapeHtml(row.genderOrCapacity)}</td>
     <td><span class="status ${row.status==='مقبول'?'accepted':row.status==='مرفوض'?'rejected':'pending'}">${escapeHtml(row.status)}</span></td>
     <td>${escapeHtml(row.reason)}</td>
   </tr>`).join('');

 const clubRows=clubs.map(club=>`
   <tr>
     <td>${club.sequence}</td>
     <td class="title-cell">${escapeHtml(club.name)}</td>
     <td>${escapeHtml(club.supervisor)}</td>
     <td>${escapeHtml(club.manager)}</td>
     <td>${escapeHtml(club.members)}</td>
     <td>${club.activityCount}</td>
     <td><span class="status accepted">${escapeHtml(club.status)}</span></td>
   </tr>`).join('');

 const clubSections=clubs.map(club=>{
   const activities=club.activities.map((activity,index)=>`
     <tr>
       <td>${index+1}</td>
       <td class="title-cell">${escapeHtml(activity.name)}</td>
       <td>${escapeHtml(activity.type)}</td>
       <td>${escapeHtml(activity.date)}</td>
       <td>${escapeHtml(activity.location)}</td>
       <td>${escapeHtml(activity.gender)}</td>
       <td>${escapeHtml(activity.capacity)}</td>
       <td><span class="status ${activity.status==='مقبول'?'accepted':activity.status==='مرفوض'?'rejected':'pending'}">${escapeHtml(activity.status)}</span></td>
       <td>${activity.demo?'تجريبي':'فعلي'}</td>
     </tr>`).join('');

   return `
     <section class="club-section">
       <div class="section-heading">
         <div>
           <h2>${escapeHtml(club.name)}</h2>
           <p>عدد الأنشطة: ${club.activityCount}</p>
         </div>
         <span class="club-badge">${escapeHtml(club.status)}</span>
       </div>
       <table>
         <thead>
           <tr>
             <th>#</th><th>اسم النشاط</th><th>النوع</th><th>التاريخ</th>
             <th>المكان</th><th>الفئة</th><th>السعة</th><th>الحالة</th><th>السجل</th>
           </tr>
         </thead>
         <tbody>${activities||'<tr><td colspan="9">لا توجد أنشطة مسجلة</td></tr>'}</tbody>
       </table>
     </section>`;
 }).join('');

 reportWindow.document.write(`<!doctype html>
 <html lang="ar" dir="rtl">
 <head>
   <meta charset="utf-8">
   <title>تقرير الطلبات والأندية الطلابية</title>
   <style>
     *{box-sizing:border-box}
     body{margin:0;padding:26px;color:#0a346d;background:#fff;font-family:Tahoma,Arial,sans-serif}
     .report-header{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;padding-bottom:18px;border-bottom:3px solid #0a3b78}
     h1{margin:0;font-size:25px} h2{margin:0;font-size:18px}
     .subtitle{margin:7px 0 0;color:#64748b;font-size:12px}
     .date-box{padding:10px 14px;border:1px solid #cdd9e9;border-radius:12px;color:#475569;font-size:11px}
     .summary{display:grid;grid-template-columns:repeat(5,1fr);gap:9px;margin:18px 0}
     .summary div{padding:12px;border:1px solid #dbe5f1;border-radius:12px;background:#f7faff}
     .summary span{display:block;color:#64748b;font-size:9px}
     .summary strong{display:block;margin-top:4px;font-size:21px}
     .report-section{margin-top:24px}
     .report-section>h2{margin-bottom:10px;padding-bottom:7px;border-bottom:2px solid #dbe5f1}
     table{width:100%;border-collapse:collapse;font-size:9px}
     th{padding:9px 6px;color:#fff;background:#0a3b78;border:1px solid #0a3b78}
     td{padding:8px 6px;border:1px solid #dce5f0;vertical-align:middle}
     tbody tr:nth-child(even){background:#f8fafc}
     .title-cell{font-weight:700}
     .status{display:inline-block;padding:4px 8px;border-radius:999px;font-weight:700}
     .status.accepted{color:#08764e;background:#e6f8ef}
     .status.rejected{color:#ad2348;background:#fff0f4}
     .status.pending{color:#946200;background:#fff7df}
     .club-section{margin-top:22px;page-break-inside:avoid}
     .section-heading{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:8px;padding:10px 12px;border:1px solid #dbe5f1;border-radius:10px;background:#f7faff}
     .section-heading p{margin:3px 0 0;color:#64748b;font-size:9px}
     .club-badge{padding:5px 9px;border-radius:999px;color:#08764e;background:#e6f8ef;font-size:9px;font-weight:700}
     .footer{margin-top:20px;padding-top:10px;border-top:1px solid #dbe5f1;color:#64748b;font-size:9px;text-align:center}
     @media print{body{padding:8mm}@page{size:A4 landscape;margin:7mm}}
   </style>
 </head>
 <body>
   <div class="report-header">
     <div>
       <h1>تقرير الطلبات والأندية الطلابية</h1>
       <p class="subtitle">تقرير شامل للطلبات، الأندية المسجلة، وتفاصيل الأنشطة المرتبطة بكل نادٍ</p>
     </div>
     <div class="date-box">تاريخ الإصدار: ${escapeHtml(generatedAt)}</div>
   </div>

   <div class="summary">
     <div><span>إجمالي الطلبات</span><strong>${summary.requests}</strong></div>
     <div><span>الموافقات</span><strong>${summary.approvedRequests}</strong></div>
     <div><span>الرفض</span><strong>${summary.rejectedRequests}</strong></div>
     <div><span>الأندية المسجلة</span><strong>${summary.clubs}</strong></div>
     <div><span>أنشطة الأندية</span><strong>${summary.clubActivities}</strong></div>
     <div><span>الأنشطة المعتمدة</span><strong>${summary.approvedActivities}</strong></div>
     <div><span>الأنشطة المرفوضة</span><strong>${summary.rejectedActivities}</strong></div>
     <div><span>الأنشطة قيد المراجعة</span><strong>${summary.pendingActivities}</strong></div>
   </div>

   <section class="report-section">
     <h2>أولًا: الطلبات والقرارات</h2>
     <table>
       <thead><tr><th>#</th><th>نوع الطلب</th><th>العنوان</th><th>مقدم الطلب</th><th>التاريخ</th><th>الفئة/السعة</th><th>الحالة</th><th>سبب الرفض</th></tr></thead>
       <tbody>${requestRows||'<tr><td colspan="8">لا توجد بيانات</td></tr>'}</tbody>
     </table>
   </section>

   <section class="report-section">
     <h2>ثانيًا: الأندية الطلابية المسجلة</h2>
     <table>
       <thead><tr><th>#</th><th>اسم النادي</th><th>المشرف</th><th>المسؤول</th><th>عدد الأعضاء</th><th>عدد الأنشطة</th><th>الحالة</th></tr></thead>
       <tbody>${clubRows||'<tr><td colspan="7">لا توجد أندية مسجلة</td></tr>'}</tbody>
     </table>
   </section>

   <section class="report-section">
     <h2>ثالثًا: تفاصيل أنشطة الأندية</h2>
     ${clubSections||'<p>لا توجد أنشطة أندية مسجلة.</p>'}
   </section>

   <div class="footer">Student Activities Platform — منصة الأنشطة الطلابية</div>
   <script>window.onload=()=>setTimeout(()=>window.print(),400);<\/script>
 </body>
 </html>`);

 reportWindow.document.close();
 window.showToast?.('تم فتح التقرير الشامل؛ اختر حفظ بصيغة PDF.');
}




let sportsDashboardFilter={
  type:'sports',
  status:'all',
  gender:'all'
};

function sportsDashboardStatusLabel(type,status){
  if(status==='all')return 'جميع السجلات';

  if(type==='grants'){
    return {
      approved:'الموافق عليها',
      rejected:'المرفوضة',
      pending:'تحت المراجعة'
    }[status]||status;
  }

  if(type==='reports'){
    return {
      complete:'المكتملة',
      incomplete:'غير المكتملة'
    }[status]||status;
  }

  return status;
}

function sportsDashboardGrantMatches(row,status){
  if(status==='all')return true;

  if(status==='approved'){
    return row.status==='معتمد نهائيًا';
  }

  if(status==='rejected'){
    return row.status==='مرفوض'||row.status==='مرفوض من العمادة';
  }

  if(status==='pending'){
    return ![
      'معتمد نهائيًا',
      'مرفوض',
      'مرفوض من العمادة'
    ].includes(row.status);
  }

  return true;
}

function renderSportsDashboardResults(){
  const head=document.getElementById('sportsDashboardResultsHead');
  const body=document.getElementById('sportsDashboardResultsRows');
  const title=document.getElementById('sportsDashboardResultsTitle');
  const description=document.getElementById('sportsDashboardResultsDescription');

  if(!head||!body)return;

  const {type,status,gender}=sportsDashboardFilter;
  let rows=[];

  if(type==='sports'){
    rows=(typeof R==='function'&&typeof K!=='undefined' ? R(K.sports) : [])
      .filter(row=>status==='all'||String(row.status||'تحت المراجعة')===status);

    head.innerHTML=`<tr>
      <th>اسم الحدث</th>
      <th>التاريخ</th>
      <th>اللعبة</th>
      <th>الفئة</th>
      <th>السعة</th>
      <th>الحالة</th>
    </tr>`;

    body.innerHTML=rows.length
      ? rows.map(row=>`<tr>
          <td><strong>${row.name||'—'}</strong></td>
          <td>${row.date||'—'}</td>
          <td>${row.game||'—'}</td>
          <td>${row.gender||'—'}</td>
          <td>${row.capacity??'—'}</td>
          <td>${typeof badge==='function' ? badge(row.status) : (row.status||'تحت المراجعة')}</td>
        </tr>`).join('')
      : '<tr><td colspan="6">لا توجد طلبات مطابقة.</td></tr>';

    if(title)title.textContent=`طلبات البطولات — ${sportsDashboardStatusLabel(type,status)}`;
    if(description)description.textContent='طلبات تنفيذ البطولات والأحداث الرياضية وفق حالة الاعتماد المحددة.';
  }

  if(type==='grants'){
    rows=(typeof grantRows==='function' ? grantRows() : [])
      .filter(row=>sportsDashboardGrantMatches(row,status));

    head.innerHTML=`<tr>
      <th>الطالب / الطالبة</th>
      <th>الرقم الجامعي</th>
      <th>الفئة</th>
      <th>الكلية</th>
      <th>النسبة</th>
      <th>الحالة</th>
    </tr>`;

    body.innerHTML=rows.length
      ? rows.map(row=>`<tr>
          <td><strong>${row.name||'—'}</strong></td>
          <td>${row.studentId||'—'}</td>
          <td>${row.gender||'—'}</td>
          <td>${row.college||'—'}</td>
          <td>${row.rate ? row.rate+'%' : 'غير محددة'}</td>
          <td>${typeof grantStatusBadge==='function'
            ? grantStatusBadge(row.status)
            : (row.status||'تحت المراجعة')}</td>
        </tr>`).join('')
      : '<tr><td colspan="6">لا توجد طلبات منح مطابقة.</td></tr>';

    if(title)title.textContent=`المنح الرياضية — ${sportsDashboardStatusLabel(type,status)}`;
    if(description)description.textContent='طلبات المنح الرياضية والإقرارات حسب حالة المراجعة والاعتماد.';
  }

  if(type==='reports'){
    rows=(typeof evidence==='function' ? evidence() : [])
      .filter(row=>gender==='all'||row.gender===gender)
      .filter(row=>{
        if(status==='all')return true;
        const percent=typeof completionPercent==='function'
          ? completionPercent(row)
          : (row.reportFile&&row.scheduleFile ? 100 : 0);

        return status==='complete' ? percent===100 : percent<100;
      });

    head.innerHTML=`<tr>
      <th>اسم النشاط</th>
      <th>التاريخ</th>
      <th>الفئة</th>
      <th>المجال الرئيسي</th>
      <th>نسبة الاكتمال</th>
      <th>حالة التوثيق</th>
    </tr>`;

    body.innerHTML=rows.length
      ? rows.map(row=>{
          const percent=typeof completionPercent==='function'
            ? completionPercent(row)
            : (row.reportFile&&row.scheduleFile ? 100 : 0);

          return `<tr>
            <td><strong>${row.activity||'—'}</strong></td>
            <td>${row.date||'—'}</td>
            <td>${row.gender||'—'}</td>
            <td>${row.mainField||row.indicatorField||'—'}</td>
            <td>${percent}%</td>
            <td>
              <span class="sports-doc-status ${percent===100?'complete':'incomplete'}">
                ${percent===100?'مكتمل':'غير مكتمل'}
              </span>
            </td>
          </tr>`;
        }).join('')
      : '<tr><td colspan="6">لا توجد تقارير مطابقة.</td></tr>';

    const genderLabel=gender==='all'?'الطلاب والطالبات':gender;
    if(title)title.textContent=`تقارير ${genderLabel} — ${sportsDashboardStatusLabel(type,status)}`;
    if(description)description.textContent='سجلات الشواهد والتقارير حسب الفئة وحالة اكتمال التوثيق.';
  }

  document.querySelectorAll('[data-sports-dashboard-type]').forEach(button=>{
    const active=
      button.dataset.sportsDashboardType===type &&
      (button.dataset.sportsDashboardStatus||'all')===status &&
      (button.dataset.sportsDashboardGender||'all')===gender;

    button.classList.toggle('active-dashboard-filter',active);
  });
}

function setSportsDashboardFilter(type,status='all',gender='all'){
  sportsDashboardFilter={type,status,gender};
  renderSportsDashboardResults();

  document.querySelector('.sports-dashboard-results-card')
    ?.scrollIntoView({behavior:'smooth',block:'start'});
}

function renderSportsManagementDashboard(){
  const set=(id,value)=>{
    const element=document.getElementById(id);
    if(element)element.textContent=value;
  };

  const setDecisionDonut=(id,total,accepted,rejected)=>{
    const donut=document.getElementById(id);
    if(!donut)return;

    const safeTotal=Math.max(1,total);
    const approvedDeg=accepted/safeTotal*360;
    const rejectedDeg=rejected/safeTotal*360;

    donut.style.setProperty('--approved',`${approvedDeg}deg`);
    donut.style.setProperty('--rejected',`${rejectedDeg}deg`);
  };

  const sportsRequests=typeof R==='function'&&typeof K!=='undefined'
    ? R(K.sports)
    : [];

  const sportsAccepted=sportsRequests.filter(row=>row.status==='مقبول').length;
  const sportsRejected=sportsRequests.filter(row=>row.status==='مرفوض').length;
  const sportsPending=Math.max(
    0,
    sportsRequests.length-sportsAccepted-sportsRejected
  );

  set('sportsRequestsTotal',sportsRequests.length);
  set('sportsRequestsAccepted',sportsAccepted);
  set('sportsRequestsRejected',sportsRejected);
  set('sportsRequestsPending',sportsPending);
  setDecisionDonut(
    'sportsRequestsDonut',
    sportsRequests.length,
    sportsAccepted,
    sportsRejected
  );

  const grants=typeof grantRows==='function' ? grantRows() : [];
  const grantsAccepted=grants.filter(row=>row.status==='معتمد نهائيًا').length;
  const grantsRejected=grants.filter(row=>
    row.status==='مرفوض'||row.status==='مرفوض من العمادة'
  ).length;
  const grantsPending=Math.max(
    0,
    grants.length-grantsAccepted-grantsRejected
  );

  set('sportsGrantsTotal',grants.length);
  set('sportsGrantsAccepted',grantsAccepted);
  set('sportsGrantsRejected',grantsRejected);
  set('sportsGrantsPending',grantsPending);
  setDecisionDonut(
    'sportsGrantsDonut',
    grants.length,
    grantsAccepted,
    grantsRejected
  );

  const rows=typeof evidence==='function' ? evidence() : [];

  const genderStats=gender=>{
    const genderRows=rows.filter(row=>row.gender===gender);
    const complete=genderRows.filter(row=>
      typeof completionPercent==='function'
        ? completionPercent(row)===100
        : Boolean(row.reportFile&&row.scheduleFile)
    ).length;
    const incomplete=Math.max(0,genderRows.length-complete);
    const percent=genderRows.length
      ? Math.round(complete/genderRows.length*100)
      : 0;

    return {complete,incomplete,percent};
  };

  const male=genderStats('طلاب');
  const female=genderStats('طالبات');

  set('sportsMaleDocsPercent',`${male.percent}%`);
  set('sportsMaleDocsComplete',male.complete);
  set('sportsMaleDocsIncomplete',male.incomplete);
  set('sportsFemaleDocsPercent',`${female.percent}%`);
  set('sportsFemaleDocsComplete',female.complete);
  set('sportsFemaleDocsIncomplete',female.incomplete);

  document.getElementById('sportsMaleDocsDonut')
    ?.style.setProperty('--p',male.percent);

  document.getElementById('sportsFemaleDocsDonut')
    ?.style.setProperty('--p',female.percent);

  renderSportsDashboardResults();
}

function renderGeneralIndicator(){
  const set=(id,value)=>{
    const element=document.getElementById(id);
    if(element)element.textContent=value;
  };

  const rows=typeof evidence==='function' ? evidence() : [];
  const maleRows=rows.filter(row=>row.gender==='طلاب');
  const femaleRows=rows.filter(row=>row.gender==='طالبات');
  const beneficiaries=rows.reduce(
    (sum,row)=>sum+(Number(row.beneficiaries)||0),0
  );

  const completeRows=rows.filter(row=>{
    if(typeof completionPercent==='function'){
      return completionPercent(row)===100;
    }
    return Boolean(row.reportFile&&row.scheduleFile);
  });

  const incompleteRows=Math.max(0,rows.length-completeRows.length);
  const documentationPercent=rows.length
    ? Math.round(completeRows.length/rows.length*100)
    : 0;

  const indicatorFields=window.SAH_DATA?.indicatorFields||[];
  const indicatorMax=indicatorFields.reduce(
    (sum,item)=>sum+(Number(item.max)||0),0
  );
  const indicatorMale=indicatorFields.reduce(
    (sum,item)=>sum+(Number(item.male)||0),0
  );
  const indicatorFemale=indicatorFields.reduce(
    (sum,item)=>sum+(Number(item.female)||0),0
  );
  const indicatorCombined=indicatorMax
    ? Math.round((indicatorMale+indicatorFemale)/(indicatorMax*2)*100)
    : 0;
  const maleIndicatorPercent=indicatorMax
    ? Math.round(indicatorMale/indicatorMax*100)
    : 0;
  const femaleIndicatorPercent=indicatorMax
    ? Math.round(indicatorFemale/indicatorMax*100)
    : 0;

  const requests=typeof allReq==='function' ? allReq() : [];

  const isAcceptedStatus=status=>
    ['مقبول','معتمد نهائيًا'].includes(String(status||''));

  const isRejectedStatus=status=>
    ['مرفوض','مرفوض من العمادة'].includes(String(status||''));

  const accepted=requests.filter(row=>isAcceptedStatus(row.status)).length;
  const rejected=requests.filter(row=>isRejectedStatus(row.status)).length;
  const pending=Math.max(0,requests.length-accepted-rejected);

  const requestKindCount=matcher=>requests.filter(row=>matcher(row)).length;

  const sportsRequestsCount=requestKindCount(row=>
    row.kind==='بطولة/حدث رياضي'
  );

  const clubRequestsCount=requestKindCount(row=>
    row.kind==='تسجيل نادي جديد'||
    row.kind==='مبادرة/فعالية نادي'
  );

  const volunteerRequestsCount=requestKindCount(row=>
    row.kind==='فرصة تطوعية'
  );

  const grantRequestsCount=requestKindCount(row=>
    row.kind==='طلب اعتماد منحة رياضية'
  );

  const activityRequestsCount=requestKindCount(row=>
    ![
      'بطولة/حدث رياضي',
      'تسجيل نادي جديد',
      'مبادرة/فعالية نادي',
      'فرصة تطوعية',
      'طلب اعتماد منحة رياضية'
    ].includes(row.kind)
  );
  const approvalRate=requests.length
    ? Math.round(accepted/requests.length*100)
    : 0;

  const clubs=typeof clubRegistry==='function' ? clubRegistry() : [];
  const clubActivities=clubs.reduce((sum,club)=>{
    if(typeof allClubActivities==='function'){
      return sum+allClubActivities(club).length;
    }
    return sum;
  },0);

  const volunteerRows=typeof R==='function'&&typeof K!=='undefined'
    ? R(K.vol)
    : [];
  const volunteerApproved=volunteerRows.filter(
    row=>row.status==='مقبول'
  ).length;

  const grantApplications=typeof grantRows==='function'
    ? grantRows()
    : [];
  const grantsAccepted=grantApplications.filter(
    row=>row.status==='معتمد نهائيًا'
  ).length;
  const grantsRejected=grantApplications.filter(
    row=>row.status==='مرفوض'||row.status==='مرفوض من العمادة'
  ).length;
  const grantsPending=Math.max(
    0,
    grantApplications.length-grantsAccepted-grantsRejected
  );

  const stats=window.SAH_DATA?.stats||{};
  const championships=(window.SAH_DATA?.championships||[]).length;

  const malePercent=rows.length
    ? Math.round(maleRows.length/rows.length*100)
    : 0;
  const femalePercent=rows.length
    ? Math.round(femaleRows.length/rows.length*100)
    : 0;

  set('generalIndicatorUpdatedAt',
      new Date().toLocaleString('ar-SA',{
        dateStyle:'medium',
        timeStyle:'short'
      })
  );

  set('generalActivitiesTotal',rows.length);
  set('generalMaleActivities',maleRows.length);
  set('generalFemaleActivities',femaleRows.length);
  set('generalMaleActivitiesPercent',`${malePercent}% من الأنشطة`);
  set('generalFemaleActivitiesPercent',`${femalePercent}% من الأنشطة`);
  set('generalBeneficiaries',beneficiaries.toLocaleString('en-US'));

  set('generalSportsIndicatorPercent',`${indicatorCombined}%`);
  set('generalSportsIndicatorPoints',
      formatPointRatio(indicatorMale+indicatorFemale,indicatorMax*2)
  );

  set('generalClubsCount',clubs.length);
  set('generalClubActivitiesCount',`${clubActivities} نشاط نادي`);

  set('generalVolunteerCount',volunteerRows.length);
  set('generalVolunteerApproved',`${volunteerApproved} معتمدة`);

  set('generalGrantsTotal',grantApplications.length);
  set('generalGrantsAccepted',grantsAccepted);
  set('generalGrantsRejected',grantsRejected);
  set('generalGrantsPending',grantsPending);

  const generalGrantsDonut=document.getElementById('generalGrantsDonut');
  if(generalGrantsDonut){
    const total=Math.max(1,grantApplications.length);
    const acceptedDeg=grantsAccepted/total*360;
    const rejectedDeg=grantsRejected/total*360;
    generalGrantsDonut.style.background=`
      conic-gradient(
        #08764e 0 ${acceptedDeg}deg,
        #ad2348 ${acceptedDeg}deg ${acceptedDeg+rejectedDeg}deg,
        #e2ad39 ${acceptedDeg+rejectedDeg}deg 360deg
      )`;
  }

  set('generalPendingRequests',pending);
  set('generalApprovalRate',`${approvalRate}% نسبة الموافقة`);

  set('generalGenderTotal',rows.length);
  set('generalGenderMale',maleRows.length);
  set('generalGenderFemale',femaleRows.length);

  const genderDonut=document.getElementById('generalGenderDonut');
  if(genderDonut){
    genderDonut.style.setProperty(
      '--male',
      `${rows.length?maleRows.length/rows.length*360:0}deg`
    );
  }

  set('generalDocumentationPercent',`${documentationPercent}%`);
  set('generalDocumentationComplete',completeRows.length);
  set('generalDocumentationIncomplete',incompleteRows);
  document.getElementById('generalDocumentationRing')
    ?.style.setProperty('--p',documentationPercent);

  set('generalApprovalsTotal',requests.length);
  set('generalApprovalsAccepted',accepted);
  set('generalApprovalsRejected',rejected);
  set('generalApprovalsPending',pending);

  set('generalApprovalSportsCount',sportsRequestsCount);
  set('generalApprovalClubsCount',clubRequestsCount);
  set('generalApprovalVolunteerCount',volunteerRequestsCount);
  set('generalApprovalGrantsCount',grantRequestsCount);
  set('generalApprovalActivitiesCount',activityRequestsCount);

  const requestTotal=Math.max(1,requests.length);
  const acceptedPercent=accepted/requestTotal*100;
  const rejectedPercent=rejected/requestTotal*100;
  const pendingPercent=pending/requestTotal*100;

  const approvalsDonut=document.getElementById('generalApprovalsDonut');
  if(approvalsDonut){
    const acceptedDeg=accepted/requestTotal*360;
    const rejectedDeg=rejected/requestTotal*360;
    approvalsDonut.style.setProperty('--approved',`${acceptedDeg}deg`);
    approvalsDonut.style.setProperty('--rejected',`${rejectedDeg}deg`);
  }

  const acceptedBar=document.getElementById('generalApprovalsAcceptedBar');
  const rejectedBar=document.getElementById('generalApprovalsRejectedBar');
  const pendingBar=document.getElementById('generalApprovalsPendingBar');

  if(acceptedBar)acceptedBar.style.width=`${acceptedPercent}%`;
  if(rejectedBar)rejectedBar.style.width=`${rejectedPercent}%`;
  if(pendingBar)pendingBar.style.width=`${pendingPercent}%`;

  set('generalMaleIndicator',`${maleIndicatorPercent}%`);
  set('generalFemaleIndicator',`${femaleIndicatorPercent}%`);
  set('generalMaleIndicatorPoints',
      formatPointValue(indicatorMale)
  );
  set('generalFemaleIndicatorPoints',
      formatPointValue(indicatorFemale)
  );

  const maleBar=document.getElementById('generalMaleIndicatorBar');
  const femaleBar=document.getElementById('generalFemaleIndicatorBar');
  if(maleBar)maleBar.style.width=`${maleIndicatorPercent}%`;
  if(femaleBar)femaleBar.style.width=`${femaleIndicatorPercent}%`;

  set('generalScholarships',
      Number(stats.totalScholarships||0).toLocaleString('en-US')
  );
  set('generalChampionships',championships);
  set('generalAthletes',
      Number(stats.totalProfiles||0).toLocaleString('en-US')
  );

  const counts=new Map();
  rows.forEach(row=>{
    const field=String(
      row.mainField||
      row.indicatorField||
      row.field||
      'غير محدد'
    ).trim()||'غير محدد';
    counts.set(field,(counts.get(field)||0)+1);
  });

  (window.SAH_DATA?.indicatorFields||[]).forEach(item=>{
    const name=String(item.field||'').trim();
    if(name&&!counts.has(name))counts.set(name,0);
  });

  const entries=[...counts.entries()]
    .sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0],'ar'))
    .slice(0,12);
  const max=Math.max(1,...entries.map(([,count])=>count));

  const fieldsChart=document.getElementById('generalFieldsChart');
  if(fieldsChart){
    fieldsChart.innerHTML=entries.length
      ? entries.map(([field,count],index)=>{
          const width=count?Math.max(5,Math.round(count/max*100)):0;
          return `<button type="button"
                          class="general-field-row"
                          data-route="reports"
                          title="فتح تقارير ${field}">
            <span>${index+1}</span>
            <strong>${field}</strong>
            <i><b style="width:${width}%"></b></i>
            <em>${count}</em>
          </button>`;
        }).join('')
      : '<div class="general-empty-chart">لا توجد بيانات متاحة.</div>';
  }
}


const GRANT_DEMO_ROWS=[
 {id:'grant-demo-1',name:'فلان الفلاني',nationalId:'1098765432',nationality:'سعودي',studentId:'20260001',mobile:'0501112233',gender:'طلاب',college:'CBA',identityFile:'identity-ahmed.pdf',signature:'أحمد خالد العتيبي',agreementStatus:'مكتمل',rate:20,status:'تحت المراجعة',submittedAt:'2026-08-01',ownerRole:'student_account'},
 {id:'grant-demo-2',name:'سارة محمد الحربي',nationalId:'1087654321',nationality:'سعودية',studentId:'20261002',mobile:'0502223344',gender:'طالبات',college:'JCA',identityFile:'identity-sarah.pdf',signature:'سارة محمد الحربي',agreementStatus:'مكتمل',rate:30,status:'محال للعمادة',submittedAt:'2026-08-02',ownerRole:'sports_manager'},
 {id:'grant-demo-3',name:'عمر فهد الزهراني',nationalId:'1076543210',nationality:'سعودي',studentId:'20261003',mobile:'0503334455',gender:'طلاب',college:'JCE',identityFile:'identity-omar.pdf',signature:'عمر فهد الزهراني',agreementStatus:'مكتمل',rate:10,status:'معتمد نهائيًا',submittedAt:'2026-08-02',ownerRole:'coach'},
 {id:'grant-demo-4',name:'نورة عبدالله القحطاني',nationalId:'1065432109',nationality:'سعودية',studentId:'20261004',mobile:'0504445566',gender:'طالبات',college:'JCL',identityFile:'identity-noura.pdf',signature:'نورة عبدالله القحطاني',agreementStatus:'مكتمل',rate:20,status:'مرفوض',reason:'عدم اكتمال أحد شروط الاستحقاق',submittedAt:'2026-08-03',ownerRole:'faculty'},
 {id:'grant-demo-5',name:'خالد سعد الغامدي',nationalId:'1054321098',nationality:'سعودي',studentId:'20261005',mobile:'0505556677',gender:'طلاب',college:'CBA',identityFile:'identity-khaled.pdf',signature:'خالد سعد الغامدي',agreementStatus:'مكتمل',rate:0,status:'تحت المراجعة',submittedAt:'2026-08-03',ownerRole:'activities_manager'},
 {id:'grant-demo-6',name:'ريم علي الشريف',nationalId:'1043210987',nationality:'سعودية',studentId:'20261006',mobile:'0506667788',gender:'طالبات',college:'JCA',identityFile:'identity-reem.pdf',signature:'ريم علي الشريف',agreementStatus:'مكتمل',rate:30,status:'مرفوض من العمادة',reason:'النسبة المقترحة تحتاج مراجعة إضافية',submittedAt:'2026-08-04',ownerRole:'dean'}
];

function seedGrantApplications(){
 const current=R(K.grants);

 if(current.length){
   const roleCycle=[
     'student_account','sports_manager','coach',
     'faculty','activities_manager','dean'
   ];
   let changed=false;

   current.forEach((row,index)=>{
     if(!row.ownerRole){
       row.ownerRole=roleCycle[index%roleCycle.length];
       changed=true;
     }
   });

   if(changed)W(K.grants,current);
   return current;
 }

 W(K.grants,GRANT_DEMO_ROWS);
 return GRANT_DEMO_ROWS;
}

function currentGrantAccountRole(){
 return document.getElementById('activeRole')?.value ||
   localStorage.getItem('sah-v15-role') ||
   'system';
}

function grantRows(){
 seedGrantApplications();
 return R(K.grants);
}

function accountGrantRows(){
 const role=currentGrantAccountRole();
 return grantRows().filter(row=>row.ownerRole===role);
}

function grantStatusBadge(status){
 const cls=status==='معتمد نهائيًا'?'accepted':
   (status==='مرفوض'||status==='مرفوض من العمادة')?'rejected':
   status==='محال للعمادة'?'pending':'pending';
 return `<span class="request-status ${cls}">${status||'تحت المراجعة'}</span>`;
}

function renderGrantDashboard(){
 const rows=grantRows();
 const males=rows.filter(row=>row.gender==='طلاب');
 const females=rows.filter(row=>row.gender==='طالبات');
 const total=rows.length;
 const set=(id,value)=>{
   const element=document.getElementById(id);
   if(element)element.textContent=value;
 };

 set('scholarTotal',total);
 set('scholarGenderTotal',total);
 set('scholarBoys',males.length);
 set('scholarGirls',females.length);
 set('scholarBoysPercent',`${total?Math.round(males.length/total*100):0}%`);
 set('scholarGirlsPercent',`${total?Math.round(females.length/total*100):0}%`);

 document.getElementById('scholarGenderDonut')?.style.setProperty(
   '--male',`${total?males.length/total*360:0}deg`
 );

 const chartColors=['#1769c2','#18a7bd','#7a4bc5','#d28a19','#ad2348'];

 const renderPie=(pieId,totalId,legendId,entries,filterAttribute)=>{
   const total=entries.reduce((sum,[,count])=>sum+count,0);
   const pie=document.getElementById(pieId);
   const totalElement=document.getElementById(totalId);
   const legend=document.getElementById(legendId);

   if(totalElement)totalElement.textContent=total;

   if(pie){
     if(!total){
       pie.style.background='conic-gradient(#e9eef6 0deg 360deg)';
     }else{
       let start=0;
       const segments=entries.map(([,count],index)=>{
         const end=start+(count/total*360);
         const segment=`${chartColors[index%chartColors.length]} ${start.toFixed(2)}deg ${end.toFixed(2)}deg`;
         start=end;
         return segment;
       });
       pie.style.background=`conic-gradient(${segments.join(',')})`;
     }
   }

   if(legend){
     legend.innerHTML=entries.map(([label,count],index)=>{
       const percent=total?Math.round(count/total*100):0;
       return `<button type="button" ${filterAttribute}="${label}">
         <i style="background:${chartColors[index%chartColors.length]}"></i>
         <span>${label}${filterAttribute.includes('rate')?'%':''}</span>
         <b>${count}</b>
         <small>${percent}%</small>
       </button>`;
     }).join('');
   }
 };

 const discountCounts={10:0,20:0,30:0};
 rows.forEach(row=>{
   const rate=Number(row.rate)||0;
   if(rate in discountCounts)discountCounts[rate]++;
 });
 renderPie(
   'scholarDiscountPie',
   'scholarDiscountPieTotal',
   'scholarDiscountChart',
   Object.entries(discountCounts),
   'data-scholar-filter-rate'
 );

 const collegeCounts={JCA:0,CBA:0,JCE:0,JCL:0};
 rows.forEach(row=>{
   if(row.college in collegeCounts)collegeCounts[row.college]++;
 });
 renderPie(
   'scholarCollegePie',
   'scholarCollegePieTotal',
   'scholarCollegeChart',
   Object.entries(collegeCounts),
   'data-scholar-filter-college'
 );
}

let grantGenderFilter='all';
let grantRateFilter='all';
let grantCollegeFilter='all';

function renderGrantReviewTable(){
 const body=document.getElementById('scholarRows');
 if(!body)return;
 const query=document.getElementById('scholarSearch')?.value||'';
 const status=document.getElementById('scholarStatusFilter')?.value||'all';

 const rows=grantRows().filter(row=>{
   if(status!=='all'&&row.status!==status)return false;
   if(grantGenderFilter!=='all'&&row.gender!==grantGenderFilter)return false;
   if(grantRateFilter!=='all'&&String(row.rate)!==String(grantRateFilter))return false;
   if(grantCollegeFilter!=='all'&&row.college!==grantCollegeFilter)return false;
   return match(row,query);
 });

 body.innerHTML=rows.length?rows.map(row=>{
   const pending=row.status==='تحت المراجعة'||row.status==='مقبول مبدئيًا';
   const controls=pending?`
     <div class="grant-review-controls">
       <select class="grant-rate-select" data-id="${row.id}">
         <option value="">حدد النسبة</option>
         <option value="10" ${Number(row.rate)===10?'selected':''}>10%</option>
         <option value="20" ${Number(row.rate)===20?'selected':''}>20%</option>
         <option value="30" ${Number(row.rate)===30?'selected':''}>30%</option>
       </select>
       <button class="grant-approve-btn" data-id="${row.id}" type="button">موافقة وإحالة</button>
       <button class="grant-open-reject-btn" data-id="${row.id}" type="button">رفض</button>
       <div class="grant-reject-inline" data-id="${row.id}" hidden>
         <input placeholder="سبب الرفض إلزامي">
         <button class="grant-confirm-reject-btn" data-id="${row.id}" type="button">تأكيد</button>
         <button class="grant-cancel-reject-btn" data-id="${row.id}" type="button">إلغاء</button>
       </div>
     </div>`:
     `<div class="grant-final-status">${grantStatusBadge(row.status)}${row.reason?`<small>${row.reason}</small>`:''}</div>`;

   return `<tr>
     <td><strong>${row.name}</strong></td>
     <td>${row.studentId}</td>
     <td>${row.gender}</td>
     <td>${row.college}</td>
     <td>${row.agreementStatus||'مكتمل'}</td>
     <td>${row.rate?row.rate+'%':'غير محددة'}</td>
     <td>${grantStatusBadge(row.status)}</td>
     <td>${controls}</td>
   </tr>`;
 }).join(''):'<tr><td colspan="8">لا توجد نتائج مطابقة.</td></tr>';

 document.querySelectorAll('.grant-approve-btn').forEach(button=>{
   button.onclick=()=>{
     const rows=grantRows();
     const row=rows.find(item=>item.id===button.dataset.id);
     const rate=Number(document.querySelector(`.grant-rate-select[data-id="${button.dataset.id}"]`)?.value)||0;
     if(!rate){
       showToast('حدد النسبة المستحقة 10% أو 20% أو 30% قبل الموافقة.');
       return;
     }
     row.rate=rate;
     row.status='محال للعمادة';
     row.reason='';
     W(K.grants,rows);
     renderGrantWorkflow();
     renderAll();
     showToast('تمت الموافقة المبدئية وإحالة الطلب إلى عمادة شؤون الطلاب.');
   };
 });

 document.querySelectorAll('.grant-open-reject-btn').forEach(button=>{
   button.onclick=()=>{
     const wrap=button.closest('.grant-review-controls');
     wrap.querySelector('.grant-reject-inline').hidden=false;
     button.hidden=true;
   };
 });
 document.querySelectorAll('.grant-cancel-reject-btn').forEach(button=>{
   button.onclick=()=>{
     const inline=button.closest('.grant-reject-inline');
     inline.hidden=true;
     inline.closest('.grant-review-controls').querySelector('.grant-open-reject-btn').hidden=false;
     inline.querySelector('input').value='';
   };
 });
 document.querySelectorAll('.grant-confirm-reject-btn').forEach(button=>{
   button.onclick=()=>{
     const inline=button.closest('.grant-reject-inline');
     const reason=inline.querySelector('input').value.trim();
     if(!reason){
       inline.querySelector('input').focus();
       showToast('سبب الرفض إلزامي.');
       return;
     }
     const rows=grantRows();
     const row=rows.find(item=>item.id===button.dataset.id);
     row.status='مرفوض';
     row.reason=reason;
     W(K.grants,rows);
     renderGrantWorkflow();
     renderAll();
   };
 });
}

function renderAgreementSubmissions(){
 const body=document.getElementById('agreementRows');
 if(!body)return;
 const query=document.getElementById('agreementSearch')?.value||'';
 const rows=accountGrantRows().filter(row=>match(row,query));
 body.innerHTML=rows.length?rows.map(row=>`<tr>
   <td>${row.name}</td><td>${row.nationalId}</td><td>${row.nationality}</td>
   <td>${row.studentId}</td><td>${row.mobile}</td><td>${row.gender}</td>
   <td>${row.college}</td><td>${grantStatusBadge(row.status)}</td>
   <td>${row.rate?row.rate+'%':'—'}</td>
 </tr>`).join(''):'<tr><td colspan="9">لا توجد إقرارات.</td></tr>';
}

function renderDeanGrantApprovals(){
 const rows=grantRows().filter(row=>
   ['محال للعمادة','معتمد نهائيًا','مرفوض من العمادة'].includes(row.status)
 );
 const accepted=rows.filter(row=>row.status==='معتمد نهائيًا').length;
 const rejected=rows.filter(row=>row.status==='مرفوض من العمادة').length;
 const pending=rows.filter(row=>row.status==='محال للعمادة').length;
 const total=rows.length;
 const set=(id,value)=>{
   const element=document.getElementById(id);
   if(element)element.textContent=value;
 };
 set('deanGrantAccepted',accepted);
 set('deanGrantRejected',rejected);
 set('deanGrantPending',pending);
 set('deanGrantTotal',total);
 const donut=document.getElementById('deanGrantDonut');
 if(donut){
   donut.style.setProperty('--approved',`${total?accepted/total*360:0}deg`);
   donut.style.setProperty('--rejected',`${total?rejected/total*360:0}deg`);
 }

 const body=document.getElementById('deanGrantApprovalRows');
 if(!body)return;
 body.innerHTML=rows.length?rows.map(row=>{
   const pendingDecision=row.status==='محال للعمادة';
   const action=pendingDecision?`
     <div class="approval-inline-decision dean-grant-decision">
       <div class="approval-action-buttons">
         <button class="dean-grant-approve approval-decision-btn approve" data-id="${row.id}" type="button">
           <span class="approval-btn-icon">✓</span><span>اعتماد ${row.rate}%</span>
         </button>
         <button class="dean-grant-open-reject approval-decision-btn reject" data-id="${row.id}" type="button">
           <span class="approval-btn-icon">×</span><span>رفض</span>
         </button>
       </div>
       <div class="dean-grant-reject-editor" hidden>
         <input placeholder="اكتب سبب الرفض">
         <button class="dean-grant-confirm-reject" data-id="${row.id}" type="button">تأكيد الرفض</button>
         <button class="dean-grant-cancel-reject" type="button">إلغاء</button>
       </div>
     </div>`:
     `<div class="grant-final-status">${grantStatusBadge(row.status)}${row.reason?`<small>${row.reason}</small>`:''}</div>`;
   return `<tr>
     <td><strong>${row.name}</strong></td><td>${row.studentId}</td><td>${row.gender}</td>
     <td>${row.college}</td><td><strong>${row.rate}%</strong></td>
     <td>${grantStatusBadge(row.status)}</td><td>${action}</td>
   </tr>`;
 }).join(''):'<tr><td colspan="7">لا توجد طلبات منح محالة.</td></tr>';

 document.querySelectorAll('.dean-grant-approve').forEach(button=>button.onclick=()=>{
   const rows=grantRows();
   const row=rows.find(item=>item.id===button.dataset.id);
   row.status='معتمد نهائيًا'; row.reason='';
   W(K.grants,rows); renderGrantWorkflow(); renderAll();
 });
 document.querySelectorAll('.dean-grant-open-reject').forEach(button=>button.onclick=()=>{
   const decision=button.closest('.dean-grant-decision');
   decision.querySelector('.approval-action-buttons').hidden=true;
   decision.querySelector('.dean-grant-reject-editor').hidden=false;
   decision.querySelector('input').focus();
 });
 document.querySelectorAll('.dean-grant-cancel-reject').forEach(button=>button.onclick=()=>{
   const decision=button.closest('.dean-grant-decision');
   decision.querySelector('.approval-action-buttons').hidden=false;
   decision.querySelector('.dean-grant-reject-editor').hidden=true;
 });
 document.querySelectorAll('.dean-grant-confirm-reject').forEach(button=>button.onclick=()=>{
   const editor=button.closest('.dean-grant-reject-editor');
   const reason=editor.querySelector('input').value.trim();
   if(!reason){showToast('سبب الرفض إلزامي.');editor.querySelector('input').focus();return;}
   const rows=grantRows();
   const row=rows.find(item=>item.id===button.dataset.id);
   row.status='مرفوض من العمادة'; row.reason=reason;
   W(K.grants,rows); renderGrantWorkflow(); renderAll();
 });
}

function renderGrantWorkflow(){
 seedGrantApplications();
 renderGrantDashboard();
 renderGrantReviewTable();
 renderAgreementSubmissions();
 renderDeanGrantApprovals();
}

function initGrantWorkflow(){
 seedGrantApplications();
 document.getElementById('scholarshipAgreementForm')?.addEventListener('submit',event=>{
   event.preventDefault();
   const confirmBox=document.getElementById('agreementConfirm');
   if(!confirmBox?.checked){showToast('يجب الموافقة على الإقرار والشروط قبل الإرسال.');return;}
   const file=document.getElementById('agreementIdentityFile')?.files?.[0];
   if(!file){showToast('رفع الهوية إلزامي.');return;}

   const row={
     id:`grant-${Date.now()}`,
     name:document.getElementById('agreementName').value.trim(),
     nationalId:document.getElementById('agreementNationalId').value.trim(),
     nationality:document.getElementById('agreementNationality').value.trim(),
     studentId:document.getElementById('agreementStudentId').value.trim(),
     mobile:document.getElementById('agreementMobile').value.trim(),
     gender:document.getElementById('agreementGender').value,
     college:document.getElementById('agreementCollege').value,
     identityFile:file.name,
     signature:document.getElementById('agreementSignature').value.trim(),
     agreementStatus:'مكتمل',
     rate:0,
     status:'تحت المراجعة',
     reason:'',
     submittedAt:new Date().toISOString().slice(0,10),
     ownerRole:currentGrantAccountRole()
   };
   const rows=grantRows(); rows.unshift(row); W(K.grants,rows);
   event.currentTarget.reset();
   renderGrantWorkflow(); renderAll();
   showToast('تم إرسال الإقرار للمراجعة بنجاح.');
 });

 document.getElementById('agreementSearch')?.addEventListener('input',renderAgreementSubmissions);
 document.getElementById('scholarSearch')?.addEventListener('input',renderGrantReviewTable);
 document.getElementById('scholarStatusFilter')?.addEventListener('change',renderGrantReviewTable);

 document.addEventListener('click',event=>{
   const gender=event.target.closest('[data-scholar-filter-gender]');
   if(gender){grantGenderFilter=gender.dataset.scholarFilterGender;renderGrantReviewTable();return;}
   const rate=event.target.closest('[data-scholar-filter-rate]');
   if(rate){grantRateFilter=rate.dataset.scholarFilterRate;renderGrantReviewTable();return;}
   const college=event.target.closest('[data-scholar-filter-college]');
   if(college){grantCollegeFilter=college.dataset.scholarFilterCollege;renderGrantReviewTable();}
 });
 renderGrantWorkflow();
}

function renderAll(){tables();student();applicants();approvals();populateClubEventSelect();renderRegisteredClubs();renderGeneralIndicator();renderGrantWorkflow();renderSportsManagementDashboard();const b=document.querySelector('[data-event-category].active');if(b)renderCategory(b.dataset.eventCategory)}
function bind(id,fn){const o=document.getElementById(id);if(!o)return;const n=o.cloneNode(true);o.replaceWith(n);n.onclick=fn}
window.addEventListener('DOMContentLoaded',()=>{
 document.getElementById('exportApprovalsExcel')
   ?.addEventListener('click',exportApprovalsExcel);

 document.getElementById('exportApprovalsPdf')
   ?.addEventListener('click',exportApprovalsPdf);

 populateClubEventSelect();
 renderRegisteredClubs();

 document.getElementById('registeredClubsStat')?.addEventListener('click',()=>{
   const panel=document.getElementById('registeredClubsPanel');
   panel?.classList.toggle('hidden');
   if(panel&&!panel.classList.contains('hidden')){
     renderRegisteredClubs();
     panel.scrollIntoView({behavior:'smooth',block:'nearest'});
   }
 });

 document.getElementById('closeRegisteredClubsPanel')?.addEventListener('click',()=>{
   clubManagementMode=false;
   document.getElementById('registeredClubsPanel')?.classList.add('hidden');
 });

 document.getElementById('manageRegisteredClubsBtn')?.addEventListener('click',()=>{
   clubManagementMode=!clubManagementMode;
   const button=document.getElementById('manageRegisteredClubsBtn');
   if(button)button.textContent=clubManagementMode?'✓ إنهاء التعديل':'✎ تعديل النوادي';
   renderRegisteredClubs();
 });

 document.getElementById('registeredClubsRows')?.addEventListener('click',event=>{
   const saveButton=event.target.closest('.club-save-btn');
   const deleteButton=event.target.closest('.club-delete-btn');

   if(saveButton){
     const id=saveButton.dataset.clubId;
     const input=document.querySelector(`.club-name-editor[data-club-id="${id}"]`);
     renameClub(id,input?.value||'');
   }

   if(deleteButton){
     deleteClub(deleteButton.dataset.clubId);
   }
 });


 document.getElementById('clubShareLegend')?.addEventListener('click',event=>{
   const button=event.target.closest('.club-chart-legend-item');
   if(!button)return;
   renderClubActivityDetails(button.dataset.clubId,true);
 });

 document.getElementById('closeClubActivityDetails')?.addEventListener('click',()=>{
   selectedClubDetailsId='';
   document.getElementById('clubActivityDetailsPanel')?.classList.add('hidden');
   document.querySelectorAll('.club-chart-legend-item')
     .forEach(button=>button.classList.remove('active'));
 });

 document.querySelectorAll('[data-event-category]').forEach((b,i)=>b.onclick=()=>{document.querySelectorAll('[data-event-category]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderCategory(b.dataset.eventCategory);if(i===0||true){}});
 const first=document.querySelector('[data-event-category]');if(first){first.classList.add('active');renderCategory(first.dataset.eventCategory)}
 bind('submitSportsRequest',()=>{
   const form=document.getElementById('submitSportsRequest')?.closest('form');
   if(!validateRequiredContainer(form))return;
   const d=document.getElementById('sportsReqDate').value;if(!later3(d))return alert('يجب أن يكون الحدث بعد 3 أيام على الأقل.');push(K.sports,{id:id('sp'),name:document.getElementById('sportsReqName').value,description:normalizeEventDescription(document.getElementById('sportsReqDescription')?.value),date:d,game:document.getElementById('sportsReqGame').value,
        location:document.getElementById('sportsReqLocation')?.value.trim()||'غير محدد',
        participants:+document.getElementById('sportsReqParticipants').value,teams:+document.getElementById('sportsReqTeams').value,universities:+document.getElementById('sportsReqUniversities').value,capacity:+document.getElementById('sportsReqCapacity').value,gender:document.getElementById('sportsReqGender').value,status:'تحت المراجعة',submittedAt:td(),submittedBy:'مدير النادي الرياضي'})});
 bind('submitClubRequest',()=>{
   const form=document.getElementById('submitClubRequest')?.closest('form');
   if(!validateRequiredContainer(form))return;
   const m=document.getElementById('clubMembers').value.split(/\n|,/).map(x=>x.trim()).filter(Boolean);if(m.length<10)return alert('يلزم 10 أعضاء على الأقل.');if(!document.getElementById('clubLogo').files[0])return alert('ارفع شعار النادي.');push(K.clubs,{id:id('cl'),name:document.getElementById('clubName').value,supervisor:document.getElementById('clubSupervisor').value,manager:document.getElementById('clubManager').value,members:m,goal:document.getElementById('clubGoal').value,gender:document.getElementById('clubGender').value,status:'تحت المراجعة',submittedAt:td(),submittedBy:'حساب طالب'})});
 bind('submitClubEventRequest',()=>{
 const form=document.getElementById('submitClubEventRequest')?.closest('form');
 if(!validateRequiredContainer(form))return;

 const selectedClub=document.getElementById('clubEventClub').value;
 if(!selectedClub)return alert('اختر ناديًا مسجلًا من القائمة.');
 if(!registeredClubs().includes(selectedClub))return alert('النادي المحدد غير مفعل.');

 const d=document.getElementById('clubEventDate').value;
 if(!later3(d))return alert('يجب أن يكون الحدث بعد 3 أيام على الأقل.');

 push(K.clubEvents,{
   id:id('ce'),
   club:selectedClub,
   name:document.getElementById('clubEventName').value,
   description:normalizeEventDescription(document.getElementById('clubEventDescription')?.value),
   date:d,
   location:document.getElementById('clubEventLocation').value,
   participants:document.getElementById('clubEventParticipants').value,
   supervisor:document.getElementById('clubEventSupervisor').value,
   gender:document.getElementById('clubEventGender').value,
   capacity:+document.getElementById('clubEventCapacity').value,
   status:'تحت المراجعة',
   submittedAt:td(),
   submittedBy:'مسؤول النادي'
 });
});
 bind('submitVolunteerOpportunity',()=>{
 const form=document.getElementById('submitVolunteerOpportunity')?.closest('form');
 if(!validateRequiredContainer(form))return;

 push(K.vol,{id:id('vo'),type:document.getElementById('volunteerType').value,capacity:+document.getElementById('volunteerCapacity').value,name:document.getElementById('volunteerEventName').value,description:normalizeEventDescription(document.getElementById('volunteerEventDescription')?.value),date:document.getElementById('volunteerEventDate').value,sponsor:document.getElementById('volunteerSponsor').value,owner:document.getElementById('volunteerOwner').value,location:document.getElementById('volunteerLocation').value,gender:'الاثنان معًا',status:'تحت المراجعة',submittedAt:td(),submittedBy:'مدير الأنشطة الطلابية'});
});
 renderAll();
});
})();

/* ==========================================================
   SAH V22.2 — calculators, permissions and data recovery
   ========================================================== */
(function(){
  'use strict';

  const ROLE_KEY='sah-v15-role';
  const ACTIVITIES_KEY='sah-v15-local-activities';
  const OVERRIDES_KEY='sah-v15-evidence-overrides';

  const META={
    system:{name:'حسام الحسين',role:'مسؤول النظام',avatar:'ح'},
    indicator:{name:'سهيل الكعكي',role:'مسؤول مؤشر الأداء الرياضي',avatar:'س'},
    sports_manager:{name:'مجدي البلوشي',role:'مدير النادي الرياضي',avatar:'م'},
    dean:{name:'د. محمد المقدم',role:'عميد شؤون الطلاب',avatar:'د'},
    coach:{name:'كابتن محمد نفار',role:'مدرب رياضي',avatar:'ن'},
    activities_manager:{name:'الأستاذ فهد',role:'مدير الأنشطة الطلابية',avatar:'ف'},
    student_account:{name:'فلان الفلاني',role:'حساب طالب',avatar:'ط'},
    faculty:{name:'د. كريم سليمان',role:'عضو هيئة التدريس',avatar:'ك'}
  };

  const ALL=new Set([
    'home','general-indicator','sports','sports-request','indicator','scholarships',
    'athletes','reports','calendar',
    'activities','volunteer','clubs','approvals','general-indicator'
  ]);

  const ROLE_PAGES={
    system:new Set(ALL),
    indicator:new Set(ALL),
    dean:new Set(ALL),
    sports_manager:new Set([
      'home','sports','sports-request','scholarships','championships',
      'athletes','reports','calendar'
    ]),
    coach:new Set(['home','sports-request','athletes','reports']),
    activities_manager:new Set([
      'home','athletes','reports','activities','volunteer','approvals'
    ]),
    student_account:new Set(['home','agreement','student']),
    faculty:new Set(['home','clubs'])
  };

  function read(key,fallback){
    try{return JSON.parse(localStorage.getItem(key)||'null') ?? fallback;}
    catch{return fallback;}
  }

  function write(key,value){
    localStorage.setItem(key,JSON.stringify(value));
  }

  function keyFor(row,index=0){
    return String(
      row?.localActivityId ||
      row?.recordKey ||
      `source-${row?.id ?? index}-${row?.activity || 'activity'}-${row?.date || 'date'}`
    );
  }

  function restoreLegacyData(){
    const activities=new Map();

    ['sah-added-sports-activities-v1',ACTIVITIES_KEY].forEach(storageKey=>{
      const rows=read(storageKey,[]);
      if(!Array.isArray(rows)) return;
      rows.forEach((row,index)=>{
        if(row && typeof row==='object'){
          activities.set(keyFor(row,index),row);
        }
      });
    });

    write(ACTIVITIES_KEY,[...activities.values()]);

    const overrides={
      ...read('sah-evidence-overrides-v1',{}),
      ...read(OVERRIDES_KEY,{})
    };

    const sourceRows=window.SAH_DATA?.evidenceRecords||[];
    const sourceMap=new Map(
      sourceRows.map((row,index)=>[keyFor(row,index),row])
    );

    /*
      Restore original imported points when a previous broken build
      wrote an automatic zero override.
    */
    Object.entries(overrides).forEach(([key,override])=>{
      const source=sourceMap.get(key);
      if(!source || !override || typeof override!=='object') return;

      if(Number(override.points)===0 && Number(source.points)>0){
        delete override.points;
      }
    });

    write(OVERRIDES_KEY,overrides);
  }

  function role(){
    return document.getElementById('activeRole')?.value ||
      document.getElementById('mobileActiveRole')?.value ||
      localStorage.getItem(ROLE_KEY) ||
      'system';
  }

  function isIndicator(){
    return role()==='indicator';
  }

  function setText(id,value){
    const element=document.getElementById(id);
    if(element) element.textContent=value;
  }

  function applyPermissions(){
    const current=role();
    const allowed=ROLE_PAGES[current]||ROLE_PAGES.system;
    const meta=META[current]||META.system;

    localStorage.setItem(ROLE_KEY,current);

    document.querySelectorAll('.nav button[data-page]').forEach(button=>{
      const visible=allowed.has(button.dataset.page);
      button.hidden=!visible;
      button.classList.toggle('role-hidden',!visible);
    });

    document.querySelectorAll('.nav-group').forEach(group=>{
      const visible=[...group.querySelectorAll('.nav-items button[data-page]')]
        .some(button=>!button.hidden);
      group.hidden=!visible;
    });

    const activePage=document.querySelector('.page.active');
    const activePageName=activePage?.id?.replace('page-','')||'home';

    if(!allowed.has(activePageName)){
      activePage?.classList.remove('active');
      document.getElementById('page-home')?.classList.add('active');

      document.querySelectorAll('.nav button[data-page]').forEach(button=>{
        button.classList.toggle('active',button.dataset.page==='home');
      });

      if(location.hash&&location.hash!=='#home'){
        history.replaceState(null,'',location.pathname+location.search+'#home');
      }
    }

    [
      'indicatorPermissionSettings',
      'indicatorFieldsManagerButton',
      'openFieldPointsCalculator'
    ].forEach(id=>{
      const element=document.getElementById(id);
      if(!element) return;
      element.hidden=!isIndicator();
      element.disabled=!isIndicator();
      element.classList.toggle('hidden',!isIndicator());
    });

    setText('activeUserName',meta.name);
    setText('activeUserRole',meta.role);
    setText('activeUserAvatar',meta.avatar);
    setText('mobileUserName',meta.name);
    setText('mobileUserRole',meta.role);
    setText('mobileUserAvatar',meta.avatar);

    document.body.dataset.activeRole=current;
  }

  function bindFresh(id,callback){
    const old=document.getElementById(id);
    if(!old) return;

    const button=old.cloneNode(true);
    old.replaceWith(button);

    button.addEventListener('click',event=>{
      event.preventDefault();
      event.stopImmediatePropagation();

      if(!isIndicator()){
        window.showToast?.('تعديل النقاط متاح لمسؤول مؤشر الأداء الرياضي فقط.');
        return;
      }

      callback();
    });
  }

  function bindPointButtons(){
    const api=window.SAH_POINT_API;
    if(!api) return;

    bindFresh('indicatorPermissionSettings',api.openIndicatorCalculator);
    bindFresh('indicatorSaveLimits',api.saveIndicatorLimits);
    bindFresh('restorePreviousIndicatorLimits',api.restorePreviousLimits);
    bindFresh('indicatorResetLimits',api.resetOriginalLimits);

    bindFresh('openFieldPointsCalculator',api.openFieldCalculator);
    bindFresh('saveFieldPointsCalculator',api.saveFieldCalculator);
    bindFresh('restorePreviousFieldPointsCalculator',api.restorePreviousFieldCalculator);
    bindFresh('resetFieldPointsCalculator',api.resetFieldCalculator);

    bindFresh('indicatorFieldsManagerButton',api.openFieldsManager);
    bindFresh('saveIndicatorFieldsManager',api.saveFieldsManager);
    bindFresh('addIndicatorFieldRow',api.addFieldManagerRow);
    bindFresh('addIndicatorFieldToExistingTrack',api.addFieldToExistingTrack);
  }

  function syncRole(event){
    const value=event.target.value;
    const desktop=document.getElementById('activeRole');
    const mobile=document.getElementById('mobileActiveRole');

    if(desktop && desktop.value!==value) desktop.value=value;
    if(mobile && mobile.value!==value) mobile.value=value;

    applyPermissions();
  }

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 22.2 loaded');
    restoreLegacyData();

    document.getElementById('activeRole')?.addEventListener('change',syncRole);
    document.getElementById('mobileActiveRole')?.addEventListener('change',syncRole);

    setTimeout(()=>{
      bindPointButtons();
      applyPermissions();

      window.SAH_POINT_API?.recalculateIndicator?.();
      window.SAH_POINT_API?.renderEvidenceStats?.();
      window.SAH_POINT_API?.renderEvidence?.();
    },100);
  });
})();

/* ==========================================================
   SAH V22.4 — deterministic calculator modal controller
   ========================================================== */
(function(){
  'use strict';

  const MODALS = {
    indicatorSettingsModal: 'indicatorSettingsModal',
    fieldPointsCalculatorModal: 'fieldPointsCalculatorModal',
    indicatorFieldsManagerModal: 'indicatorFieldsManagerModal'
  };

  const ACTIONS = {
    indicatorSaveLimits: 'saveIndicatorLimits',
    saveFieldPointsCalculator: 'saveFieldCalculator',
    saveIndicatorFieldsManager: 'saveFieldsManager',
    restorePreviousIndicatorLimits: 'restorePreviousLimits',
    indicatorResetLimits: 'resetOriginalLimits',
    restorePreviousFieldPointsCalculator: 'restorePreviousFieldCalculator',
    resetFieldPointsCalculator: 'resetFieldCalculator'
  };

  let lastHandledAt = 0;

  function activeRole(){
    return document.getElementById('activeRole')?.value ||
      document.getElementById('mobileActiveRole')?.value ||
      'system';
  }

  function canEdit(){
    return activeRole() === 'indicator';
  }

  function closeModal(id){
    const modal = document.getElementById(id);
    if(!modal) return;

    modal.classList.add('hidden');
    modal.setAttribute('aria-hidden','true');
    modal.style.display = '';
    document.body.style.overflow = '';
  }

  function closeFromTarget(target){
    if(target.matches('[data-close-indicator-settings]')){
      closeModal(MODALS.indicatorSettingsModal);
      return true;
    }
    if(target.matches('[data-close-field-calculator]')){
      closeModal(MODALS.fieldPointsCalculatorModal);
      return true;
    }
    if(target.matches('[data-close-fields-manager]')){
      closeModal(MODALS.indicatorFieldsManagerModal);
      return true;
    }
    return false;
  }

  function runAction(target){
    const actionName = ACTIONS[target.id];
    if(!actionName) return false;

    if(!canEdit()){
      window.showToast?.('تعديل النقاط متاح لمسؤول مؤشر الأداء الرياضي فقط.');
      return true;
    }

    const api = window.SAH_POINT_API;
    const fn = api?.[actionName];

    if(typeof fn !== 'function'){
      console.error('Missing point action:', actionName, api);
      window.showToast?.('تعذر الوصول إلى وظيفة الحفظ. أعد تحميل الصفحة.');
      return true;
    }

    try{
      fn();
    }catch(error){
      console.error(`Point action failed: ${actionName}`, error);
      window.showToast?.('تعذر تنفيذ العملية. افتح Console لمعرفة الخطأ.');
    }

    return true;
  }

  function handleInteraction(event){
    const target = event.target.closest(
      '[data-close-indicator-settings],' +
      '[data-close-field-calculator],' +
      '[data-close-fields-manager],' +
      '#indicatorSaveLimits,' +
      '#saveFieldPointsCalculator,' +
      '#saveIndicatorFieldsManager,' +
      '#restorePreviousIndicatorLimits,' +
      '#indicatorResetLimits,' +
      '#restorePreviousFieldPointsCalculator,' +
      '#resetFieldPointsCalculator'
    );

    if(!target) return;

    const now = Date.now();
    if(now - lastHandledAt < 250) return;
    lastHandledAt = now;

    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation?.();

    if(closeFromTarget(target)) return;
    runAction(target);
  }

  /*
    Pointerup is the primary mobile/desktop path.
    Click is a keyboard/accessibility fallback.
  */
  document.addEventListener('pointerup', handleInteraction, true);
  document.addEventListener('click', handleInteraction, true);

  document.addEventListener('keydown',event=>{
    if(event.key !== 'Escape') return;

    const visible = [
      MODALS.indicatorSettingsModal,
      MODALS.fieldPointsCalculatorModal,
      MODALS.indicatorFieldsManagerModal
    ].find(id=>{
      const modal=document.getElementById(id);
      return modal && !modal.classList.contains('hidden');
    });

    if(visible){
      event.preventDefault();
      closeModal(visible);
    }
  });

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 22.4 loaded');
    document.documentElement.dataset.sahBuild='22.4';

    /*
      Guarantee that all modal controls are enabled for the indicator role.
    */
    if(canEdit()){
      [
        'indicatorSaveLimits',
        'saveFieldPointsCalculator',
        'saveIndicatorFieldsManager',
        'restorePreviousIndicatorLimits',
        'indicatorResetLimits',
        'restorePreviousFieldPointsCalculator',
        'resetFieldPointsCalculator'
      ].forEach(id=>{
        const element=document.getElementById(id);
        if(element) element.disabled=false;
      });
    }
  });
})();

/* ==========================================================
   SAH V22.5 — repair broken zero-point overrides safely
   ========================================================== */
(function(){
  'use strict';

  const DONE_KEY='sah-v22-5-zero-override-repair';

  function read(key,fallback){
    try{return JSON.parse(localStorage.getItem(key)||'null') ?? fallback;}
    catch{return fallback;}
  }

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 22.5 loaded');
    document.documentElement.dataset.sahBuild='22.5';

    if(localStorage.getItem(DONE_KEY)==='done') return;

    const overridesKey='sah-v15-evidence-overrides';
    const overrides=read(overridesKey,{});
    const source=window.SAH_DATA?.evidenceRecords||[];

    const sourceKey=(row,index)=>String(
      row?.localActivityId ||
      row?.recordKey ||
      `source-${row?.id ?? index}-${row?.activity || 'activity'}-${row?.date || 'date'}`
    );

    const sourceMap=new Map(
      source.map((row,index)=>[sourceKey(row,index),row])
    );

    Object.entries(overrides).forEach(([key,row])=>{
      const original=sourceMap.get(key);
      if(!original || !row || typeof row!=='object') return;

      if(Number(row.points)===0 && Number(original.points)>0){
        delete row.points;
      }
    });

    localStorage.setItem(overridesKey,JSON.stringify(overrides));
    localStorage.setItem(DONE_KEY,'done');
  });
})();


/* SAH V22.6 — centered calculator modal */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 22.6 loaded');
  document.documentElement.dataset.sahBuild='22.6';
});

/* ==========================================================
   SAH V22.7 — restore indicator fields and tracks management
   ========================================================== */
(function(){
  'use strict';

  function currentRole(){
    return document.getElementById('activeRole')?.value ||
      document.getElementById('mobileActiveRole')?.value ||
      'system';
  }

  function isIndicator(){
    return currentRole()==='indicator';
  }

  function showManagerButton(){
    const allowed=isIndicator();

    [
      'indicatorFieldsManagerButton',
      'openFieldsManagerFromCalculator'
    ].forEach(id=>{
      const button=document.getElementById(id);
      if(!button) return;

      button.hidden=!allowed;
      button.disabled=!allowed;
      button.classList.toggle('hidden',!allowed);
      button.classList.toggle('indicator-only',true);
      button.style.display=allowed?'inline-flex':'none';
      button.setAttribute('aria-hidden',String(!allowed));
    });
  }

  function openManager(){
    if(!isIndicator()){
      window.showToast?.('إدارة المجالات والمسارات متاحة لمسؤول مؤشر الأداء الرياضي فقط.');
      return;
    }

    const api=window.SAH_POINT_API;
    if(typeof api?.openFieldsManager!=='function'){
      console.error('openFieldsManager is unavailable',api);
      window.showToast?.('تعذر فتح إدارة المجالات.');
      return;
    }

    api.openFieldsManager();
  }

  function invoke(action){
    if(!isIndicator()){
      window.showToast?.('إدارة المجالات والمسارات متاحة لمسؤول مؤشر الأداء الرياضي فقط.');
      return;
    }

    const fn=window.SAH_POINT_API?.[action];
    if(typeof fn!=='function'){
      console.error('Missing fields manager action:',action);
      window.showToast?.('تعذر تنفيذ العملية.');
      return;
    }

    try{
      fn();
    }catch(error){
      console.error(`Fields manager action failed: ${action}`,error);
      window.showToast?.('حدث خطأ أثناء إدارة المجالات.');
    }
  }

  document.addEventListener('click',event=>{
    const target=event.target.closest(
      '#indicatorFieldsManagerButton,' +
      '#openFieldsManagerFromCalculator,' +
      '#addIndicatorFieldRow,' +
      '#addIndicatorFieldToExistingTrack,' +
      '#saveIndicatorFieldsManager'
    );

    if(!target) return;

    event.preventDefault();
    event.stopImmediatePropagation();

    if(
      target.id==='indicatorFieldsManagerButton' ||
      target.id==='openFieldsManagerFromCalculator'
    ){
      openManager();
      return;
    }

    const action={
      addIndicatorFieldRow:'addFieldManagerRow',
      addIndicatorFieldToExistingTrack:'addFieldToExistingTrack',
      saveIndicatorFieldsManager:'saveFieldsManager'
    }[target.id];

    invoke(action);
  },true);

  document.addEventListener('change',event=>{
    const select=event.target.closest('#indicatorFieldsManagerRows .manager-track');
    if(!select) return;

    const row=select.closest('.field-manager-row');
    const custom=row?.querySelector('.manager-track-custom');
    if(!custom) return;

    custom.classList.toggle('hidden',select.value!=='__new__');
    if(select.value==='__new__'){
      custom.focus();
    }
  },true);

  window.addEventListener('DOMContentLoaded',()=>{
    console.info('SAH build 22.7 loaded');
    document.documentElement.dataset.sahBuild='22.7';

    showManagerButton();

    document.getElementById('activeRole')
      ?.addEventListener('change',()=>setTimeout(showManagerButton,0));

    document.getElementById('mobileActiveRole')
      ?.addEventListener('change',()=>setTimeout(showManagerButton,0));

    setTimeout(showManagerButton,100);
    setTimeout(showManagerButton,500);
  });
})();


/* SAH V23.0 — polished approval decisions */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 23.0 loaded');
  document.documentElement.dataset.sahBuild='23.0';
});


/* SAH V23.1 — inline rejection comment */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 23.1 loaded');
  document.documentElement.dataset.sahBuild='23.1';

  document.addEventListener('input',event=>{
    const input=event.target.closest('.approval-rejection-comment');
    if(input && input.value.trim()){
      input.classList.remove('invalid');
    }
  });
});


/* SAH V23.2 — detailed student opportunity cards */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 23.2 loaded');
  document.documentElement.dataset.sahBuild='23.2';
});


/* SAH V23.3 — compact approvals and registered clubs */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 23.3 loaded');
  document.documentElement.dataset.sahBuild='23.3';
});


/* SAH V23.4 — approval charts and club management */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 23.4 loaded');
  document.documentElement.dataset.sahBuild='23.4';
});


/* SAH V23.5 — compact approval rows and inline rejection editor */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 23.5 loaded');
  document.documentElement.dataset.sahBuild='23.5';

  document.addEventListener('input',event=>{
    const input=event.target.closest('.approval-rejection-comment');
    if(input && input.value.trim()){
      input.classList.remove('invalid');
    }
  });

  document.addEventListener('keydown',event=>{
    const input=event.target.closest('.approval-rejection-comment');
    if(!input || event.key!=='Enter')return;

    event.preventDefault();
    input.closest('.approval-rejection-editor')
      ?.querySelector('.confirm-reject-req')
      ?.click();
  });
});


/* SAH V23.6 — dynamic clickable club activity details */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 23.6 loaded');
  document.documentElement.dataset.sahBuild='23.6';
});


/* SAH V23.7 — approvals Excel and PDF export */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 23.7 loaded');
  document.documentElement.dataset.sahBuild='23.7';
});


/* SAH V23.8 — comprehensive clubs and activities export */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 23.8 loaded');
  document.documentElement.dataset.sahBuild='23.8';
});


/* SAH V23.9 — Student Activities Platform branding */
window.addEventListener('DOMContentLoaded',()=>{
  document.title='Student Activities Platform | UBT';
  console.info('SAH build 23.9 loaded');
  document.documentElement.dataset.sahBuild='23.9';
});


/* SAH V24.1 — safe club button alignment */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 24.1 loaded');
  document.documentElement.dataset.sahBuild='24.1';
});


/* SAH V24.2 — per-item maximum point limits */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 24.2 loaded');
  document.documentElement.dataset.sahBuild='24.2';
});


/* SAH V24.3 — unified applicant approval and rejection */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 24.3 loaded');
  document.documentElement.dataset.sahBuild='24.3';

  document.addEventListener('input',event=>{
    const input=event.target.closest('.applicant-rejection-comment');
    if(input&&input.value.trim()){
      input.classList.remove('invalid');
    }
  });

  document.addEventListener('keydown',event=>{
    const input=event.target.closest('.applicant-rejection-comment');
    if(!input||event.key!=='Enter')return;

    event.preventDefault();
    input.closest('.applicant-rejection-editor')
      ?.querySelector('.confirm-reject-app')
      ?.click();
  });
});


/* SAH V24.4 — unified search and filters for workflow tables */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 24.4 loaded');
  document.documentElement.dataset.sahBuild='24.4';

  const tableControls=[
    'approvalTableSearch','approvalTableStatus','approvalTableType',
    'clubRequestSearch','clubRequestStatus',
    'clubEventSearch','clubEventStatus',
    'clubApplicantSearch','clubApplicantStatus',
    'volunteerTableSearch','volunteerTableStatus',
    'sportsRequestSearch','sportsRequestStatus',
    'sportsApplicantSearch','sportsApplicantStatus'
  ];

  tableControls.forEach(id=>{
    const control=document.getElementById(id);
    if(!control)return;

    control.addEventListener(control.tagName==='INPUT'?'input':'change',()=>{
      tables();
      applicants();
      approvals();
    });
  });
});


/* SAH V24.5 — activities statistics dashboard */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 24.5 loaded');
  document.documentElement.dataset.sahBuild='24.5';
});


/* SAH V24.6 — reports documentation dashboard */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 24.6 loaded');
  document.documentElement.dataset.sahBuild='24.6';

  document.addEventListener('click',event=>{
    const summary=event.target.closest('[data-evidence-gender]');
    if(summary){
      applyReportsDashboardFilter({
        gender:summary.dataset.evidenceGender||'all',
        completion:summary.dataset.evidenceCompletion||'all'
      });
      return;
    }

    const field=event.target.closest('[data-evidence-main-field]');
    if(field){
      applyReportsDashboardFilter({
        gender:'all',
        completion:'all',
        mainField:field.dataset.evidenceMainField||''
      });
    }
  });

  [
    'evidenceSearch',
    'evidenceColumnFilter',
    'evidenceCompletionFilter',
    'evidenceStatus'
  ].forEach(id=>{
    const element=document.getElementById(id);
    if(!element)return;

    element.addEventListener(
      element.tagName==='INPUT'?'input':'change',
      ()=>{ window.__reportsExcludeComplete=false; }
    );
  });

  document.querySelectorAll('#evidenceGender button').forEach(button=>{
    button.addEventListener('click',()=>{
      window.__reportsExcludeComplete=false;
    });
  });
});


/* SAH V24.7 — General Indicator executive dashboard */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 24.7 loaded');
  document.documentElement.dataset.sahBuild='24.7';
  setTimeout(()=>renderGeneralIndicator?.(),0);
});


/* SAH V24.8 — scholarship agreement and approval workflow */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 24.8 loaded');
  document.documentElement.dataset.sahBuild='24.8';
  initGrantWorkflow();
});


/* SAH V24.9 — account-scoped agreements and scholarship pies */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 24.9 loaded');
  document.documentElement.dataset.sahBuild='24.9';

  document.getElementById('activeRole')?.addEventListener('change',()=>{
    renderAgreementSubmissions();
    renderGeneralIndicator();
  });

  document.getElementById('mobileActiveRole')?.addEventListener('change',()=>{
    renderAgreementSubmissions();
    renderGeneralIndicator();
  });
});


/* SAH V25.0 — full-width approvals summary in General Indicator */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 25.0 loaded');
  document.documentElement.dataset.sahBuild='25.0';

  document.addEventListener('click',event=>{
    const filterButton=event.target.closest('[data-general-approval-filter]');
    if(!filterButton)return;

    const filter=filterButton.dataset.generalApprovalFilter;
    setTimeout(()=>{
      const status=document.getElementById('approvalTableStatus');
      if(!status)return;

      status.value=filter;
      status.dispatchEvent(new Event('change',{bubbles:true}));
    },120);
  });
});


/* SAH V25.1 — Student Services visible only to student account */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 25.1 loaded');
  document.documentElement.dataset.sahBuild='25.1';
});


/* SAH V25.2 — event descriptions limited to 35 words */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 25.2 loaded');
  document.documentElement.dataset.sahBuild='25.2';

  document.querySelectorAll('textarea[data-word-limit="35"]').forEach(textarea=>{
    enforceEventDescriptionLimit(textarea);

    textarea.addEventListener('input',()=>{
      enforceEventDescriptionLimit(textarea);
    });

    textarea.addEventListener('paste',()=>{
      setTimeout(()=>enforceEventDescriptionLimit(textarea),0);
    });
  });
});


/* SAH V25.3 — all workflow fields are mandatory */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 25.3 loaded');
  document.documentElement.dataset.sahBuild='25.3';

  document.addEventListener('input',resetRequiredErrorOnInput);
  document.addEventListener('change',resetRequiredErrorOnInput);
});


/* SAH V25.4 — Sports management dashboard redesign */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 25.4 loaded');
  document.documentElement.dataset.sahBuild='25.4';
  setTimeout(()=>renderSportsManagementDashboard?.(),0);
});


/* SAH V25.5 — clean interactive Sports Management dashboard */
window.addEventListener('DOMContentLoaded',()=>{
  console.info('SAH build 25.5 loaded');
  document.documentElement.dataset.sahBuild='25.5';

  document.addEventListener('click',event=>{
    const filter=event.target.closest('[data-sports-dashboard-type]');

    if(filter){
      setSportsDashboardFilter(
        filter.dataset.sportsDashboardType,
        filter.dataset.sportsDashboardStatus||'all',
        filter.dataset.sportsDashboardGender||'all'
      );
      return;
    }

    if(event.target.closest('#sportsDashboardClearFilter')){
      setSportsDashboardFilter('sports','all','all');
    }
  });
});





/* SAH V26.1 — layout recovery and permanent light mode */
window.addEventListener('DOMContentLoaded',()=>{
  document.body.classList.remove('theme-dark');
  localStorage.removeItem('sah-theme');
  document.documentElement.dataset.sahBuild='26.1';
  console.info('SAH build 26.1 loaded');
});


/* SAH V26.2 — exact reversible bilingual translation */
window.addEventListener('DOMContentLoaded',()=>{
  document.documentElement.dataset.sahBuild='26.2';
  console.info('SAH build 26.2 loaded');
});


/* SAH V26.3 — English layout and point-unit fixes */
window.addEventListener('DOMContentLoaded',()=>{
  document.documentElement.dataset.sahBuild='26.3';

  setTimeout(()=>{
    if(typeof calcIndicators==='function')calcIndicators();
    if(typeof renderGeneralIndicator==='function')renderGeneralIndicator();
  },40);

  console.info('SAH build 26.3 loaded');
});
