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

function calcIndicators(){
 const fields=SAH_DATA.indicatorFields||[];
 const max=fields.reduce((a,b)=>a+(+b.max||0),0), male=fields.reduce((a,b)=>a+(+b.male||0),0), female=fields.reduce((a,b)=>a+(+b.female||0),0);
 const mp=pct(male,max), fp=pct(female,max);
 setText('#malePoints', `${fmt(male)} / ${fmt(max)} نقطة`); setText('#femalePoints', `${fmt(female)} / ${fmt(max)} نقطة`);
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
 w.document.write(`<!doctype html><html lang="ar" dir="rtl"><head><meta charset="utf-8"><title>تقرير الشواهد</title><style>body{font-family:Tahoma,Arial;padding:24px;color:#102d5c}header{display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #0b3475;padding-bottom:16px;margin-bottom:20px}h1{font-size:24px}p{color:#566070}table{width:100%;border-collapse:collapse;font-size:11px}th,td{border:1px solid #ccd6e5;padding:7px;text-align:right;vertical-align:top}th{background:#eef4ff}@media print{body{padding:0}button{display:none}}</style></head><body><header><div><h1>تقرير توثيق الأنشطة والشواهد</h1><p>Student Activities Hub (SAH) — جامعة الأعمال والتكنولوجيا</p></div><div><b>عدد السجلات: ${rows.length}</b><br><small>${new Date().toLocaleDateString('ar-SA')}</small></div></header><button onclick="window.print()">طباعة / حفظ PDF</button><table><thead><tr><th>#</th><th>النشاط</th><th>التاريخ</th><th>الفئة</th><th>النوع</th><th>التصنيف</th><th>النقاط</th><th>الحالة</th><th>الخبر</th><th>الصور</th><th>النشر</th></tr></thead><tbody>${body}</tbody></table><script>setTimeout(()=>window.print(),500)<\/script></body></html>`); w.document.close();
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
const SAH_TEXT_AR = Object.fromEntries(Object.entries(SAH_TEXT_EN).map(([ar,en])=>[en,ar]));
const SAH_PHRASES = Object.entries(SAH_TEXT_EN).sort((a,b)=>b[0].length-a[0].length);
function translateLoose(text, lang){
  const trimmed=text.trim(); if(!trimmed) return text;
  const lead=text.match(/^\s*/)?.[0]||'', trail=text.match(/\s*$/)?.[0]||'';
  const dict = lang==='en'?SAH_TEXT_EN:SAH_TEXT_AR;
  if(dict[trimmed]) return lead+dict[trimmed]+trail;
  if(lang!=='en') return text;
  if(!/[\u0600-\u06FF]/.test(trimmed)) return text;
  let out=trimmed;
  for(const [ar,en] of SAH_PHRASES){ out=out.split(ar).join(en); }
  out=out.replace(/(\d+)\s*طالبات/g,'$1 female students')
         .replace(/(\d+)\s*طلاب/g,'$1 male students')
         .replace(/(\d+)\s*طالبة/g,'$1 female student')
         .replace(/(\d+)\s*طالب/g,'$1 male student')
         .replace(/(\d+)\s*مشاركة/g,'$1 participations')
         .replace(/(\d+)\s*نشاط/g,'$1 activities')
         .replace(/(\d+)\s*نقطة/g,'$1 points')
         .replace(/(\d+)\s*عضو/g,'$1 members')
         .replace(/(\d+)\s*مقعد/g,'$1 seats');
  return lead+out+trail;
}
function translatePlaceholders(lang){
  $$('input[placeholder], textarea[placeholder]').forEach(el=>{
    if(!el.dataset.arPlaceholder) el.dataset.arPlaceholder=el.getAttribute('placeholder')||'';
    el.setAttribute('placeholder', lang==='en'?translateLoose(el.dataset.arPlaceholder,'en'):el.dataset.arPlaceholder);
  });
  $$('option').forEach(el=>{
    if(!el.dataset.arText) el.dataset.arText=el.textContent;
    el.textContent = lang==='en'?translateLoose(el.dataset.arText,'en'):el.dataset.arText;
  });
}
function translateStatic(lang){
  const roots=[$('#app'),$('#login')].filter(Boolean);
  roots.forEach(root=>{
    const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
      const p=node.parentElement; if(!p || ['SCRIPT','STYLE','SVG','PATH'].includes(p.tagName)) return NodeFilter.FILTER_REJECT;
      if(p.closest('.identity-card')) return NodeFilter.FILTER_REJECT;
      if(!node.textContent.trim()) return NodeFilter.FILTER_REJECT;
      return NodeFilter.FILTER_ACCEPT;
    }});
    const nodes=[]; while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(n=>{
      if(!n._sahArText && /[\u0600-\u06FF]/.test(n.textContent)) n._sahArText=n.textContent;
      if(n._sahArText) n.textContent = lang==='en'?translateLoose(n._sahArText,'en'):n._sahArText;
    });
  });
  translatePlaceholders(lang);
}
function relocalizeSoon(){
  clearTimeout(window.__sahI18nTimer);
  window.__sahI18nTimer=setTimeout(()=>translateStatic(document.documentElement.lang||'ar'),20);
}
function observeDynamicTranslations(){
  const observer=new MutationObserver(()=>{
    if(document.documentElement.lang==='en') relocalizeSoon();
  });
  observer.observe(document.body,{childList:true,subtree:true,characterData:true});
}

// === SAH V5: theme + bilingual UI ===
const SAH_I18N = {
  ar: {
    'nav.home':'الرئيسية','nav.sports':'الإدارة الرياضية','nav.indicator':'مؤشر الأداء الرياضي','nav.scholarships':'المنح الرياضية','nav.agreement':'الإقرار الإلكتروني للمنح','nav.championships':'البطولات الرياضية','nav.athletes':'ملف الطالب الرياضي','nav.activities':'الأنشطة الطلابية العامة','nav.volunteer':'العمل التطوعي','nav.student':'بوابة الطالب','nav.calendar':'التقويم الموحد','nav.requests':'طلبات التسجيل','nav.reports':'التقارير والتحليلات','nav.audit':'سجل العمليات',
    'brand.en':'Student Activities Hub','brand.ar':'منصة الأنشطة الطلابية','user.hello':'مرحباً، حسام الحسين','user.role':'مسؤول تطوير منصة الأنشطة الطلابية','home.eyebrow':'عمادة شؤون الطلاب','home.title':'منصة واحدة لإدارة الأنشطة والخدمات الطلابية','btn.sports':'الدخول للإدارة الرياضية','btn.student':'عرض بوابة الطالب','home.modules':'وحدات المنصة','home.dataSummary':'ملخص البيانات المستوردة','indicator.title':'مؤشر الأداء الرياضي','indicator.referenceTitle':'مرجعية احتساب المؤشر','indicator.referenceText':'يعتمد احتساب المؤشر على دليل مؤشر الأداء الرياضي الصادر من الاتحاد السعودي للرياضة الجامعية.','indicator.male':'مؤشر الأداء الرياضي - الطلاب','indicator.female':'مؤشر الأداء الرياضي - الطالبات','sports.title':'الإدارة الرياضية','sports.eyebrow':'وحدة الإدارة الرياضية','sports.heroTitle':'كل ما يخص الرياضة في صفحة واحدة'
  },
  en: {
    'nav.home':'Home','nav.sports':'Sports Administration','nav.indicator':'Sports Performance Indicator','nav.scholarships':'Sports Scholarships','nav.agreement':'Scholarship E-Agreement','nav.championships':'Sports Championships','nav.athletes':'Athlete Profile','nav.activities':'General Student Activities','nav.volunteer':'Volunteering','nav.student':'Student Portal','nav.calendar':'Unified Calendar','nav.requests':'Registration Requests','nav.reports':'Reports & Analytics','nav.audit':'Audit Log',
    'brand.en':'Student Activities Hub','brand.ar':'Student Activities Platform','user.hello':'Welcome, Hussam Alhussain','user.role':'Student Activities Platform Development Officer','home.eyebrow':'Deanship of Student Affairs','home.title':'One platform for student activities and services','btn.sports':'Open Sports Administration','btn.student':'View Student Portal','home.modules':'Platform modules','home.dataSummary':'Imported data summary','indicator.title':'Sports Performance Indicator','indicator.referenceTitle':'Indicator calculation reference','indicator.referenceText':'The indicator is calculated based on the Sports Performance Indicator Guide issued by the Saudi Universities Sports Federation.','indicator.male':'Sports Performance Indicator - Male students','indicator.female':'Sports Performance Indicator - Female students','sports.title':'Sports Administration','sports.eyebrow':'Sports Administration Module','sports.heroTitle':'Everything related to sports in one place'
  }
};
function applyLanguage(lang){
  const dict=SAH_I18N[lang]||SAH_I18N.ar;
  document.documentElement.lang=lang;
  document.documentElement.dir=lang==='en'?'ltr':'rtl';
  document.body.classList.toggle('lang-en', lang==='en');
  $('#app')?.classList.toggle('is-ltr', lang==='en');
  $$('[data-i18n]').forEach(el=>{ const key=el.dataset.i18n; if(dict[key]) el.textContent=dict[key]; });
  translateStatic(lang);
  // Re-render data-driven sections so statuses, categories and generated content follow the selected language.
  if(typeof renderScholarRows==='function') renderScholarRows();
  if(typeof renderAgreementRows==='function') renderAgreementRows();
  if(typeof renderChampionships==='function') renderChampionships();
  if(typeof renderProfiles==='function') renderProfiles();
  if(typeof renderClubs==='function') renderClubs();
  if(typeof renderOpportunities==='function') renderOpportunities($('#oppFilters button.active')?.dataset.filter||'all');
  if(typeof renderCalendar==='function') renderCalendar($('#calFilters button.active')?.dataset.filter||'all');
  if(typeof renderRequests==='function') renderRequests($('#requestFilters button.active')?.dataset.filter||'all');
  if(typeof renderAudit==='function') renderAudit();
  translateStatic(lang);
  const btn=$('#langToggle'); if(btn){ btn.textContent=lang==='en'?'AR':'EN'; btn.title=lang==='en'?'Switch to Arabic':'Switch to English'; }
  document.title=lang==='en'?'SAH | Student Activities Hub':'SAH | منصة الأنشطة الطلابية';
  localStorage.setItem('sah-lang',lang);
}
function applyTheme(theme){
  document.body.classList.toggle('theme-dark', theme==='dark');
  const btn=$('#themeToggle'); if(btn){ btn.textContent=theme==='dark'?'☀️':'🌙'; btn.setAttribute('aria-label', theme==='dark'?'Switch to light mode':'Switch to dark mode'); }
  localStorage.setItem('sah-theme',theme);
}
function initPreferences(){
  const storedTheme=localStorage.getItem('sah-theme') || 'light';
  const storedLang=localStorage.getItem('sah-lang') || 'ar';
  applyTheme(storedTheme); applyLanguage(storedLang);
  $('#themeToggle')?.addEventListener('click',()=>applyTheme(document.body.classList.contains('theme-dark')?'light':'dark'));
  $('#langToggle')?.addEventListener('click',()=>applyLanguage(document.documentElement.lang==='en'?'ar':'en'));
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
        host:0
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
        host:Math.max(0,Number(item.host)||0)
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
          { guest: Number(item.guest)||0, host: Number(item.host)||0 }
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
    return `<div class="subfield-calculator-row" data-id="${item.id}">
      <label><span>اسم المجال الفرعي</span><input class="subfield-name" value="${item.name||''}" required></label>
      <label><span>المجال الرئيسي المرتبط</span><select class="subfield-main"><option value="">غير مرتبط</option>${mains}</select></label>
      <label><span>نقاط المشاركة كضيف</span><input class="subfield-guest" type="number" min="0" value="${Number(points.guest)||0}"></label>
      <label><span>نقاط المشاركة كمستضيف</span><input class="subfield-host" type="number" min="0" value="${Number(points.host)||0}"></label>
      <label><span>نقاط كل جامعة مشاركة</span><input class="subfield-university" type="number" min="0" value="${Number(points.university)||0}"></label>
      <label><span>نقاط كل لاعب مشارك</span><input class="subfield-player" type="number" min="0" value="${Number(points.player)||0}"></label>
      <button class="subfield-delete" type="button">🗑</button>
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
        host:Math.max(0,Number(row.querySelector('.subfield-host')?.value)||0),
        university:Math.max(0,Number(row.querySelector('.subfield-university')?.value)||0),
        player:Math.max(0,Number(row.querySelector('.subfield-player')?.value)||0)
      }))
      .filter(item=>item.name);

    subfields.forEach(item=>{
      calculator.subfields[item.name]={guest:item.guest,host:item.host,university:item.university,player:item.player};
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
    const p = calculator.subfields?.[activity.subField] || {guest:0,host:0,university:0,player:0};
    const host = activity.participationType === 'host';
    return Math.max(0,Math.round(
      Number(host?p.host:p.guest) +
      Number(activity.universities||0)*Number(p.university||0) +
      Number(activity.players||0)*Number(p.player||0)
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
    const percentages = rows.map(completionPercent);
    const complete = percentages.filter(value => value === 100).length;
    const missing = percentages.filter(value => value === 0).length;
    const partial = rows.length - complete - missing;
    const average = rows.length
      ? Math.round(percentages.reduce((sum, value) => sum + value, 0) / rows.length)
      : 0;

    setText('#evidenceTotal', fmt(rows.length));
    setText('#evidenceComplete', fmt(complete));
    setText('#evidencePartial', fmt(partial));
    setText('#evidenceMissing', fmt(missing));
    setText('#documentationCompletionPercent', `${average}%`);
    setText('#documentationCompletionText',
      `${complete} نشاط مكتمل من أصل ${rows.length}`);

    const bar = document.getElementById('documentationCompletionBar');
    if (bar) bar.style.width = `${average}%`;
  };

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
    const { row, report, schedule } = activityFromForm(existing || {});

    if (!row.activity || !row.date || !row.indicatorField || !row.subField) {
      showToast('أكمل اسم النشاط والتاريخ والمجال الرئيسي والمجال الفرعي.');
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
const K={sports:'sah-v22-sports',clubs:'sah-v22-clubs',clubEvents:'sah-v22-club-events',vol:'sah-v22-vol',apps:'sah-v22-apps'};
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
     return `<div class="club-chart-legend-item">
       <i style="background:${clubColor(index)}"></i>
       <span>${club.name}</span>
       <b>${count}</b>
       <small>${percent}%</small>
     </div>`;
   }).join('');
 }
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
 ...R(K.vol).map(x=>({...x,store:K.vol,kind:'فرصة تطوعية'}))
]}
function push(k,o){const a=R(k);a.push(o);W(k,a);renderAll();showToast?.('تم إرسال الطلب وحالته تحت المراجعة.')}
function evidence(){return window.getFilteredEvidence?window.getFilteredEvidence():(window.SAH_DATA?.evidenceRecords||[])}

function renderCategory(c){
 const rows=evidence().filter(r=>(r.eventCategory||'الأنشطة الرياضية')===c),m=rows.filter(r=>r.gender==='طلاب'),f=rows.filter(r=>r.gender==='طالبات');
 const sb=(i,v)=>{const e=document.getElementById(i);if(e)e.textContent=v};
 sb('categoryMaleCount',m.length);sb('categoryFemaleCount',f.length);sb('categoryTotalCount',rows.length);
 sb('categoryBeneficiaries',rows.reduce((s,r)=>s+(+r.beneficiaries||0),0));
 sb('categoryMaleBeneficiaries',m.reduce((s,r)=>s+(+r.beneficiaries||0),0));
 sb('categoryFemaleBeneficiaries',f.reduce((s,r)=>s+(+r.beneficiaries||0),0));
 const p=rows.length?Math.round(m.length/rows.length*100):0;sb('categoryGenderPercent',p+'%');sb('categoryCurrentName',c);
 document.getElementById('categoryGenderDonut')?.style.setProperty('--p',p);
 const b=document.getElementById('categoryActivityRows');if(b)b.innerHTML=rows.length?rows.map(r=>`<tr><td>${r.activity||'—'}</td><td>${r.date||'—'}</td><td>${r.days??'—'}</td><td>${r.beneficiaries??0}</td><td>${r.gender||'—'}</td><td>${/^https?:/.test(r.documentationUrl||'')?`<a href="${r.documentationUrl}" target="_blank">فتح</a>`:'غير متوفر'}</td></tr>`).join(''):'<tr><td colspan="6">لا توجد أنشطة.</td></tr>';
}
function tables(){
 const put=(i,a,f)=>{const b=document.getElementById(i);if(b)b.innerHTML=a.length?a.map(f).join(''):'<tr><td colspan="9">لا توجد بيانات.</td></tr>'};
 put('sportsRequestRows',R(K.sports),r=>`<tr><td>${r.name}</td><td>${r.date}</td><td>${r.game}</td><td>${r.capacity}</td><td>${badge(r.status)}</td><td>${r.reason||'—'}</td></tr>`);
 put('clubRequestRows',R(K.clubs),r=>`<tr><td>${r.name}</td><td>${r.supervisor}</td><td>${r.manager}</td><td>${r.members.length}</td><td>${r.gender}</td><td>${badge(r.status)}</td><td>${r.reason||'—'}</td></tr>`);
 put('clubEventRequestRows',R(K.clubEvents),r=>`<tr><td>${r.name}</td><td>${r.club}</td><td>${r.date}</td><td>${r.location}</td><td>${r.capacity}</td><td>${badge(r.status)}</td><td>${r.reason||'—'}</td></tr>`);
 put('volunteerRequestRows',R(K.vol),r=>`<tr><td>${r.name}</td><td>${r.date}</td><td>${r.capacity}</td><td>${r.owner}</td><td>${badge(r.status)}</td><td>${r.reason||'—'}</td></tr>`);
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
 const a=R(K.apps),q=allReq(),draw=(i,k)=>{const b=document.getElementById(i);if(!b)return;const rows=a.filter(x=>q.find(r=>r.id===x.requestId)?.kind===k);b.innerHTML=rows.length?rows.map(x=>`<tr><td>${x.eventName}</td><td>${x.student.name}</td><td>${x.student.studentId}</td><td>${x.student.email}</td><td>${x.student.age}</td><td>${x.student.gender}</td><td>${x.student.phone}</td><td><button class="approve-app" data-id="${x.id}">قبول</button> <button class="reject-app" data-id="${x.id}">رفض</button></td></tr>`).join(''):'<tr><td colspan="8">لا توجد طلبات.</td></tr>'};
 draw('sportsApplicantRows','بطولة/حدث رياضي');draw('clubApplicantRows','مبادرة/فعالية نادي');
 document.querySelectorAll('.approve-app,.reject-app').forEach(b=>b.onclick=()=>{const x=R(K.apps),r=x.find(y=>y.id===b.dataset.id);r.status=b.classList.contains('approve-app')?'مقبول':'مرفوض';W(K.apps,x);renderAll()})
}
function approvals(){
 const a=allReq(),b=document.getElementById('approvalRequestRows');
 if(b)b.innerHTML=a.length?a.map(r=>{
   const isPending=r.status==='تحت المراجعة';
   const decisionClass=r.status==='مقبول'?'decision-approved':'decision-rejected';
   const decisionIcon=r.status==='مقبول'?'✓':'×';
   const decisionText=r.status==='مقبول'?'تمت الموافقة':'تم الرفض';
   const actionHtml=isPending
     ? `<div class="approval-inline-decision">
          <div class="approval-inline-comment-wrap">
            <input class="approval-rejection-comment"
                   data-store="${r.store}"
                   data-id="${r.id}"
                   type="text"
                   placeholder="اكتب سبب الرفض قبل الضغط على رفض"
                   aria-label="سبب الرفض">
            <small class="approval-comment-hint">سبب الرفض إلزامي عند الرفض</small>
          </div>
          <div class="approval-action-buttons">
            <button class="approve-req approval-decision-btn approve"
                    data-store="${r.store}" data-id="${r.id}" type="button">
              <span class="approval-btn-icon">✓</span>
              <span>موافقة</span>
            </button>
            <button class="reject-req approval-decision-btn reject"
                    data-store="${r.store}" data-id="${r.id}" type="button">
              <span class="approval-btn-icon">×</span>
              <span>رفض</span>
            </button>
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

 document.querySelectorAll('.approve-req,.reject-req').forEach(x=>x.onclick=()=>{
   const rows=R(x.dataset.store);
   const request=rows.find(y=>y.id===x.dataset.id);
   if(!request||request.status!=='تحت المراجعة')return;

   const approved=x.classList.contains('approve-req');
   const row=x.closest('.approval-inline-decision');
   const commentInput=row?.querySelector('.approval-rejection-comment');
   const reason=(commentInput?.value||'').trim();

   if(!approved && !reason){
     commentInput?.classList.add('invalid');
     commentInput?.focus();
     window.showToast?.('اكتب سبب الرفض أولًا.');
     return;
   }

   commentInput?.classList.remove('invalid');
   request.status=approved?'مقبول':'مرفوض';
   request.reason=approved?'':reason;

   W(x.dataset.store,rows);
   renderAll();
 });
 const ac=a.filter(x=>x.status==='مقبول').length;
 const re=a.filter(x=>x.status==='مرفوض').length;
 const pe=a.length-ac-re;
 const p=a.length?Math.round(ac/a.length*100):0;
 const beneficiaryTotals=approvalBeneficiaryTotals(a);

 const approvedActivities=a.filter(item=>
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
   ['approvalTotal',a.length],
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
   ['approvalDecisionTotal',a.length],
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
   const approvedDeg=a.length?ac/a.length*360:0;
   const rejectedDeg=a.length?re/a.length*360:0;
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
function renderAll(){tables();student();applicants();approvals();populateClubEventSelect();renderRegisteredClubs();const b=document.querySelector('[data-event-category].active');if(b)renderCategory(b.dataset.eventCategory)}
function bind(id,fn){const o=document.getElementById(id);if(!o)return;const n=o.cloneNode(true);o.replaceWith(n);n.onclick=fn}
window.addEventListener('DOMContentLoaded',()=>{
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

 document.querySelectorAll('[data-event-category]').forEach((b,i)=>b.onclick=()=>{document.querySelectorAll('[data-event-category]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderCategory(b.dataset.eventCategory);if(i===0||true){}});
 const first=document.querySelector('[data-event-category]');if(first){first.classList.add('active');renderCategory(first.dataset.eventCategory)}
 bind('submitSportsRequest',()=>{const d=document.getElementById('sportsReqDate').value;if(!later3(d))return alert('يجب أن يكون الحدث بعد 3 أيام على الأقل.');push(K.sports,{id:id('sp'),name:document.getElementById('sportsReqName').value,date:d,game:document.getElementById('sportsReqGame').value,
        location:document.getElementById('sportsReqLocation')?.value.trim()||'غير محدد',
        participants:+document.getElementById('sportsReqParticipants').value,teams:+document.getElementById('sportsReqTeams').value,universities:+document.getElementById('sportsReqUniversities').value,capacity:+document.getElementById('sportsReqCapacity').value,gender:document.getElementById('sportsReqGender').value,status:'تحت المراجعة',submittedAt:td(),submittedBy:'مدير النادي الرياضي'})});
 bind('submitClubRequest',()=>{const m=document.getElementById('clubMembers').value.split(/\n|,/).map(x=>x.trim()).filter(Boolean);if(m.length<10)return alert('يلزم 10 أعضاء على الأقل.');if(!document.getElementById('clubLogo').files[0])return alert('ارفع شعار النادي.');push(K.clubs,{id:id('cl'),name:document.getElementById('clubName').value,supervisor:document.getElementById('clubSupervisor').value,manager:document.getElementById('clubManager').value,members:m,goal:document.getElementById('clubGoal').value,gender:document.getElementById('clubGender').value,status:'تحت المراجعة',submittedAt:td(),submittedBy:'حساب طالب'})});
 bind('submitClubEventRequest',()=>{
 const selectedClub=document.getElementById('clubEventClub').value;
 if(!selectedClub)return alert('اختر ناديًا مسجلًا من القائمة.');
 if(!registeredClubs().includes(selectedClub))return alert('النادي المحدد غير مفعل.');

 const d=document.getElementById('clubEventDate').value;
 if(!later3(d))return alert('يجب أن يكون الحدث بعد 3 أيام على الأقل.');

 push(K.clubEvents,{
   id:id('ce'),
   club:selectedClub,
   name:document.getElementById('clubEventName').value,
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
 bind('submitVolunteerOpportunity',()=>push(K.vol,{id:id('vo'),type:document.getElementById('volunteerType').value,capacity:+document.getElementById('volunteerCapacity').value,name:document.getElementById('volunteerEventName').value,date:document.getElementById('volunteerEventDate').value,sponsor:document.getElementById('volunteerSponsor').value,owner:document.getElementById('volunteerOwner').value,location:document.getElementById('volunteerLocation').value,gender:'الاثنان معًا',status:'تحت المراجعة',submittedAt:td(),submittedBy:'مدير الأنشطة الطلابية'}));
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
    'home','sports','sports-request','indicator','scholarships',
    'championships','athletes','reports','calendar','agreement',
    'student','activities','volunteer','clubs','approvals','admin','audit'
  ]);

  const ROLE_PAGES={
    system:new Set(ALL),
    indicator:new Set(ALL),
    dean:new Set(ALL),
    sports_manager:new Set([
      'home','sports','sports-request','scholarships','championships',
      'athletes','reports','calendar'
    ]),
    coach:new Set(['home','sports-request','championships','athletes','reports']),
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
