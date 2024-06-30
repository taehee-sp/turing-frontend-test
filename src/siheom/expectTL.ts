import { waitFor } from '@testing-library/dom';
import { expect } from 'vitest';
import { swapStackAsync, type TLocator } from './queryTL';

const NonVisibleElement = document.createElement('div');
NonVisibleElement.ariaHidden = 'true';

export function expectTL(tLocator: TLocator): {
    toBeChecked: () => Promise<void>;
    toBeVisible: () => Promise<void>;
    toBeDisabled: () => Promise<void>;
    toBeCurrent: (type: 'page' | 'step' | 'location' | 'date' | 'time' | 'true') => Promise<void>;
    toBeExpanded: () => Promise<void>;
    toBeSelected: () => Promise<void>;
    toBeFocusable: () => Promise<void>;
    toHaveText: (text: string) => Promise<void>;
    toHaveValue: (value: string) => Promise<void>;
    toHaveTextContents: (value: string[]) => Promise<void>;
    toHaveCount: (count: number) => Promise<void>;
    toBeFocused: () => Promise<void>;
    not: {
        toBeChecked: () => Promise<void>;
        toBeVisible: () => Promise<void>;
        toBeDisabled: () => Promise<void>;
        toBeCurrent: (type: 'page' | 'step' | 'location' | 'date' | 'time' | 'true' | 'false') => Promise<void>;
        toBeExpanded: () => Promise<void>;
        toBeSelected: () => Promise<void>;
        toBeFocusable: () => Promise<void>;
        toHaveText: (text: string) => Promise<void>;
        toHaveValue: (value: string) => Promise<void>;
        toHaveTextContents: (value: string[]) => Promise<void>;
        toHaveCount: (count: number) => Promise<void>;
        toBeFocused: () => Promise<void>;
    };
} {
    return {
        async toBeChecked() {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).toBeChecked();
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toBeVisible() {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).toBeVisible();
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toBeDisabled() {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).toHaveAttribute('aria-disabled', 'true');
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toBeCurrent(type) {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).toHaveAttribute('aria-current', type);
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toBeExpanded() {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).toHaveAttribute('aria-expanded', 'true');
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toBeSelected() {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).toHaveAttribute('aria-selected', 'true');
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toBeFocusable() {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).not.toHaveAttribute('tabindex', '-1');
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toHaveText(text) {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).toHaveTextContent(text);
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toHaveValue(value) {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).toHaveValue(value);
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toHaveTextContents(value) {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.getAll().map((el) => el.textContent)).toEqual(value);
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        async toHaveCount(count) {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.findAll()).toHaveLength(count);
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },

        async toBeFocused() {
            const fakeError = new Error();
            return waitFor(() => {
                try {
                    expect(tLocator.get()).toBe(document.activeElement);
                } catch (error) {
                    return swapStackAsync(fakeError, error);
                }
            });
        },
        not: {
            async toBeChecked() {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.get()).not.toBeChecked();
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toBeVisible() {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        // null인 경우도 playwright와 같이 non visible로 처리
                        expect(tLocator.query() ?? NonVisibleElement).not.toBeVisible();
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toBeDisabled() {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.get()).not.toHaveAttribute('aria-disabled', 'true');
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toBeCurrent(type = 'false') {
                const fakeError = new Error();
                if (type === 'false') {
                    return waitFor(() => {
                        try {
                            expect(tLocator.get()).toHaveAttribute('aria-current', 'false');
                        } catch (error) {
                            return swapStackAsync(fakeError, error);
                        }
                    });
                }
                return waitFor(() => {
                    try {
                        expect(tLocator.get()).not.toHaveAttribute('aria-current', type);
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toBeExpanded() {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.get()).not.toHaveAttribute('aria-expanded', 'true');
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toBeSelected() {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.get()).not.toHaveAttribute('aria-selected', 'true');
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toBeFocusable() {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.get()).toHaveAttribute('tabindex', '-1');
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toHaveText(text) {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.get()).not.toHaveTextContent(text);
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toHaveValue(value) {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.get()).not.toHaveValue(value);
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toHaveTextContents(value) {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.getAll().map((el) => el.textContent)).not.toEqual(value);
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toHaveCount(count) {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.findAll()).not.toHaveLength(count);
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            },
            async toBeFocused() {
                const fakeError = new Error();
                return waitFor(() => {
                    try {
                        expect(tLocator.get()).not.toBe(document.activeElement);
                    } catch (error) {
                        return swapStackAsync(fakeError, error);
                    }
                });
            }
        }
    };
}
