import React, { useState } from "react";

const CreatePost = (props) => {
  const { posts, setPosts } = props;
  const [newPost, setNewPost] = useState({ title: "", body: "" });

  const handleCreatePost = async () => {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify(newPost),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        });
        const result = await res.json();
        if (res.ok) {
          setPosts([...posts, result]);
          alert("new task added ");
          setNewPost({ title: "", body: "" });
        }
    } catch (error) {
        alert(error.message)
    }
  };
  return (
    <div className="mb-4 flex flex-col">
      <h2 className="font-bold text-xl my-4 ">Add New Post</h2>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        placeholder="Title"
        value={newPost.title}
        onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        className="form-control mb-2 p-4 "
      />
      <label htmlFor="body">Description</label>
      <textarea
        placeholder="Body"
        value={newPost.body}
        onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
        className="form-control mb-2 p-4"
      />
      <button
        onClick={handleCreatePost}
        className="btn btn-primary p-2 bg-blue-500 rounded"
      >
        Create Post
      </button>
    </div>
  );
};

export default CreatePost;
