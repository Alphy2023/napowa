


INSERT INTO "public"."ContactUsSettings" ("id", "pageTitle", "pageDescription", "showFaqs", "showConnect", "socialLinks", "sections", "createdAt", "updatedAt") VALUES
('cmbtbwnb90000ui40ej2uwm85', 'Contact Us', 'Have questions or want to get involved? We''d love to hear from you.', 'f', 't', '[{"url": "https://facebook.com/yourorg", "platform": "facebook"}]', '[{"id": "emailSection", "fields": {"general": "default@example.com", "donations": "donations@example.com", "membership": "membership@example.com"}}, {"id": "callUsSection", "fields": {"hours": {"end": "17:00", "start": "08:00"}, "hotline": "+254787654321", "mainOffice": "+254712345678"}}, {"id": "visitUsSection", "fields": {"hq": "NAPOWA House", "city": "Nairobi, Kenya", "street": "Afya Centre", "officeHours": {"end": "17:00", "start": "08:00"}}}]', '2025-06-12 12:02:13.89', '2025-06-12 12:07:19.432');
















INSERT INTO "public"."LandingPageSlide" ("id", "title", "description", "buttonText", "buttonLink", "secondaryButtonText", "secondaryButtonLink", "createdAt", "updatedAt", "image") VALUES
('6693de59-e583-4194-9e7f-8529208e0400', 'Creating Opportunities for Economic Empowerment', 'Our skills development programs help police wives and widows achieve financial independence.', 'Our Programs', '/programs', 'Our Impact', '/impact', '2025-06-12 13:57:30.877', '2025-06-12 14:14:59.028', '{"url": "https://res.cloudinary.com/dzd6fcgff/image/upload/v1749736570/herb-images/wca2fyftkye80ohqfaz9.jpg", "bytes": 137328, "width": 1280, "format": "jpg", "height": 853, "version": 1749736570, "asset_id": "9ada72a7b057ded9846a14198c62c3a6", "public_id": "herb-images/wca2fyftkye80ohqfaz9", "original_filename": "file"}');
INSERT INTO "public"."LandingPageSlide" ("id", "title", "description", "buttonText", "buttonLink", "secondaryButtonText", "secondaryButtonLink", "createdAt", "updatedAt", "image") VALUES
('dca9b3aa-ef04-4217-b6d4-63fe5bfa4d94', 'Building Stronger Communities Together', 'Join our network of support and solidarity for police families throughout Kenya.', 'Become a Member', '/auth/signup', 'Learn More', '/about', '2025-06-12 14:14:59.089', '2025-06-12 14:14:59.089', '{"url": "https://res.cloudinary.com/dzd6fcgff/image/upload/v1749737490/herb-images/qjjwmx5lpgofpiutf4mg.jpg", "bytes": 371352, "width": 1280, "format": "jpg", "height": 1280, "version": 1749737490, "asset_id": "c985a5a7d99d3189d5b51a858d651779", "public_id": "herb-images/qjjwmx5lpgofpiutf4mg", "original_filename": "file"}');
INSERT INTO "public"."LandingPageSlide" ("id", "title", "description", "buttonText", "buttonLink", "secondaryButtonText", "secondaryButtonLink", "createdAt", "updatedAt", "image") VALUES
('b096be96-23ad-4866-8f8c-ac9bfe5867ff', 'Empowering Police Wives and Widows Across Kenya', 'NAPOWA is committed to improving the lives of police families through skills development, health advocacy, and economic empowerment.', 'Donate Now', '/donate', 'Partner With Us', '/partner', '2025-06-12 14:14:59.099', '2025-06-12 14:14:59.099', '{"url": "https://res.cloudinary.com/dzd6fcgff/image/upload/v1749737553/herb-images/aryww1qd6hgpsz3kbi69.jpg", "bytes": 84533, "width": 720, "format": "jpg", "height": 521, "version": 1749737553, "asset_id": "12e48490646f0d8d0aebf762a77c51c0", "public_id": "herb-images/aryww1qd6hgpsz3kbi69", "original_filename": "file"}');















INSERT INTO "public"."Role" ("id", "name", "permissions", "createdAt", "updatedAt") VALUES
('cmbs1rhi80001uiwkqpisk14t', 'editor', '{"blog": ["view", "create", "update"], "events": ["view", "create", "update"], "gallery": ["view", "create"], "members": ["view", "create"], "reports": ["view"], "meetings": ["view"], "messages": ["view"], "partners": ["view", "create"], "programs": ["view", "create"], "settings": ["view"], "analytics": ["view"], "dashboard": ["view"], "donations": ["view", "manage_campaigns"], "volunteers": ["view", "create"], "announcements": ["view"], "notifications": ["view"]}', '2025-06-11 14:30:30.752', '2025-06-11 14:30:30.752');
INSERT INTO "public"."Role" ("id", "name", "permissions", "createdAt", "updatedAt") VALUES
('cmbs1rhic0002uiwk657f46qi', 'member', '{"events": ["view"], "meetings": ["view"], "messages": ["view"], "settings": ["view"], "dashboard": ["view"], "notifications": ["view"]}', '2025-06-11 14:30:30.756', '2025-06-11 14:30:30.756');
INSERT INTO "public"."Role" ("id", "name", "permissions", "createdAt", "updatedAt") VALUES
('cmbsvi65g0002ui6w61htdatq', 'Moderator', '{"roles": ["view"], "gallery": ["view", "create", "manage_albums"], "members": ["view", "create", "manage_roles"], "reports": ["view"], "meetings": ["view"], "messages": ["view"], "partners": ["view", "create"], "programs": ["view", "create"], "settings": ["view"], "analytics": ["view"], "dashboard": ["view"], "donations": ["view", "manage_campaigns", "read_reports"], "volunteers": ["view", "create"], "announcements": ["view"], "notifications": ["view"]}', '2025-06-12 04:23:04.611', '2025-06-12 04:23:04.611');
INSERT INTO "public"."Role" ("id", "name", "permissions", "createdAt", "updatedAt") VALUES
('cmbs1rhfe0000uiwk536kdgo0', 'admin', '{"blog": ["view", "create", "update", "delete", "manage_categories"], "roles": ["view"], "events": ["view", "create", "update", "delete"], "gallery": ["view", "create", "update", "delete"], "members": ["view", "create", "manage_roles"], "reports": ["view"], "meetings": ["view"], "messages": ["view"], "partners": ["view", "create"], "programs": ["view", "create"], "settings": ["view"], "analytics": ["view"], "dashboard": ["view"], "donations": ["view", "manage_campaigns", "read_reports"], "volunteers": ["view", "create"], "announcements": ["view", "create", "update", "delete"], "notifications": ["view"]}', '2025-06-11 14:30:30.643', '2025-06-12 08:28:28.682');

INSERT INTO "public"."Session" ("id", "userId", "device", "ip", "location", "createdAt", "lastActive", "isActive") VALUES
('cmbs1xvtj0004uigcmaomb3gb', 'cmbs1wzh20001uigcw5xbuc2v', 'Chrome on Windows 10', '197.248.151.93', '"{\"city\":\"Unknown\",\"region\":\"Unknown\",\"country\":\"Unknown\",\"countryName\":\"Unknown\",\"loc\":\"Unknown\",\"timezone\":\"Unknown\"}"', '2025-06-11 14:35:29.227', '2025-06-11 14:35:29.227', 't');
INSERT INTO "public"."Session" ("id", "userId", "device", "ip", "location", "createdAt", "lastActive", "isActive") VALUES
('cmbs214fk0006uigc7p103r5w', 'cmbs1wzh20001uigcw5xbuc2v', 'Chrome on Windows 10', '197.248.151.93', '"{\"city\":\"Nairobi\",\"region\":\"Africa\",\"country\":\"KE\",\"countryName\":\"Kenya\",\"loc\":{\"latitude\":-1.2920659,\"longitude\":36.8219462},\"timezone\":\"Africa/Nairobi\"}"', '2025-06-11 14:38:00.358', '2025-06-11 14:38:00.358', 't');
INSERT INTO "public"."Session" ("id", "userId", "device", "ip", "location", "createdAt", "lastActive", "isActive") VALUES
('cmbs26gpu0008uigctkwai786', 'cmbs1wzh20001uigcw5xbuc2v', 'Chrome on Windows 10', '197.248.151.93', '"{\"city\":\"Nairobi\",\"region\":\"Africa\",\"country\":\"KE\",\"countryName\":\"Kenya\",\"loc\":{\"latitude\":-1.2920659,\"longitude\":36.8219462},\"timezone\":\"Africa/Nairobi\"}"', '2025-06-11 14:42:09.556', '2025-06-11 14:42:09.556', 't');



INSERT INTO "public"."User" ("id", "email", "password", "roleId", "createdAt", "updatedAt") VALUES
('cmbs1wzh20001uigcw5xbuc2v', 'alphonceomondi64@gmail.com', '$2b$10$RDFxtI76M7JpjUehYr.1K.G3EFeQK0J6eLgLBNgMcRkZGr5xG6Vhy', 'cmbs1rhfe0000uiwk536kdgo0', '2025-06-11 14:34:47.311', '2025-06-11 14:37:36.448');




INSERT INTO "public"."UserProfile" ("id", "userId", "firstName", "lastName", "phone", "idNumber", "county", "memberType", "rank", "station", "serviceNumber", "profileImage", "bio", "address", "city", "postalCode", "isEmailVerified", "lastLogin", "createdAt", "updatedAt") VALUES
('cmbs1wzh30002uigc1pbmmyf0', 'cmbs1wzh20001uigcw5xbuc2v', 'Alpha', 'Oxygen', '0745688289', '99990909', 'nairobi', 'regular', '', '', '', NULL, NULL, NULL, NULL, NULL, 'f', NULL, '2025-06-11 14:34:47.311', '2025-06-11 14:34:47.311');





