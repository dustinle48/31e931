# Saving onboarding steps data in the:

## Frontend
**Pros:**
- Easier to design stepper form.
- Better frontend performance because not much works need to be done in frontend since the form input fields are consistent. 

**Cons:**
- Harder to adjust the steps data and the form fields whenever any model changes or the form fields represent other models also not just User.
- Harder to handle errors related to data types.

## Backend (as hardcoded data)
**Pros:**
- Easiest way to set up a data model.
- Easier to change and test every possible circumstance 

**Cons:**
- Harder to design stepper form.
- Harder to adjust whenever any model changes.
- Developers need to hardcode this steps data for every single model if they also use this form to modify data.
- Frontend has much more works to do since the form inputs might not be consistent and have to be dynamic.

## Database
**Pros:**
- Easier to adjust whenever any model changes.
- Developers don't need to hardcode this steps data for every single model.
- Easier to handle errors related to data types.

**Cons:**
- Harder to design stepper form.
- Frontend has much more works to do since the form inputs might not be consistent and have to be dynamic.

# I would choose to save the data at:

- **Frontend:** when I want to emphasize frontend design and the data form is not too complicated or inconsistent (regularly changing).

- **Backend _(hardcoded)_:** when I first start to develop an application and want to test for every possible circumstance that might cause bugs. Development only. Never use in production.

- **Database:** when models represented by the form are complicated, inconsistent or changing quite regularly. Frontend design will have more works to do but by having Onboarding data in database will save quite some time.