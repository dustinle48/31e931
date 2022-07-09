const router = require("express").Router();
const { User } = require("../../db/models");

const STEPS = [
  [
    {
      name: "firstName",
      label: "First Name",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      label: "Last Name",
      type: "text",
    },
    {
      name: "bio",
      label: "Bio",
      type: "multiline-text",
    },
  ],
  [
    {
      name: "country",
      label: "Country",
      type: "text",
      required: true,
    },
    {
      name: "receiveNotifications",
      label:
        "I would like to receive email notiications for new messages when I'm logged out",
      type: "yes-no",
      required: true,
    },
    {
      name: "receiveUpdates",
      label: "I would like to receive updates about the product via email",
      type: "yes-no",
      required: true,
    },
  ],
];

const methodNotAllowed = (req, res, next) => {
  return res.header("Allow", "GET").sendStatus(405);
};

const getOnboarding = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }
    return res.status(200).json({ steps: STEPS });
  } catch (error) {
    next(error);
  }
};

const postOnboarding = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.sendStatus(401);
    }

    const username = req.user.username;

    const user = await User.findOne({
      where: {
        username: username,
      },
    })

    const { steps } = req.body;

    const onboardingData = {};
    const flatSteps = steps.flat();

    for (const field of flatSteps) {
      if (Array.isArray(field)) {
        //check if steps input data is a 2 dimensional array
        return res.status(409).json({ error: "Wrong steps data types." });
      } else if (JSON.stringify(Object.getOwnPropertyNames(field)) !== JSON.stringify(["name","value"]) && JSON.stringify(Object.getOwnPropertyNames(field)) !== JSON.stringify(["value","name"])) {
        //check if input data only has name and value field
        return res.status(409).json({ error: "Data input should only has name and value." });
      } else if (!User.tableAttributes.hasOwnProperty(field.name)) {
        //check if each field in req body matches with User model
        return res.status(409).json({ error: `Invalid field at ${field.name}` });
      } else if (typeof field.value !== (User.getDataType(field.name)).toLowerCase()) {
        //check if each field in req body has the right data type.
        return res.status(409).json({ error: `Wrong data type at ${field.name}` });
      } else {
        onboardingData[field.name] = field.value;
      }
    }

    if (user.dataValues.completedOnboarding) {
      //user can only set their onboarding information once
      return res.status(403).json({ error: "You can only set your onboarding information once." });
    }

    user.set({
      firstName: onboardingData.firstName,
      lastName: onboardingData.lastName,
      country: onboardingData.country,
      bio: onboardingData.bio,
      receiveNotifications: onboardingData.receiveNotifications,
      receiveUpdates: onboardingData.receiveUpdates,
      completedOnboarding: onboardingData.completedOnboarding || false,
    })

    await user.save();

    delete user.dataValues.salt ;
    delete user.dataValues.password;

    return res.status(200).json( user.dataValues );
  } catch (error) {
    next(error);
  }
};

router.route("/")
  .get(getOnboarding)
  .post(postOnboarding)
  .all(methodNotAllowed)

module.exports = router;
