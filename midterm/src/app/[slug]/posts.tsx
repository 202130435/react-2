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
    slug: "typescript-basics",
    title: "TypeScript 기초",
    author: "허동민",
    content: "TypeScript는 정적 타입을 지원하여 코드의 안정성을 높여줍니다.",
  },
  {
    slug: "how-to-commit",
    title: "Git 커밋만 하는 방법",
    author: "허동민",
    content: "'git commit -m' 명령어만 사용하면 로컬 저장소에만 변경사항을 저장할 수 있습니다.",
  },
  {
    slug: "dynamic-routing-example",
    title: "동적 라우팅 예제",
    author: "허동민",
    content: "폴더 이름을 [slug]와 같이 대괄호로 묶어 동적 세그먼트를 만들 수 있습니다.",
  }
];