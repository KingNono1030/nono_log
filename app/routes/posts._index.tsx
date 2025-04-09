import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { getAllPosts } from "~/utils/blog.server";

export async function loader() {
  const posts = await getAllPosts();
  return json(posts);
}

export default function PostsIndex() {
  const posts = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">블로그 포스트</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link to={`/posts/${post.slug}`}>{post.title}</Link>
            <p>{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </div>
  );
} 