import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPostBySlug } from '~/utils/blog.server';
import { MDXRemote } from 'next-mdx-remote';

export async function loader({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);
  return json(post);
}

export default function Post() {
  const { content, title } = useLoaderData();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{title}</h1>
      <MDXRemote source={content} />
    </div>
  );
}
