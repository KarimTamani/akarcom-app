import { Card, CardContent } from "@/components/ui/card"

export default function TermsConditionsAR() {
  return (
    <section dir="rtl" className="py-10">
      <Card className=" mx-auto border-none shadow-none">
        <CardContent className="space-y-6 p-6 text-right">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold">شروط الاستخدام</h1>
            <p className="text-sm text-muted-foreground">
              الشروط العامة لاستخدام موقع "عقاركم"
            </p>
            <p className="text-sm text-muted-foreground">
              آخر تحديث: 10 أكتوبر 2024
            </p>
          </header>

          <p>
            مرحبًا بكم في موقع <strong>عقاركم</strong>. باستخدامكم لموقعنا أو أي
            من خدماته، فإنكم توافقون على الالتزام بالشروط والأحكام الموضحة أدناه.
            نرجو قراءتها بعناية قبل استخدام الموقع.
          </p>

          <section>
            <h2 className="text-xl font-semibold mb-2">1. تعريفات</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>
                <strong>الموقع:</strong> يشير إلى منصة "عقاركم" الإلكترونية.
              </li>
              <li>
                <strong>المستخدم:</strong> أي شخص يستخدم الموقع سواء للتصفح،
                البحث، أو نشر إعلان.
              </li>
              <li>
                <strong>المحتوى:</strong> يشمل كافة الإعلانات، الصور، النصوص،
                والعروض المنشورة على الموقع.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              2. شروط استخدام الخدمة
            </h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>يجب أن يكون المستخدم بعمر 18 عامًا أو أكثر</li>
              <li>
                يلتزم المستخدم باستخدام الموقع لأغراض قانونية ومشروعة فقط
              </li>
              <li>يمنع نشر أي محتوى زائف، مضلل، أو مسيء</li>
              <li>
                يحق لـ "عقاركم" حذف أو تعديل أي محتوى مخالف
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">3. إنشاء الحساب</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>تقديم بيانات دقيقة وصحيحة عند إنشاء الحساب</li>
              <li>المحافظة على سرية بيانات تسجيل الدخول</li>
              <li>
                يحق لـ "عقاركم" تعليق أو إلغاء الحساب عند إساءة الاستخدام
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">4. نشر الإعلانات</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>المستخدم مسؤول عن صحة المعلومات المنشورة</li>
              <li>يجب أن تكون العقارات المعروضة حقيقية ومتاحة</li>
              <li>
                يمنع نشر أي محتوى ينتهك حقوق الملكية أو الخصوصية
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">5. المسؤولية</h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>
                لا تضمن منصة "عقاركم" دقة أو موثوقية جميع الإعلانات
              </li>
              <li>
                لا تتحمل المنصة مسؤولية الخلافات بين المستخدمين
              </li>
              <li>
                يتحمل كل طرف مسؤولية التفاوض والاتفاق بشكل مباشر
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              6. التعديلات على الشروط
            </h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>يحق لـ "عقاركم" تعديل الشروط في أي وقت</li>
              <li>تسري التعديلات فور نشرها</li>
              <li>
                استمرار الاستخدام يعني الموافقة على الشروط المعدلة
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              7. حقوق الملكية الفكرية
            </h2>
            <ul className="list-disc pr-6 space-y-1">
              <li>
                جميع عناصر الموقع محفوظة لصالح "عقاركم"
              </li>
              <li>
                يمنع النسخ أو إعادة النشر دون إذن كتابي مسبق
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">8. حماية البيانات</h2>
            <p>
              يلتزم الموقع بحماية بيانات المستخدم وفقًا لسياسة الخصوصية. يمكنكم
              الرجوع إلى سياسة الخصوصية لمزيد من التفاصيل.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-2">
              9. القانون المعمول به
            </h2>
            <p>
              تخضع هذه الشروط للقوانين المعمول بها في الدولة التي تعمل فيها منصة
              "عقاركم". وتكون المحاكم المحلية المختصة الجهة المسؤولة عن الفصل في
              أي نزاع.
            </p>
          </section>
        </CardContent>
      </Card>
    </section>
  )
}
