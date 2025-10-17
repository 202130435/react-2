import Link from 'next/link';
import { posts } from '@/app/[slug]/posts';
export default function PostsListPage() {
  return (
    <div>
      <h1>블로그 포스트 목록</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/foo/${post.slug}`}>
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
} 