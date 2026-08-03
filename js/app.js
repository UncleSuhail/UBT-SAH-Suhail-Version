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
 $('#importEvidence')?.addEventListener('change',()=>showToast('تم استلام ملف الشواهد للمراجعة. الربط الدائم بقاعدة البيانات يتم في النسخة الفعلية.'));
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
   SAH V10 — Sidebar and editable indicator maximum limits
   ========================================================== */
(function(){
  const LIMITS_KEY = 'sah-indicator-max-limits-v1';
  const ROLE_KEY = 'sah-active-role-v1';
  let originalIndicatorLimits = [];

  function initSidebarV10(){
    const sidebar = document.querySelector('.sidebar');
    const layout = document.querySelector('.layout');
    const toggle = document.getElementById('toggleSidebar');

    document.querySelectorAll('.nav-group-title').forEach(title=>{
      title.addEventListener('click',()=>{
        const group = title.closest('.nav-group');
        if(!group) return;

        const willOpen = !group.classList.contains('open');
        document.querySelectorAll('.nav-group').forEach(other=>{
          if(other !== group){
            other.classList.remove('open');
            other.querySelector('.nav-group-title')?.setAttribute('aria-expanded','false');
          }
        });

        group.classList.toggle('open', willOpen);
        title.setAttribute('aria-expanded', String(willOpen));
      });
    });

    if(toggle && sidebar && layout){
      const applyCollapsed = collapsed=>{
        sidebar.classList.toggle('collapsed',collapsed);
        layout.classList.toggle('sidebar-mini',collapsed);
        toggle.setAttribute('aria-expanded',String(!collapsed));
        toggle.title = collapsed ? 'توسيع القائمة' : 'تصغير القائمة';
        localStorage.setItem('sah-sidebar-collapsed',collapsed?'1':'0');
      };

      applyCollapsed(
        localStorage.getItem('sah-sidebar-collapsed') === '1' &&
        window.matchMedia('(min-width:1101px)').matches
      );

      toggle.addEventListener('click',()=>{
        if(window.matchMedia('(max-width:1100px)').matches){
          sidebar.classList.toggle('open');
          return;
        }
        applyCollapsed(!sidebar.classList.contains('collapsed'));
      });
    }

    document.querySelectorAll('.nav-items button[data-page]').forEach(button=>{
      button.addEventListener('click',()=>{
        const group = button.closest('.nav-group');
        if(!group) return;
        document.querySelectorAll('.nav-group').forEach(other=>{
          other.classList.toggle('open',other===group);
          other.querySelector('.nav-group-title')
            ?.setAttribute('aria-expanded',String(other===group));
        });
      });
    });
  }

  function currentIndicatorRole(){
    return localStorage.getItem(ROLE_KEY) ||
      document.getElementById('activeRole')?.value ||
      'system';
  }

  function canEditIndicatorLimits(){
    return ['system','indicator'].includes(currentIndicatorRole());
  }

  function refreshIndicatorPermissionButton(){
    const button = document.getElementById('indicatorPermissionSettings');
    if(!button) return;
    button.classList.toggle('hidden',!canEditIndicatorLimits());
  }

  function captureOriginalLimits(){
    if(!window.SAH_DATA || !Array.isArray(SAH_DATA.indicatorFields)) return;
    if(!originalIndicatorLimits.length){
      originalIndicatorLimits = SAH_DATA.indicatorFields.map(field=>Number(field.max)||0);
    }
  }

  function applyStoredIndicatorLimits(){
    captureOriginalLimits();
    if(!window.SAH_DATA || !Array.isArray(SAH_DATA.indicatorFields)) return;

    try{
      const stored = JSON.parse(localStorage.getItem(LIMITS_KEY) || 'null');
      if(Array.isArray(stored) && stored.length === SAH_DATA.indicatorFields.length){
        SAH_DATA.indicatorFields.forEach((field,index)=>{
          const value = Number(stored[index]);
          if(Number.isFinite(value) && value >= 0) field.max = value;
        });
      }
    }catch(error){
      console.warn('تعذر قراءة إعدادات الحدود العليا:',error);
    }
  }

  function renderIndicatorLimitFields(){
    const form = document.getElementById('indicatorSettingsForm');
    if(!form || !window.SAH_DATA) return;
    form.innerHTML = '';

    (SAH_DATA.indicatorFields || []).forEach((field,index)=>{
      const row = document.createElement('div');
      row.className = 'indicator-limit-row';
      row.innerHTML = `
        <div class="limit-track">${field.track || '—'}</div>
        <div class="limit-field">${field.field || '—'}</div>
        <label>
          <span class="hidden">الحد الأعلى</span>
          <input class="indicator-limit-input" type="number" min="0" step="1"
                 inputmode="numeric" data-index="${index}"
                 value="${Number(field.max)||0}"
                 aria-label="الحد الأعلى لـ ${field.field || 'المجال'}">
        </label>`;
      form.appendChild(row);
    });
  }

  function openIndicatorSettings(){
    if(!canEditIndicatorLimits()){
      if(typeof showToast === 'function') showToast('لا تملك صلاحية تعديل الحدود العليا.');
      return;
    }
    renderIndicatorLimitFields();
    document.getElementById('indicatorSettingsModal')?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeIndicatorSettings(){
    document.getElementById('indicatorSettingsModal')?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  function saveIndicatorLimits(){
    if(!canEditIndicatorLimits()) return;
    const inputs = [...document.querySelectorAll('.indicator-limit-input')];
    const values = inputs.map(input=>Number(input.value));

    if(values.some(value=>!Number.isFinite(value) || value < 0)){
      if(typeof showToast === 'function') showToast('أدخل أرقامًا صحيحة غير سالبة.');
      return;
    }

    values.forEach((value,index)=>{
      if(SAH_DATA.indicatorFields[index]) SAH_DATA.indicatorFields[index].max = value;
    });

    localStorage.setItem(LIMITS_KEY,JSON.stringify(values));
    if(typeof calcIndicators === 'function') calcIndicators();
    closeIndicatorSettings();
    if(typeof showToast === 'function') showToast('تم حفظ الحدود العليا وتحديث المؤشر.');
  }

  function resetIndicatorLimits(){
    captureOriginalLimits();
    if(!originalIndicatorLimits.length) return;

    originalIndicatorLimits.forEach((value,index)=>{
      if(SAH_DATA.indicatorFields[index]) SAH_DATA.indicatorFields[index].max = value;
    });

    localStorage.removeItem(LIMITS_KEY);
    renderIndicatorLimitFields();
    if(typeof calcIndicators === 'function') calcIndicators();
    if(typeof showToast === 'function') showToast('تمت استعادة الحدود العليا الأصلية.');
  }

  function initIndicatorLimitSettings(){
    applyStoredIndicatorLimits();
    if(typeof calcIndicators === 'function') calcIndicators();
    refreshIndicatorPermissionButton();

    document.getElementById('indicatorPermissionSettings')
      ?.addEventListener('click',openIndicatorSettings);

    document.querySelectorAll('[data-close-indicator-settings]').forEach(element=>{
      element.addEventListener('click',closeIndicatorSettings);
    });

    document.getElementById('indicatorSaveLimits')
      ?.addEventListener('click',saveIndicatorLimits);

    document.getElementById('indicatorResetLimits')
      ?.addEventListener('click',resetIndicatorLimits);

    document.getElementById('activeRole')?.addEventListener('change',()=>{
      setTimeout(refreshIndicatorPermissionButton,0);
      if(!canEditIndicatorLimits()) closeIndicatorSettings();
    });

    document.addEventListener('keydown',event=>{
      if(event.key === 'Escape') closeIndicatorSettings();
    });
  }

  window.addEventListener('DOMContentLoaded',()=>{
    initSidebarV10();
    initIndicatorLimitSettings();
  });
})();

/* ==========================================================
   SAH V11 — role permissions, activities, and linked scoring
   ========================================================== */
(function(){
  const ROLE_KEY = 'sah-active-role-v2';
  const ACTIVITIES_KEY = 'sah-added-sports-activities-v1';
  const FIELD_CALCULATOR_KEY = 'sah-field-points-calculator-v1';
  const SESSION_FILES = new Map();

  const ROLE_META = {
    system: {name:'حسام الحسين', role:'مسؤول النظام — صلاحية كاملة', avatar:'ح'},
    indicator: {name:'مسؤول مؤشر الأداء الرياضي', role:'صلاحية كاملة على المنصة وحاسبات النقاط', avatar:'م'},
    sports_manager: {name:'مدير النشاط الرياضي', role:'صلاحيات القسم الرياضي المحددة', avatar:'ن'},
    dean: {name:'العميد', role:'صلاحية مشاهدة وإدارة كاملة دون حاسبات النقاط', avatar:'ع'}
  };

  const SPORTS_MANAGER_PAGES = new Set([
    'sports','scholarships','championships','athletes','reports','calendar'
  ]);

  function roleValue(){
    return document.getElementById('activeRole')?.value || 'system';
  }

  function applyRolePermissions(){
    const role = roleValue();
    localStorage.setItem(ROLE_KEY, role);

    const meta = ROLE_META[role] || ROLE_META.system;
    setText('#activeUserName', meta.name);
    setText('#activeUserRole', meta.role);
    setText('#activeUserAvatar', meta.avatar);

    document.querySelectorAll('.nav button[data-page]').forEach(button=>{
      const allowed = role !== 'sports_manager' || SPORTS_MANAGER_PAGES.has(button.dataset.page);
      button.classList.toggle('role-hidden', !allowed);
    });

    document.querySelectorAll('.nav-group').forEach(group=>{
      const visibleButtons = [...group.querySelectorAll('.nav-items button[data-page]')]
        .some(button=>!button.classList.contains('role-hidden'));
      group.classList.toggle('empty-role-group', !visibleButtons);
    });

    const indicatorOnly = role === 'indicator';
    document.getElementById('indicatorPermissionSettings')
      ?.classList.toggle('hidden', !indicatorOnly);
    document.getElementById('openFieldPointsCalculator')
      ?.classList.toggle('hidden', !indicatorOnly);

    const activePage = document.querySelector('.page.active')?.id?.replace('page-','');
    if(role === 'sports_manager' && !SPORTS_MANAGER_PAGES.has(activePage)){
      route('sports');
    }
  }

  const originalRouteV11 = route;
  route = function(id){
    if(roleValue()==='sports_manager' && !SPORTS_MANAGER_PAGES.has(id)){
      showToast('هذه الصفحة غير متاحة لمدير النشاط الرياضي.');
      id='sports';
    }
    originalRouteV11(id);
  };

  function defaultFieldCalculator(){
    const fields = (SAH_DATA.indicatorFields || []);
    return {
      guestParticipation: 0,
      hostParticipation: 0,
      university: 0,
      player: 0,
      fields: Object.fromEntries(fields.map(field=>[
        field.field,
        {guest:0, host:0}
      ]))
    };
  }

  function loadFieldCalculator(){
    const defaults = defaultFieldCalculator();
    try{
      const saved = JSON.parse(localStorage.getItem(FIELD_CALCULATOR_KEY) || 'null');
      if(!saved) return defaults;
      return {
        ...defaults,
        ...saved,
        fields:{...defaults.fields,...(saved.fields||{})}
      };
    }catch{
      return defaults;
    }
  }

  function activityPoints(activity){
    const calculator = loadFieldCalculator();
    const fieldPoints = calculator.fields?.[activity.indicatorField] || {guest:0,host:0};
    const participationPoints = activity.participationType === 'host'
      ? Number(calculator.hostParticipation||0)
      : Number(calculator.guestParticipation||0);
    const specificFieldPoints = activity.participationType === 'host'
      ? Number(fieldPoints.host||0)
      : Number(fieldPoints.guest||0);

    return Math.max(0, Math.round(
      participationPoints +
      (Number(activity.universities)||0) * Number(calculator.university||0) +
      (Number(activity.players)||0) * Number(calculator.player||0) +
      specificFieldPoints
    ));
  }

  function storedActivities(){
    try{
      const rows = JSON.parse(localStorage.getItem(ACTIVITIES_KEY) || '[]');
      return Array.isArray(rows) ? rows : [];
    }catch{
      return [];
    }
  }

  function applyStoredActivities(){
    if(window.__sahStoredActivitiesApplied) return;
    window.__sahStoredActivitiesApplied = true;

    const activities = storedActivities();
    SAH_DATA.evidenceRecords = SAH_DATA.evidenceRecords || [];

    activities.forEach(activity=>{
      if(!SAH_DATA.evidenceRecords.some(row=>row.localActivityId===activity.localActivityId)){
        SAH_DATA.evidenceRecords.push(activity);
      }
      const field = (SAH_DATA.indicatorFields||[]).find(item=>item.field===activity.indicatorField);
      if(field){
        if(activity.gender==='طالبات') field.female = Number(field.female||0) + Number(activity.points||0);
        else field.male = Number(field.male||0) + Number(activity.points||0);
      }
    });
  }

  function populateActivityFields(){
    const select = document.getElementById('activityIndicatorField');
    if(!select) return;
    select.innerHTML = (SAH_DATA.indicatorFields||[])
      .map(field=>`<option value="${field.field}">${field.track} — ${field.field}</option>`)
      .join('');
  }

  function updateActivityPreview(){
    const activity = {
      indicatorField: document.getElementById('activityIndicatorField')?.value,
      participationType: document.getElementById('activityParticipationType')?.value,
      universities: Number(document.getElementById('activityUniversities')?.value||0),
      players: Number(document.getElementById('activityPlayers')?.value||0)
    };
    setText('#activityCalculatedPoints', fmt(activityPoints(activity)));
  }

  function openAddActivity(){
    populateActivityFields();
    document.getElementById('addActivityModal')?.classList.remove('hidden');
    document.body.style.overflow='hidden';
    updateActivityPreview();
  }

  function closeAddActivity(){
    document.getElementById('addActivityModal')?.classList.add('hidden');
    document.body.style.overflow='';
  }

  function fileStatus(reportName, scheduleName){
    if(reportName && scheduleName) return 'مكتمل';
    if(reportName || scheduleName) return 'جزئي';
    return 'ناقص';
  }

  function saveActivity(){
    const name = document.getElementById('activityName')?.value.trim();
    const date = document.getElementById('activityDate')?.value;
    const fieldName = document.getElementById('activityIndicatorField')?.value;
    if(!name || !date || !fieldName){
      showToast('أكمل اسم النشاط والتاريخ والمجال المرتبط.');
      return;
    }

    const reportFile = document.getElementById('activityFederationReport')?.files?.[0];
    const scheduleFile = document.getElementById('activityScheduleFile')?.files?.[0];
    const localActivityId = `local-${Date.now()}`;

    if(reportFile) SESSION_FILES.set(`${localActivityId}:report`, URL.createObjectURL(reportFile));
    if(scheduleFile) SESSION_FILES.set(`${localActivityId}:schedule`, URL.createObjectURL(scheduleFile));

    const activity = {
      localActivityId,
      id: (SAH_DATA.evidenceRecords?.length||0)+1,
      activity:name,
      date,
      days:Number(document.getElementById('activityDays')?.value||1),
      beneficiaries:Number(document.getElementById('activityBeneficiaries')?.value||0),
      players:Number(document.getElementById('activityPlayers')?.value||0),
      gender:document.getElementById('activityGender')?.value||'طلاب',
      indicatorField:fieldName,
      field:fieldName,
      participationType:document.getElementById('activityParticipationType')?.value||'guest',
      universities:Number(document.getElementById('activityUniversities')?.value||0),
      gameType:document.getElementById('activityGameType')?.value||'—',
      activityType:'رياضي',
      subCategory:fieldName,
      federationReportName:reportFile?.name||'',
      scheduleFileName:scheduleFile?.name||'',
      status:fileStatus(reportFile?.name,scheduleFile?.name)
    };
    activity.points = activityPoints(activity);

    const activities = storedActivities();
    activities.push(activity);
    localStorage.setItem(ACTIVITIES_KEY,JSON.stringify(activities));

    SAH_DATA.evidenceRecords = SAH_DATA.evidenceRecords || [];
    SAH_DATA.evidenceRecords.push(activity);
    const field = (SAH_DATA.indicatorFields||[]).find(item=>item.field===fieldName);
    if(field){
      if(activity.gender==='طالبات') field.female = Number(field.female||0)+activity.points;
      else field.male = Number(field.male||0)+activity.points;
    }

    calcIndicators();
    renderEvidenceStats();
    renderEvidence();
    closeAddActivity();
    document.getElementById('addActivityForm')?.reset();
    showToast('تمت إضافة النشاط واحتساب نقاطه في مؤشر الأداء الرياضي.');
  }

  function fileCell(row,type){
    const isReport = type==='report';
    const name = isReport
      ? (row.federationReportName || row.newsDocumentation || '')
      : (row.scheduleFileName || row.publishLink || '');
    const sessionUrl = row.localActivityId
      ? SESSION_FILES.get(`${row.localActivityId}:${type}`)
      : '';

    if(sessionUrl) return `<a class="file-link" href="${sessionUrl}" target="_blank" download="${name}">${name}</a>`;
    if(/^https?:\/\//i.test(String(name))) return `<a class="file-link" href="${name}" target="_blank" rel="noopener">فتح الملف</a>`;
    if(name && name!=='-' && name!=='—') return `<span class="file-name">${name}</span>`;
    return `<span class="file-name missing">غير مرفوع</span>`;
  }

  renderEvidence = function(){
    const tbody=$('#evidenceRows'); if(!tbody) return;
    const rows=getFilteredEvidence(); tbody.innerHTML='';
    rows.forEach((r,i)=>{
      const participation = r.participationType==='host'?'مستضيف':r.participationType==='guest'?'ضيف':'—';
      const tr=document.createElement('tr');
      tr.innerHTML=`
        <td>${r.id||i+1}</td>
        <td><b>${r.activity||'—'}</b></td>
        <td class="ltr-cell">${r.date||'—'}</td>
        <td>${r.days||'—'}</td>
        <td>${fmt(r.beneficiaries||0)}</td>
        <td>${fmt(r.players||0)}</td>
        <td>${r.gender||'—'}</td>
        <td>${r.indicatorField||r.field||r.subCategory||'—'}</td>
        <td>${participation}</td>
        <td>${fmt(r.universities||0)}</td>
        <td>${fmt(r.points||0)}</td>
        <td><span class="pill evidence-status ${evidenceStatusClass(r.status)}">${r.status||'ناقص'}</span></td>
        <td>${fileCell(r,'report')}</td>
        <td>${fileCell(r,'schedule')}</td>`;
      tbody.appendChild(tr);
    });
    relocalizeSoon();
  };

  function renderFieldCalculator(){
    const calculator = loadFieldCalculator();
    const setValue=(id,value)=>{const el=document.getElementById(id);if(el)el.value=Number(value||0)};
    setValue('guestParticipationPoints',calculator.guestParticipation);
    setValue('hostParticipationPoints',calculator.hostParticipation);
    setValue('universityParticipationPoints',calculator.university);
    setValue('playerParticipationPoints',calculator.player);

    const tbody=document.getElementById('fieldPointsRows');
    if(!tbody) return;
    tbody.innerHTML=(SAH_DATA.indicatorFields||[]).map((field,index)=>{
      const values=calculator.fields?.[field.field]||{guest:0,host:0};
      return `<tr>
        <td>${field.track}</td>
        <td>${field.field}</td>
        <td><input class="field-guest-points" data-index="${index}" value="${Number(values.guest||0)}" type="number" min="0"></td>
        <td><input class="field-host-points" data-index="${index}" value="${Number(values.host||0)}" type="number" min="0"></td>
      </tr>`;
    }).join('');
  }

  function openFieldCalculator(){
    if(roleValue()!=='indicator') return;
    renderFieldCalculator();
    document.getElementById('fieldPointsCalculatorModal')?.classList.remove('hidden');
    document.body.style.overflow='hidden';
  }

  function closeFieldCalculator(){
    document.getElementById('fieldPointsCalculatorModal')?.classList.add('hidden');
    document.body.style.overflow='';
  }

  function saveFieldCalculator(){
    if(roleValue()!=='indicator') return;
    const calculator={
      guestParticipation:Number(document.getElementById('guestParticipationPoints')?.value||0),
      hostParticipation:Number(document.getElementById('hostParticipationPoints')?.value||0),
      university:Number(document.getElementById('universityParticipationPoints')?.value||0),
      player:Number(document.getElementById('playerParticipationPoints')?.value||0),
      fields:{}
    };
    (SAH_DATA.indicatorFields||[]).forEach((field,index)=>{
      calculator.fields[field.field]={
        guest:Number(document.querySelector(`.field-guest-points[data-index="${index}"]`)?.value||0),
        host:Number(document.querySelector(`.field-host-points[data-index="${index}"]`)?.value||0)
      };
    });
    localStorage.setItem(FIELD_CALCULATOR_KEY,JSON.stringify(calculator));
    closeFieldCalculator();
    updateActivityPreview();
    showToast('تم حفظ حاسبة النقاط للمجالات.');
  }

  function resetFieldCalculator(){
    localStorage.removeItem(FIELD_CALCULATOR_KEY);
    renderFieldCalculator();
    showToast('تمت استعادة إعدادات الحاسبة الافتراضية.');
  }

  function initV11(){
    applyStoredActivities();
    calcIndicators();
    renderEvidenceStats();
    renderEvidence();

    const roleSelect=document.getElementById('activeRole');
    const savedRole=localStorage.getItem(ROLE_KEY);
    if(savedRole && roleSelect?.querySelector(`option[value="${savedRole}"]`)) roleSelect.value=savedRole;
    applyRolePermissions();
    roleSelect?.addEventListener('change',applyRolePermissions);

    document.getElementById('openAddActivity')?.addEventListener('click',openAddActivity);
    document.querySelectorAll('[data-close-add-activity]').forEach(el=>el.addEventListener('click',closeAddActivity));
    document.getElementById('saveNewActivity')?.addEventListener('click',saveActivity);
    ['activityIndicatorField','activityParticipationType','activityUniversities','activityPlayers']
      .forEach(id=>document.getElementById(id)?.addEventListener('input',updateActivityPreview));

    document.getElementById('openFieldPointsCalculator')?.addEventListener('click',openFieldCalculator);
    document.querySelectorAll('[data-close-field-calculator]').forEach(el=>el.addEventListener('click',closeFieldCalculator));
    document.getElementById('saveFieldPointsCalculator')?.addEventListener('click',saveFieldCalculator);
    document.getElementById('resetFieldPointsCalculator')?.addEventListener('click',resetFieldCalculator);
  }

  window.addEventListener('DOMContentLoaded',initV11);
})();

