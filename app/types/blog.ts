export type BlogPost = {
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  tags: string[];

  author: string;
};

export type BlogPostFrontmatter = Omit<BlogPost, 'content'>;
