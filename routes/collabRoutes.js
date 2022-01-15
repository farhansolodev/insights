const express = require('express')
const router = express.Router()

const collabControllers = require('../controllers/collabControllers')

// router.get('/:name/id', collabControllers.getCollabID)
// router.get("/:id/name", collabControllers.getCollabName)
// router.get("/:id/displayPic", collabControllers.getCollabDp)
// router.get("/:id/content", collabControllers.getContent)
// router.get("/:id/contributors", collabControllers.getCollabContributors)
// router.get("/:id/owners", collabControllers.getCollabOwners)

// POST /collabs
router.post("/", collabControllers.createCollab)

/**
 * client uploads collab_cover to browser,
 * - browser uploads image to google cloud storage and retrieves the url
 * - browser uploads the url to server
 * - server saves url to firestore
 */

// // PUT /collabs/:id/ (TBA)
// router.put("/:id/id", collabControllers.updateCollabID)
// router.put("/:id/name", collabControllers.updateCollabName)
// router.put("/:id/description", collabControllers.updateCollabDescription)
// router.put("/:id/pfp", collabControllers.updateCollabDp)
// router.put("/:id/content", collabControllers.updateCollabContent)
// router.put("/:id/:contributorId", collabControllers.updateCollabContributors)
// router.put("/:id/:ownerId", collabControllers.updateCollabOwners)

// // DELETE /collabs/:id (TBA)
// router.delete("/:id", collabControllers.deleteCollab)

module.exports = router
