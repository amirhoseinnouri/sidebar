This is a simple Contacts Manager API.
It's built with Node.js and Express.js.
It stores contacts in your computer's memory.
This means all contacts will be lost when you restart the server.

Features:
- Create, Read, Update, Delete contacts (CRUD).
- Stores data in memory (not permanent).
- Checks if your input data is correct.
- Handles errors.

Project Files:
- controllers/contactController.js: Main code for contact actions.
- middleware/errorHandler.js: Code to handle errors.
- routes/contacts.js: Defines the web addresses (API routes) and checks input.
- app.js: Sets up the main Express app.
- server.js: Starts the server.
- package.json: Lists all needed software packages.

What you need before you start:
- Node.js (this also includes npm, a tool to install packages).
- Visual Studio Code (VS Code) - a good text editor.

How to set up and run the project:

1. Install Node.js:
   - If you don't have Node.js, get it from: https://nodejs.org/en/download
   - Check if it's installed by typing in your terminal:
     node -v
     npm -v

2. Get the project files:
   - Make sure all project files are in a folder named 'contacts-manager'.
   - Go into that folder using your terminal:
     cd contacts-manager

3. Install needed packages:
   - In your terminal, inside the 'contacts-manager' folder, type:
     npm install
   - This installs packages like 'express' and 'uuid'.

How to run the server:

1. In your terminal, inside the 'contacts-manager' folder, type:
   node server.js
2. You should see a message like:
   Server started on port 5000
   This means your API is running on your computer at port 5000.

How to test the API:

This project is a backend API, it doesn't have a visual website.
To send requests (POST, PUT, DELETE) and see results, you need an API testing tool.
I recommend 'Thunder Client' for VS Code.

Install Thunder Client (if you use VS Code):
1. Open Visual Studio Code.
2. Go to the Extensions section (click the square icon on the left, or press Ctrl+Shift+X).
3. Search for 'Thunder Client'.
4. Click 'Install'.
5. You will see a lightning bolt icon in your VS Code sidebar.

How to send requests using Thunder Client:
1. Click the Thunder Client icon in VS Code.
2. Click 'New Request'.

API Endpoints (Web Addresses for your API):
Base URL for all requests: http://localhost:5000/api/contacts

1. Get all contacts:
   - Method: GET
   - URL: http://localhost:5000/api/contacts
   - Result: Shows a list of all contacts.
   - Example (if no contacts yet): [] (empty list)

2. Create a new contact:
   - Method: POST
   - URL: http://localhost:5000/api/contacts
   - Header: Content-Type: application/json
   - Body (JSON data):
     {
         "name": "Mohsen Hosseini",
         "email": "mohsen.hosseini@example.com",
         "phone": "09123456789",
         "address": "Main Street, No. 10"
     }
     - 'name', 'email', 'phone' are needed.
     - 'email' must be unique.
   - Example success (Status: 201 Created): Shows the new contact details with an 'id'.

3. Get one contact by ID:
   - Method: GET
   - URL: http://localhost:5000/api/contacts/:id
     (Replace :id with the actual ID of a contact you added. You get this ID from POST or GET all contacts.)
   - Example URL: http://localhost:5000/api/contacts/e1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6
   - Example success (Status: 200 OK): Shows the contact's details.
   - Example if not found (Status: 404 Not Found): {"msg": "Contact not found"}

4. Update a contact:
   - Method: PUT
   - URL: http://localhost:5000/api/contacts/:id
     (Replace :id with the actual ID of the contact.)
   - Header: Content-Type: application/json
   - Body (JSON data): You can send only the fields you want to change:
     {
         "phone": "09129876543",
         "address": "New Address: Rose Alley, No. 20"
     }
   - Example URL: http://localhost:5000/api/contacts/e1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6
   - Example success (Status: 200 OK): Shows the updated contact details.

5. Delete a contact:
   - Method: DELETE
   - URL: http://localhost:5000/api/contacts/:id
     (Replace :id with the actual ID of the contact.)
   - Example URL: http://localhost:5000/api/contacts/e1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6
   - Example success (Status: 200 OK): {"msg": "Contact removed"}
   - Example if not found (Status: 404 Not Found): {"msg": "Contact not found"}

How errors are handled:
- If you send wrong data (e.g., bad email in POST):
  - Status: 400 Bad Request
  - Example: {"errors": [{"msg": "Please include a valid email"}]}
- If a contact is not found (wrong ID):
  - Status: 404 Not Found
  - Example: {"msg": "Contact not found"}
- If there's an unexpected error on the server:
  - Status: 500 Internal Server Error
  - Example: {"message": "Server Error"}

Further Improvements (if you want to add more):
- Use a permanent database (like MongoDB or PostgreSQL) instead of in-memory storage.
- Add user login (Authentication) to protect the API.
- Deploy the app online (e.g., Heroku, Vercel).



persian part and translate =>


این یک API ساده برای مدیریت مخاطبین است.
با Node.js و Express.js ساخته شده است.
مخاطبین را در حافظه کامپیوتر شما ذخیره می‌کند.
این یعنی با هر بار راه‌اندازی مجدد سرور، تمام مخاطبین از بین می‌روند.

ویژگی‌ها:
- ایجاد، خواندن، به‌روزرسانی و حذف مخاطبین (CRUD).
- ذخیره داده‌ها در حافظه (غیر دائم).
- بررسی صحت اطلاعات ورودی شما.
- مدیریت خطاها.

فایل‌های پروژه:
- controllers/contactController.js: کد اصلی برای عملیات مخاطبین.
- middleware/errorHandler.js: کد مربوط به مدیریت خطاها.
- routes/contacts.js: آدرس‌های وب (مسیرهای API) را تعریف کرده و ورودی را بررسی می‌کند.
- app.js: برنامه اصلی Express را راه‌اندازی می‌کند.
- server.js: سرور را شروع می‌کند.
- package.json: تمام بسته‌های نرم‌افزاری مورد نیاز را فهرست می‌کند.

آنچه قبل از شروع نیاز دارید:
- Node.js (این شامل npm، ابزاری برای نصب بسته‌ها نیز می‌شود).
- Visual Studio Code (VS Code) - یک ویرایشگر متن خوب.

نحوه راه‌اندازی و اجرای پروژه:

1. نصب Node.js:
   - اگر Node.js را ندارید، آن را از اینجا دریافت کنید: https://nodejs.org/en/download
   - برای بررسی نصب آن، در ترمینال خود تایپ کنید:
     node -v
     npm -v

2. دریافت فایل‌های پروژه:
   - مطمئن شوید که تمام فایل‌های پروژه در پوشه‌ای به نام 'contacts-manager' قرار دارند.
   - با استفاده از ترمینال خود وارد آن پوشه شوید:
     cd contacts-manager

3. نصب بسته‌های مورد نیاز:
   - در ترمینال خود، داخل پوشه 'contacts-manager'، تایپ کنید:
     npm install
   - این دستور بسته‌هایی مانند 'express' و 'uuid' را نصب می‌کند.

نحوه اجرای سرور:

1. در ترمینال خود، داخل پوشه 'contacts-manager'، تایپ کنید:
   node server.js
2. شما باید پیامی مانند:
   Server started on port 5000
   را ببینید. این یعنی API شما روی کامپیوترتان در پورت 5000 در حال اجرا است.

نحوه تست API:

این پروژه یک API بک‌اند است و وب‌سایت بصری ندارد.
برای ارسال درخواست‌ها (POST، PUT، DELETE) و دیدن نتایج، به یک ابزار تست API نیاز دارید.
من 'Thunder Client' را برای VS Code پیشنهاد می‌کنم.

نصب Thunder Client (اگر از VS Code استفاده می‌کنید):
1. Visual Studio Code را باز کنید.
2. به بخش Extensions (افزونه‌ها) بروید (روی آیکون چهارگوش در سمت چپ کلیک کنید، یا Ctrl+Shift+X را فشار دهید).
3. 'Thunder Client' را جستجو کنید.
4. روی 'Install' کلیک کنید.
5. یک آیکون رعد و برق در نوار کناری VS Code شما ظاهر خواهد شد.

نحوه ارسال درخواست‌ها با Thunder Client:
1. روی آیکون Thunder Client در VS Code کلیک کنید.
2. روی 'New Request' کلیک کنید.

نقاط پایانی API (آدرس‌های وب برای API شما):
آدرس پایه برای تمام درخواست‌ها: http://localhost:5000/api/contacts

1. دریافت تمام مخاطبین:
   - متد: GET
   - آدرس (URL): http://localhost:5000/api/contacts
   - نتیجه: لیستی از تمام مخاطبین را نشان می‌دهد.
   - مثال (اگر هنوز مخاطبی وجود ندارد): [] (لیست خالی)

2. ایجاد یک مخاطب جدید:
   - متد: POST
   - آدرس (URL): http://localhost:5000/api/contacts
   - هدر: Content-Type: application/json
   - بدنه (داده‌های JSON):
     {
         "name": "محسن حسینی",
         "email": "mohsen.hosseini@example.com",
         "phone": "09123456789",
         "address": "خیابان اصلی، پلاک 10"
     }
     - 'name'، 'email' و 'phone' الزامی هستند.
     - 'email' باید منحصر به فرد باشد.
   - مثال موفقیت (وضعیت: 201 Created): جزئیات مخاطب جدید را با یک 'id' نشان می‌دهد.

3. دریافت یک مخاطب بر اساس ID:
   - متد: GET
   - آدرس (URL): http://localhost:5000/api/contacts/:id
     (به جای :id، ID واقعی مخاطبی که اضافه کرده‌اید را قرار دهید. این ID را از درخواست POST یا GET همه مخاطبین دریافت می‌کنید.)
   - مثال آدرس (URL): http://localhost:5000/api/contacts/e1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6
   - مثال موفقیت (وضعیت: 200 OK): جزئیات مخاطب را نشان می‌دهد.
   - مثال در صورت عدم یافتن (وضعیت: 404 Not Found): {"msg": "Contact not found"}

4. به‌روزرسانی یک مخاطب:
   - متد: PUT
   - آدرس (URL): http://localhost:5000/api/contacts/:id
     (به جای :id، ID واقعی مخاطب را قرار دهید.)
   - هدر: Content-Type: application/json
   - بدنه (داده‌های JSON): می‌توانید فقط فیلدهایی را که می‌خواهید تغییر دهید ارسال کنید:
     {
         "phone": "09129876543",
         "address": "آدرس جدید: کوچه رز، پلاک 20"
     }
   - مثال آدرس (URL): http://localhost:5000/api/contacts/e1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6
   - مثال موفقیت (وضعیت: 200 OK): جزئیات مخاطب به‌روزرسانی شده را نشان می‌دهد.

5. حذف یک مخاطب:
   - متد: DELETE
   - آدرس (URL): http://localhost:5000/api/contacts/:id
     (به جای :id، ID واقعی مخاطب را قرار دهید.)
   - مثال آدرس (URL): http://localhost:5000/api/contacts/e1a2b3c4-d5e6-f7g8-h9i0-j1k2l3m4n5o6
   - مثال موفقیت (وضعیت: 200 OK): {"msg": "Contact removed"}
   - مثال در صورت عدم یافتن (وضعیت: 404 Not Found): {"msg": "Contact not found"}

نحوه مدیریت خطاها:
- اگر داده‌های اشتباهی ارسال کنید (مثلاً ایمیل نامعتبر در POST):
  - وضعیت: 400 Bad Request
  - مثال: {"errors": [{"msg": "لطفاً یک ایمیل معتبر وارد کنید"}]}
- اگر مخاطبی پیدا نشود (ID اشتباه):
  - وضعیت: 404 Not Found
  - مثال: {"msg": "مخاطب پیدا نشد"}
- اگر خطای غیرمنتظره‌ای در سرور رخ دهد:
  - وضعیت: 500 Internal Server Error
  - مثال: {"message": "خطای سرور"}

بهبودهای بیشتر (اگر می‌خواهید موارد بیشتری اضافه کنید):
- استفاده از یک پایگاه داده دائمی (مانند MongoDB یا PostgreSQL) به جای ذخیره‌سازی در حافظه.
- اضافه کردن ورود کاربر (احراز هویت) برای محافظت از API.
- استقرار برنامه آنلاین (مانند Heroku, Vercel).