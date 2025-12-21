import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyAR() {
  return (
    <section dir="rtl" className="py-10">
      <Card className="w-full mx-auto border-none shadow-none ">
        <CardContent className="space-y-6 p-6 text-right">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">سياسة الخصوصية</h1>
            <p className="text-sm text-muted-foreground">
              آخر تحديث: 10 أكتوبر 2024
            </p>
          </header>

          <p>
            مرحبًا بكم في منصة <strong>عقاركم</strong>، وجهتكم الموثوقة للبحث عن
            العقارات وبيعها وشرائها وتأجيرها. نحن نولي أهمية كبيرة لخصوصيتكم
            وحماية بياناتكم الشخصية. تهدف هذه الوثيقة إلى شرح كيفية جمع
            معلوماتكم، استخدامها، تخزينها، ومشاركتها. باستخدامكم لموقعنا أو أي
            من خدماتنا، فإنكم توافقون على سياسة الخصوصية هذه.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              1. المعلومات التي نقوم بجمعها
            </h2>

            <h3 className="font-semibold">أ. المعلومات الشخصية</h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>الاسم الكامل</li>
              <li>البريد الإلكتروني</li>
              <li>رقم الهاتف</li>
              <li>العنوان (عند الحاجة لخدمات الموقع الجغرافي)</li>
              <li>اسم المستخدم وكلمة المرور</li>
            </ul>

            <h3 className="font-semibold mt-4">ب. المعلومات التقنية</h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>عنوان IP</li>
              <li>نوع الجهاز والمتصفح</li>
              <li>الصفحات التي قمتم بزيارتها ومدة التصفح</li>
            </ul>

            <h3 className="font-semibold mt-4">ج. معلومات العقارات</h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>الموقع الجغرافي للعقار</li>
              <li>تفاصيل العقار (النوع، المساحة، السعر، الصور...)</li>
              <li>وصف العقار وأي معلومات إضافية</li>
            </ul>

            <h3 className="font-semibold mt-4">
              د. معلومات الدفع (عند تفعيل خدمات مدفوعة)
            </h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>رقم البطاقة أو بيانات الحساب البنكي</li>
              <li>يتم تخزين هذه البيانات باستخدام تقنيات تشفير عالية الأمان</li>
            </ul>

            <h3 className="font-semibold mt-4">هـ. المعلومات الطوعية</h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>الرسائل، الطلبات، أو الاستفسارات</li>
              <li>التعليقات على الإعلانات العقارية</li>
              <li>التسجيل في النشرة البريدية أو العروض الترويجية</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. كيف نستخدم المعلومات؟
            </h2>

            <h3 className="font-semibold">أ. تخصيص تجربة المستخدم</h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>عرض العقارات المتوافقة مع تفضيلاتكم</li>
              <li>حفظ عمليات البحث والاهتمامات السابقة</li>
            </ul>

            <h3 className="font-semibold mt-4">ب. إدارة الحساب</h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>تمكينكم من إدارة عروضكم العقارية</li>
              <li>متابعة النشاطات مثل الرسائل أو الطلبات</li>
            </ul>

            <h3 className="font-semibold mt-4">ج. التواصل معكم</h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>الرد على استفساراتكم أو طلباتكم</li>
              <li>إرسال إشعارات بالعقارات الجديدة أو تحديثات السوق</li>
              <li>إعلامكم بالعروض الخاصة والمحتوى الجديد</li>
            </ul>

            <h3 className="font-semibold mt-4">د. التحليل والتطوير</h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>تحسين أداء الموقع بناءً على سلوك المستخدمين</li>
              <li>تطوير خصائص جديدة تلائم احتياجات السوق</li>
            </ul>

            <h3 className="font-semibold mt-4">هـ. الأمان والحماية</h3>
            <ul className="list-disc pr-6 space-y-1">
              <li>الكشف عن الأنشطة المشبوهة</li>
              <li>حماية الحسابات من محاولات التسلل غير المصرّح به</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. مشاركة المعلومات</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>
                مع مزودي الخدمات مثل بوابات الدفع، شركات الاستضافة، أو أدوات
                التحليل
              </li>
              <li>مع الجهات القانونية عند الطلب أو بموجب القانون</li>
              <li>
                مع الشركاء العقاريين بشكل عام وغير شخصي (مثل الإحصائيات)
              </li>
              <li>
                لن نشارك معلوماتكم الشخصية مع أي طرف ثالث بدون إذن صريح منكم
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              4. حماية وتخزين البيانات
            </h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>تشفير كامل للبيانات الحساسة أثناء النقل والتخزين</li>
              <li>أنظمة أمان فعالة مثل جدران الحماية</li>
              <li>مراجعات أمنية دورية للبنية التحتية</li>
              <li>صلاحيات محددة للموظفين في الوصول إلى البيانات</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. حقوق المستخدم</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>طلب الوصول إلى نسخة من بياناتكم</li>
              <li>تعديل المعلومات الشخصية من خلال الحساب</li>
              <li>طلب حذف الحساب وجميع البيانات المرتبطة به</li>
              <li>التراجع عن أي موافقة سابقة</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. ملفات تعريف الارتباط (Cookies)
            </h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>تحليل سلوك التصفح وتحسين الخدمات</li>
              <li>تسهيل تسجيل الدخول وتذكر الإعدادات المفضلة</li>
              <li>التحكم في الكوكيز من إعدادات المتصفح</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">التزامنا</h2>
            <p>
              في <strong>عقاركم</strong>، نؤمن أن خصوصيتكم جزء أساسي من تجربتكم
              العقارية. نلتزم باستخدام معلوماتكم فقط من أجل خدمتك، وتقديم تجربة
              آمنة وموثوقة وفعالة في عالم العقارات.
            </p>
          </section>
        </CardContent>
      </Card>
    </section>
  )
}
