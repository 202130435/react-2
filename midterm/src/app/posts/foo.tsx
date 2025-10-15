// /app/foo/[slug]/page.tsx

import { posts } from '@/app/[slug]/posts';
type PageProps = {
  params: {
    slug: string;
  };
};

export default function FooPostPage({ params }: PageProps) {
  const { slug } = params;
  const post = posts.find((p) => p.slug === slug);


  if (!post) {
    return (
      <div>
        <h1>포스트를 찾을 수 없습니다.</h1>
        <p>요청하신 URL과 일치하는 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>
        <strong>작성자:</strong> {post.author}
      </p>
      <p>{post.content}</p>
    </article>
  );
}