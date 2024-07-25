## 폼 컴포넌트 테스트하기

### 1. 요구사항 파악하기

두번째 실습은 새 회원을 추가하는 폼을 만들어보는 예제입니다.

1. 이름과 회사 이메일을 입력 후 추가하기 버튼을 누르면 폼이 제출됩니다.
2. 이름과 회사 이메일을 입력하지 않으면 입력해달라는 에러 메세지를 보여줍니다.
3. 회사 이메일 입력 값이 이메일 형식과 다르면 "올바른 이메일 형식을 입력해주세요" 에러가 뜹니다.
4. 이름 입력 값이 24자를 초과하면 "이름은 24자까지만 입력 가능합니다" 에러가 뜹니다.

### 2. input과 label의 접근성 배우기

#### 2-1. input 태그를 label 태그의 자식으로 두는 것의 이점

label 안에 input 태그가 있으면 `<label>`을 클릭해도 `<input>` 요소에 포커스가 되어서 접근성 및 사용성이 향상 향상됩니다.

#### 2-2. input 요소에 추가 정보를 제공하기 위한 웹 표준 ARIA 어트리뷰트

**aria-label**

- 버튼, 링크, 입력 필드 등 시각적인 라벨이 없거나 충분하지 않은 요소에 사용합니다
- 스크린 리더는 이 속성을 읽어 사용자가 요소의 목적을 이해하도록 돕습니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx
{
	typeof errorState.name === "string" && (
		<div
			role="alert" // 스크린 리더가 이 요소가 경고임을 알 수 있게 해준다.
			aria-label={errorState.name} // 에러 메시지를 스크린 리더가 읽을 수 있도록 설정한다.
		>
			{errorState.name}
		</div>
	);
}
```

**aria-invalid**

- boolean
- 입력 유효성 검사가 필요한 폼 필드에 사용합니다.
- 스크린 리더는 이 속성을 통해 폼 필드의 유효성 상태를 사용자에게 알립니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

<label>
	이름
	<input
		type="text"
		{...register("name")}
		maxLength={24}
		aria-label="이름 입력"
		aria-invalid={typeof errorState.name === "string"}
	/>
</label>
```

**aria-lablledby**

- 복합 위젯, 모달 창, 그룹화된 폼 요소 등에 사용
- 여러 요소를 결합하여 하나의 라벨을 생성할 때 유용합니다.
- 다른 요소의 ID를 참조하여 해당 요소를 라벨로 지정합니다.

실습에서는 h2태그의 id와 form 태그의 aria-labelledby에 react의 useId를 사용하여 동일한 id를 줬습니다. react의 `useId` 훅을 사용하면 클라이언트와 서버 렌더링 모두에서 일관된 고유 ID를 생성할 수 있습니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

import { useId } from "react";
const id = useId();

<h2 id={id}> 멤버 추가</h2>
<form
aria-labelledby={id}
onSubmit={handleSubmit((data) => {
    createMember(data).then(() => {
        toast("멤버를 추가했어요!");
    });
})}>
```

### 3. 폼 작성하고 제출 테스트하기

**요구사항 1: 이름과 회사 이메일을 입력 후 추가하기 버튼을 누르면 폼이 제출됩니다.**

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.test.tsx

describe("MemberCreateForm", () => {
	test("올바른 값을 입력하면 멤버를 등록할 수 있다", async () => {
		let submitted = null;
		render(
			<MemberCreateForm
				createMember={async (newMember) => {
					submitted = newMember;
				}}
			/>
		);
		//1. 이름을 입력한다.
		await queryTL.textbox("이름").fill("김유저");
		//2. 회사 이메일을 입력한다.
		await queryTL.textbox("회사 이메일").fill("user@test.com");
		// //3. 추가하기 버튼을 누른다.
		await queryTL.button("추가하기").click();

		// //4. 이름과 이메일이(새 멤버가) 제출된다.
		expect(submitted).toEqual({
			name: "김유저",
			email: "user@test.com",
		});
	});
});
```

form 태그에서 FormData 객체를 제출하는 방식으로 폼 제출을 작성해보겠습니다.
입력 값이 DOM 자체에 저장되어 폼 제출 시 한 번에 값을 읽는 방식입니다.

예시에서 createMember 함수에 폼 데이터를 넣으려면, FormData 객체를 일반 객체로 변환하는 과정이 필요합니다.
이 때 이터러블 객체를 일반 객체로 변환해주는 `Object.fromEntries`를 사용해줍니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

interface MemberCreateFormProps {
	createMember: (newMember: { name: string; email: string }) => Promise<void>;
}
export const MemberCreateForm = ({ createMember }: MemberCreateFormProps) => {
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault(); // form 태그의 기본 동작인 페이지 리로드를 방지
				// form 요소의 데이터를 쉽게 다룰 수 있도록 FormData 객체 생성
				const formData = new FormData(e.target as HTMLFormElement);

				console.log(FormDataEvent); // FormData {}

				//여기서 나타나는 email, name은 form 요소 안 input의 name 어트리뷰트 값이다.
				console.log(Object.fromEntries(formData)); //{"email": "", "name": "",}

				// FormData를 객체로 변환하여 createMember 함수에 전달.
				createMember(Object.fromEntries(formData) as any);
			}}
		>
			<label>
				이름
				<input type="text" name="name" />
			</label>

			<label>
				회사 이메일
				<input type="text" name="email" />
			</label>

			<button type="submit">추가하기</button>
		</form>
	);
};
```

### 4. 에러 메세지 테스트하기

**요구사항 2: 이름과 회사 이메일을 입력하지 않으면 입력해달라는 에러 메세지를 보여줍니다.**

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.test.tsx

test("이름과 이메일을 입력하지 않으면 입력해달라는 에러 메세지를 보여준다", async () => {
	let submitted = null;
	render(
		<MemberCreateForm
			createMember={async (newMember) => {
				submitted = newMember;
			}}
		/>
	);
	//0. given 처음에는 에러메세지가 보이지 않는다.
	await expectTL(queryTL.alert("이름을 입력해주세요")).not.toBeVisible();
	//1. 아무것도 입력하지 않고 추가하기 버튼을 누른다.
	await queryTL.button("추가하기").click();
	//2. 이름을 입력하라는 에러 메세지를 보여준다.
	await expectTL(queryTL.alert("이름을 입력해주세요")).toBeVisible();
	//3. 이메일을 입력하라는 에러 메세지를 보여준다.
	await expectTL(queryTL.alert("이메일을 입력해주세요")).toBeVisible();
	//아무것도 제출되지 않음
	expect(submitted).toEqual(null);
});
```

`useState`로 에러 상태를 관리하고 form 태그에서 폼을 제출할 때 formData의 특정 필드가 비어있는지 확인 후 에러 메시지를 업데이트해보도록 하겠습니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

const [errorState, setErrorState] = useState<{
    name?: string;
    email?: string;
}>({});

return (
    <form
        onSubmit={(e) => {
            e.preventDefault();

            const formData = new FormData(e.target as HTMLFormElement);
            const newError = {
                 // formData의 name 필드가 비어있는지 확인하고 에러 메시지를 설정
                name: formData.get("name") === "" ? "이름을 입력해주세요" : undefined,
                // formData의 email 필드가 비어있는지 확인하고 에러 메시지를 설정
                email:
                    formData.get("email") === "" ? "이메일을 입력해주세요" : undefined,
            };
            if (newError.name || newError.email) {
                setErrorState(newError); // 만약 에러가 있다면 상태를 업데이트하여 사용자에게 에러를 보여주기
                return; // 에러가 있으면 폼 제출을 중단
            }

            setErrorState({}); // 에러가 없으면 에러 상태를 초기화
            createMember(Object.fromEntries(formData) as any);
        }}
    >
    //..이름 input 아래에 alert 작성해주기 ..
        {errorState.name && (
            <div role="alert" aria-label="이름을 입력해주세요">
                이름을 입력해주세요
            </div>
        )}
    //..회사 이메일 input 아래에 alert 작성해주기 ..
        {errorState.email && (
            <div role="alert" aria-label="이메일을 입력해주세요">
                이메일을 입력해주세요
            </div>
        )}
        <button type="submit">추가하기</button>
    </form>
);
};
```

### 5. react-hook-form & valibot 사용하기

**요구사항 3: 회사 이메일 입력 값이 이메일 형식과 다르면 "올바른 이메일 형식을 입력해주세요" 에러가 뜹니다.**
**요구사항 4: 이름 입력 값이 24자를 초과하면 "이름은 24자까지만 입력 가능합니다" 에러가 뜹니다.**

form 요소에서 직접 데이터를 제출하는 대신 react-hook-form과 valibot을 사용하여 요구사항을 마저 테스트해보겠습니다.

```
pnpm add react-hook-form
pnpm add vaibot
```

react-hook-form의 `useForm` 훅은 폼 상태를 관리하고 검증하는데 사용되는 기본 훅입니다.
폼의 등록, 제출, 오류 상태 등을 한 컴포넌트 내에서 관리할 수 있습니다.

#### 5-1. 폼 초기화

`useForm` 훅을 호출하면 폼 상태를 초기화합니다.
이 때 `resolver`를 통해 유효성 검사 스키마를 전달합니다.
valibot 등의 유효성 검사 라이브러리와 통합하여 폼의 유효성 검사를 처리하는데에 유용합니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

import { valibotResolver } from "@hookform/resolvers/valibot";
import { useForm } from "react-hook-form";
import * as v from "valibot";

const NewMemberSchema = v.object({
	name: v.pipe(
		v.string(),
		v.minLength(1, "이름을 입력해주세요"),
		v.maxLength(24, "이름은 24자 이하로 입력해주세요")
	),
	email: v.pipe(
		v.string(),
		v.minLength(1, "이메일을 입력해주세요"),
		v.email("유효한 이메일을 입력해주세요")
	),
});

const methods = useForm<{ name: string; email: string }>({
	resolver: valibotResolver(NewMemberSchema),
});
```

#### 5-2. 입력 필드 등록

`register` 함수를 사용하여 폼 필드를 react-hook-form에 등록합니다. 이 때 필드의 이름을 인수로 전달해야합니다. 등록된 필드는 폼 상태로 관리되고, 유효성 검사 규칙이 적용됩니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

const methods = useForm<{ name: string; email: string }>({
	resolver: valibotResolver(NewMemberSchema),
});
const { register } = methods;

<label>
	이름
	<input
		type="text"
		{...register("name")}
		maxLength={24}
		aria-invalid={typeof errorState.name === "string"}
	/>
</label>;
```

#### 5-3. 폼 제출

`handleSubmit` 함수를 사용하여 폼이 제출될 때 유효성 검사를 수행하고, 검사를 통과한 경우 콜백 함수를 호출합니다.
유효성 검사에 실패한 필드는 `errors` 객체에 저장되고, 이를 통해 오류 메시지를 접근할 수 있습니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

const { register, handleSubmit } = methods;

const methods = useForm<{ name: string; email: string }>({
		resolver: valibotResolver(NewMemberSchema),
});

<form
    onSubmit={handleSubmit((data) => {
        createMember(data as any);
    })}
    aria-labelledby="form-title"
>

// input들 생략...
```

#### 5-4. 오류 상태 관리

`formState: {errors}`를 통해 각 필드의 유효성 검사 오류를 확인합니다.
오류가 있는 경우 해당 필드의 오류 메세지를 표시합니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

const methods = useForm<{ name: string; email: string }>({
	resolver: valibotResolver(NewMemberSchema),
});

const {
	formState: { errors },
} = methods;

const errorState = {
	name: errors.name?.message,
	email: errors.email?.message,
};

<label>
	이름
	<input
		type="text"
		{...register("name")}
		maxLength={24}
		aria-invalid={typeof errorState.name === "string"}
	/>
</label>;
{
	typeof errorState.name === "string" && (
		<div
			role="alert"
			aria-label={errorState.name} // 에러 메시지를 스크린 리더가 읽을 수 있도록 설정합니다.
		>
			{errorState.name}
		</div>
	);
}
```

### 6. Input 추출해서 리팩토링하기

반복되는 요소를 하위 컴포넌트로 분리해보겠습니다.

#### 6-1. useFormContext(), FormProvider를 사용하는 이유

useForm만 사용하면 폼 상태가 해당 컴포넌트 내에서만 관리되지만,
`useFormContext()`와 `FormPovider`를 같이 사용하면 부모 컴포넌트의 폼 상태에도 접근이 가능해집니다.
폼을 여러 컴포넌트로 나눌 때 유용합니다.

#### 6-2. Input 하위 컴포넌트에서 `useFormContext()`사용

하위 컴포넌트에서 `useFormContext()`로 폼 상태와 메서드에 접근합니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx 안의 Input 컴포넌트

import { type ComponentProps, forwardRef } from "react";
import { useFormContext } from "react-hook-form";

const Input = forwardRef<
	HTMLInputElement,
	ComponentProps<"input"> & { name: string }
>((props, ref) => {
	const {
		formState: { errors },
	} = useFormContext();

	return (
		<input
			ref={ref}
			{...props}
			aria-invalid={typeof errors[props.name]?.message === "string"}
		/>
	);
});
```

실습에서는 `forwardRef`와 `ComponentProps`도 함께 사용했습니다.

**ComponentProps**
`register` 함수가 요구하는 `name`과 input 요소의 모든 기본 속성을 포함할 수 있는 `ComponentProps<input>`을 prop으로 받게끔 작성했습니다. input의 기본 어트리뷰트인 name은 이미 `ComponentProps<input>` 안에 포함되어 있으므로 `register` 함수가 요구하는 `name`과 헷갈리지 마세요.

**forwardRef**
`forwardRef`를 하위 컴포넌트에서 사용하면, 부모 컴포넌트에서 하위 컴포넌트의 DOM 요소에 접근 가능해집니다.
부모 컴포넌트에서 폼 제출 후 유효성 검사가 실패한 경우 특정 필드에 포커스 주거나, 특정 조건에서 하위 컴포넌트의 DOM 요소 조작이 필요할 떄 유용합니다.
반면 `forwardRef`를 사용하지 않으면 하위 컴포넌트의 직접적인 DOM 조작이 불가하여 분리된 폼 컴포넌트 간의 복잡한 상호작용이 힘듭니다.

#### 6-3. MemberCreateForm 부모 컴포넌트에서 Input 컴포넌트 사용

부모 컴포넌트에서 `FormProvider`는 useForm에서 반환된 메서드와 상태를 Context를 통해 하위 컴포넌트에 제공합니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

import { useRef, useEffect } from "react";
import { valibotResolver } from "@hookform/resolvers/valibot";
import { FormProvider, useForm } from "react-hook-form";
import * as v from "valibot";

const NewMenmberSchema = v.object({
	//...유효성 검사 스키마...//
});

const nameInputRef = useRef<HTMLInputElement>(null);

useEffect(() => {
	if (errors.name) {
		nameInputRef.current?.focus();
	}
}, [errors]);

export const MemberCreateForm = ({
	createMember,
}: {
	createMember: (newMember: { name: string; email: string }) => Promise<void>;
}) => {
	const methods = useForm<{ name: string; email: string }>({
		resolver: valibotResolver(NewMemberSchema),
	});

	const { register, handleSubmit } = methods;

	return (
		<FormProvider {...methods}>
			//...h2, form 등...//
			<label>
				<div>
					이름 <span className={css({ color: "red" })}>*</span>
				</div>
				<Input type="text" {...register("name")} ref={nameInputRef} />
				<SimpleErrorMessage name="name" />
			</label>
		</FormProvider>
	);
};
```

### 7. ErrorMessageForm 추출해서 리팩토링하기

#### 7-1. SimpleErrorMessage 하위 컴포넌트에서 `useFormContext()`사용

Input 컴포넌트와 마찬가지로 `useFormContext()`로 Context에서 폼 상태와 메서드에 접근 가능합니다.

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx 안의 SimpleErrorMessage 컴포넌트

import { useFormContext } from "react-hook-form";

const SimpleErrorMessage = ({ name }: { name: string }) => {
	const {
		formState: { errors },
	} = useFormContext();

	const errorMessage = errors[name]?.message;
	if (errorMessage) {
		invariant(typeof errorMessage === "string");
		return (
			<p
				role="alert"
				aria-label={errorMessage}
				className={css({ color: "red" })}
			>
				{errorMessage}
			</p>
		);
	}
	return <p />;
};
```

#### 7-2. MemberCreateForm 부모 컴포넌트에서 SimpleErrorMessage 컴포넌트 사용

```tsx
// domains/member/MemberCrateForm/MemberCrateForm.tsx

<label>
	<div>
		이름 <span className={css({ color: "red" })}>*</span>
	</div>
	<Input type="text" {...register("name")} />
	<SimpleErrorMessage name="name" />
</label>
```

### 접근성 요소를 이용해서 스타일링 하기

### 토스트 메세지 테스트하기

### 목차

- [하나. 브라우저 컴포넌트 테스트 환경 셋업하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/cosmos)
- [둘. 목록과 필터 컴포넌트 테스트하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/domains/saas/SaasList)
- [셋. 폼 컴포넌트 테스트하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/domains/member/MemberCreateForm) <- 지금 여기
- [넷. 헤드리스 컴포넌트로 만든 디자인 시스템 테스트하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/common/components/SelectWithCombobox)
