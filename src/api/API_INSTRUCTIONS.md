# API Instructions

This file documents all Public and Admin API endpoints, their frontend function names, and the correct field mappings for use in the frontend.

---

## Public APIs

| Function Name         | File                        | Endpoint                        | Description                |
|----------------------|-----------------------------|----------------------------------|----------------------------|
| getPeople            | Public/getPeople.js         | /public/teamMember/getAll        | Get all team members       |
| getAlumini           | Public/getAlumini.js        | /public/getAll-Alumini           | Get all alumni             |
| getProjectDetails    | Public/getProjectDetails.js | /public/projectDetails           | Get project details        |
| getTestimonials      | Public/getTestimonials.js   | /public/testimonials             | Get testimonials           |
| postApplication      | Public/postApplication.js   | /public/application              | Submit application form    |
| postContact          | Public/postContact.js       | /public/contact                  | Submit contact form        |
| faq (getFAQs)        | Public/faq.js               | /public/faqs                     | Get FAQs                   |
| gallery              | Public/gallery.js           | /public/gallery                  | Get gallery images         |
| getPageContent       | Public/pageContent.js       | /public/page-content             | Get editable page content  |

---

## Admin APIs

| Function Name         | File                                 | Endpoint                        | Description                |
|----------------------|--------------------------------------|----------------------------------|----------------------------|
| getAdminPageContent  | Admin/pageContent.js                 | /admin/page-content              | Get page content (admin)   |
| updatePageContent    | Admin/pageContent.js                 | /admin/page-content              | Update page content        |
| getPeople            | Admin/People/getPeople.js            | /admin/people                    | Get all team members       |
| postPeople           | Admin/People/postPeople.js           | /admin/people                    | Add a new team member      |
| updatePeople         | Admin/People/updatePeople.js         | /admin/people/:id                | Update a team member       |
| deletePeople         | Admin/People/deletePeople.js         | /admin/people/:id                | Delete a team member       |
| getTestimonials      | Admin/Testimonial/getTestimonials.js | /admin/testimonials              | Get testimonials           |
| addTestimonial       | Admin/Testimonial/addTestimonial.js  | /admin/testimonials              | Add testimonial            |
| updateTestimonial    | Admin/Testimonial/updateTestimonial.js| /admin/testimonials/:id         | Update testimonial         |
| deleteTestimonial    | Admin/Testimonial/deleteTestimonial.js| /admin/testimonials/:id         | Delete testimonial         |
| addProject           | Admin/Project/addProject.js          | /admin/projects                  | Add a new project          |
| getProject           | Admin/Project/getProject.js          | /admin/projects                  | Get all projects           |
| updateProject        | Admin/Project/updateProject.js       | /admin/projects/update/:id       | Update a project           |
| deleteProject        | Admin/Project/deleteProject.js       | /admin/projects/delete/:id       | Delete a project           |
| faq (admin)          | Admin/faq.js                         | /admin/faqs                      | Admin FAQ management       |
| login                | Admin/login.js                       | /admin/login                     | Admin login                |
| profile              | Admin/profile.js                     | /admin/profile                   | Admin profile management   |
| ApplicationForm      | Admin/ApplicationForm.js             | /admin/applications              | Manage applications        |

---

## Field Mapping

### TeamMemberModel (Team Members)

| Backend Field | Correct Frontend Field |
|---------------|-----------------------|
| name          | name                  |
| branch        | branch                |
| position      | position              |
| linkdin_url   | linkdin_url           |
| github_url    | github_url            |
| insta_url     | insta_url             |
| image         | image                 |
| projectIds    | projectIds            |

### AlumniModel (Alumni)

| Backend Field | Correct Frontend Field |
|---------------|-----------------------|
| aluminiName   | aluminiName           |
| lpa           | lpa                   |
| companyName   | companyName           |
| content       | content               |
| image         | image                 |

---

> **Note:** Always use the correct field names as per the backend model for all API requests and responses to ensure proper data flow between frontend and backend. 