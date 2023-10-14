// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "./../components/css/DiscussionPage.css"

// export default function DiscussionPage() {
//   const [comments, setComments] = useState([]);
//   const [newComment, setNewComment] = useState('');
//   const [editCommentId, setEditCommentId] = useState(null);
//   const [editCommentText, setEditCommentText] = useState('');

//   useEffect(() => {
//     fetchComments();
//   });

//   const fetchComments = async () => {
//     try {
//       const response = await axios.get('/api/discussions');
//       setComments(response.data.discussions);
//     } catch (error) {
//       console.error('Could not retrieve comments:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleEditInputChange = (e) => {
//     setEditCommentText(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post('/api/discussions', { title: newComment });
//       fetchComments();
//       setNewComment('');
//     } catch (error) {
//       console.error('Could not create comment:', error);
//     }
//   };

//   const handleEdit = (commentId, commentText) => {
//     setEditCommentId(commentId);
//     setEditCommentText(commentText);
//   };

//   const handleCancelEdit = () => {
//     setEditCommentId(null);
//     setEditCommentText('');
//   };

//   const handleUpdate = async (commentId) => {
//     try {
//       await axios.put(`/api/discussions/${commentId}`, { title: editCommentText });
//       fetchComments();
//       setEditCommentId(null);
//       setEditCommentText('');
//     } catch (error) {
//       console.error('Could not update comment:', error);
//     }
//   };

//   const handleDelete = async (commentId) => {
//     try {
//       await axios.delete(`/api/discussions/${commentId}`);
//       fetchComments();
//     } catch (error) {
//       console.error('Could not delete comment:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Discussion</h2>
//       <ul>
//         {comments.map((comment) => (
//           <li key={comment._id}>
//             {editCommentId === comment._id ? (
//               <>
//                 <input type="text" value={editCommentText} onChange={handleEditInputChange} />
//                 <button onClick={() => handleUpdate(comment._id)}>Save</button>
//                 <button onClick={handleCancelEdit}>Cancel</button>
//               </>
//             ) : (
//               <>
//                 <span className='comment'>{comment.title}</span>
//                 <button className="button" onClick={() => handleEdit(comment._id, comment.title)}>Edit</button>
//                 <button className="button" onClick={() => handleDelete(comment._id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={newComment}
//           onChange={handleInputChange}
//           placeholder="Add a comment..."
//         />
//         <button className="button" type="submit">Comment</button>
//       </form>
//     </div>
//   );
// };