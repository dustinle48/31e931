# Saving onboarding data in the:

## Frontend
**Pros:**
- Designing the stepper form would be easier because it is completely based on the consistent onboarding data.
- Frontend performance would be better because not much logic needs to be applied to dynamically change
the form fields.

**Cons:**
- Adjusting the onboarding data and the stepper form would be more complicated whenever a corresponding model changes. (Assuming that not only the User model will be represented by the form in future scaling.)
- Handling data type errors would also be more challenging.

## Backend (as hardcoded data)
**Pros:**
- This is the easiest and fastest way to set up a data model for development.
- Changing the data model and testing every single possible circumstance would be way more convenient.

**Cons:**
- Designing the stepper form would be more complicated because it needs to be dynamic.
- Adjusting the onboarding data and the stepper form would be more complicated due to the reason mentioned above.
- Frontend performance would be worse because much more logic needs to be applied to dynamically change
the form fields.

## Database
**Pros:**
- Adjusting the onboarding data would be easier whenever a corresponding model changes.
- Handling data type errors would also be more convenient.

**Cons:**
- Designing the stepper form would be harder because it needs to be dynamic.
- Frontend performance would be worse because much more logic needs to be applied to dynamically change
the form fields.

# I would choose to save the data at:

- **Frontend:** when I want to emphasize frontend design and the onboarding data is not too complicated or inconsistent, regularly changing.

- **Backend _(hardcoded)_:** when I first start to develop an application and want to set up data models fast to test every single possible circumstance that might cause bugs. This should only be used in development, and never be used in production.

- **Database:** when models represented by the stepper form are complicated, inconsistent or changing quite regularly. The frontend workload will be heavier but it is worth the trade.