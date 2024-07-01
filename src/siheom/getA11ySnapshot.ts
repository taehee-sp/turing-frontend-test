export function getA11ySnapshot(element: HTMLElement) {
	function getAriaRole(el: HTMLElement) {
		return (
			el.getAttribute("role") ||
			{
				h1: "heading",
				h2: "heading",
				h3: "heading",
				h4: "heading",
				h5: "heading",
				h6: "heading",
				ul: "list",
				ol: "list",
				li: "listitem",
				a: "link",
				button: "button",
				input: "textbox",
				img: "img",
				table: "table",
			}[el.tagName.toLowerCase()] ||
			""
		);
	}

	function getAccessibleName(el: HTMLElement) {
		if (el.hasAttribute("alt")) return el.getAttribute("alt");
		if (el.hasAttribute("aria-label")) return el.getAttribute("aria-label");
		if (el.hasAttribute("aria-labelledby")) {
			const labelId = el.getAttribute("aria-labelledby");

			if (labelId) {
				const labelEl = document.getElementById(labelId);
				if (labelEl) return labelEl.textContent?.trim() ?? "";
			}
		}
		if (el.id) {
			const labelEl = document.querySelector(`label[for="${el.id}"]`);
			if (labelEl) return labelEl.textContent?.trim() ?? "";
		}

		// https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/#namingtechniques
		if (
			[
				"button",
				"cell",
				"checkbox",
				"columnheader",
				"gridcell",
				"heading",
				"link",
				"menuitem",
				"menuitemcheckbox",
				"menuitemradio",
				"option",
				"radio",
				"row",
				"rowheader",
				"switch",
				"tab",
				"tooltip",
			].includes(getAriaRole(el))
		) {
			return el.textContent?.trim() ?? "";
		}
		return "";
	}

	function processElement(el: HTMLElement, depth = 0) {
		if(el.ariaHidden || el.hidden) return ""
		const role = getAriaRole(el);

		if(role === 'presentation') return ""

		const name = getAccessibleName(el);
		let result = role
			? `${"  ".repeat(depth) + role + (name ? `: ${name}` : "")}\n`
			: "";

		for (const child of Array.from(el.children)) {
			if (child instanceof HTMLElement) {
				result += processElement(child, depth + (role ? 1 : 0));
			}
		}

		return result;
	}

	return processElement(element).trim();
}
