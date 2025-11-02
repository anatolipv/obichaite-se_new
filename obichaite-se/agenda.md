=== PROJECT AGENDA ===

- PROJECT MIGRATION START IN 17.10.25 -> 30-45 дни срок около, завършек около 25.11.25

**CURRENT**
[done] install packages (only required)
[done] make the base styles
[done] insert the fonts
[done] transfer the generic components and utils
[done] start the project to seed the database
[done] make config for hero

[done] шоп карти в скрол
[done] възможност за изтриване
[done] възможност за увеличаване и намляване на бройката
[done] калкулиране на оставаща сума до 100 лв ако доставката е безплатна
[done] magic gradient
[done] когато потребител натисне добави да добавя една бройка към продукта в количката

[done] евент да не може да е в промо (админ)
[done] евент да няма конкретна цена (админ)
[done] организиране на събитие не трябва да ходи в чекоут и да няма в картата му бутони
[done] meta image
[pending] auth flow - QC
[pending] single category page e.g produkti - all connected with paggination and basic sorts (best sellers, updatedAt) and connected subCategories - QC
[pending] single subCategory page e.g vazi - all connected with paggination and and basic sorts (best sellers, updatedAt) all related subCategories - QC

[done] add global loader in (front-end level) - (each page with different title for the loader)
[done] extra section for product - best sales in that category and promotions in that category
[done] user shopping cart products - (fields in config and logic in shopping cart)

- local storage for shopping cart for anonimni users 

- евент карта да има телефон или да сочи към конткакт
- order collection in database - config (ref- MIRO), add orders in the user doc
- checkout page - form (reference to original site), info about payment, order logic, logic to fill user and order docs in database and finally email
  to the owner and the user
- revalidate sub category (YA project for ref)

- all needed emails that will be send from the front end and the admin

- question about bulgarian/english owner???
- да прегледаме документа от клиента кои части са изпълнени и да се вградяд които не са изпълнени

- prefetch to all links
- pwa if its possible
- user orders page ??

**FEEDBACK**

- "Прехвърля се в количката с 0лв и вече допълнително ще изпращаме оферти" - Events

**ADDONS**
[done] scroll to top - refference - https://qx-plank.myshopify.com/

**IMPORTANT**
-- each new user "admin", needs to be verifiied manually

**BEFORE HANDOVER**

- да се преместят тези от продукти/общи където са и местата от потребителя

**BACKUP**

- backup jsons in backup-json branch
