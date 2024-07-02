## 테스트와 함께 프론트엔드 개발하기

이 레포지토리는 튜링의 사과에서 7월 4일에 진행했던 "테스트와 함께 프론트엔드 개발하기" 강의의 실습 코드입니다. 한 단계 한 단계 신중하게 커밋하면서 작업했기 때문에, 커밋로그만 보셔도 여러모로 도움이 되시리라 생각합니다.

## 프로젝트 기술 선정

프레임워크 : React + Next.js

테스트러너 : vitest + browser mode
컴포넌트 테스트 : @testing-library/{jest-dom, dom, react, user-event} + siheom 2.0
스토리북 : react-cosmos
스타일 : PandaCSS
폼과 스키마 : react-hook-form + valibot
헤드리스 : Ariakit
포맷과 린트 : biome

## 배경

[저](https://x.com/stelo_kim)는 몇 년 동안 프론트엔드 테스트와 접근성, 의존성 주입, 함수형 프로그래밍을 공부하고 실무의 문제를 풀어왔습니다. 테스트나 의존성 주입에 대한 글은 백엔드나 객체지향 위주입니다. 프론트엔드와 함수형 관점에서 접근하는 내용은 희귀하기도 하고 저도 고생이 많았습니다. 리액트 프론트엔드에서는 보통 class를 안 쓰는데, 이런 게 중요하기나 할까요?

제가 배운 것들을 공유하고자 글도 여럿 썼고, 작년부터는 발표도 하고 있습니다. 이 자료들만 참고하셔도 꽤 많은 부분을 배우실 수 있을 겁니다.

- [테스트에서 (더 잘, 더 자주) 배우기](https://tech.wonderwall.kr/articles/learningwithtest/)
  - 끔찍한 야근과 뒤통수 맞는 경험을 회고하며, 왜 바쁘다며 테스트를 뒤로 미룰 수록 더 바빠지기만 하는지 그 원인을 탐구합니다. 자동화나 커버리지에 대한 맹신을 비판하고요. 요구사항과 환경 그리고 기술을 이해하고 학습하는 수단으로 테스트를 바라봅니다.
- [우리에게는 프런트 테스트가 필요할지도 모릅니다](https://twinstae.github.io/why-frontend-testing/)
  - 함수형이나 프론트엔드에서는 자동화 테스트가 어려울 뿐만 아니라 생산성을 떨어트린다는 편견을 다시 검토합니다. 우리를 힘들게 하는 자동화 테스트가 무엇이고, 우리는 어떤 자동화 테스트가 필요한지 이야기합니다.
- [컴포넌트 테스트 시작하기](https://twinstae.github.io/component-testing-a11y-markup/)
  - vitest와 @testing-library를 이용해 심오한 다크 모드 버튼을 만들어보는 과정을 실습해봅니다. role과 accessible name 같은 접근성 개념부터, 마크업, 상태, 효과, SSR에 이르기까지 테스트 하는 법을 배웁니다.
- [접근성이 주도하는 프론트엔드 테스트 자동화](https://tech.wonderwall.kr/articles/a11ydriventestautomation/)
  - xpath 나 css 선택자와 같은 기존의 프론트 테스트 방법론이 왜 실패했는지 설명합니다. 웹과 모바일을 막론하고 접근성 API는 UI 테스트를 위한 새로운 표준이 되어가고 있습니다. 특히 WEB의 ARIA 표준을 다루며 실제 업무의 사례와 함께 설명합니다.
- [사용자를 위한 Playwright E2E 테스트](https://tech.wonderwall.kr/articles/playwrighte2etestforuser/)
  - 플레이라이트를 이용해 실제 브라우저에서 E2E 테스트를 작성하는 법을 소개합니다. playwright의 lazy한 locator와 web first assertion, auto wait 부터 로그인 인증이나 셋업까지 구체적인 실무 사례와 함께 소개합니다.
- [테스트로 보는 DI - 함수와 변수 추출](https://twinstae.github.io/dependency-injection-extract/)
  - 테스트를 하다보면 자연스럽게 의존성 주입(Dependency Injection)에 대해 생각하게 됩니다. 의존성 주입은 테스트 환경 뿐만 아니라 특정 기술이나 특정 환경과의 결합을 끊어줍니다. 하지만 인터넷에 검색하면 늘 스프링 데코레이터와 setter, 생성자 주입 이야기만 하는데, 함수형 프로그래밍의 관점에서 간단한 의존성 주입 기법을 소개합니다.
- [함수형 프론트엔드에서 의존성 제어하기](https://tech.wonderwall.kr/articles/functionaldependencymanagement/)
  - 인터페이스와 구현의 차이, 제공자와 사용자, 리팩터링과 파괴적 변경과 같은 의존성 주입의 개념들을 프론트엔드의 구체적인 실무 사례와 함께 설명합니다. 특히 폄하되어 왔던 매개변수 주입, props 주입을 다시 발견하고, context api를 상태관리가 아닌 동적인 의존성 주입 기법으로 보고, module alias를 이용한 정적 의존성 주입 기법도 소개합니다.
- [동료를 당황시키지 않는 순수 함수 적정 기술](https://drive.google.com/file/d/1UxKbwrc4HxdEUqGpZ6M3mKx67NhxmPlo/view?usp=sharing)
  - 함수형 컨퍼런스 LiftIO에서 발표했던 자료입니다. 비즈니스 로직을 단순하고 테스트하기 쉬운 순수함수로 만들어 개발하는 법을 텍스트 필드, 가격 포맷, 검색 기능을 구현하는 사례를 통해 다룹니다.
- [스토리북과 컴포넌트 테스트와 함께 하는 ClojureScript React 개발](https://drive.google.com/file/d/1j3dOFjQAx49otvxu77RYG-Nip1TVsIGK/view?usp=sharing)
  - 결합도, 수 많은 경우의 수, 느리고 복잡한 테스트의 문제를 스토리북을 이용한 컴포넌트 주도 개발로 풀어내는 법을 소개합니다. 스토리북은 단순히 예쁜 컴포넌트 도감이 아닙니다. 다양한 경우의 수를 쉽고 빠르게 테스트할 수 있는 도구로 새롭게 바라봅니다.

생각보다 많지 않습니까? 하지만 테스트의 여정은 아직 끝나지 않았습니다.

## 강의에서 다루는 것

### 개념과 예시를 넘어서 실무 예제 중심

제가 지금까지 공유했던 발표나 글은 시간 관계상, 빠르게 예시만 적용하고 넘어갔습니다. 제 블로그에 있는 컴포넌트 테스트 시작하기도 간단한 다크모드 버튼의 예시만 다뤄서 실무와는 동떨어진 면이 있었고요.

이번 강의는 지금까지 말해왔던 여러 방법론과 지식을 실제 실습을 통해 배워볼 수 있게 구성했습니다. 실제로 실무에서 구현했던 요구사항들을 예제로 만들었고. 요구사항을 정제하고, 테스트 -> 기능 구현 -> 리팩토링 -> 테스트 교차 검증... 등으로 이어지는 TDD의 흐름을 직접 보실 수 있습니다.

### 브라우저 모드

현재 vitest의 베타 기능으로 만들어지고 있는 browser mode를 이용해서, 실제와 유사한 환경에서 e2e보다 훨씬 빠르게 컴포넌트 테스트를 돌릴 수 있습니다. 속도가 전부가 아닙니다. 저 역시 전 직장에서는 주로 jsdom을 이용해 테스트를 했었는데, jsdom 환경과 실제 환경과의 차이로 많은 고통을 겪었습니다. 브라우저 모드로 테스트를 하기 위해서는 풀어야할 문제들도 있기에, 그러한 요령들도 공유합니다.

### playwright style의 testing library wrapper siheom 2.0 공개

현 직장, 그러니까 셀파스에서 저는 클로저 스크립트로 테스팅 프레임워크인 siheom 3.0을 만들어 사용하고 있습니다.

이번 레포지토리를 통해 공개하는 siheom 2.0 은 타입스크립트를 이용했던 전직장에서 playwright의 인터페이스를 testing-library로 유사하게 구현한 래퍼입니다. 중간에 waitForTimeout이나 setTimeout, waitFor 등을 적어줘야 하거나 get과 find, query를 매번 구분해야 했던 @testing-library의 한계를 개선했고, getByRole의 장황한 인터페이스를 간소화했습니다.

부족한 부분도 있지만 프로덕션에서 여러 프로젝트에 사용된 만큼 대부분의 경우에 잘 작동합니다. siheom 2.0은 파일 2개일 뿐이라 여러분의 프로젝트에도 복사해서 사용하실 수 있습니다.

저 역시 vue를 사용했던 회사에서 일한 적 있기에 react 의존성은 없고, vue나 svelte, solid를 비롯한 다른 라이브러리와도 같이 사용할 수 있습니다.

### 웹표준과 헤드리스 컴포넌트 라이브러리를 이용해 나만의 디자인 시스템 구현하기

위에서 소개했던 여러 글과 발표에서 헤드리스 컴포넌트 라이브러리와 웹표준 접근성 API를 이용한 개발 방식을 잠깐 짚고 넘어갔었는데요.

이번에는 실제로 list와 link, form과 select, combobox 등의 복잡한 컴포넌트들을 시맨틱 html과 제가 실무에서 사용하고 있기도 한 Ariakit 이라는 Headless Component 라이브러리를 이용해서 TDD로 개발하고 스타일링까지 하는 걸 보여드립니다. 실무에서 저는 clojurescript와 reagent를 이용하고 있지만, 예제는 Next js와 react를 이용해 구현했습니다. React가 아닌 vue나 svelte를 이용하시는 분들도 웹표준 html은 동일하게 사용하실 수 있고, radix-vue 나 ark-ui 같은 헤드리스 컴포넌트 라이브러리를 이용하시면 실무에 쉽게 적용하실 수 있으리라 기대합니다.

### 강의 교안

[하나. 브라우저 컴포넌트 테스트 환경 셋업하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/cosmos)
[둘. 목록과 필터 컴포넌트 테스트하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/domains/saas/SaasList)
[셋. 폼 컴포넌트 테스트하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/domains/member/MemberCreateForm)
[넷. 헤드리스 컴포넌트로 만든 디자인 시스템 테스트하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/common/components/SelectWithComboboxd)
