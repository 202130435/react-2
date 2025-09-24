# React2
# 202130435 허동민

## 9월 24일 5주차 수업내용
### searchParams란?
- #URL 쿼리 문자열(Query String)을 읽는 방법입니다.
- #예시 URL:
/products?category=shoes&page=2
- #여기서 category=shoes, page=2가 search parameters입니다.
- #Next.js의 App Router에서 searchParams는 다음과 같이 사용할 수 있습니다.
```js
//app/products/page.js
export default function productspage({ searchParams }) {
return <p>카테고리: {searchParams.category}</p>;
}
```
- #searchParams는 컴포넌트의 props로 전달되며, 내부적으로는 URLSearchParams 처럼 작 동합니다.
- #실습은 뒤에서 하겠습니다.

### 왜 "동적 렌더링"이 되는가?
- #Next.js에서 페이지는 크게 정적(static) 또는 동적(dynamic)으로 렌더링될 수 있습니 다.
- #searchParams는 요청이 들어와야만 값을 알 수 있기 때문에, Next.js는 이 페이지를 정 적으로 미리 생성할 수 없고, 요청이 올 때마다 새로 렌더링해야 합니다.
- #따라서 해당 페이지는 자동으로 동적 렌더링(dynamic rendering)으로 처리됩니다.
- #즉, searchParams를 사용하는 순간 Next.js는
  "이 페이지는 요청이 들어와야 동작하네? 그럼 정적으로 미리 만들 수 없겠다!" 라고 판단합니다.
- #동적 렌더링 vs 정적 렌더링 비교  
<img width="391" height="77" alt="Image" src="https://github.com/user-attachments/assets/92b15b91-f341-4415-9b11-4e2509ad5db7" />

### #searchParams 실습
- #파일 구조는 다음과 같습니다.
- #디렉토리와 파일을 다음 구조와 같이 만듭니다.
app/  
  Lproducts/  
    Lpage.tsx  
- #라인 1: 함수 선언 합니다.
- #라인 2~5: 2. 매개 변수 / 4. 타입 선언, searchParams는 Promise 객체 입니다.

```tsx
export default async function ProductsPage({
  searchParams
}: {
  searchParams: Promise<{ id?: string: name?: string }>
}) {
  const { id="non id", name = "non name" } = await searchParams;
  return (
    <div>
      <h1>Products Page</h1>
      <p>id: {id}</p>
      <p><name>: {name}</p>
    </div>
  )
}
```

### #[slug]의 이해
- #데이터 소스가 크다면 find는 0(n)이므로 DB 쿼리로 바꿔야 합니다.
  : O(n)은 알고리즘의 시간 복잡도가 입력 데이터의 크기 n에 비례하여 시간이나 메모리
사용량이 선형적으로 증가하는 것을 의미합니다.
- #앞의 코드에서는 Promise... >를 사용하지 않아도 오류 없이 동작했습니다.
- #하지만 params가 동기식처럼 보이지만 사실은 비동기식이라는 것을 좀더 명확히 하기 위해 사용합니다. 코드의 가독성이 좋습니다.
- #또 한가지 Promise를 명시해주면 await을 깜빡했을 때 TypeScript가 이를 잡아줍니다.
- #결론적으로 오류와 상관없이 Promise 사용을 권장합니다.

### #searchParams 실습 (코드 설명)
- #라인 6: await를 쓰면 그 Promise가 끝나고, 실제 값(객체)이 반환됩니다.
// URL:/productstid-fookname-bar 
await searchParams;
// : { id: "foo", name: "bar" }
- #비구조화 할당(object destructuring)으로 객체에서 속성을 꺼내 옵니다.
- #라인 6의 나머지 왼쪽 부분은 초기값을 지정한 것입니다.
```tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const filters = (await searchParams).filters
}
```

### 7. Linking between pages(페이지 간 연결)
- <Link> 컴포넌트를 사용하여 경로 사이를 탐색 할 수 있습니다.
- <Link>는 HTML <a> 태그를 확장하여 prefetching 및 client-side navigation 기능을 제공하는 Next.js의 기본제공 컴포넌트입니다.
  - Prefetching은 사용자가 해당 경로로 이동하기 전에 백그라운드에서 해당 경로를 loading 하는 프로세스입니다.
- 예를 들어, 블로그 글 목록을 생성하려면 next/link에서 <Link>를 가져와서 컴포넌트에 href prop을 전달합니다.
```tsx
import Link from 'next/link'
 
export default async function Post({ post }) {
  const posts = await getPosts()
 
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

### 7. Linking between pages(페이지 간 연결)
알아두면 좋아요:
- <Link>는 Next.js에서 경로를 탐색하는 기본 방법입니다.
- 보다 고급 탐색을 위해 useRouter Hook을 사용할 수도 있습니다.

### #Link 컴포넌트 실습
- #앞에서 만든 blog page와 더미 데이터를 사용해서 Link 실습을 진행합니다.
- #blog page를 열면 다음과 같이 각각의 목록에 링크를 추가해 보세요.

<img width="110" height="146" alt="Image" src="https://github.com/user-attachments/assets/6f2ce489-66fd-4316-b10d-142d59cbccea" />  

- #다음으로 모든 페이지에서 확인할 수 있는 Home과 Blog로 가는 메뉴를 만들어 보세요.

### #Link 컴포넌트 실습
# /blog/page.tsx
```tsx
import Link from "next/link";
import { posts } from "../(marketing)/blog/[slug]/posts";

export default async function BlogPage3() {
    return (
        <div>
            <h1>블로그3 목록</h1>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <Link href={`/blog3/${post.slug}`}>{post.title}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
```

### #Route 방식 비교
1. React vs Next.js 라우팅 방식의 차이
<img width="377" height="85" alt="Image" src="https://github.com/user-attachments/assets/5be0f550-d6ed-47ee-93df-372fd1a60552" />

- #React는 기본적으로 라우팅 기능이 없기 때문에, 직접 라우터 라이브러리를 설치해서 라우팅을 설정해야 합니다.
- #Next.js는 자체적으로 라우팅 시스템을 내장하고 있습니다.

### #Route 방식 비교
2. Next.js의 라우팅 방식: Pages Router vs App Router

<img width="379" height="107" alt="Image" src="https://github.com/user-attachments/assets/669800f5-33be-4619-bd4e-619296ea1d2b" />

- pages router 구조 예시 
pages/
  ㄴ index.tsx -> /
  ㄴ about.tsx -> /about
  ㄴ blog/[slug].tsx -> /blog/hello, /blog/nextis-routing 등
- √export default function Page() 형식으로 구성
- √각 파일은 하나의 페이지 컴포넌트
- SSR/SSG 함수는 getStaticProps, getServerSideProps 등으로 처리

### # Route 방식 비교

app router 구조 예시

├── layout.tsx      - 모든 페이지에 공통 적용될 레이아웃  
├── page.tsx        - /  
├── about/  
│   └── page.tsx    - /about  
├── blog/  
│   ├── layout.tsx  - /blog에 공통 적용  
│   └── [slug]/  
│       └── page.tsx - /blog/hello 등  


✅ page.js: 각 세그먼트의 페이지
✅ layout.js: 해당 세그먼트 이하의 모든 페이지에 공통 레이아웃 적용
✅ 추가 기능: loading.js, error.js, not-found.js, route groups, parallel routes 등

### 📌 Route 방식 비교
✅ App Router의 강력한 기능들
기능	설명
중첩 레이아웃	여러 레벨의 layout.js 파일을 통해 레이아웃을 계층적으로 구성 가능
서버 컴포넌트 지원	서버에서만 렌더되는 컴포넌트로 성능 최적화 가능
(React Server Component)
로딩 UI	특정 경로에 한정된 로딩용 loading.js 제공
에러 UI	특정 경로에 한정된 에러용 error.js 제공
병렬 라우팅	하나의 경로 안에서 탭 같은 독립적인 뷰를 병렬로 렌더링 가능
✅ 프로젝트 별 추천 방식
상황	추천 방식
새 프로젝트 시작	App Router (app 디렉토리 기반)
기존 프로젝트 유지보수	pages/ 계속 사용 가능하므로 굳이 마이그레이션 필요 없음
React에 손을 자주 넣어야 하는 경우	react-router-dom 사용하는 것이 좋음
(Next.js 라우팅 의존성 없음)

### 📝 Introduction
- Next.js에서 경로는 기본적으로 서버에서 렌더링됩니다.
- 즉, 클라이언트는 새 경로를 표시하기 전에 서버의 응답을 기다려야 하는 경우가 많습니다.
- Next.js에는 prefetching, streaming, 그리고 client-side transitions(클라이언트 사이드 전환)
기능이 기본 제공되어 느린 네트워크에서도 속도와 부드러운 반응성이 뛰어납니다.
🔎 자세한 내용은 다음 장에서 설명합니다.
🎯 이번 장에서는
- Next.js에서 네비게이션에 접목되는 방식, 호출 구조와
느린 네트워크에 맞춰 네비게이션을 최적화하는 방법을 설명합니다.

### How navigation works(네비게이션 작동 방식)

- Next.js에서 네비게이션이 어떻게 작동하는지 이해하려면 다음 개념을 익숙해지는 것이 좋습니다.
- Server Rendering(서버 렌더링)
- Prefetching(프리패칭)
- Streaming(스트리밍)
- Client-side transitions(클라이언트 측 전환)

### 1-1. Server Rendering(서버 렌더링)
- Next.js에서 렌더링되는 페이지는 기본적으로 React 서버 컴포넌트입니다. (React문서 참조)
- 초기 네비게이션 및 추후 네비게이션 시에, 서버 컴포넌트 페이지는 클라이언트로 전송되기 전에 서버에서 렌더링됩니다.

### 1-1. Server Rendering(서버 렌더링)
- 서버 렌더링에는 다음 시점에 따라 두 가지 유형이 있습니다.
- **정적 렌더링**(또는 사전 렌더링)은 서버 시작시간에 미리 계산을 통해 캐시를 생성합니다. 
    - *사용자는 초기 페이지 로드 시에 더 빠른 렌더링을 경험할 수 있습니다.*
- **동적 렌더링**은 클라이언트의 요청에 대한 응답으로 오직 실시간에 발생합니다.
- 서버 렌더링의 단점은 클라이언트가 새 경로를 요청하기 전에 서버의 응답을 기다려야 한다는 것입니다.
- Next.js는 사용자가 방문할 가능성이 높은 경로를 미리 가져오(prefetching)하고, 클라이언트 측 전환(client-side transitions)을 수행하여 지연 문제를 해결합니다.
- 알아두면 좋습니다: 최신 방향은 서버에서 페이지 HTML이 생성됩니다.

### 알아두면 좋습니다의 설명
- 최적 방향은 처음 방문할 때 HTML이 생성됩니다.
  - (HTML is also generated for the initial visit.)
- 이 말의 의미에 대해서 설명합니다.
- 일반적인 React 앱은 클라이언트 사이드 렌더링(CSR)과 사용하여, 처음 페이지를 방문할 때 **비 HTML** & **JavaScript 파일만 네트워크**로 다운로드되고, 브라우저가 JS를 실행해야 페이지를 렌더링합니다.

- 하지만 Next.js에서는:
  - 사용자가 첫 번째 URL을 처음 방문하면(initial visit)서버가 해당 페이지의 HTML을 미리 생성해서 브라우저로 전송합니다.
  - 따라서 브라우저는 JS 코드가 로드되도록 하며 HTML 컨텐츠를 표시할 수 있습니다.
  - 이때 React의 하이드레이션(hydration) 과정이 가동되어 실제로 실행됩니다.

- 즉, **"초기 방문 사이트의 HTML을 생성해서 내려주기 때문에, 사용자가 경험(UX)이 좋아지고 SEO도 유리하다는 의미입니다."**

### 1-2. Prefetching(프리페칭: 미리 가져오기)
- 프리페칭은 사용자가 해당 경로로 이동하기 전에 백그라운드에서 해당 경로를 로드하는
프로세스입니다.
- 사용자가 링크를 클릭하기 전에 다음 경로를 렌더링하는 데 필요한 데이터가 클라이언 트 즉에 이미 준비되어 있기 때문에 애플리케이션에서 경로 간 이동이 즉각적으로 느껴 집니다.
- Next.js는 <link› 컴포넌트와 연결된 경로를 자동으로 사용자 뷰포트에 미리 가져옵니 다.
- <a> tag를 사용하면 프리페칭을 하지 않습니다.
```tsx
import Link from 'next/link'
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <nav>
          {/* Prefetched when the link is hovered or enters the viewport */}
          <Link href="/blog">Blog</Link>
          {/* No prefetching */}
          <a href="/contact">Contact</a>
        </nav>
        {children}
      </body>
    </html>
  )
}
```

### 1-2. Prefetching(프리페칭: 미리 가져오기)
- 미리 가져오는 경로의 양은 정적 경로인지 동적 경로인지에 따라 달라집니다.
- √정적 경로: 전체 경로가 프리퍼치 됩니다.
- √동적 경로: 프리페치를 건너뛰거나, loading.ts가 있는 경우 경로가 부분적으로 프리 페칭 됩니다.
- Next.js는 동적 라우팅을 건너뛰거나 부분적으로 프리페칭하는 방법으로 사용자가 방문 하지 않을 수도 있는 경로에 대한 서버의 불필요한 작업을 방지합니다.
- 그러나 네비게이션 전에 서버 응답을 기다리면 사용자에게 앱이 응답하지 않는다는 인상을 줄 수도 있습니다.
- 동적 경로에 대한 네비게이션 환경을 개선하려면 스트리밍을 사용할 수 있습니다. 
<img width="1600" height="748" alt="Image" src="https://github.com/user-attachments/assets/a5d9f077-9bf7-45d6-9f43-04fcdd127ad9" />

### 1-3. Streaming (스트리밍)
- 스트리밍을 사용하면 서버가 전체 경로가 렌더링될 때까지 기다리지 않고, 동적 경로의 일부가 준비되는 즉시 클라이언트에 전송할 수 있습니다.
- 즉, 페이지의 일부가 아직 로드 중이더라도 사용자는 더 빨리 콘텐츠를 볼 수 있습니다.
- 동적 경로의 경우, 부분적으로 미리 가져올 수 있다는 뜻입니다. 즉, 공유 레이아웃과 로딩 스켈레톤을 미리 요청할 수 있습니다.  

<img width="1600" height="785" alt="Image" src="https://github.com/user-attachments/assets/19fd8290-32c2-40c2-bd2e-c42091b38d95" />

- loading Skeletons 또는 앱에서 콘텐츠가 로드되는 동안 사용자에게 보여지는 빈 화면의 일종

### 1-3. Streaming(스트리밍)
- 스트리밍을 사용하려면 라우팅 폴더에 loading.tsx 파일을 생성합니다.

<img width="1600" height="606" alt="Image" src="https://github.com/user-attachments/assets/901b980f-8e6b-44c4-b7b0-3fb7f73838c9" />

```tsx
export default function Loading() {
  // Add fallback UI that will be shown while the route is loading.
  return <LoadingSkeleton />
}
```

### 1-3. Streaming (스트리밍)
- Next.js는 백그라운드에서 page.tsx 콘텐츠를 <Suspenser 경계로 자동 래핑합니다.
- 미리 가져온 대체 UI는 경로가 로드되는 동안 표시되고, 준비가 되면 실제 콘텐츠로 대 체됩니다.
- 알아두면 좋은 정보: <Suspense>를 사용하여 중첩된 컴포넌트에 대한 로딩 UI를 만들
수도 있습니다. React 예제를 참고하세요.
- loading.tsx의 이점:
- √ 사용자에게 즉각적인 네비게이션과 시각적 피드백을 제공합니다.
- √ 공유 레이아웃은 상호 작용이 가능하고, 네비게이션은 중단될 수 있습니다.
- √ 개선된 핵심 웹 핵심 지표: TFB, FCP, 및 III
- 네비게이션 환경을 더욱 개선하기 위해 Next.js는 <linko 컴포넌트를 사용하여 클라이 언트 즉 전환을 수행합니다.
- Web Vitals: 웹사이트의 사용자 경험을 측정하고 개선하기 위한 구글의 핵심 지표
- Core WebKitals: 페이지 로딩 성능 상호작용 반응성, 시각적 안정성을 측정하는 핵심 지표

### Shared layouts remain interactive and navigation is interruptible
[ Shared layouts remain interactive ]
- #Next.js App Router에서는 layout.tsx가 여러 페이지 간에 공유(Shared) 됩니다. 예: /blog/page.tsx와/blog/[slug]/page.tsx 모두 blog/layout.tsx를 공유.
- #페이지 이동 시 layout.tsx는 다시 리렌더링되지 않고 그대로 유지되기 때문에, 사이드 바, 네비게이션 메뉴, 음악 플레이어 같은 UI가 새 페이지 로딩 중에도 계속 동작합니 다.
[navigation is interruptible]
- #Next.js는 페이지 이동 시 새로운 데이터를 불러오는데, 그 사이에 사용자가 다른 네비 게이션 동작을 하면 이전 로딩을 취소(cancel) 해 줍니다.
- #즉, 네트워크 요청이나 렌더링이 진행 중이라도 사용자가 다시 클릭하면 이전 요청은 중단되고 새로운 요청만 실행 됩니다.
- 즉, 레이아웃은 페이지 전환 중에도 계속 동작하고, 페이지 이동이 진행 중이어도 다 른 이동 요청이 들어오면 취소 가능하다는 의미입니다.

### 

## 9월 17일 4주차 수업내용
### git checkout vs git switch 차이
- checkout은 브랜치를 이동 하고 파일도 바꿀 수 있습니다. 이 때문에 실수할 위험성이
있습니다.
- switch는 브랜치만 이동할 수 있기 때문에 안전하게 사용할 수 있습니다.
- switch는 이미 작성된 commit을 조작하는 것만 할 수 없는 것이지 나머지 작업, 즉 파
일을 작성하고, 수정하고, 커밋하는 것은 가능합니다.
- 특별한 이유가 없다면 switch를 사용하세요.

### git checkout vs git switch 차이
- 그런데 왜 checkout은 그대로 남아있나?
- 파일 복원 등 이미 commit된 파일을 조작할 수 있기 때문입니다.
  특히 git checkout [커밋 해시] 명령으로 특정 commit으로 이동할 수 있습니다.
- 새 branch를 만드는 명령은 다음 3가지 입니다.
- 단 branch 명령은 이동은 할 수 없습니다.
- 또한 switch와 checkout은 branch를 만들기만 할 수는 없고, 만들고 바로 이동합니다.  

<img width="167" height="58" alt="Image" src="https://github.com/user-attachments/assets/60ada1c4-55da-47db-b89f-08b49e752af5" />  

- 참고로 branch 명령은 branch의 생성, 삭제, 확인 등을 할 때 사용합니다.
- 이미 작성한 코드를 보전하고 싶을 때는 branch를 이용해 보세요.

### 1. Creating a page(페이지 만들기)
- Next.js는 파일 시스템 기반 라우팅을 사용하기 때문에 폴더와 파일을 사용하여 경로를 정의할 수 있습니다.
- 이번 장에서는 레이아웃과 페이지를 만들고 서로 연결하는 방법을 설명합니다.
- page는 특정 경로에서 렌더링되는 UI입니다.
- page를 생성하려면 app 디렉터리에 page파일을 추가하고, React 컴포넌트를 default
export합니다. 예를 들어, 인덱스 page(/)를 생성하려면 다음과 같이 합니다.
- #2장에서 이미 학습한 내용이지만 다시 한 번 작성해 보세요.
<img width="672" height="137" alt="Image" src="https://github.com/user-attachments/assets/255647a9-f335-4f9d-8ec4-32e081aec39a" />
```tsx
export default function Page() {
  return <h1>Hello Next.js!</h1>
}
```

### 2. Creating a layout(레이아웃 만들기)
- layout은 여러 페이지에서 공유 되는 UI입니다.
- layout은 네비게이션에서 state 및 상호작용을 유지하며, 다시 렌더링 되지는 않습니다.
- layout 파일에서 React 컴포넌트의 default export를 사용하여 layout을 정의할 수 있습니다.

- layout 컴포넌트는 page 또는 다른 layout이 될 수 있는 children prop을 허용해야 합니다.
```
<Layout>
  <Page /> 
</Layout>
```
```
<Layout>
  <AnotherLayout>
    <Page />
  </AnotherLayout>
</Layout>
```
- #children은 컴포넌트 안에 감싸진 요소(컴포넌트)를 의미합니다.
- #다음 코드에서 <page />는 <Layout />컴포넌트의 children입니다.
- #layout 컴포넌트를 만들 때 그 안에 들어갈 콘텐츠(children)를 받을 수 있게 해야 하
고, 그 컨텐츠는 page 또는 layout 컴포넌트가 될 수도 있다는 의미입니다.

### 2. Creating a layout(레이아웃 만들기)
- 예를 들어, index 페이지를 자식으로 허용하는 레이아웃을 만들려면 app 디렉토리에 layout 파일을 추가합니다.
```tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* Layout UI */}
        {/* Place children where you want to render a page or nested layout */}
        <main>{children}</main>
      </body>
    </html>
  )
}
```
- 위의 레이아웃은 app 디렉터리의 루트에 정의되어 있으므로 "루트 레이아웃"이라고 힘 니다.
- 루트 레이아웃은 필수이며, html 및 body 태그를 포함해야 합니다.

### 2. Creating a layout(레이아웃 만들기)
- #RootLayout component는 반드시 있어야 합니다.
- #하지만 subpage layout은 없어도 상관 없습니다.
- #그리고 문서에서는 root layout의 이름을 DashboardLayout이라고 했지만 특별한 이유가 없다면 RootLayout으로 하는 것이 좋습니다.
- #문서에서는 dashboard 디렉토리를 의미 하는 것 같지만, layout은 결국 routing page를 위한 것이기 때문에 RootLayout으로 명명하는 것이 좋습니다.

### 3. Creating a nested route(중첩 라우트 만들기)
- 중첩 라우트는 다중 URL 세그먼트로 구성된 라우트입니다.
- 예를 들어, /blog/[slug]경로는 세 개의 세그먼트로 구성됩니다.
  -/(Root Segment)
  -blog (Segment)
  -[slug] (Leaf Segment)
[Next.js에서]
- 폴더는 URL 세그먼트에 매핑되는 경로 세그먼트를 정의하는데 사용됩니다. #즉 폴더가 URL 세그먼트가 된다는 의미 입니다.
- 파일(예: page 및 layout)은 세그먼트에 표시되는 UI를 만드는 데 사용됩니다. 폴더를 중첩하면 중첩된 라우트를 만들 수 있습니다.
- URL Segment URL에서 특정 리소스에 대한 경로를 구성하는 부분을 의미

### 3. Creating a nested route(중첩 라우트 만들기)
- 예를 들어 /blog에 대한 경로를 추가하려면 app 디렉터리에 blog라는 폴더를 만듭니다.
- 그리고/blog에 공개적으로 액세스할 수 있도록 하려면 page.tsx 파일을 추가합니다.  
<img width="682" height="239" alt="Image" src="https://github.com/user-attachments/assets/6db10bd0-3291-4777-8df0-52a9695b005c" />

```tsx
// Dummy imports
import { getPosts } from '@/lib/posts'
import { Post } from '@/ui/post'
 
export default async function Page() {
  const posts = await getPosts()
 
  return (
    <ul>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </ul>
  )
}
```  

### 문서의 코드를 복사하면 오류가 나옵니다.
- #@/lib/posts와 @/ui/post를 작성하지 않았기 때문에 오류가 발생합니다.
- #다음과 같이 수정해 주세요.
```tsx
export default function Page() {
  return (
    <ul>
      <li>Post 1</li>
      <li>Post 2</li>
      <li>Post 3</li>

    </ul>
  )
}
```
- #문서에서 별도의 library를 사용한 것은 blog폴더 하나에는 하나의 URL 세그먼트만 존
재하지만, 많은 양의 post를 각기 다른 주소로 호출하기 위한 동적 라우팅인 [slug]를 설명하기 위해서 입니다.
- #우선 blog page에서는 list를 바로 뿌려주고, [slug]는 dummy data를 이용해서 테스트 하겠습니다.

### 3. Creating a nested route(중첩 라우트 만들기)
- 폴더를 계속 중첩하여 중첩된 경로를 만들 수 있습니다.
- 예를 들어 특정 블로그 게시물에 대한 경로를 만들려면 blog 안에 새 [slug] 폴더를 만 들고 page 파일을 추가합니다.
- 폴더 이름을 대괄호(예: [slug])로 묶으면 데이터에서 여러 페이지를 생성하는데 사용
되는 동적 경로 세그먼트가 생성됩니다. 예: 블로그 게시물, 제품 페이지 등.
<img width="1920" height="824" alt="Image" src="https://github.com/user-attachments/assets/f8454cd6-8518-4d79-83e3-9c37199d96fc" />

```tsx
function generateStaticParams() {}
 
export default function Page() {
  return <h1>Hello, Blog Post Page!</h1>
}
```

### [slug]의 이해
- #slug는 사이트의 특정 페이지를 쉽게 읽을 수 있는 형태로 식별하는 URL의 일부입니다.
- 신문이나 잡지 점에서 핵심 코미를 포함하는 단어만을 조합해 간단 정료하거 제목을 작성하는 것을 슐러그라고 하는 것에서 유래 하였습니다.
- #문서의 경로/blog/[slug]의 [slug] 부분은 불러올 데이터의 key를 말합니다.
- #따라서 데이터에는 slug key가 반드시 있어야 합니다.
<img width="367" height="87" alt="Image" src="https://github.com/user-attachments/assets/e5b477de-dea9-4b5c-973c-1499ce21026f" />

- #예를 들어 첫 번째 데이터를 호출하는 경우라면 /blog/nextjs 라고 호출합니다.
- #먼저 더미 데이터를 만들고 실습을 해보도록 하겠습니다.
- [slug]는 반드시 slug일 필요는 없습니다. 단, [foo]라고 했다면 데이터에 반드시 foo key(필드)가 있어야 합니다.

### # [slug]||||
- #디렉토리 구조는 다음과 같습니다. 문서에도 구조가 나와 있습니다.
<img width="165" height="69" alt="Image" src="https://github.com/user-attachments/assets/603bebd8-7bb1-45c0-911c-d3c6e6f0d6b7" />

- #/blog/[slug]/page.tsx
<img width="286" height="161" alt="Image" src="https://github.com/user-attachments/assets/ede6f3dc-229a-425d-abdb-2fcb90bfac12" />

### [slug]의 이해
- #코드 작성이 완료되면 /blog/[slug]로 접속해 봅니다.
- #여기서 [slug]는 nextjs, routing, ssr-ssg, dynamic-routes에 해당합니다.
- #동작은 정상적으로 되지만 한가지 오류가 발생합니다.
Error: Route "/blog/[slug]" used "params.slug"- "params" should be awaited before using its properties.
- #이 오류는 Next.js App Router에서 params가 비동기(async) 객체처럼 다뤄지는 경우 발생합니다.
- #Next.js 14.2 이후로 params와 searchParams는 내부적으로 Promise 기반 객체일 수 있어서, 바로 쓰면 안 되고 await하거나 props의 구조 분해에서 미리 await해야 합니다. #현재 실습 중인 버전은 15.x이기 때문에 오류가 발생하는 것입니다.
- #수정한 코드는 다음과 같습니다.

### [slug]의 이해 
- #수정한 코드는 다음과 같습니다. 서버를 재 실행해야 정상 동작할 수도 있습니다.
<img width="382" height="238" alt="Image" src="https://github.com/user-attachments/assets/6d90b08e-f742-44f7-bbd3-fea4d4a5736f" />

### # [slug]의 이해
```export default async function Posts({ params }: { params: { slug: string } }) {
const { slug } = await params; // params 예제
const post posts.find((p)p.slugslug);
}
```
- #다음은 3, 4, 5 라인의 의미에 관해서 설명입니다.
- #async function: 함수를 async로 선언해야 내부에서 await를 쓸 수 있습니다.
- #await을 사용하는 이유는 서버의 데이터를 읽어올 때 타임 딜레이에 의한 오류를 방지 하기 위해서 입니다.
  - RESTful API HTTP 프로토콜을 사용하여 자원을 식별하고 조작하는 통신 규칙을 정의
- #매개변수 구조({ params }): Next.js가 페이지를 호출할 때는 props 객체로 {params.
searchParams, ... } 같은 값을 넘겨주는데, 여기서 params만 구조 분해로 받고 있습니다.
- #타입 { params: Promisec{ slug: string }> }: Typescript 타입 선언입니다.
- #params가 Promise(비동기 값)임을 명시하고 있습니다.
- #최신 Next.js (14.2+)에서는 내부적으로 params를 비동기로 다루고 있습니다.

### # [slug]의 이해
```tsx
export default async function Posts({ params }: { params: { slug: string } })
 { const { slug } = await params; // params
const post = posts.find((pp.slugmslug);
 }
```
- #4번째 라인 const { slug} = await params;
- #await params params가 가리키는 Promise를 해제(resolve) 해서 실제 객체 { slug:"..." }를 얻습니다.
- #const { slug }....는 그 객체에서 slug 프로퍼티만 꺼내 오는 구조 분해 할당입니다. 
- #풀어 쓰면 다음과 같은 의미 입니다
```
const resolved = await params;
const slug resolved.slug:
```

### # [slug]의 이해
```tsx
export default async function Posts({ params }: { params: { slug: string } })
 { const { slug } = await params; // params
const post = posts.find((pp.slugmslug);
 }
```
- #5번째 라인 const post = posts.find((p) p.slug === slug);
- #posts는 배열입니다. (예: 더미 데이터나 DB에서 가져온 결과)
- #.find()는 조건에 맞는 첫 번째 요소를 반환합니다. 못 찾으면 undefined를 반환합니다.
- #여기서는 D.slug가 URL에서 온 slug와 일치하는 게시글을 찾아 post에 할당합니다.
- #.find는 찾는 것이 없으면 undefined이기 때문에 이후에 post.title 같은 접근을 하면 런타임 에러가 납니다.
- #따라서 게시글이 존재 하는지를 검사할 필요가 있습니다.
- #문서에서는 없기 때문에 이부분을 추가한 것입니다. (lib에 별도로 구현했을 수는 있음)
```
if (post) {
// 404 처리: 사용자 친화적 메시지 또는 Next.js notfound
return <h1>게시글을 찾을 수 없습니다!</h1>;
}
```

### [slug]의 이해
- #데이터 소스가 크다면 find는 O(n)이므로 DB 쿼리로 바꿔야 합니다.
  : 0(n)은 알고리즘의 시간 복잡도가 입력 데이터의 크기 n에 비례하여 시간이나 메모리
  사용량이 선형적으로 증가하는 것을 의미합니다.
- #앞의 코드에서는 Promise...>를 사용하지 않아도 오류 없이 동작했습니다.
- #하지만 params가 동기식처럼 보이지만 사실은 비동기식이라는 것을 좀더 명확히 하기 위해 사용합니다. 코드의 가독성이 좋습니다.
- #또 한가지 Promise를 명시해주면 await을 깜빡했을 때 TypeScript가 이를 잡아줍니다.
- #결론적으로 오류와 상관없이 Promise 사용을 권장합니다.

### #/blog/page.tsx를 수정 해보자
- #앞에서 리스트로 출력만 했던 코드를 수정해 보겠습니다.
- #더미 데이터를 map 함수를 이용해서 출력해 줍니다. (구조 분해 할당)

```tsx
import { posts } from "Bests
export default sync function Page() {
  return (
    <ol>
      {posts.map{(post)=> (
        <li key={post.slug}>
          {post.title} / {post.content}
        </li>
    )}}
    </ol>
  )
}
```
1. Next.js 소개/Next.js는 React기반의 풀스택 프레임워크입니다.
2. App Router 알아보기/Next.js부터는 App Router가 도입되었습니다.
3. SSRvsSSG/서버사이드 렌더링과 전정적 사이트 생성의 차ㄹ이를 알아봅니다.
4. 동적 라우팅 / Next.js에서 [slug]를 발표한 라우팅 방식입니다.
- #출력을 확인해 봅니다.
- #보통은 /blog/page.tsx는 포스팅 리스트를 출력하고, /blog/[slug]/page.tsx는 상세 페이지를 출력하는 역할을 합니다.

### 4. Nesting layouts (중첩 레이아웃)
- 기본적으로 폴더 계층 구조의 레이아웃도 중첩되어 있습니다.
- 즉, 자식 prop을 통해 자식 레이아웃을 감싸게 됩니다.
- 특정 경로 세그먼트(폴더) 안에 레이아웃을 추가하여 레이아웃을 중첩할 수 있습니다.
- 예를 들어 blog 경로에 대한 레이아웃을 만들려면 blog 폴더 안에 새 레이아웃 파일을 추가합니다.
<img width="1920" height="922" alt="Image" src="https://github.com/user-attachments/assets/33235ae7-c069-4164-b55a-62f8e3233e21" />

```tsx
export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section>{children}</section>
}
```

### 5. Creating a dynamic segment(동적 세그먼트 만들기)
동적 세그먼트를 사용하면 데이터에서 생성된 경로를 만들 수 있습니다.
• 예를 들어, 각 blog 게시물에 대한 경로를 직접 만드는 대신, 동적 세그먼트를 만들어 블로그 게시물 데이터를 기반으로 경로를 생성할 수 있습니다.
• 동적 세그먼트를 생성하려면 세그먼트(폴더) 이름을 대괄호로 묶습니다. (예: [segmentName]）
예를 들어, app/blog/[slug]/page.tsx 경로에서 [slug]는 동적 세그먼트입니다.
```tsx
export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)
 
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  )
}
```

### 5. Creating a dynamic segment(동적 세그먼트 만들기)
- 동적 세그먼트 및 매개변수 props에 대해 자세히 알아보세요.
- 동적 세그먼트 내에 중첩된 레이아웃도 매개변수 props에 액세스할 수 있습니다.

### 6. Rendering with search params(검색 매개변수를 사용한 렌더링)
- 서버 컴포넌트 page에서는 searchParams prop을 사용하여 검색 매개변수에 액세스할 수 있습니다.
```
export default async function Page({
  searchParams,
}: { 
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const filters = (await searchParams).filters
}
```
- searchParams를 사용하면 해당 페이지는 동적 렌더링 (dynamic rendering)으로 처리됩니다.
- 왜냐하면 URL의 쿼리 파라미터(search parameters)를 읽기 위해 요청(request)이 필요하기 때문입니다.
- 클라이언트 컴포넌트는 useSearchParams Hook을 사용하여 검색 매개변수를 읽을 수 있습니다.
- 정적 렌더링과 동적 렌더링에서 useSearchParams를 사용하는 방법에 대해 자세히 알아보세요.

### 6. Rendering with search params(검색 매개변수를 사용한 렌더링)
- 무엇을 언제 사용해야 하나요?
  - 페이지에 대한 데이터를 로드하기 위해 검색 매개변수가 필요한 경우(예: 페이지 매김, 데이터베이스에서 필터링) searchParams prop을 사용합니다.
  - 검색 매개변수가 클라이언트에서만 사용되는 경우(예: props를 통해 이미 로딩된 목록을 필터링하는 경우) useSearchParams를 사용합니다.
  - 콜백이나 이벤트 핸들러에서 new URLSearchParams(window.location.search)를 사용하여 리랜더링을 하지 않고도 검색 매개변수를 읽어올 수 있습니다.
- #앞에서 살펴본 params와 searchParams의 차이는 다음과 같습니다.
- #params는 동적 세그먼트 [slug]에서 가져오는 값으로 URL의 path 부분에 포함된 데이터 를 의미합니다.
- #searchParams 는 query string에서 가져오는 값으로 URL의 ? 이후에 붙는 key=value 데이터를 의미합니다.

### searchParams란?
- #URL의 쿼리 문자열(Query String)을 읽는 방법입니다.
- #예시 URL: /products?category=shoes&page=2
- #여기서 category=shoes, page=2가 search parameters입니다.
- #Next.js의 App Router에서 searchParams는 다음과 같이 사용할 수 있습니다.
```js
// app/products/page.js
export default function ProductsPage({ searchParams }) {
  return <p>카테고리: {searchParams.category}</p>
}
```
- searchParams는 컴포넌트의 props로 전달되며, 내부적으로는 URLSearchParams처럼 작동합니다.
- 실습은 뒤에서 하겠습니다.

### # 왜 "동적 렌더링"이 되는가?
- Next.js에서 페이지는 크게 정적(static) 또는 동적(dynamic)으로 렌더링될 수 있습니다.
- `searchParams`는 요청이 들어와봐야 값을 알 수 있기 때문에, Next.js는 이 페이지를 정적으로 미리 생성할 수 없고, 요청이 올 때마다 서버 렌더링해야 합니다.
- 따라서 해당 페이지는 자동으로 동적 렌더링(dynamic rendering)으로 처리됩니다.
- 즉, `searchParams`를 사용하는 순간 Next.js는  
  "이 페이지는 요청이 들어와야 동작하네? → 그러면 정적으로 미리 만들 수 없겠다!"라고 판단합니다.
 🔁 동적 렌더링 vs 정적 렌더링 비교

| 항목            | 정적 렌더링 (Static)            | 동적 렌더링 (Dynamic)             |
|-----------------|----------------------------------|-----------------------------------|
| 예시            | /about, /blog/[id] 등            | /products?page=2 와 같이 동적 URL |
| 생성 시점       | 빌드 시 생성                     | 요청 시 서버에서 생성             |
| searchParams 사용 | 불가능                           | 가능                              |

### # searchParams 실습
- #파일 구조는 다음과 같습니다.
📁 app/
 ┗ 📁 products/
    ┗ 📄 page.tsx

- #디렉토리와 파일을 다음 구조와 같이 만듭니다.

```tsx
// src > app > products > page.tsx
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string; name?: string }>
}) {
  const { id = "no id", name = "non name" } = await searchParams;

  return (
    <>
      <h1>🛍️ Products Page</h1>
      <p>🆔 id : {id}</p>
      <p>🧑‍💼 name : {name}</p>
    </>
  );
}
```

## 9월 10일 3주차 수업내용
### 용어 정의
이 장부터 이후에 사용될 몇가지 용어에 대한 설명입니다.
- 원문에는 route라는 단어가 자주 등장하고, 사전적 의미로는 경로입니다.
- route(라우트)는 '경로를 의미하고, routing(라우팅)은 경로를 찾아가는 과정을 의미합니다.
- 그런데 path도 경로'로 번역하기 때문에의 구별을 위해 대부분 routing(라우팅)으로 번역했습니다.
- directory와 folder는 특별한 구분 없이 나옵니다.
- 최상위 폴더의 경우 directory로 하위 폴더는 folder로 쓰는 경우가 많지만 꼭 그렇지는 않습니다.
- directory와 folder는 OS에 따라 구분되는 용어이기 때문에 같은 의미로 이해하면 됩니다. 
- segment routing과 관련이 있는 directory의 별칭 정도로 이해하면 됩니다.

### 1. Folder and file conventions (폴더 및 파일 규칙)
[최상위 폴더] Top-level folders
- 최상위 폴더는 애플리케이션의 코드와 정적 자산을 구성하는 데 사용됩니다.  
<img width="409" height="138" alt="Image" src="https://github.com/user-attachments/assets/afdfab3f-afa8-4e72-bf10-bec0e2cfb881" />  
<img width="393" height="81" alt="Image" src="https://github.com/user-attachments/assets/247f72b0-724a-4b99-9982-084293d236d7" />

### 1. Folder and file conventions (폴더 및 파일 규칙)
[최상위 파일] Top-level files
-  최상위 파일은 애플리케이션 구성, 종속성 관리, 미들웨어 실행, 모니터링 도구 통합, 환경 변수
정의에 사용됩니다.
- *다음 파일이 프로젝트 생성과 동시에 모두 생성되는 것은 아닙니다.  
<img width="367" height="186" alt="Image" src="https://github.com/user-attachments/assets/ba279ab1-526e-426c-a8d7-ca5a8de1c540" />

### 1. Folder and file conventions (폴더 및 파일 규칙)
[라우팅 파일] Routing Files  
<img width="385" height="162" alt="Image" src="https://github.com/user-attachments/assets/5ec79123-1d31-48cf-a9d0-619c232aad77" />  
[중첩 라우팅] Nested routes  
<img width="298" height="44" alt="Image" src="https://github.com/user-attachments/assets/35358b10-afa4-46eb-8fc7-af4d5ad4ce91" />  

### 1. Folder and file conventions (폴더 및 파일 규칙)
[동적 라우팅] Dynamic routes   
<img width="308" height="48" alt="Image" src="https://github.com/user-attachments/assets/9d2799d6-0903-4b23-ae27-072349f84723" />  
[라우팅 그룹 및 비공개 폴더] Route Groups and private folders 
<img width="427" height="43" alt="Image" src="https://github.com/user-attachments/assets/a0d947d3-b9bc-4a25-bcf1-55418334117b" />  
[병렬 및 차단 라우팅] Parallel and Intercepted Routes  
<img width="282" height="86" alt="Image" src="https://github.com/user-attachments/assets/ff91dceb-8c81-453d-af8d-bca5419dc335" />  

### 1. Folder and file conventions (폴더 및 파일 규칙)
[메타데이터 파일 규칙] Metadata file conventions    
<img width="342" height="79" alt="Image" src="https://github.com/user-attachments/assets/8ec9701d-4203-465d-9c37-5592e8c93119" />    
Open Graph and Twitter images  
<img width="368" height="72" alt="Image" src="https://github.com/user-attachments/assets/8372234d-c3f1-44eb-8121-fe14e958d10a" />  
SEO  
<img width="236" height="59" alt="Image" src="https://github.com/user-attachments/assets/94c6cfcc-2eb8-4665-823e-15ae4d6606c0" />

### #Open Graph Protocol
- 웹사이트나 페이스북, 인스타그램, X (트위터), 카카오톡 등에 링크를 전달할 때 '미리보기' 를 생성하는 프로토콜 입니다.
-  Open Graph Protocol이 대표적인 프로토콜 입니다.
- 페이스북이 주도하는 표준화 규칙으로 대부분의 SNS 플랫폼에서 활용되고 있습니다.
-  모든 플랫폼이 동일한 방식으로 오픈 그래프를 처리하는 것은 아닙니다.
- 웹페이지의 메타 태그에 선언합니다.    
<img width="402" height="141" alt="Image" src="https://github.com/user-attachments/assets/cc7d0454-ee9f-49fe-9c5c-13e39f0aec36" />

### 2. Organizing your project(프로젝트 구성하기)
- Next.js는 프로젝트 파일을 어떻게 구성하고 어디에 배치할지에 대한 제약이 없습니다.
- 하지만 프로젝트 구성에 도움이 되는 몇 가지 기능을 제공합니다.
[component의 계층 구조 ] Component hierarchy
- 특수 파일에 정의된 component는 특정 계층 구조로 렌더링 됩니다.
- ✓ layout.js
- ✓ template.js
- ✓ errorjs(React 오류 경계)
- ✓ loading js(리액트 서스펜스 경계)
- ✓ not-found js(React 오류 경계)
- ✓ page.js 또는 중첩 layoutjs  
<img width="403" height="165" alt="Image" src="https://github.com/user-attachments/assets/863b4d2b-f992-4ece-9af0-18f816f4f2b0" />

### # layout과 template의 차이
- 마스터 텍스트 스타일 편집  
<img width="361" height="64" alt="Image" src="https://github.com/user-attachments/assets/ed5ce97e-70d9-4461-b51f-b0302d38e848" />

### 2. Organizing your project(프로젝트 구성하기)
- component는 중첩된 라우팅에서 재귀적으로 렌더링 됩니다.
- 즉, 라우팅 세그먼트의 component는 부모 세그먼트의 component 내부에 중첩됩니다. 
<img width="257" height="157" alt="Image" src="https://github.com/user-attachments/assets/b8be0070-1ff8-4dc6-b060-750b0c636ff3" />  

- 세그먼트(Segment)는 나뉘어진 각 부분, 분할된 부분, 또는 특정 기준에 따라 분류된 그룹을 의미 


### 2. Organizing your project(프로젝트 구성하기)
[코로케이션] Colocation - 파일 및 폴더를 기능별로 그룹화하여 프로젝트의 구조를 명확하게 정의
- app 디렉토리에서 중첩된 폴더는 라우팅 구조를 정의합니다.
- 각 폴더는 URL 경로의 해당 세그먼트에 맵핑되는 라우팅 세그먼트를 나타냅니다.
<img width="208" height="71" alt="Image" src="https://github.com/user-attachments/assets/a7457e05-c309-466f-af27-b6554959b308" />  

- 그러나 라우팅 구조가 폴더를 통해 정의되더라도 라우팅 세그먼트에 page.js 또는 routejs 파일이 추가
될 때까지 라우팅 폴더에는 공개적으로 액세스할 수 없습니다.    
<img width="197" height="113" alt="Image" src="https://github.com/user-attachments/assets/8934a78a-bdc9-460e-929b-80327d86a3c0" />

### 2. Organizing your project(프로젝트 구성하기)
- 즉, 프로젝트 파일을 app 디렉토리의 라우팅 세그먼트 내에 안전하게 배치하여 실수로 라우팅 되지 않도록 할 수 있습니다.   
<img width="406" height="261" alt="Image" src="https://github.com/user-attachments/assets/bdb9b225-8aad-4799-bf8f-cacc588dafc5" />

- 알아두면 좋아요: 프로젝트 파일을 app 폴더에 함께 저장할 수는 있지만 꼭 그럴 필요는 없습니다. 원한다면 app 디렉터리 외부에 보관할 수도 있습니다.

### 2. Organizing your project(프로젝트 구성하기)
[비공개 폴더] Private folders
- 비공개 폴더는 폴더 앞에 밑줄을 붙여서 만들 수 있습니다. folderName
- 이 것은 해당 폴더가 비공개로 구현되는 세부 사항이기 때문에 라우팅 시스템에서 고려되 어서는 안 되며, 따라서 해당 폴더와 모든 하위 폴더가 라우팅에서 제외됨을 나타냅니다.    
<img width="412" height="227" alt="Image" src="https://github.com/user-attachments/assets/0c8a88aa-aa0e-4192-bd1d-0e48a4dfaa06" />

### 2. Organizing your project(프로젝트 구성하기)
- app 디렉토리의 파일은 기본적으로 안전하게 코로케이션 될 수 있으므로, 코로케이션에
비공개 폴더는 불필요 합니다. 하지만 다음과 같은 경우에는 유용할 수 있습니다.
- √ UI 로직과 라우팅 로직을 분리합니다.
- √ 프로젝트와 Nextjs 생태계 전반에서 내부 파일을 일관되게 구성합니다.
- √ 코드 편집기에서 파일을 정렬하고 그룹화합니다.
- √ 향후 Next.js 파일 규칙과 관련된 잠재적인 이름 충돌을 방지합니다.
- 알아두면 좋은 정보:
  - 프레임워크 규칙은 아니지만, 동일한 밑줄 패턴을 사용하여 비공개 폴더 외부의 파일을' 비공개"로 표시하는 것도 고려할 수 있습니다.
  - 폴더 이름 앞에 %5F(밑줄로 URL 인코딩된 형태)를 접두사로 붙여 밑줄로 시작하는 URL 세그먼트를 만들 수 있습니다. %SFfolderName 아스키 코드의 URL-encoding
  - 비공개폴더를 사용하지 않는 경우, 예상치 못한 이름 충돌을 방지하기 위해 Next.js의 특 수 파일 규칙을 아는 것이 좋습니다.

### 2. Organizing your project(프로젝트 구성하기)
[라우팅 그룹] Route groups
- 폴더를 괄호로 묶어 라우팅 그룹을 만들 수 있습니다.(folderName)
- 이 것은 해당 폴더가 구성 목적으로 사용되는 것을 의미하며, 라우터의 URL 경로에 포함되
지 않아야 합니다.  
<img width="416" height="218" alt="Image" src="https://github.com/user-attachments/assets/1dc02573-e209-4440-852d-d45ef575cfc9" />

### 2. Organizing your project(프로젝트 구성하기)
- 라우팅 그룹은 다음과 같은 경우에 유용합니다.
- √ 사이트 섹션, 목적 또는 팀별로 라우트를 구성합니다.
  - 예: 마케팅 페이지, 관리 페이지 등.
- √ 동일한 라우팅 세그먼트 수준에서 중첩 레이아웃 활성화:
  - 공통 서그먼트 안에 여러 개의 루트 레이아웃을 포함하여 여러 개의 중첩 레이아웃 만들 기
  - 공통 세그먼트의 라우팅 하위 그룹에 레이아웃 추가  
<img width="166" height="203" alt="Image" src="https://github.com/user-attachments/assets/2e59577b-8a7f-4af9-909e-83b554b525b1" />

<img width="286" height="225" alt="Image" src="https://github.com/user-attachments/assets/05c67c59-19d5-4082-93f2-53c124887302" />

### 2. Organizing your project(프로젝트 구성하기)
[src 디렉토리]
- Next.js는 애플리케이션 코드(app 포함)를 옵션으로 선택하는 src폴더 내에 저장할 수 있도록 지원합니다.
- 이를 통해 애플리케이션 코드와 주로 프로젝트 루트에 위치하는 프로젝트 설정 파일을 분리할 수 있습니다.  
<img width="181" height="119" alt="Image" src="https://github.com/user-attachments/assets/de04e9ab-c433-44e0-9344-1a9b4a2a52fe" />

### 3. 예제 (Examples)
- 이번 섹션에서는 일반적인 프로젝트의 전략에 대한 간략한 개요를 설명합니다.
- 핵심 요점은 자신과 팀에 적합한 전략을 선택하고, 프로젝트 전반에 걸쳐 일관성을 유지하 는 것입니다.
- 알아두면 좋습니다.
- √ 아래 예제에서는 components와 lib 폴더를 일반화된 플레이스 홀더로 사용하고 있습니다.
- √ 이름 지정은 프레임워크에서 특별한 의미가 있는 것은 아니며, 프로젝트에서 Ul, utils. books, styles 등과 같은 다른 폴더명을 사용할 수 있습니다.

### 프로젝트 생성
- 예제를 학습하기 전에 Nextjs 프로젝트를 생성합니다.
```npx create-next-app@latest```
- 명령을 실행하면 다음과 같은 8개의 선택 항목이 나옵니다.
- 선택 항목이지만 모두 yes를 선택해서 프로젝트를 생성합니다
1. 프로젝트 이름을 입력합니다.
2~4. TypeScript. ESLint Tailwind를 사용할지 선택합니다.
5. src/ 디렉토리를 사용할지 선택합니다.
6. App Router를 사용할지 선택합니다.
7. importalias를 사용할지 선택합니다.
8. alias 문자를 지정합니다. 기본은 @/* 입니다.  
<img width="180" height="90" alt="Image" src="https://github.com/user-attachments/assets/b036d9d2-cef5-49cf-8943-f9a9a84dcae4" />  

- 프로젝트를 생성한 후 실행 명령은 다음과 같습니다.
```npm run dev```

### 서버 실행 전후
- next 디렉토리가 생성됩니다.
- Nextjs에서 next 디렉토리는 빌드 아웃풋과 실행에 필요한 캐시·중간 산출물을 저장하는 폴더입니다.
- 즉, next dev, next build, next start를 실행할 때 내부적으로 필요한 작업 디렉토리 입니다.  
<img width="294" height="170" alt="Image" src="https://github.com/user-attachments/assets/d012851f-8441-4206-85ee-3cd027694960" />

### src/디렉토리 선택
- 모든 프로젝트 파일을 src/ 디렉토리에서 관리합니다.  
<img width="314" height="251" alt="Image" src="https://github.com/user-attachments/assets/15be2441-7b9d-4a67-97cd-98887efedb80" />

### 3-1. Store project files outside of app
[프로젝트 파일을 app 외부에 저장]
- 이 전략은 모든 애플리케이션 코드를 프로젝트 루트의 공유 폴더에 저장 하고, 해당 app 디
렉토리는 라우팅 목적으로만 사용합니다.  
<img width="100" height="150" alt="Image" src="https://github.com/user-attachments/assets/f994de35-e365-47b5-bc9c-88783c532479" />

<img width="213" height="88" alt="Image" src="https://github.com/user-attachments/assets/69b6e767-bac8-4b13-b802-aee6ff6b269c" />

### 3-3. Split project files by feature or route
[기능 또는 라우팅 별로 프로젝트 파일 분할]
- 이 전략은 전역적으로 공유되는 애플리케이션 코드를 app 디렉토리 루트에 저장하고, 보다
구체적인 애플리케이션 코드를 이를 사용하는 라우팅 세그먼트로 분할합니다.  
<img width="83" height="162" alt="Image" src="https://github.com/user-attachments/assets/620e1250-0865-404a-ba3f-0532cee5a029" />

- #문서에서는 방법을 설명하는 것이고, 우리는 src/를 사용하기 때문에 라우팅 페이지를 제외
한 프로젝트 코드는 src/에서 관리하다.

### 3-4. Organize routes without affecting the URL path
[URL 경로에 영향을 주지 않고 라우트를 구성]
• URL에 영향을 주지 않고 라우트를 구성하려면, 관련 라우트를 함께 보관할 그룹을 만들어
줍니다.
괄호 안의 폴더는 URL에서 생략됩니다. 예: (marketing) 또는 (shop)
<img width="166" height="143" alt="Image" src="https://github.com/user-attachments/assets/b0247f41-3c8f-4458-a4ff-15ed88466d36" />

### 3-4. Organize routes without affecting the URL path
[URL 경로에 영향을 주지 않고 라우트를 구성]
(marketing) 및 (shop) 내부의 라우트이 동일한 URL 계층 구조를 공유하더라도, 폴더 안에 layoutjs 파일을 추가하여 각 그룹에 대해 다른 레이아웃을 만들 수 있습니다.

### 2. Organizing your project(프로젝트 구성하기)
- Nextjs는 프로젝트 파일을 어떻게 구성하고 어디에 배치할지에 대한 제약이 없습니다.
- 하지만 프로젝트 구성에 도움이 되는 몇 가지 기능을 제공합니다.
[component의 계층 구조 ] Component hierarchy
- 특수 파일에 정의된 component는 특정 계층 구조로 렌더링 됩니다.
- ✓ layoutjs
- ✓ template.js
- √ error.js (React 오류 경계)
- √ loadingjs(리액트 서스펜스 경계) √ not-found.js(React 오류 경계)
- page.js 또는 중첩 layout.js  
<img width="233" height="101" alt="Image" src="https://github.com/user-attachments/assets/67fddd16-6c3f-4431-a0ac-ede51791323c" />

### # layout의 기본 구성
- app/layouttsx→ 프로젝트 전체를 감싸는 루트 레이 아웃
- children→라우트 전환 시 해당 페이지나 하위 레이
아웃이 들어오는 자리
- metadata→ SEO 정보(title, description 등)를
Nextjs가 자동으로 <head>에 삽입
- app/(group)/layout.tsx→ 특정 그룹/폴더 전용 레이
아웃
```
//app/layout.tx
Import type (Metadata) from "next"; Import"./globals.css";
// SEO
EKSOI (MAH)
export const netadatasetadata={
descriptions "Generated by Next.js",
export default function Layout({
children: React.ReactNode;
<main>{children]</main>
cooters fosters
</body>
</html>
```

### 3-5. Opting specific segments into a layout
[레이아웃에 특정 세그먼트 선택]
- 특정 라우트를 레이아웃에 포함하려면 새 라우팅 그룹(예: (shop))을 만들고, 동일한 레이아웃을 공유하는 라우팅 폴더들을 이 그룹으로 이동합니다. (예: account 및 cart)
- 그룹 외부 라우팅 폴더에는 레이아웃을 공유하지 않습니다. (예: checkout)  

<img width="201" height="161" alt="Image" src="https://github.com/user-attachments/assets/be871ced-a1a3-4e4a-b668-ba86e83585a3" />

### 3-6. Opting for loading skeletons on a specific route
[특정 라우트에 스켈레톤 로딩을 적재하도록 선택]
- loading.js 파일을 통해 특정 라우트 폴더에 로딩 스켈레톤을 적용하려면, 새 라우팅 그룹 (예: /(overview))을 만든 다음 해당 라우팅 그룹 내부로 loading.tsx를 이동합니다.  
<img width="73" height="62" alt="Image" src="https://github.com/user-attachments/assets/5d4c6fee-e39f-4de9-84c0-8bf85109d06a" />

- 이제 해당 loading.tsx 파일은 dashboard 페이지에만 적용됩니다. → URL 경로 구조에 영향 을 주지 않고 모든 dashboard 페이지 대신 overview 페이지로 이동합니다.
- #loading skeletons (스켈톤 로딩)
콘텐츠가 로드되기 전에, 마치 뼈대(skeleton)처럼 콘텐츠가 표시될 위치에 회색이나 반투 명한 상자 또는 영역을 표시하여, 사용자에게 로딩 중임을 시각적으로 안내하고, 로딩 완료 후의 화면 구성을 미리 짐작할 수 있도록 도와주는 역할을 하는 일종의 와이어 프레임.

### 3-6. Opting for loading skeletons on a specific route
[간단한 로딩 스켈레톤 예제]
- #다음은 loading.tsx의 예입니다.  
<img width="255" height="55" alt="Image" src="https://github.com/user-attachments/assets/44290fda-4c64-40c8-9e03-b261c2812039" />
- #로딩 속도가 빨라서 확인이 불가능하기 떄문에 page의 로딩 시간을 지연 시켜야합니다.  
<img width="365" height="131" alt="Image" src="https://github.com/user-attachments/assets/dbedb5be-1774-4da9-ad1b-61336d458e7b" />

### 3-7. Creating multiple root layouts
[여러 개의 루트 레이아웃 만들기]
- 여러 개의 루트 레이아웃을 만들려면 최상위 layout.js 파일을 제거하고, 각 라우팅 그룹 내에 layout.js 파일을 추가합니다.
- 이것은 완전히 다른 UI 또는 UX를 갖는 섹션으로 애플리케이션을 분할하는데 유용합니다.
- 각 루트 레이아웃에 <html> 및 <body> 태그를 추가해야 합니다.  

- 위의 예에서 (marketing)과 (shop)은 둘 다 자체 루트 레이아웃을 갖습니다.




## 9월 3일 2주차 수업내용
### Installation
[IDE플러그인]
• Nextjs에는 사용자 정의 TypeScript 플러그인과 유형 검사기가 포함되어 있습니다.
• VS Code와 다른 코드 편집기에서 고급 유형 검사 및 자동 완성에 사용할 수 있습니다.
    #다음 작업을 하기 전에 TypeScript reference를 참고해서, next.config.js를 먼저 작성합니다.

• VS Code에서 플러그인을 활성화하는 방법은 다음과 같습니다.
1. 명령 팔레트 열기 (Ctrl/36+Shift+P)
2. "TypeScript: TypeScript 버전 선택 검색
3. "Use Workspace Version 선택

<img width="413" height="71" alt="Image" src="https://github.com/user-attachments/assets/86cc9f97-7207-47bd-bb01-6d8e04d27404" />

### Installation
6. ESLint 설정
- Nextjs에는 ESLint가 내장되어 있습니다.
- create-next-app 명령을 사용하여 새 프로젝트를 생성하면 필요한 패키지를 자동으로 설치 하고, 적절한 설정을 구성합니다.
- 기존 프로젝트에 ESLint를 수동으로 추가하려면 package.json에 next lint 스크립트를 다음 과 같이 추가합니다.
``` json
{
  "scripts": {
    "lint": "eslint",
    "lint:fix": "eslint --fix"
  }
}
```
다음으로 npm run lint 형을 실행하면 설치 및 구성 과정에 대한 안내를 확인할 수 있습니다.
### Installation
- 다음과 같은 메시지가 표시됩니다.
<img width="156" height="58" alt="Image" src="https://github.com/user-attachments/assets/ee5414e7-d4b0-49c9-b501-b54f2aa93d4e" />
- Strict: Nextjs의 기본 ESLint 구성과 더욱 엄격한 Core Web Vitals 규칙 세트를 포함합니다. ESLint를 처음 설정하는 개발자에게 권장되는 구성입니다.
- BaseNext.js의 기본 ESLint 구성을 포함합니다.
- Cancel: 구성을 건너뀝니다. 사용자 지정 ESLint 구성을 설정하려면 이 옵션을 선택하세 요.
- Strict 또는 Base 중 하나가 선택되면, Next.js는 자동으로 eslint와 eslint-config-next를 애플 리케이션의 의존성으로 설치합니다.
- 또한 선택한 설정을 포함하는 eslintrcjson 파일을 프로젝트 루트 디렉토리에 생성합니다. 
- 이제 [next lint]를 실행할 때마다 ESLint가 실행되어 오류를 찾아 냅니다.

### Installation
7. import 및 모듈의 절대 경로 별칭 설정
- Next.js에는 tsconfig.json 및 jsconfig.json 파일의 "paths" 및 "baseUrl" 옵션에 대한 지원을
내장하고 있습니다.
- 이 옵션을 사용하면 프로젝트 디렉터리를 절대 경로로 별칭 하여 모듈을 더 쉽고 깔끔하게 가져올 수 있습니다.
```
// Before
import (Button) from '../../../components/button
// After
import (Button) from '@/components/button
```
- 별칭으로 import를 구성하려면 tsconfig.json 또는 jsconfig.json 파일의 baseUrl에 구성 옵 션을 추가하세요.
``` json
{
  "compilerOptions": {
    "baseUrl": "src/"
  }
}
```

### Installation
- 경로를 구성하는 것 외에도 모듈 경로 옵션을 baseUrl 사용할 수 있습니다 ."paths""alias"

- 예를 들어, 다음 구성은 @/components/*다음에 매핑됩니다 components/*.

``` json
{
  "compilerOptions": {
    "baseUrl": "src/",
    "paths": {
      "@/styles/*": ["styles/*"],
      "@/components/*": ["components/*"]
    }
  }
}
```
- "paths"의 각 항목은 baseUrl의 경로에 타라 상대적입니다.

### 자동 생성되는 항목
#강의에서는 프로젝트를 자동으로 생성해서 사용합니다.
#다음은 프로젝트를 자동 생성할 때 자동으로 생성되는 항목입니다.
- package.json 파일에 scripts 자동 추가/ public 디렉토리
- TypeScript 사용(선택): tsconfig.json 파일 생성
- Eslint 설정 (선택): eslintrc.json 대신 eslint.config.mjs 파일 생성
- Tailwind CSS 사용 (선택)
- src 디렉토리 사용 (선택)
- App Router(선택), app/layout.tsx 파일 및 app/page.tsx
- Turbopack 사용(선택)
- import alias 사용 (선택): tsconfig.json에 "paths" 자동 생성.
- 수동으로 프로젝트를 생성할 때 추가적으로 해야 하는 작업을 자동으로 처리해 줍니다.

### Core Web Vitals
- LCP(Largest Contentful Paint) : 뷰포트 내에서 가장 큰 페이지 요소(큰 텍스트 블록, 이미
지 또는 비디오)를 표시하는 데 걸리는 시간.
    - 뷰포트: 웹페이지 사용자가 별도의 스크롤 동작 없이 볼 수 있는 영역.
- FID(First Input Delay): 사용자가 웹페이지와 상호작용을 시도하는 첫 번째 순간부터 웹페 이지가 응답하는 시간.
- CLS(Cumulative Layout Shift) : 방문자에게 콘텐츠가 얼마나 불안정한 지 측정한 값입니다. 페이지에서 갑자기 발생하는 레이아웃의 변경이 얼마나 일어나는지를 측정합니다.
즉, 레이아웃 이동(layout shift) 빈도를 측정합니다.
<img width="331" height="130" alt="Image" src="https://github.com/user-attachments/assets/0a8772a5-c210-4a9e-a5dd-6ac345069101" />

### 실습에 사용할 프로젝트를 생성합니다.
- 공식 문서에는 기본 패키지 관리자를 pnpm을 사용합니다.
- 원하는 패키지 관리자 탭을 클릭하면 명령을 확인할 수 있습니다.
- pnpm과 관련한 내용은 뒤에서 설명합니다.
```npx create-next-app@latest```
- 다음 명령으로 프로젝트를 생성합니다.
- 명령을 실행하면 다음과 같은 8개의 선택 항목이 나옵니다.
1. 프로젝트 이름을 입력합니다.
2~4. Typescript, ESLint, Tailwind를 사용할지 선택합니다.
5. src/ 디렉토리를 사용할지 선택합니다.
6. App Router를 사용할지 선택합니다.
7. import alias를 사용할지 선택합니다.
8. alias 문자를 지정합니다. 기본은 @/* 입니다.
<img width="548" height="264" alt="Image" src="https://github.com/user-attachments/assets/77559d9f-a0e0-474d-8063-a3c138810a28" />

### src/ 디렉토리 선택
- 모든 프로젝트 파일을 src/ 디렉토리에서 관리합니다.
<img width="369" height="294" alt="Image" src="https://github.com/user-attachments/assets/bf93208e-0735-4c13-a254-73265f32dcf1" />

### .eslintrc.json vs eslint.config.mjs
- JSON은 주석, 변수, 조건문 등을 쓸 수 없기 때문에 복잡한 설정이 어렵습니다.
(JavaScript Object Notation)
- mjs는 ESLint가 새롭게 도입한 방식으로, ESM(ECMAScript 모듈) 형식입니다.
- 확장자 mjs는 "module JavaScript"를 의미합니다.
- ESLint v9 이상에서 공식 권장 방식입니다.
- 조건문, 변수, 동적 로딩 등 코드처럼 유연한 설정이 가능합니다.
- 다른 설정 파일을 import 해서 재사용을 할 수 있습니다.
- 프로젝트 규모가 커질수록 유지보수에 유리합니다.
<img width="360" height="101" alt="Image" src="https://github.com/user-attachments/assets/1dd9cff0-40e6-40eb-a94f-7d1aea503250" />

### Next.js와 eslint.config.mjs
- Next.js 14 이후로는 ESLint 9와의 호환성을 고려해 최신 권장 방식인 eslint.config.mjs 를 사용하는 쪽으로 전환되고 있습니다.
* eslintrc.json도 여전히 지원되므로, 필요한 경우 수동으로 만들거나 마이그레이션해서 사
용할 수 있습니다.
- 마이그레이션 도구는 아직 공식적으로 제공되지는 않지만, 직접 옮기려면 다음처럼 하면 됩니다.
<img width="379" height="186" alt="Image" src="https://github.com/user-attachments/assets/e2c8b538-5c3d-4e43-8933-83fc88f3441f" />

###  alias 문자 및 경로
- alias 문자를 선택하면 tsconfig.json에 등록됩니다.
- 기본값은 선택하면/src/들 @으로 대신합니다.
- 즉/src/*는 @/*로 사용할 수 있습니다.
생성된 프로젝트의 서버의 실행: $ npm run dev

### pnpm
- pnpm은 Performant(효율적인) NPM의 약자로 고성능 Node 패키지 매니저입니다.
- npm, yarn과 같은 목적의 패키지 관리자이지만, 디스크 공간 낭비, 복잡한 의존성 관리, 느 린 설치 속도 문제 개선을 위해 개발되었습니다.
* 대표적인 특징은 다음과 같습니다.
1. 하드 링크(Hard Link) 기반의 효율적인 저장 공간 사용
패키지를 한 번만 설치하여 글로벌 저장소에 저장하고, 각 프로젝트의 node_modules 디 렉토리에는 설치된 패키지에 대한 하드 링크(또는 심볼릭 링크)가 생성됩니다.
2. 빠른 패키지 설치 속도(Performant) : 이미 설치된 패키지는 다시 다운로드하지 않고 재사 용하므로, 초기 설치뿐만 아니라 종속성 설치 및 업데이트 할 때도 더 빠른 속도를 경험할 수 있습니다.
3. 엄격하고 효율적인 종속성 관리
4. 다른 패키지 매니저의 비효율성 개선

### pnpm VS. npm
- 
<img width="452" height="304" alt="Image" src="https://github.com/user-attachments/assets/24ade62d-5ec9-4d37-8348-4bb35dcf5ed4" />

### pnpm VS. npm
- 주요 명령어 비교
- 여기서는 명령어의 구성만 확인하세요. 뒤에서 다시 설명

### pnpm 설치 및 기본 명령어
- pnpm 글로벌 설치: $ npm install -g pnpm
<img width="288" height="108" alt="Image" src="https://github.com/user-attachments/assets/906454a1-9408-4dac-be34-d17785953f90" />

[많이 사용하는 명령어]
- Node_module 설치(clone 한 경우): $ pnpm install
- 새로운 패키지 설치 : $ pnpm add [package]
- 패키지 제거: $ pnpm remove [package]
- 종속성을 최신 버전으로 업데이트: $ pnpm update
- 프로젝트에 설치된 모든 패키지를 표시: $ pnpm list

### pnpm으로 Next.js 프로젝트 생성
- $ pnpm create next-app@latest
- npm의 npx 대신 pnpm create을 사용합니다.
- next-app 명령이 실제로 실행되는 것은 create-next-app입니다.
블로그 등에서 pnpm도 create-next-app 이라고 소개하는 경우가 있지만 추천하지는 않
습니다.
- $ cd my-app
- 서버 실행: $ pnpm start
<img width="503" height="264" alt="Image" src="https://github.com/user-attachments/assets/a50bb93c-fc3f-4cba-ad67-8627001c544e" />

### pnpm으로 React 프로젝트 생성
- Next.js에 비해서 react는 pnpm 도입에 소극적입니다.
- 따라서 다음 명령 중 1번 명령을 실행해도 npx create-react-app my-app와 동일하게 생성 됩니다.
- 따라서 무엇으로 프로젝트를 생성하던 node_modules과 package-lock.json을 삭제하고, 4
번 명령으로 node_modules을 다시 설치해야 합니다.
1. $ pnpm create react-app my-app
2. $ cd my-app
3. $ rm -rf node_modules package-lock.json
4. $ pnpm install
5. 서버 실행: $ pnpm dev

### #Hard link vs. Symbolic link(Soft link)
- pnpm의 특징 중에 하드 링크를 사용해서 디스크 공간을 효율적으로 사용할 수 있다고 합
니다. 탐색기에서 npm과 pnpm 프로젝트의 node module의 용량을 확인해 보세요.
- "왜 효율적이라 한 것일까요?
하드 링크(Hard link)
- 우리가 "파일"이라고 부르는 것은 두 부분으로 나뉘어 있습니다.
1. Directory Entry: 파일 이름과 해당 inode 번호를 매핑 정보가 있는 특수한 파일.
2. inode: 파일 또는 디렉토리에 대한 모든 메타데이터를 저장하는 구조체.
(권한, 소유자, 크기, 데이터 블록 위치 등) 
<img width="227" height="115" alt="Image" src="https://github.com/user-attachments/assets/203ddad4-4fff-4bd7-afef-7441e2efb36d" />

### #Hard link vs. Symbolic link(Soft link)
하드 링크(Hard link)
- 하드링크를 생성하면 디렉토리 엔트리에 매핑 정보가 추가 되어 동일한 inode를 가리키게
됩니다.
- 따라서 원본과 하드링크는 완전히 동일한 파일입니다.
- 원본과 사본(copy)의 개념이 아닙니다.

### #Hard link vs. Symbolic link(Soft link)
- 디렉토리 엔트리에 있는 원본과 하드링크는 같은 inode를 참조하므로 데이터 블록을 100% 공유합니다.
- 따라서 원본이나 하드링크 중에서 하나만 삭제하면 디렌토리 엔트리에서 이름만 삭제되는 것이라서 link count가 0이 되지 않는 한 데이터는 남아 있습니다.
- pnpm store에 저장된 패키지나, node_modules/.pnpm에 저장된 패키지나 동일한 파일을 참조하고 있습니다.
- 그런데 탐색기에서 node_modules의 속성을 보면 npm의 경우와 디스크용량이 같아 보입 니다.
- 이 것은 하드링크는 겉으로는 복사한 것처럼 보이는 특징을 가지고 있기 때문입니다.
- pnpm으로 패키지를 설치하면 전역 store에 1번만 저장합니다.
(C:\Users\<user>\AppData\Localwpnpm-storew)
- 따라서 실제 디스크 사용량은 중복되지 않습니다.

### Hard link vs. Symbolic link(Soft link)
- 심볼릭 링크 (소프트 링크)
- inode를 공유하지 않고 경로 문자열을 저장해 두는 특수 파일입니다.
- 따라서 심볼릭 링크를 열면 내부에 적힌 "경로"를 따라가서 원본 파일을 찾습니다.
- 원본이 삭제되면 심볼릭 링크는 끊어진 경로가 되므로 더 이상 사용할 수 없습니다.
- 윈도우의 바로 가기 파일과 비슷하게 생각할 수 있습니다.


## 8월 27일 1주차 수업내용
ot 진행
윈도우 파워쉘 choco 명령어로 깃 노드 설치