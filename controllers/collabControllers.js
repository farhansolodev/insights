const Collab = require("../models/Collab")

module.exports = {
	/**
	 * When a virtual space is created, a blank collab is also created.
	 * This collab, at first, will have:
	 * - a name
	 * - an empty list of contributors
	 * - one owner
	 * - no content
	 */
	createCollab: async (req, res) => {
		const collab = new Collab({
			name: req.body.collabName,
			owners: [req.body.ownerId],
		})

        try {
            const data = await collab.save()
			const statusCode = 201
			res.status(statusCode).send({
				status: statusCode,
				message: "Collab created successfully",
				data: data,
			})
		} catch (err) {
			const statusCode = 503
            res.status(statusCode).send({
                status: statusCode,
                ...err
            })
        }

        res.end()
	},
}
