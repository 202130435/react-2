// posts.tsx

export type Post = {
  slug: string; 
  title: string;
  author: string;
  content: string;
};


export const posts: Post[] = [
  {
    slug: "learn-nextjs",
    title: "Next.js 배우기",
    author: "허동민",
    content: "Next.js는 React 기반의 강력한 프레임워크입니다.",
  },
  {
    slug: "lunch",
    title: "점심 메뉴",
    author: "허동민",
    content: "간장불고기",
  },
  {
    slug: "dinner",
    title: "저녁 메뉴",
    author: "허동민",
    content: "닭가슴살",
  },
  {
    slug: "dynamic-routing-example",
    title: "동적 라우팅 예제",
    author: "허동민",
    content: "폴더 이름을 [slug]와 같이 대괄호로 묶어 동적 세그먼트를 만들 수 있습니다.",
  }
];