import React, { useState, useEffect } from "react";

import { signOut } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";
import CreatePost from "./CreatePost";

const PostList = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const [editingPost, setEditingPost] = useState(null);

  const fetchPosts = async () => {
   try {
     const res = await fetch("https://jsonplaceholder.typicode.com/posts");
     const result = await res.json();
     if (res.ok) {
       setPosts(result);
     }
   } catch (error) {
    alert(error.message)
   }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEditPost = (post) => {
    setEditingPost(post);
  };

  const handleUpdatePost = async () => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${editingPost.id}`,
        {
          method: "PUT",
          body: JSON.stringify(editingPost),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const result = await res.json();
      if (res.ok) {
        const updatedPosts = posts.map((post) =>
          post.id === editingPost.id ? result : post
        );
        setPosts(updatedPosts);
        setEditingPost(null);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDeletePost = async (id) => {
    try {
      const res = await fetch("https://jsonplaceholder.typicode.com/posts/1", {
        method: "DELETE",
      });
      if (res.ok) {
        setPosts(posts.filter((post) => post.id !== id));
        alert("task deleted successfully");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);

    navigate("/");
    console.log("User signed out");
  };

  return (
    <div className=" w-full h-screen">
      <div className="flex w-full justify-between">
        <div></div>
        <button onClick={handleSignOut} className="p-4 bg-red-500 rounded">
          logout
        </button>
      </div>

      <CreatePost posts={posts} setPosts={setPosts} />
      <div className="m-4">
        <h1 className="font-bold text-lg">Posts</h1>
      </div>
      <div className="post flex flex-wrap w-full">
        {posts.map((post) => (
          <div key={post.id} className="card  mb-3 h-[40vh] w-[20vw] gap-4">
            <div className="card-body">
              {editingPost && editingPost.id === post.id ? (
                <>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    value={editingPost.title}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, title: e.target.value })
                    }
                    className="form-control mb-2 border w-full p-[10px]"
                  />
                  <label htmlFor="body">Description</label>
                  <textarea
                    value={editingPost.body}
                    onChange={(e) =>
                      setEditingPost({ ...editingPost, body: e.target.value })
                    }
                    className="form-control mb-2 w-full h-[70%] "
                  />
                  <div className="flex justify-around">
                    <button
                      onClick={handleUpdatePost}
                      className="btn btn-success p-2 bg-blue-500 rounded"
                    >
                      Update Post
                    </button>
                    <button
                      onClick={() => setEditingPost(null)}
                      className="btn btn-secondary p-2 bg-red-500 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h5 className="card-title font-bold text-xl">{post.title}</h5>
                  <p className="card-text">{post.body}</p>

                  <div className="flex justify-around mt-4">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="btn btn-warning me-2 p-2 bg-blue-500 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="btn btn-danger p-2 bg-red-500 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
