const express = require("express")
const router = express.Router()

const virtualSpaceControllers = require("../controllers/virtualSpaceControllers")

// POST /vs/
router.post("/", virtualSpaceControllers.createVirtualSpace)

// GET /vs/n932n9d9923
// router.get("/:id", (req, res) => {
//     const vs = {}
//     vs.id = userControllers.getUserID(req, res)
//     vs.name = userControllers.getUserName(req, res)
//     vs.displayPic = userControllers.getUserPfp(req, res)
//     vs.description = userControllers.getUserDescription(req, res)
//     vs.previousRooms = userControllers.getUserPreviousRooms(req, res)
//     vs.previousCollabs = userControllers.getUserPreviousCollabs(req, res)
//     res.json(vs)
// })

// router.get("/:name/id", virtualSpaceControllers.getVSID)
// router.get("/:id/name", virtualSpaceControllers.getVSName)
// router.get("/:id/writeId", virtualSpaceControllers.getVSWriteID)
// router.get("/:id/readId", virtualSpaceControllers.getVSReadID)
// router.get("/:id/readers", virtualSpaceControllers.getVSReaders)
// router.get("/:id/editors", virtualSpaceControllers.getVSEditors)
// router.get("/:id/owners", virtualSpaceControllers.getVSOwners)


// // PUT /vs/:id/ (TBA)
// router.put("/:old_id/:new_id", virtualSpaceControllers.updateVSID)
// router.put("/:id/:writeId", virtualSpaceControllers.updateVSWriteID)
// router.put("/:id/:readId", virtualSpaceControllers.updateVSReadID)
// router.put("/:id/:name", virtualSpaceControllers.updateVSName)
// router.put("/:id/:readersId", virtualSpaceControllers.updateVSReaders)
// router.put("/:id/:editorsId", virtualSpaceControllers.updateVSEditors)
// router.put("/:id/:ownersId", virtualSpaceControllers.updateVSOwners)

// // DELETE /vs/:id (TBA)
// router.delete("/:id", virtualSpaceControllers.deleteVS)

module.exports = router
