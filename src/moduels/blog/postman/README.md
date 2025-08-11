# Blog API Postman Collection

هذا الملف يحتوي على Postman collection جاهزة لاختبار جميع API endpoints الخاصة بـ Blog module.

## كيفية الاستيراد

1. افتح Postman
2. اضغط على "Import" 
3. اختر ملف `blog-collection.json`
4. تم استيراد Collection بنجاح

## المتغيرات (Variables)

قبل استخدام الـ requests، تأكد من تعيين المتغيرات التالية:

- `base_url`: عنوان الخادم (مثال: http://localhost:3000)
- `blog_id`: معرف المدونة (سيتم تعيينه تلقائياً بعد إنشاء مدونة)
- `section_id`: معرف السيكشن (سيتم تعيينه تلقائياً من المدونة)

## الـ Requests المتاحة

### 1. Blogs Group

#### Add New Blog
- **Method**: POST
- **URL**: `{{base_url}}/blog`
- **Body**: formdata
  - `text`: نص المدونة
  - `sections`: مصفوفة JSON تحتوي على السيكشنز
  - `image`: ملف الصورة

#### Get All Blogs
- **Method**: GET
- **URL**: `{{base_url}}/blog`
- **Description**: جلب جميع المدونات

#### Get Blog by ID
- **Method**: GET
- **URL**: `{{base_url}}/blog/{{blog_id}}`
- **Description**: جلب مدونة محددة

#### Update Blog
- **Method**: PUT
- **URL**: `{{base_url}}/blog/{{blog_id}}`
- **Body**: formdata (نفس Add New Blog)

#### Delete Blog
- **Method**: DELETE
- **URL**: `{{base_url}}/blog/{{blog_id}}`
- **Description**: حذف مدونة

### 2. Blog Sections Group

#### Update Blog Section
- **Method**: PUT
- **URL**: `{{base_url}}/blog/{{blog_id}}/section/{{section_id}}`
- **Body**: JSON
  - `title`: عنوان السيكشن
  - `content`: مصفوفة من النصوص

## خطوات الاختبار

1. **إنشاء مدونة جديدة**: استخدم "Add New Blog" request
2. **نسخ معرف المدونة**: من الاستجابة، انسخ `_id` وضعه في متغير `blog_id`
3. **نسخ معرف السيكشن**: من المدونة، انسخ `_id` لأي سيكشن وضعه في متغير `section_id`
4. **اختبار باقي العمليات**: يمكنك الآن استخدام باقي الـ requests

## ملاحظات مهمة

- تأكد من أن الخادم يعمل على المنفذ المحدد
- للـ image upload، اختر ملف صورة من جهازك
- تأكد من صحة تنسيق JSON للـ sections
- استخدم متغيرات Environment لسهولة التبديل بين بيئات مختلفة

## مثال على JSON للـ Sections

```json
[
  {
    "title": "Introduction",
    "content": [
      "Welcome to our blog",
      "This is the first section"
    ]
  },
  {
    "title": "Main Content",
    "content": [
      "Here is the main content",
      "More details about the topic"
    ]
  }
]
```

