import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
function safeFromEntries<K extends PropertyKey, V>(entries: [K, V][]) {
	return Object.fromEntries(entries) as {
		[k in K]: V;
	};
}

export function swapStackAsync(fakeError: Error, error: unknown) {
	if (error instanceof Error) {
		const lines = fakeError.stack?.split("\n") ?? [];
		const fail = error.stack?.split("\n").slice(0, 5) ?? [];
		error.stack = [...fail, lines[0], ...lines.slice(2)].join("\n");
		// console.log(error.stack);
		return Promise.reject(error);
	}
	return Promise.reject(error);
}

export function swapStackSync(fakeError: Error, error: unknown) {
	if (error instanceof Error) {
		const lines = fakeError.stack?.split("\n") ?? [];
		const fail = error.stack?.split("\n").slice(0, 5) ?? [];
		error.stack = [...fail, lines[0], ...lines.slice(2)].join("\n");
		// console.log(error.stack);
		return error;
	}
	return error;
}

export type TLocator = {
	click(options?: Parameters<typeof userEvent.click>[1]): Promise<void>;
	fill(
		text: string,
		options?: Parameters<typeof userEvent.type>[2],
	): Promise<void>;
	clear(): Promise<void>;
	waitFor(): Promise<void>;
	find(): Promise<HTMLElement>;
	findAll(): Promise<HTMLElement[]>;
	get(): HTMLElement;
	getAll(): HTMLElement[];
	query(): HTMLElement | null;
} & ReturnType<typeof createQueryTL>;

const ARIAWidgetRole = [
	"button",
	"checkbox",
	"gridcell",
	"link",
	"menuitem",
	"menuitemcheckbox",
	"menuitemradio",
	"option",
	"progressbar",
	"radio",
	"scrollbar",
	"searchbox",
	"slider",
	"spinbutton",
	"switch",
	"tab",
	"tabpanel",
	"textbox",
	"treeitem",
] as const;

const ARIACompositeWidgetRole = [
	"combobox",
	"grid",
	"listbox",
	"menu",
	"menubar",
	"radiogroup",
	"tablist",
	"tree",
	"treegrid",
] as const;

const ARIADocumentStructureRole = [
	"application",
	"article",
	"blockquote",
	"caption",
	"cell",
	"columnheader",
	"definition",
	"deletion",
	"directory",
	"document",
	"emphasis",
	"feed",
	"figure",
	"generic",
	"group",
	"heading",
	"img",
	"insertion",
	"list",
	"listitem",
	"math",
	"meter",
	"none",
	"note",
	"paragraph",
	"presentation",
	"row",
	"rowgroup",
	"rowheader",
	"separator",
	"strong",
	"subscript",
	"superscript",
	"table",
	"term",
	"time",
	"toolbar",
	"tooltip",
] as const;

const ARIALiveRegionRole = [
	"alert",
	"log",
	"marquee",
	"status",
	"timer",
] as const;

const ARIAWindowRole = ["alertdialog", "dialog"] as const;

const ARIALandmarkRole = [
	"banner",
	"complementary",
	"contentinfo",
	"form",
	"main",
	"navigation",
	"region",
	"search",
] as const;
export const roles = [
	...ARIACompositeWidgetRole,
	...ARIADocumentStructureRole,
	...ARIALandmarkRole,
	...ARIAWidgetRole,
	...ARIALiveRegionRole,
	...ARIAWindowRole,
];

export function createQueryTL(getBaseElement = () => document.body) {
	const base = () => within(getBaseElement());
	const query = safeFromEntries(
		roles.map((role) => [
			role,
			(_name?: string | RegExp, exact = false) => {
				const name = _name
					? exact || _name instanceof RegExp
						? _name
						: new RegExp(_name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i")
					: undefined;
				const result: TLocator = {
					async click(options) {
						const fakeError = new Error();
						try {
							await base()
								.findByRole(role, { name })
								.then(($el) => userEvent.click($el, options));
						} catch (error) {
							return swapStackAsync(fakeError, error);
						}
					},
					async fill(text, options) {
						const fakeError = new Error();
						try {
							await base()
								.findByRole(role, { name })
								.then(async ($el) => {
									await userEvent.clear($el);
									await userEvent.type($el, text, options);
								});
						} catch (error) {
							return swapStackAsync(fakeError, error);
						}
					},
					async clear() {
						const fakeError = new Error();
						try {
							await base()
								.findByRole(role, { name })
								.then(($el) => userEvent.clear($el));
						} catch (error) {
							return swapStackAsync(fakeError, error);
						}
					},
					async waitFor() {
						const fakeError = new Error();
						try {
							await base().findByRole(role, { name }, { timeout: 2000 });
						} catch (error) {
							return swapStackAsync(fakeError, error);
						}
					},
					find: async () => {
						const fakeError = new Error();
						try {
							return await base().findByRole(role, { name });
						} catch (error) {
							return swapStackAsync(fakeError, error);
						}
					},
					findAll: async () => {
						const fakeError = new Error();
						try {
							return await base().findAllByRole(role, { name });
						} catch (error) {
							return swapStackAsync(fakeError, error);
						}
					},
					get: () => {
						const fakeError = new Error();
						try {
							return base().getByRole(role, { name });
						} catch (error) {
							throw swapStackSync(fakeError, error);
						}
					},
					getAll: () => {
						const fakeError = new Error();
						try {
							return base().getAllByRole(role, { name });
						} catch (error) {
							throw swapStackSync(fakeError, error);
						}
					},
					query: () => {
						const fakeError = new Error();
						try {
							return base().queryByRole(role, { name });
						} catch (error) {
							throw swapStackSync(fakeError, error);
						}
					},
					...createQueryTL(() => base().getByRole(role, { name })),
				};
				return result;
			},
		]),
	);

	return {
		...query,
		text: (text: string, exact = false) => {
			const find = () => base().findByText(text);
			const result: TLocator = {
				async click(options) {
					return find().then(($el) => userEvent.click($el, options));
				},
				async fill(text, options) {
					return find().then(($el) => userEvent.type($el, text, options));
				},
				async clear() {
					return find().then(($el) => userEvent.clear($el));
				},
				async waitFor() {
					return find().then(() => undefined);
				},
				find,
				findAll: () => base().findAllByText(text),
				get: () => base().getByText(text),
				getAll: () => base().getAllByText(text),
				query: () => base().queryByText(text),
				...createQueryTL(() => base().getByText(text)),
			};
			return result;
		},
	};
}

export const queryTL = createQueryTL();
