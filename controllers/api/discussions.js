// const Discussion = require('../../models/discussion');
// module.exports = {
//   getDiscussions,
//   createComment,
//   updateComment,
//   deleteComment
// };

// async function getDiscussions(req, res) {
//   try {
//     const discussions = await Discussion.find().sort({ createdAt: -1 });
//     res.json({ discussions });
//   } catch (error) {
//     res.status(500).json({ error: 'Could not fetch discussions' });
//   }
// }

// async function createComment(req, res) {
//   try {
//     const { title } = req.body;
//     const discussion = new Discussion({ title });
//     await discussion.save();

//     res.status(201).json(discussion);
//   } catch (error) {
//     res.status(400).json({ error: 'Could not create comment' });
//   }
// }

// async function updateComment(req, res) {
//   try {
//     const { id } = req.params;
//     const { title } = req.body;
//     const discussion = await Discussion.findById(id);
//     if (!discussion) {
//       return res.status(404).json({ error: 'Comment not found' });
//     }
//     discussion.title = title;
//     await discussion.save();
//     res.json(discussion);
//   } catch (error) {
//     res.status(400).json({ error: 'Could not update comment' });
//   }
// }

// async function deleteComment(req, res) {
//   try {
//     const { id } = req.params;
//     const discussion = await Discussion.findById(id);
//     if (!discussion) {
//       return res.status(404).json({ error: 'Comment not found' });
//     }
//     await discussion.remove();
//     res.json({ message: 'Comment deleted' });
//   } catch (error) {
//     res.status(400).json({ error: 'Could delete comment' });
//   }
// }

