# Student Activities Hub (SAH)

منصة الأنشطة الطلابية - جامعة الأعمال والتكنولوجيا.

## التشغيل
افتح `index.html` مباشرة أو استخدم Live Server في VS Code.

## الرفع على GitHub Pages
ارفع محتويات هذا المجلد مباشرة في جذر المستودع:
- `index.html`
- `css/`
- `js/`
- `assets/`
- `.vscode/`
- `README.md`

## البيانات المعتمدة في النسخة
- بيانات المنح الرياضية للطلاب والطالبات من ملفات Excel المرفوعة للفصل الدراسي Spring 2026.
- دليل مؤشر الأداء الرياضي الصادر من الاتحاد السعودي للرياضة الجامعية.
- روزنامة المسابقات الرياضية المرجعية.
- ضوابط وآلية احتساب الساعات التطوعية.

Designed & Developed by ENG. HOSSAM ALHUSSAIN.


## تحديث البيانات

تم ربط واجهة النظام بقوائم المنح المحدثة:
- الطلاب: 224 سجل.
- الطالبات: 79 سجل.
- إجمالي السجلات: 303 سجل.
- ملفات الطلاب/الطالبات: 296 ملف طالب/طالبة بعد دمج المشاركات المتكررة.
- البطولات الرياضية من روزنامة الاتحاد: 29 حدث رياضي.
- مجالات الأنشطة الطلابية: 8 مجالات.


## V5 Update
- تم اعتماد بطاقة هوية SAH في القائمة الجانبية بدل تكرار الشعارات.
- إضافة الوضع النهاري والليلي.
- إضافة زر تبديل عربي/إنجليزي مع حفظ اختيار المستخدم.


## V8 Developer Handoff
- Added the updated bilingual sports scholarship criteria PDF to the e-agreement page.
- Added a complete Evidence Center under Reports & Analytics.
- Imported all activity documentation rows from the provided Excel template into `SAH_DATA.evidenceRecords`.
- Added evidence search, gender/status filters, detail preview, CSV export, printable PDF report, Excel template download, and import placeholder.
- Source files: `assets/docs/scholarship-criteria.pdf` and `assets/data/activity-evidence-template.xlsx`.

> Note: The current version is a front-end prototype. Persistent imports, approvals, file uploads, and database writes require a backend/database in the production implementation.

## V9 — التعديل اليدوي والصلاحيات
أضيفت صفحة **إدارة البيانات** لتجربة الإضافة والتعديل والحذف من داخل الواجهة دون فتح الكود. المستخدمون الرئيسيون الثلاثة في النسخة الحالية لديهم صلاحية كاملة:
1. حسام الحسين — مسؤول النظام.
2. مسؤول مؤشر الأداء الرياضي.
3. العميد.

### طريقة حفظ التعديلات في النسخة الحالية
- تحفظ التعديلات محليًا داخل نفس المتصفح عبر `Local Storage`.
- يمكن تصدير نسخة احتياطية بصيغة JSON واستيرادها لاحقًا.
- هذه الآلية مناسبة للعرض والمراجعات، وليست بديلًا عن قاعدة البيانات.

### متطلب التنفيذ الرسمي للمطور
يجب استبدال طبقة Local Storage بـ Backend وقاعدة بيانات، وربط كل عملية بصلاحيات المستخدم وتسجيل الدخول عبر Microsoft Entra ID. جميع عمليات CRUD والاعتمادات يجب أن تمر عبر API آمن وتُسجل في Audit Log مركزي.
