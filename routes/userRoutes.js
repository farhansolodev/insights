const express = require('express')
const router = express.Router()

const userControllers = require('../controllers/userControllers')

// GET /users/n932n9d9923d
router.get("/:id", userControllers.getUserById)

router.get('/:name/id', userControllers.getUserID)
router.get("/:id/name", userControllers.getUserName)
router.get("/:id/description", userControllers.getUserDescription)
router.get("/:id/pfp", userControllers.getUserPfp)
router.get("/:id/previousRooms", userControllers.getUserPreviousRooms)
router.get("/:id/previousCollabs", userControllers.getUserPreviousCollabs)

// POST /users/
router.post("/", userControllers.createUser)

// PUT /users/:id/ (TBA)
router.put("/:id/id", userControllers.updateUserID)
router.put("/:id/name", userControllers.updateUserName)
router.put("/:id/description", userControllers.updateUserDescription)
router.put("/:id/pfp", userControllers.updateUserPfp)

// DELETE /users/:id/ (TBA)
router.delete("/:id", userControllers.deleteUser)

// POST /collabs
// collabControllers.createCollab
// () => { // create new record in collab nd user table }

// router.put("/:id/previousRooms", userControllers.updateUserPreviousRooms)
// router.put("/:id/previousCollabs", userControllers.updateUserPreviousCollabs)

module.exports = router