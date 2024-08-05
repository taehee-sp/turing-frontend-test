## 헤드리스 컴포넌트로 만든 디자인 시스템 테스트하기

### 요구사항 파악하기

세번째 실습은 사용자 옵션을 선택하는 콤보박스를 만들어보는 예제입니다.

1. "설정하기" 버튼을 클릭하면 옵션 검색(입력창)과 옵션 선택이 가능한 콤보박스가 열립니다.
2. 콤보박스에 값을 입력하거나 옵션을 선택합니다.
3. 화면에 해당 옵션만 보이고 옆에 "해제하기" 버튼이 생깁니다.
4. 해제하기 버튼을 클릭하면 "사용자를 해제할까요?" 다이얼로그가 뜹니다.
5. 다이얼로그의 확인 버튼을 누르면 옵션이 해제됩니다.

### 헤드리스 컴포넌트를 사용하는 것의 이점

헤드리스 컴포넌트란, UI와 로직을 분리하여 재사용성을 높이는 패턴입니다. 낮은 결합도(커플링)을 가졌다고도 표현합니다.

헤드리스 컴포넌트를 사용하면 파괴적 변경의 위험을 줄이기 때문에 컴포넌트가 특정 도메인에 덜 의존적입니다. 도메인 로직이 변경되어도 컴폰너트를 수정할 필요가 적어지는 것입니다.

반면, 특정 도메인의 비즈니스 로직과 UI를 모두 포함한 컴포넌트는 파괴적 변경을 일으키기 쉽습니다. 높은 결합도(커플링)을 가졌다고도 표현합니다.

늘 헤드리스 컴포넌트가 정답은 아니지만, 현재 만들고 있는 공용 컴포넌트의 의존성을 자꾸 고쳐줘야한다면 적신호로 알고 헤드리스 컴포넌트로 바꿔주는 것이 좋습니다.

### 헤드리스 컴포넌트로 접근성 표준을 배우기

#### Combobox에서 쓰이는 role과 aria 속성 알아보기

실습에서는 [ariakit-Select with Combobox](https://ariakit.org/examples/select-combobox)를 사용합니다.
크롬 개발자 도구에서 [요소]-[접근성 트리 보기] 를 사용하면 현재 요소의 role이 무엇인지 볼 수 있습니다.

<img src="https://github.com/user-attachments/assets/de65054b-681e-4d3b-9547-963d22bb174d" width="960"/>

**role="combobox"**

- 콤보박스를 나타내는 입력 요소에 사용

**role="listbox"**

- 옵션 목록을 포함하는 컨테이너에 사용

**role="option"**

- 목록 내 각 옵션에 사용

> **접근성 표준이 늘 맞아떨어져보이진 않습니다.**
>
> ARIA 규격에 따르면 콤보박스의 input과 button은 둘다 role 어트리뷰트를 "combobox"로 표시합니다.
> combobox button에 달리는 aria 속성인 aria-expanded, aria-haspopup, aria-controls는 combobox input에도 동시에 쓰일 수 있습니다.

**aria-expanded**

- 콤보박스가 현재 확장되었는지(true), 축소되었는지를(false) 표시

**aria-haspopup**

- 해당 요소가 listbox나 dialog같은 팝업을 소유하고 있음을 표시
- 예시에서는 combobox 버튼이 dialog를 갖고 있고, combobox input이 listbox를 갖고 있음을 표시

**aria-controls**

- 특정 요소가 제어하는 다른 요소의 ID를 지정하는 속성
- 예시에서는 combobox input이 listbox의 id를 가리킴

**aria-selected**

- role="listbox"에서 주로 사용
- 목록 상자 내에서 현재 선택된 항목을 표시

### 헤드리스 컴포넌트를 사용해서 구현하기

**요구사항 1: "설정하기" 버튼을 클릭하면 옵션 검색(입력창)과 옵션 선택이 가능한 콤보박스가 열립니다.**
**요구사항 2: 콤보박스에 값을 입력하거나 옵션을 선택합니다.**
**요구사항 3: 화면에 해당 옵션만 보이고 옆에 "해제하기" 버튼이 생깁니다.**

#### SelectWithCombobx 테스트 작성하기

SelectWithCombobx.test에서 테스트를 작성합니다.

```tsx
// common/component/SelectWithCombobox/SelectWithCombobx.test.tsx

//1. 처음에는 설정하기 버튼을 클릭한다.
await expectTL(queryTL.combobox("사용자")).toHaveText("설정하기");
await queryTL.combobox("사용자").click();

//2. 콤보박스에 전체 옵션들이 보인다.
await expectTL(queryTL.option("")).toHaveTextContents([
	"탐정토끼",
	"김태희",
	"stelo",
]);

//콤보박스와 그 내부의 옵션들이 접근성 트리에 올바르게 포함되어 있는지 확인하는 코드
expect(getA11ySnapshot(document.body)).toMatchInlineSnapshot(`
			"combobox: 사용자
			dialog: 사용자
			  combobox: 이름을 입력해주세요
			  listbox
			    option: 탐정토끼
			    option: 김태희
			    option: stelo"
		`);

//3. 콤보박스에 값을 입력하면 연관 옵션들이 보인다.
await queryTL.combobox("이름을 입력해주세요").fill("ㅌ");
await expectTL(queryTL.option("")).toHaveTextContents(["탐정토끼", "김태희"]);

//4. 옵션을 클릭한다.
await queryTL.option("김태희").click();

//5. 화면에 선택한 옵션만 보이고 옆에 해제하기 버튼이 같이 보인다.
await queryTL.button("김태희 해제하기").click();
```

`toHaveTextContents`를 통해 콤보박스 옵션들을 확인할 수 있습니다. 그런데 왜 `getA11ySnapshot`를 통해 한번더 옵션들을 확인하는 테스트를 작성해줄까요?

`getA11ySnapshot`함수는 접근성 측면에서 페이지의 현재 상태를 캡처해줍니다. 이 스냅샷은 해당 요소들이 접근성 트리에 올바르게 포함되어 있는지 확인하는 데 유용합니다.

즉, `toHaveTextContents`는 단순히 UI 요소가 예상된 텍스트를 포함하고 있는지를 확인하는 데 사용하고, `getA11ySnapshot`는 접근성 요구사항을 충족하는지 확인하므로 두 가지 테스트를 같이 하는 것이 좋습니다.

#### SelectCombobox 우리 요구사항에 맞게 변형하기

SelectWithCombobox를 구현하기 위해서 [ariakit SelectWitchCombobox](https://ariakit.org/examples/select-combobox)을 우리 요구사항에 맞게 변형합니다.

1. ariakit-[examples]에서 원하는 형태의 컴포넌트를 골라 import문, return문을 복사 붙여넣기 해줍니다.

2. 안 쓰는 import문, 변수 등은 제거해줍니다.

   편의에 따라 전체 요소를 `*`로 import해오는 대신 필요한 요소만 import해올 수도 있습니다.

   ```tsx
   import { SelectProvider } from "@ariakit/react";

   <SelectProvider
       defaultValue=""
       setValue={onSelectedChange}
       value={selected ?? ""}
   >
   ```

   실습에서는 `*`로 import해옵니다.

   ```tsx
   import * from "@ariakit/react";
   <Ariakit.SelectProvider defaultValue="Apple">
   ```

3. **ariakit-[examples]-[선택한 컴포넌트]** 옆의 UI를 비교하여 요소요소마다 실습에 맞는 내용으로 변환해줍니다. 실습에서는 `SelectWitchCombobox.stories`에서 넘겨주는 prop들이 들어갈 자리를 찾아주는 것부터 시작합니다.

4. 기존 UI에서 더 필요한 요소를 넣으려면 ariakit의 태그가 어떤 요소들을 추가적으로 받을 수 있는지 알아야합니다. 관련 있어 보이는 요소를 ariakit-[API reference]에서 찾으면 됩니다.

   예를 들어, 값이 설정되지 않았을 때는 `<Select>` 버튼에서 "설정하기" 문자가 보여지면 좋겠으므로 `<Select>` 버튼에 추가적인 요소를 넣을 수 있는지 찾기 위해 **[API reference]**에서 [Select 관련 요소](https://ariakit.org/reference/select-value)들을 살펴볼 수 있습니다.

   필요한 경우 가져다 쓰는 Ariakit 요소가 다루는 값이 어떤 타입인지 명시해줘야할 때가 있습니다.
   이럴 때는 제네릭 타입`<컴포넌트명<타입명>>`을 통해 컴포넌트가 다루는 데이터 타입을 명확히 해줍니다.

```tsx
// common/component/SelectWithCombobox/SelectWithCombobx.tsx

import * from "@ariakit/react";
import { startTransition, useState } from "react";

export const SelectWithCombobox = ({
    // SelectWithCombobox.stories에서 넘어오는 prop들...
// {
// 	label: ReactNode;
// 	emptyValue: ReactNode;
// 	removeLabel: ReactNode;
// 	optionList: { value: string; searchValue: string; label: ReactNode }[];
// 	searchPlaceholder: string;
// 	selected: string | null;
// 	onChange: (value: string | null) => void;
// }
}) => {

const selectedOption = selected
    ? optionList.find((option) => option.value === selected)
    : null;

    return (
    <Ariakit.ComboboxProvider
            resetValueOnHide
            setValue={(value) => {
            startTransition(() => {
                setSearchValue(value);
            });
            }}
        >
            <Ariakit.SelectProvider defaultValue="">
            <Ariakit.SelectLabel>{label}</Ariakit.SelectLabel>
                {selectedOption ? (
                    //옵션이 선택된 경우에는 추가적인 해제 버튼을 Selct 옆에 달아준다.
                        <button
                            type="button"
                            onClick={() => {
                                onChange(null);
                            }}
                        >
                            {selectedOption.label} {removeLabel}
                        </button>
                    ) : (
                        <Ariakit.Select className="button">
                            <Ariakit.SelectValue>{() => emptyValue}</Ariakit.SelectValue>
                        </Ariakit.Select>
                    )}
            <Ariakit.SelectPopover gutter={4} sameWidth className="popover">
                <div className="combobox-wrapper">
                <Ariakit.Combobox
                    autoSelect
                    //searchPlaceholder
                    placeholder={searchPlaceholder}
                    className="combobox"
                    //searchPlaceholder
                    aria-label={searchPlaceholder}
                />
                </div>
                <Ariakit.ComboboxList>
                {matches.map((option) => (
                    <Ariakit.SelectItem
                    //value 대신 option.value 사용
                    key={option.value}
                    value={option.value}
                    className="select-item"
                    render={<Ariakit.ComboboxItem>{option.label}</Ariakit.CombobxITem>}
                    />
                ))}
                </Ariakit.ComboboxList>
            </Ariakit.SelectPopover>
            </Ariakit.SelectProvider>
        </Ariakit.ComboboxProvider>
    );
};
```

### dialog 테스트하기

**요구사항 4: 해제하기 버튼을 클릭하면 "사용자를 해제할까요?" 다이얼로그가 뜹니다.**
**요구사항 5: 다이얼로그의 OK 버튼을 누르면 옵션이 해제됩니다.**

SelectWitchComboxbox 테스트를 작성합니다.
접근성 속성(ARIA attributes)에 따라 role이 dialog인 요소가 뜨는 테스트를 작성합니다.

```tsx
// common/component/SelectWithCombobox/SelectWithCombobx.test.tsx

//5. 해제하기 버튼을 클릭하면 "사용자를 해제할까요?" 다이얼로그가 뜬다.
await queryTL.button("김태희 해제하기").click();
await expectTL(queryTL.dialog("사용자를 해제할까요?")).toBeVisible();

//해제하기 버튼을 클릭하면  접근성 트리에 올바르게 포함되어 있는지 확인하는 코드
expect(getA11ySnapshot(document.body)).toMatchInlineSnapshot(`
			"button: 김태희 해제하기
			dialog: 사용자를 해제할까요?
			  heading: 사용자를 해제할까요?
			  button: 확인"
		`);

//6. 다이얼로그의 확인 버튼을 누른다.
await queryTL.dialog("사용자를 해제할까요?").button("확인").click();
await expectTL(queryTL.combobox("사용자")).toHaveText("설정하기");
```

SelectWitchCombobox.stories에서 [ariakit-dialog](https://ariakit.org/components/dialog)을 활용하여 테스트에 맞는 dialog 컴포넌트를 작성합니다.

```tsx
// common/component/SelectWithCombobox/SelectWithCombobx.stories.tsx

import { Dialog, DialogDismiss, DialogHeading } from "@ariakit/react/dialog";

<Dialog open={open} onClose={() => setOpen(false)} className="dialog">
	<DialogHeading className="heading">사용자를 해제할까요?</DialogHeading>
	<div>
		<DialogDismiss className="button" onClick={() => setSelected(null)}>
			확인
		</DialogDismiss>
	</div>
</Dialog>;
```

### 테스트를 믿고 리팩토링 해보기 toss overlay

1.  [overlay-kit](https://overlay-kit.slash.page/)을 설치합니다.

    ```
    pnpm install overlay-kit
    ```

2.  `OverlayProvider`로 오버레이가 렌더링될 곳을 지정합니다.

    보통 애플리케이션 최상단 root에서 오버레이를 렌더링하면 되지만 작동하지 않으면 각 컴포넌트의 최상단에서 렌더링해주면 됩니다.

    `overlay.open()`을 호출하여 오버레이를 열어줍니다.

    ```tsx
    // common/component/SelectWithCombobox/SelectWithCombobx.stories.tsx

    import { overlay, OverlayProvider } from "overlay-kit";

    return (
    <OverlayProvider>
        <SelectWithCombobox
            //..기타 prop 생략...//
            onChange={(newOwner) => {
                //newOwner가 null이면 setOpen을 true로 설정해서 다이얼로그를 엽니다.
                if (value == null) {
                    overlay.open(({ isOpen, close }) => {
                        return (
                            <Dialog open={isOpen} onClose={close} className="dialog">
                                //...DialogHeading, DialogDismiss 등 생략...//
                            </Dialog>
                        );
                    });
                } else {
                    //newOwner가 null이 아니면 setSelected를 newOwner(null)로 설정합니다.
                    setSelected(value);
                }
            }}
        />
    </OverlayProvider>
    ```

### 목차

- [하나. 브라우저 컴포넌트 테스트 환경 셋업하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/cosmos)
- [둘. 목록과 필터 컴포넌트 테스트하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/domains/saas/SaasList)
- [셋. 폼 컴포넌트 테스트하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/domains/member/MemberCreateForm)
- [넷. 헤드리스 컴포넌트로 만든 디자인 시스템 테스트하기](https://github.com/taehee-sp/turing-frontend-test/tree/main/src/app/common/components/SelectWithCombobox) <- 지금 여기
