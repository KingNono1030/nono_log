import { BlogPost, BlogPostFrontmatter } from "~/types/blog";
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'app/posts');

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  return {
    slug,
    title: data.title,
    content,
    excerpt: data.excerpt,
    date: data.date,
    tags: data.tags || [],
    author: data.author,
  };
}

export async function getAllPosts(): Promise<BlogPostFrontmatter[]> {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      date: data.date,
      tags: data.tags || [],
      author: data.author,
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
} 