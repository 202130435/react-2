
import Link from "next/link";
import { posts } from "./posts";

export default function BlogPage() {
  return (
    <div>
      <h2>블로그 목록</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog2/${post.slug}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}