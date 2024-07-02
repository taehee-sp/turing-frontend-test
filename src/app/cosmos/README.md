## 컴포넌트 테스트 시작하기

테스트를 하는 사람이 아니라도, 누구나 셋업을 하고 나면 간단한 코드로 모든 게 잘 돌아가는지 확인합니다.

템플릿을 클론하는 게 편리하긴 합니다만. 이미 기존에 존재하는 프로젝트에 테스트 환경을 추가하는 경우가 더 많을 겁니다. 운영체제도 다르고, 프레임워크도 다르고, 이런저런 다른 세팅이 뒤섞이면 셋업에만 하루가 넘게 걸리기도 합니다.

제 커밋 로그를 보시면 아시겠지만. 저는 작은 단계를 밟아가면서 하나씩 셋업을 하고, 각 단계가 잘 되는지 확인합니다. 한 번에 몰아서 우르르 확인하면, 어디서 잘못된 건지 찾기 힘드니까요.

### Initial commit from Create Next App

일단 `pnpm install` -> `pnpm dev` 로 서버가 잘 뜨는지부터 확인합니다.

### react-cosmos storybook setting

테스트할 컴포넌트를 관리하고, 눈으로 확인해보고 직접 눌러볼 수 있고, 페이지와 격리해서 렌더할 수 있게 스토리북을 사용하려 합니다. 널리 쓰이는 `storybook`도 좋지만, 여기서는 여러 이유로 `react-cosmos`를 사용하려 합니다.  [ladle](https://ladle.dev/blog/introducing-ladle/) 같은 대체제도 살펴보세요.

```sh
pnpm add -D react-cosmos
```

`cosmos.config.json`, `cosmos/[fixture]/page.tsx` 파일 등을 만듭니다. package.json에 script를 추가하고 `pnpm story` 로 잘 보이는지 확인합니다.

### setup vitest

unit, component test를 위해서 vitest를 설치합니다. vitest는 성능도 성능이지만, 브라우저 모드와 UI 같은 여러 강력한 기능이 많고, 셋업하기도 jest보다 쉽습니다. jest와 api도 호환되고요.

```sh
pnpm add -D vitest @vitejs/plugin-react
```

`vitest.config.ts`와 `setupTests.ts` 그리고 간단한 `hello.test.tsx` 파일을 만듭니다.

역사와 전통을 따라서 간단하게 1+1을 검증하는 테스트를 만듭니다.

```ts
import { expect, test } from 'vitest'

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3)
})
```

물론 테스트가 잘 실패합니다! 3을 2로 바꾸면 테스트가 성공하는 것도 볼 수 있습니다.

### setup vitest browser mode

node에서 테스트를 돌리는 것도 좋지만, node에는 dom 뿐만 아니라 여러 브라우저 API가 없기 때문에 실제 브라우저에서 테스트하는 쪽으로 옮겨가는 추세입니다. vitest도 playwright나 webdriverio 등을 이용해 브라우저 모드를 지원 합니다.

```sh
pnpm add -D @vitest/browser playwright
```

`vitest.config.ts`에 browser 모드를 설정해주고, enabled로 활성화시켜 줍니다.

```ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
/// <reference types="vitest" />

export default defineConfig({
	plugins: [react()],
	root: './',
	test: {
		// ...
		browser: {
			enabled: true,
			name: 'chromium',
			headless: true,
			provider: 'playwright'
		},
	},
});
```

테스트를 실행해도 headless라 브라우저가 보이진 않을 겁니다. 이제 브라우저에는 dom이 있으니, 화면에 렌더하는 테스트를 간단하게 만들어서 확인을 해봅시다.

```tsx
import { renderToString } from 'react-dom/server';
import helloStory from './Hello.fixture';
import { expect, test } from 'vitest'

test('render hello', () => {
  document.body.innerHTML = renderToString(helloStory);
  expect(document.body.innerHTML).toBe('<h1>Hello World!</h1>')
})
```

### setup testing library

renderToString 이나 createRoot() 는 번거롭기도 하지만, 테스트가 끝날 때마다 unmount 시켜주고 정리하는 게 번거롭기도 합니다. 그외에도 클릭이나 타이핑 같은 복잡한 사용자 동작을 테스트하기 위해 보통은 @testing-library 를 사용합니다.

```sh
pnpm add -D @testing-library/dom @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

setupTests.ts 에 jest-dom을 import하면 `expect(element).toBeInTheDocument()` 같은 유용한 matcher들을 쓸 수 있습니다.
```ts
// setupTests.ts
import "@testing-library/jest-dom/vitest";
```

이제 @testing-library로 컴포넌트를 렌더하고, screen.getByRole 으로 요소(elemen)를 찾아서 가져옵시다.

```ts
import { render, screen } from '@testing-library/react';
import helloStory from './Hello.fixture';
import { expect, test } from 'vitest'

test('render hello', () => {
  render(helloStory);

  expect(screen.getByRole('heading', { name: "Hello World!" })).toBeInTheDocument()
})
```


> biome, pandacss 등의 셋업은 생략합니다.

### siheom

getByRole에는 문제가 하나 있습니다. react를 비롯한 여러 프레임워크들, 그리고 js의 여러 코드들은 렌더나 상태 업데이트 등을 비동기적으로 하는데요. 이따금 테스트 중간에 `await new Promise(resolve => setTimeout(resolve, 100));` 같은 코드를 꼼수로 넣어줘야 하곤 했습니다.

@testing-library 에는 그래서 `waitFor`이나 `findByXXX` 같은 기능들이 있는데요. 언제 get을 쓰고 언제 find를 써야 하는지 구분하기도 헷갈리지만, waitFor이나 act 등을 사용한 테스트 코드는 장황해질 때도 많습니다.

playwright의 locator api와 web first assertion은 이러한 문제를 대부분 해결했습니다. 그래서 제가 testing-library를 playwright처럼 생긴 api로 감싼 라이브러리를 만들었는데, 이게 바로 siheom 2.0입니다.

siheom 2.0은 expectTL과 queryTL 두 개의 파일로 되어 있습니다. 복사해서 프로젝트에 넣어주시면 쉽게 사용하실 수 있습니다.

> 저는 회사에서 클로저 스크립트로 만든 siheom 3.0 을 쓰고 있는데. 타입스크립트도 지원하도록 패키지화해서 공개할 예정입니다.

위에서 작성한 테스트 코드를 다시 작성해보면 다음과 같습니다.

```tsx
import { render, screen } from "@testing-library/react";
import helloStory from "./Hello.fixture";
import { expect, test } from "vitest";
import { expectTL } from '@/siheom/expectTL';
import { queryTL } from '@/siheom/queryTL';

test("render hello", async () => {
	render(helloStory);

	await expectTL(queryTL.heading("Hello World!")).toBeVisible()
});
```

테스트는 보통 assertion이나 user의 행동 둘로 나눠지는데요. 까먹지 말고 둘 다 비동기적으로 await을 붙여줘야 합니다. 비슷한 모양이 반복되니 이번에 눈에 익혀두시면 좋겠네요.

```ts
// 단언
await expectTL(queryTL.checkbox("SaaS")).toBeChecked();

// 사용자의 행동
await queryTL.button("구매하기").click();
```


### vite vs nextjs webpack의 차이

vite-tsconfig-paths 설정하기