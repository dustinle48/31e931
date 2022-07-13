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
  const { steps } = req.body;
  const flatSteps = steps.flat();
  const requiredFields = STEPS.flat().filter((step) => step.required);

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

    if (user.dataValues.completedOnboarding) {
      return res.status(423).json({ error: "You can only set your onboarding information once." });
    }

    for (const field of flatSteps) {
      if (Array.isArray(field)) {
        return res.status(409).json({ error: "Wrong steps data types." });
      } else if (JSON.stringify(Object.getOwnPropertyNames(field)) !== JSON.stringify(["name","value"]) && JSON.stringify(Object.getOwnPropertyNames(field)) !== JSON.stringify(["value","name"])) {
        return res.status(409).json({ error: "Data input should only has name and value." });
      } else if (!User.tableAttributes.hasOwnProperty(field.name)) {
        return res.status(409).json({ error: `Invalid field at ${field.name}` });
      } else if (typeof field.value !== (User.getDataType(field.name)).toLowerCase()) {
        return res.status(409).json({ error: `Wrong data type at ${field.name}` });
      } else {
        for (let i = 0; i < requiredFields.length; i++) {
          if (requiredFields[i].name === field.name) {
            requiredFields.splice(i,1);
          }
        }
        
        user.set({
          [field.name] : field.value
        })
      }
    }

    if (requiredFields.length > 0) {
      const missing = [];
      requiredFields.forEach(field => missing.push(field.name));
      return res.status(400).json({ error: `Missing ${missing} in onboarding form.`})
    }

    const checkCompletedOnboarding = Object.values(user.dataValues).some(field => field === null);
    if (checkCompletedOnboarding === false) {
      user.set({
        completedOnboarding: true
      })
    }

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
