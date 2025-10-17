import { posts } from "./posts"

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  // generateStaticParams가 없으면 여기서 slug를 가져와서 처리
  const post = posts.find((p) => p.slug === params.slug);

  if (!post) {
    return <div>포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </article>
  );
}