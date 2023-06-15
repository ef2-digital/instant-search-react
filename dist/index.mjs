import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { Fragment as Fragment$1, useMemo, forwardRef, createElement, useState, useEffect, useRef } from 'react';
import { usePagination as usePagination$1, InstantSearch, Configure } from 'react-instantsearch-hooks-web';
import classNames from 'classnames';
import { useHits, useSortBy, useRefinementList, useRange, useInstantSearch, useClearRefinements } from 'react-instantsearch-hooks';
import { ArrowLeftIcon, ArrowRightIcon, ChevronDownIcon, CheckIcon, Cross2Icon, ChevronUpIcon, MixerHorizontalIcon } from '@radix-ui/react-icons';
import * as SelectPrimitive from '@radix-ui/react-select';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva } from 'class-variance-authority';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as CollapsiblePrimitive from '@radix-ui/react-collapsible';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise */


var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

var Hit = function (_a) {
    var hit = _a.hit;
    if (!hit) {
        return jsx(Fragment, {});
    }
    return jsx("div", { children: "Hit" });
};

var Hits = function (_a) {
    var renderHit = _a.renderHit, hitsClassNames = _a.hitsClassNames;
    var hits = useHits().hits;
    return (jsx("div", { className: classNames(hitsClassNames === null || hitsClassNames === void 0 ? void 0 : hitsClassNames.grid, 'grid grid-cols-1 gap-8'), children: hits.map(function (hit) {
            return renderHit ? jsxs(Fragment$1, { children: [" ", renderHit({ hit: hit })] }, "".concat(hit.objectID, "-").concat(hit.id)) : jsx(Hit, { hit: hit });
        }) }));
};

var DOTS = '...';
var range = function (start, end) {
    var length = end - start + 1;
    return Array.from({ length: length }, function (_, idx) { return idx + start; });
};
var usePagination = function (_a) {
    var totalCount = _a.totalCount, pageSize = _a.pageSize, _b = _a.siblingCount, siblingCount = _b === void 0 ? 1 : _b, currentPage = _a.currentPage;
    var paginationRange = useMemo(function () {
        var totalPageCount = Math.ceil(totalCount / pageSize);
        // Pages count is determined as siblingCount + firstPage + lastPage + currentPage + 2*DOTS
        var totalPageNumbers = siblingCount + 5;
        /*
          If the number of pages is less than the page numbers we want to show in our
          paginationComponent, we return the range [1..totalPageCount]
        */
        if (totalPageNumbers >= totalPageCount) {
            return range(1, totalPageCount);
        }
        var leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        var rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);
        /*
          We do not want to show dots if there is only one position left
          after/before the left/right page count as that would lead to a change if our Pagination
          component size which we do not want
        */
        var shouldShowLeftDots = leftSiblingIndex > 2;
        var shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;
        var firstPageIndex = 1;
        var lastPageIndex = totalPageCount;
        if (!shouldShowLeftDots && shouldShowRightDots) {
            var leftItemCount = 3 + 2 * siblingCount;
            var leftRange = range(1, leftItemCount);
            return __spreadArray(__spreadArray([], leftRange, true), [DOTS, totalPageCount], false);
        }
        if (shouldShowLeftDots && !shouldShowRightDots) {
            var rightItemCount = 3 + 2 * siblingCount;
            var rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);
            return __spreadArray([firstPageIndex, DOTS], rightRange, true);
        }
        if (shouldShowLeftDots && shouldShowRightDots) {
            var middleRange = range(leftSiblingIndex, rightSiblingIndex);
            return __spreadArray(__spreadArray([firstPageIndex, DOTS], middleRange, true), [DOTS, lastPageIndex], false);
        }
    }, [totalCount, pageSize, siblingCount, currentPage]);
    return paginationRange;
};

var Pager = function (_a) {
    var pagerClassNames = _a.pagerClassNames, currentPage = _a.currentPage, paginationRange = _a.paginationRange, onPrevious = _a.onPrevious, onNext = _a.onNext, toPage = _a.toPage, lastPage = _a.lastPage;
    return (jsx("nav", { "aria-label": "pagination", className: classNames('mt-8 flex', pagerClassNames === null || pagerClassNames === void 0 ? void 0 : pagerClassNames.wrapper), children: jsxs("ul", { className: classNames('isolate inline-flex flex-wrap items-center space-x-2 md:mb-8 md:pl-8 mx-auto'), children: [jsx("li", { className: classNames('pagination-item', {
                        'text-gray-300': currentPage < 1
                    }), children: jsx("button", { onClick: onPrevious, className: classNames('bg-white disabled:hover:bg-white disabled:hover:text-inherit disabled:hover:cursor-not-allowed hover:bg-primary hover:text-white relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-sm font-medium no-underline hover:no-underline focus:z-20 focus:no-underline', pagerClassNames === null || pagerClassNames === void 0 ? void 0 : pagerClassNames.pagerItem), disabled: currentPage < 1, children: jsx(ArrowLeftIcon, { className: classNames('mr-1 h-4 w-4', { 'fill-gray-300': currentPage < 1 }) }) }) }), paginationRange &&
                    paginationRange.map(function (pageNumber, index) {
                        var active = pageNumber === currentPage + 1;
                        if (pageNumber === DOTS) {
                            return (jsx("li", { className: "pagination-item dots", children: "\u2026" }, index));
                        }
                        return (jsx("li", { "aria-current": active, children: jsx("button", { className: classNames('relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-sm font-medium no-underline hover:no-underline focus:z-20 focus:no-underline', pagerClassNames === null || pagerClassNames === void 0 ? void 0 : pagerClassNames.pagerItem, {
                                    'bg-white text-gray-500 hover:bg-primary/10 hover:text-gray-600 focus:text-gray-500': !active,
                                    'z-10 bg-primary text-white hover:bg-primary-600 hover:text-white focus:text-white': active
                                }), onClick: function () { return typeof pageNumber === 'number' && toPage(pageNumber - 1); }, children: pageNumber }) }, index));
                    }), jsx("li", { className: classNames('pagination-item', {
                        'text-gray-300': currentPage + 1 === lastPage
                    }), children: jsx("button", { onClick: onNext, className: classNames('bg-white disabled:hover:bg-white disabled:hover:text-inherit disabled:hover:cursor-not-allowed hover:bg-primary hover:text-white relative inline-flex h-10 w-10 items-center justify-center rounded-sm text-sm font-medium no-underline hover:no-underline focus:z-20 focus:no-underline', pagerClassNames === null || pagerClassNames === void 0 ? void 0 : pagerClassNames.pagerItem), disabled: currentPage + 1 === lastPage, children: jsx(ArrowRightIcon, { className: classNames('ml-1 h-4 w-4', { 'fill-gray-300': currentPage + 1 === lastPage }) }) }) })] }) }));
};

var Pagination = forwardRef(function (_a, ref) {
    var classNames = _a.classNames, hitsPerPage = _a.hitsPerPage;
    var _b = usePagination$1(), refine = _b.refine, currentRefinement = _b.currentRefinement, nbHits = _b.nbHits;
    var paginationRange = usePagination({ totalCount: nbHits, pageSize: hitsPerPage, siblingCount: 1, currentPage: currentRefinement });
    if (!paginationRange || paginationRange.length < 2) {
        return null;
    }
    var onNext = function () {
        toPage(currentRefinement + 1);
    };
    var onPrevious = function () {
        toPage(currentRefinement - 1);
    };
    var toPage = function (pageNumber) {
        var _a;
        //@ts-ignore
        ref && ((_a = ref.current) === null || _a === void 0 ? void 0 : _a.scrollIntoView({ behavior: 'smooth' }));
        refine(pageNumber);
    };
    var lastPage = paginationRange[paginationRange.length - 1];
    return (jsx(Pager, { pagerClassNames: classNames, paginationRange: paginationRange, currentPage: currentRefinement, onNext: onNext, onPrevious: onPrevious, toPage: toPage, lastPage: lastPage }));
});

/** imported from shadcn */
var Select = SelectPrimitive.Root;
var SelectValue = SelectPrimitive.Value;
var SelectTrigger = forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (jsxs(SelectPrimitive.Trigger, __assign({ ref: ref, className: classNames('flex h-10 w-full items-center justify-between rounded-md border border-input px-3 py-2 text-sm ring-offset-primary placeholder:text-muted-foreground focus:outline-none focus:ring-0 focus:ring-primary focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50', className) }, props, { children: [children, jsx(SelectPrimitive.Icon, { asChild: true, children: jsx(ChevronDownIcon, { className: "h-4 w-4 opacity-50" }) })] })));
});
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;
var SelectContent = forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, _b = _a.position, position = _b === void 0 ? 'popper' : _b, props = __rest(_a, ["className", "children", "position"]);
    return (jsx(SelectPrimitive.Portal, { children: jsx(SelectPrimitive.Content, __assign({ ref: ref, className: classNames('relative z-50 min-w-[8rem] focus :outline-none overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80', position === 'popper' && 'translate-y-1', className), position: position }, props, { children: jsx(SelectPrimitive.Viewport, { className: classNames('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'), children: children }) })) }));
});
SelectContent.displayName = SelectPrimitive.Content.displayName;
var SelectLabel = forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (jsx(SelectPrimitive.Label, __assign({ ref: ref, className: classNames('py-1.5 pl-8 pr-2 text-sm font-semibold', className) }, props)));
});
SelectLabel.displayName = SelectPrimitive.Label.displayName;
var SelectItem = forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (jsxs(SelectPrimitive.Item, __assign({ ref: ref, className: classNames('relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:outline-none focus:bg-primary  focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50', className) }, props, { children: [jsx("span", { className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center", children: jsx(SelectPrimitive.ItemIndicator, { children: jsx(CheckIcon, { className: "h-4 w-4" }) }) }), jsx(SelectPrimitive.ItemText, { children: children })] })));
});
SelectItem.displayName = SelectPrimitive.Item.displayName;
var SelectSeparator = forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (jsx(SelectPrimitive.Separator, __assign({ ref: ref, className: classNames('-mx-1 my-1 h-px bg-muted', className) }, props)));
});
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

var SortBy = function (_a) {
    var items = _a.items, settings = _a.settings;
    var _b = useSortBy({ items: items }); _b.currentRefinement; var options = _b.options, refine = _b.refine;
    var sort = function (value) {
        refine(value);
    };
    return (jsx("div", { className: 'flex ml-auto w-44', children: jsxs(Select, { onValueChange: function (value) { return sort(value); }, children: [jsx(SelectTrigger, { className: "bg-white", children: jsx(SelectValue, { placeholder: settings === null || settings === void 0 ? void 0 : settings.placeholder }) }), jsx(SelectContent, { className: "bg-white", children: options.map(function (option) { return (jsx(SelectItem, { value: "".concat(option.value), children: option.label }, "sortby-".concat(option.value))); }) })] }) }));
};

/** imported from shadcn */
var Sheet = SheetPrimitive.Root;
var SheetTrigger = SheetPrimitive.Trigger;
var portalVariants = cva("fixed inset-0 z-50 flex", {
    variants: {
        position: {
            top: "items-start",
            bottom: "items-end",
            left: "justify-start",
            right: "justify-end",
        },
    },
    defaultVariants: { position: "right" },
});
var SheetPortal = function (_a) {
    var position = _a.position, className = _a.className, children = _a.children, props = __rest(_a, ["position", "className", "children"]);
    return (jsx(SheetPrimitive.Portal, __assign({ className: classNames(className) }, props, { children: jsx("div", { className: portalVariants({ position: position }), children: children }) })));
};
SheetPortal.displayName = SheetPrimitive.Portal.displayName;
var SheetOverlay = forwardRef(function (_a, ref) {
    var className = _a.className; _a.children; var props = __rest(_a, ["className", "children"]);
    return (jsx(SheetPrimitive.Overlay, __assign({ className: classNames("fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all duration-100 data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in", className) }, props, { ref: ref })));
});
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;
var sheetVariants = cva("fixed z-50 scale-100 gap-4 bg-background p-6 opacity-100 shadow-lg border", {
    variants: {
        position: {
            top: "animate-in slide-in-from-top w-full duration-300",
            bottom: "animate-in slide-in-from-bottom w-full duration-300",
            left: "animate-in slide-in-from-left h-full duration-300",
            right: "animate-in slide-in-from-right h-full duration-300",
        },
        size: {
            content: "",
            default: "",
            sm: "",
            lg: "",
            xl: "",
            full: "",
        },
    },
    compoundVariants: [
        {
            position: ["top", "bottom"],
            size: "content",
            class: "max-h-screen",
        },
        {
            position: ["top", "bottom"],
            size: "default",
            class: "h-1/3",
        },
        {
            position: ["top", "bottom"],
            size: "sm",
            class: "h-1/4",
        },
        {
            position: ["top", "bottom"],
            size: "lg",
            class: "h-1/2",
        },
        {
            position: ["top", "bottom"],
            size: "xl",
            class: "h-5/6",
        },
        {
            position: ["top", "bottom"],
            size: "full",
            class: "h-screen",
        },
        {
            position: ["right", "left"],
            size: "content",
            class: "max-w-screen",
        },
        {
            position: ["right", "left"],
            size: "default",
            class: "w-1/3",
        },
        {
            position: ["right", "left"],
            size: "sm",
            class: "w-1/4",
        },
        {
            position: ["right", "left"],
            size: "lg",
            class: "w-1/2",
        },
        {
            position: ["right", "left"],
            size: "xl",
            class: "w-5/6",
        },
        {
            position: ["right", "left"],
            size: "full",
            class: "w-screen",
        },
    ],
    defaultVariants: {
        position: "right",
        size: "default",
    },
});
var SheetContent = forwardRef(function (_a, ref) {
    var position = _a.position, size = _a.size, className = _a.className, children = _a.children, props = __rest(_a, ["position", "size", "className", "children"]);
    return (jsxs(SheetPortal, { position: position, children: [jsx(SheetOverlay, {}), jsxs(SheetPrimitive.Content, __assign({ ref: ref, className: classNames(sheetVariants({ position: position, size: size }), className) }, props, { children: [children, jsxs(SheetPrimitive.Close, { className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary", children: [jsx(Cross2Icon, { className: "h-4 w-4" }), jsx("span", { className: "sr-only", children: "Close" })] })] }))] }));
});
SheetContent.displayName = SheetPrimitive.Content.displayName;
var SheetHeader = function (_a) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (jsx("div", __assign({ className: classNames("flex flex-col space-y-2 text-center sm:text-left", className) }, props)));
};
SheetHeader.displayName = "SheetHeader";
var SheetTitle = forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (jsx(SheetPrimitive.Title, __assign({ ref: ref, className: classNames("text-lg font-semibold text-foreground", className) }, props)));
});
SheetTitle.displayName = SheetPrimitive.Title.displayName;
var SheetDescription = forwardRef(function (_a, ref) {
    var className = _a.className, props = __rest(_a, ["className"]);
    return (jsx(SheetPrimitive.Description, __assign({ ref: ref, className: classNames("text-sm text-muted-foreground", className) }, props)));
});
SheetDescription.displayName = SheetPrimitive.Description.displayName;

var ListItem = function (_a) {
    var value = _a.value, label = _a.label; _a.highlighted; var count = _a.count, isRefined = _a.isRefined, hasCount = _a.hasCount, refineItem = _a.refineItem;
    return (jsxs("div", { className: "flex py-1", children: [jsx(Checkbox.Root, { className: classNames('h-5 w-5 rounded text-center bg-white border border-gray-300 focus:ring-indigo-500', {
                    '!bg-primary': isRefined
                }), defaultChecked: isRefined !== null && isRefined !== void 0 ? isRefined : false, onCheckedChange: function (checked) { return refineItem(value, checked); }, checked: isRefined, id: "item".concat(value), children: jsx(Checkbox.Indicator, { className: "text-white", children: jsx(CheckIcon, { width: 16 }) }) }), jsxs("label", { htmlFor: "item".concat(value), className: "pl-4 text-sm flex w-full", children: [label, " ", hasCount && jsx("span", { className: "text-xs ml-auto", children: count })] })] }));
};

var List = function (_a) {
    var options = _a.options;
    var _b = useRefinementList(options), refine = _b.refine, items = _b.items;
    var refineItem = function (attribute, isChecked) {
        refine(attribute);
    };
    return jsx(Fragment, { children: items && items.map(function (item) { return createElement(ListItem, __assign({ refineItem: refineItem }, item, { hasCount: true, key: "list-item-".concat(item.value) })); }) });
};

var arrayRange = function (start, stop, step) {
    return Array.from({ length: (stop - start) / step + 2 }, function (value, index) { return start + index * step; }).map(function (number) { return parseInt((number / 1000).toFixed()) * 1000; });
};
var Range = function (_a) {
    var _b, _c;
    var options = _a.options, settings = _a.settings, results = _a.results;
    var _d = useState(undefined), givenResults = _d[0], setResults = _d[1];
    var _e = useState(undefined), min = _e[0], setMin = _e[1];
    var _f = useState(undefined), max = _f[0], setMax = _f[1];
    var _g = useState([]), rangesMin = _g[0], setRangesMin = _g[1];
    var _h = useState([]), rangesMax = _h[0], setRangesMax = _h[1];
    var refine = useRange(__assign({ min: min, max: max }, options)).refine;
    useEffect(function () {
        if (!results) {
            return;
        }
        if (!givenResults) {
            setResults(results);
        }
    }, [results]);
    useEffect(function () {
        if (!givenResults) {
            return;
        }
        var resultRange = Object.keys(givenResults.data)
            .map(Number)
            .sort(function (a, b) { return a - b; });
        setMin(resultRange === null || resultRange === void 0 ? void 0 : resultRange.shift());
        setMax(resultRange === null || resultRange === void 0 ? void 0 : resultRange.pop());
    }, [givenResults]);
    useEffect(function () {
        var _a, _b;
        if (!min && !max) {
            return;
        }
        setRangesMin(arrayRange(min, max, (_a = settings === null || settings === void 0 ? void 0 : settings.range) === null || _a === void 0 ? void 0 : _a.step));
        setRangesMax(arrayRange(min, max, (_b = settings === null || settings === void 0 ? void 0 : settings.range) === null || _b === void 0 ? void 0 : _b.step));
    }, [min, max]);
    var changeMin = function (value) {
        var _a;
        setRangesMax(arrayRange(parseInt(value), max, (_a = settings === null || settings === void 0 ? void 0 : settings.range) === null || _a === void 0 ? void 0 : _a.step));
        refine([parseInt(value), Number.isFinite(max) ? max : undefined]);
    };
    var changeMax = function (value) {
        var _a;
        setRangesMax(arrayRange(min, parseInt(value), (_a = settings === null || settings === void 0 ? void 0 : settings.range) === null || _a === void 0 ? void 0 : _a.step));
        refine([Number.isFinite(min) ? min : undefined, parseInt(value)]);
    };
    return (jsxs("div", { className: "flex gap-x-2 justify-start", children: [jsxs(Select, { onValueChange: function (value) { return changeMin(value); }, children: [jsx(SelectTrigger, { className: "bg-white", children: jsx(SelectValue, { placeholder: (_b = settings === null || settings === void 0 ? void 0 : settings.range) === null || _b === void 0 ? void 0 : _b.labels.from }) }), jsx(SelectContent, { className: "bg-white", children: rangesMin.map(function (range) { return (jsx(SelectItem, { value: "".concat(range), children: range }, "range-from-".concat(range))); }) })] }), jsxs(Select, { onValueChange: function (value) { return changeMax(value); }, children: [jsx(SelectTrigger, { className: "bg-white", children: jsx(SelectValue, { placeholder: (_c = settings === null || settings === void 0 ? void 0 : settings.range) === null || _c === void 0 ? void 0 : _c.labels.to }) }), jsx(SelectContent, { className: "bg-white", children: rangesMax.map(function (range) { return (jsx(SelectItem, { value: "".concat(range), children: range }, "range-till-".concat(range))); }) })] })] }));
};

/** imported from shadcn */
var Collapsible = CollapsiblePrimitive.Root;
var CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

var Refinement = function (_a) {
    var _b;
    var attribute = _a.attribute, label = _a.label, className = _a.className, settings = _a.settings, children = _a.children;
    var indexUiState = useInstantSearch().indexUiState;
    var _c = useState((_b = settings === null || settings === void 0 ? void 0 : settings.defaultOpen) !== null && _b !== void 0 ? _b : false), open = _c[0], setOpen = _c[1];
    useEffect(function () {
        if (indexUiState.refinementList && attribute in indexUiState.refinementList) {
            setOpen(true);
        }
    }, [indexUiState.refinementList]);
    var toggle = function () {
        setOpen(!open);
    };
    return (jsxs(Collapsible, { className: classNames(className === null || className === void 0 ? void 0 : className.wrapper, 'border-b border-gray-200 py-3'), children: [jsxs(CollapsibleTrigger, { className: classNames(className === null || className === void 0 ? void 0 : className.labelWrapper, 'flex cursor-pointer w-full items-center justify-between py-2 text-sm'), onClick: function () { return toggle(); }, children: [label, " ", jsx("span", { className: 'ml-auto', children: open ? jsx(ChevronUpIcon, {}) : jsx(ChevronDownIcon, {}) })] }), jsx("div", { className: classNames({ "h-0 hidden": !open, 'h-auto': open }), children: children })] }));
};

var ClearRefinements = function (_a) {
    var label = _a.label;
    var refine = useClearRefinements().refine;
    return (jsxs("div", { className: "border-b border-gray-200 py-3 flex items-center text-sm cursor-pointer", onClick: function () { return refine(); }, children: [jsx(Cross2Icon, {}), " ", jsx("span", { className: "ml-1", children: label !== null && label !== void 0 ? label : 'reset filters' })] }));
};

var refinementComponents = {
    List: List,
    Range: Range
};
var Attributes = function (_a) {
    var attributes = _a.attributes;
    var results = useHits().results;
    return (jsx(Fragment, { children: attributes.map(function (attribute) {
            var _a;
            var Component = refinementComponents[attribute.refinementType || 'list'];
            var filterResults = (_a = results === null || results === void 0 ? void 0 : results.disjunctiveFacets) === null || _a === void 0 ? void 0 : _a.filter(function (result) { return result.name === attribute.options.attribute; });
            return (jsx(Refinement, { attribute: attribute.options.attribute, label: attribute.label, settings: attribute.settings, className: attribute.classNames, children: jsx(Component, __assign({}, attribute, { results: filterResults === null || filterResults === void 0 ? void 0 : filterResults.pop() })) }, "refinement-".concat(attribute.options.attribute)));
        }) }));
};

var ScrollArea = forwardRef(function (_a, ref) {
    var className = _a.className, children = _a.children, props = __rest(_a, ["className", "children"]);
    return (jsxs(ScrollAreaPrimitive.Root, __assign({ ref: ref, className: classNames('relative overflow-hidden', className) }, props, { children: [jsx(ScrollAreaPrimitive.Viewport, { className: "h-full w-full rounded-[inherit]", children: children }), jsx(ScrollBar, {}), jsx(ScrollAreaPrimitive.Corner, {})] })));
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;
var ScrollBar = forwardRef(function (_a, ref) {
    var className = _a.className, _b = _a.orientation, orientation = _b === void 0 ? 'vertical' : _b, props = __rest(_a, ["className", "orientation"]);
    return (jsx(ScrollAreaPrimitive.ScrollAreaScrollbar, __assign({ ref: ref, orientation: orientation, className: classNames('flex touch-none select-none transition-colors', orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]', orientation === 'horizontal' && 'h-2.5 border-t border-t-transparent p-[1px]', className) }, props, { children: jsx(ScrollAreaPrimitive.ScrollAreaThumb, { className: "relative flex-1 rounded-full bg-border" }) })));
});
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

var AttributesMobile = function (_a) {
    var attributes = _a.attributes, renderTitle = _a.renderTitle, clearFilterLabel = _a.clearFilterLabel;
    return (jsx("div", { className: "block md:hidden", children: jsxs(Sheet, { children: [jsx(SheetTrigger, { className: "p-3 bg-white text-black rounded-md border", children: jsx(MixerHorizontalIcon, {}) }), jsxs(SheetContent, { size: "xl", position: "left", className: "bg-white", children: [jsx(SheetHeader, { children: jsx(SheetTitle, { children: renderTitle }) }), jsxs(ScrollArea, { className: "h-[90%] w-[90%]", children: [jsx(ClearRefinements, { label: clearFilterLabel }), jsx(Attributes, { attributes: attributes })] })] })] }) }));
};

var AttributesDesktop = function (_a) {
    var attributes = _a.attributes, className = _a.className, renderTitle = _a.renderTitle, clearFilterLabel = _a.clearFilterLabel;
    return (jsx(Fragment, { children: jsxs("div", { className: classNames('hidden md:block', className), children: [renderTitle, jsx(ClearRefinements, { label: clearFilterLabel }), jsx(Attributes, { attributes: attributes })] }) }));
};

var replace = String.prototype.replace;
var percentTwenties = /%20/g;

var Format = {
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};

var formats$3 = {
    'default': Format.RFC3986,
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return String(value);
        }
    },
    RFC1738: Format.RFC1738,
    RFC3986: Format.RFC3986
};

var formats$2 = formats$3;

var has$2 = Object.prototype.hasOwnProperty;
var isArray$2 = Array.isArray;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    while (queue.length > 1) {
        var item = queue.pop();
        var obj = item.obj[item.prop];

        if (isArray$2(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    /* eslint no-param-reassign: 0 */
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (isArray$2(target)) {
            target.push(source);
        } else if (target && typeof target === 'object') {
            if ((options && (options.plainObjects || options.allowPrototypes)) || !has$2.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (!target || typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (isArray$2(target) && !isArray$2(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (isArray$2(target) && isArray$2(source)) {
        source.forEach(function (item, i) {
            if (has$2.call(target, i)) {
                var targetItem = target[i];
                if (targetItem && typeof targetItem === 'object' && item && typeof item === 'object') {
                    target[i] = merge(targetItem, item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has$2.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str, decoder, charset) {
    var strWithoutPlus = str.replace(/\+/g, ' ');
    if (charset === 'iso-8859-1') {
        // unescape never throws, no try...catch needed:
        return strWithoutPlus.replace(/%[0-9a-f]{2}/gi, unescape);
    }
    // utf-8
    try {
        return decodeURIComponent(strWithoutPlus);
    } catch (e) {
        return strWithoutPlus;
    }
};

var encode = function encode(str, defaultEncoder, charset, kind, format) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = str;
    if (typeof str === 'symbol') {
        string = Symbol.prototype.toString.call(str);
    } else if (typeof str !== 'string') {
        string = String(str);
    }

    if (charset === 'iso-8859-1') {
        return escape(string).replace(/%u[0-9a-f]{4}/gi, function ($0) {
            return '%26%23' + parseInt($0.slice(2), 16) + '%3B';
        });
    }

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
            || (format === formats$2.RFC1738 && (c === 0x28 || c === 0x29)) // ( )
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        /* eslint operator-linebreak: [2, "before"] */
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    compactQueue(queue);

    return value;
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (!obj || typeof obj !== 'object') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

var combine = function combine(a, b) {
    return [].concat(a, b);
};

var maybeMap = function maybeMap(val, fn) {
    if (isArray$2(val)) {
        var mapped = [];
        for (var i = 0; i < val.length; i += 1) {
            mapped.push(fn(val[i]));
        }
        return mapped;
    }
    return fn(val);
};

var utils$2 = {
    arrayToObject: arrayToObject,
    assign: assign,
    combine: combine,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    maybeMap: maybeMap,
    merge: merge
};

var utils$1 = utils$2;
var formats$1 = formats$3;
var has$1 = Object.prototype.hasOwnProperty;

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) {
        return prefix + '[]';
    },
    comma: 'comma',
    indices: function indices(prefix, key) {
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) {
        return prefix;
    }
};

var isArray$1 = Array.isArray;
var split = String.prototype.split;
var push = Array.prototype.push;
var pushToArray = function (arr, valueOrArray) {
    push.apply(arr, isArray$1(valueOrArray) ? valueOrArray : [valueOrArray]);
};

var toISO = Date.prototype.toISOString;

var defaultFormat = formats$1['default'];
var defaults$1 = {
    addQueryPrefix: false,
    allowDots: false,
    charset: 'utf-8',
    charsetSentinel: false,
    delimiter: '&',
    encode: true,
    encoder: utils$1.encode,
    encodeValuesOnly: false,
    format: defaultFormat,
    formatter: formats$1.formatters[defaultFormat],
    // deprecated
    indices: false,
    serializeDate: function serializeDate(date) {
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var isNonNullishPrimitive = function isNonNullishPrimitive(v) {
    return typeof v === 'string'
        || typeof v === 'number'
        || typeof v === 'boolean'
        || typeof v === 'symbol'
        || typeof v === 'bigint';
};

var stringify$1 = function stringify(
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    format,
    formatter,
    encodeValuesOnly,
    charset
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        obj = utils$1.maybeMap(obj, function (value) {
            if (value instanceof Date) {
                return serializeDate(value);
            }
            return value;
        });
    }

    if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults$1.encoder, charset, 'key', format) : prefix;
        }

        obj = '';
    }

    if (isNonNullishPrimitive(obj) || utils$1.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults$1.encoder, charset, 'key', format);
            if (generateArrayPrefix === 'comma' && encodeValuesOnly) {
                var valuesArray = split.call(String(obj), ',');
                var valuesJoined = '';
                for (var i = 0; i < valuesArray.length; ++i) {
                    valuesJoined += (i === 0 ? '' : ',') + formatter(encoder(valuesArray[i], defaults$1.encoder, charset, 'value', format));
                }
                return [formatter(keyValue) + '=' + valuesJoined];
            }
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults$1.encoder, charset, 'value', format))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (generateArrayPrefix === 'comma' && isArray$1(obj)) {
        // we need to join elements in
        objKeys = [{ value: obj.length > 0 ? obj.join(',') || null : void undefined }];
    } else if (isArray$1(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var j = 0; j < objKeys.length; ++j) {
        var key = objKeys[j];
        var value = typeof key === 'object' && typeof key.value !== 'undefined' ? key.value : obj[key];

        if (skipNulls && value === null) {
            continue;
        }

        var keyPrefix = isArray$1(obj)
            ? typeof generateArrayPrefix === 'function' ? generateArrayPrefix(prefix, key) : prefix
            : prefix + (allowDots ? '.' + key : '[' + key + ']');

        pushToArray(values, stringify(
            value,
            keyPrefix,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encoder,
            filter,
            sort,
            allowDots,
            serializeDate,
            format,
            formatter,
            encodeValuesOnly,
            charset
        ));
    }

    return values;
};

var normalizeStringifyOptions = function normalizeStringifyOptions(opts) {
    if (!opts) {
        return defaults$1;
    }

    if (opts.encoder !== null && typeof opts.encoder !== 'undefined' && typeof opts.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var charset = opts.charset || defaults$1.charset;
    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }

    var format = formats$1['default'];
    if (typeof opts.format !== 'undefined') {
        if (!has$1.call(formats$1.formatters, opts.format)) {
            throw new TypeError('Unknown format option provided.');
        }
        format = opts.format;
    }
    var formatter = formats$1.formatters[format];

    var filter = defaults$1.filter;
    if (typeof opts.filter === 'function' || isArray$1(opts.filter)) {
        filter = opts.filter;
    }

    return {
        addQueryPrefix: typeof opts.addQueryPrefix === 'boolean' ? opts.addQueryPrefix : defaults$1.addQueryPrefix,
        allowDots: typeof opts.allowDots === 'undefined' ? defaults$1.allowDots : !!opts.allowDots,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults$1.charsetSentinel,
        delimiter: typeof opts.delimiter === 'undefined' ? defaults$1.delimiter : opts.delimiter,
        encode: typeof opts.encode === 'boolean' ? opts.encode : defaults$1.encode,
        encoder: typeof opts.encoder === 'function' ? opts.encoder : defaults$1.encoder,
        encodeValuesOnly: typeof opts.encodeValuesOnly === 'boolean' ? opts.encodeValuesOnly : defaults$1.encodeValuesOnly,
        filter: filter,
        format: format,
        formatter: formatter,
        serializeDate: typeof opts.serializeDate === 'function' ? opts.serializeDate : defaults$1.serializeDate,
        skipNulls: typeof opts.skipNulls === 'boolean' ? opts.skipNulls : defaults$1.skipNulls,
        sort: typeof opts.sort === 'function' ? opts.sort : null,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults$1.strictNullHandling
    };
};

var stringify_1 = function (object, opts) {
    var obj = object;
    var options = normalizeStringifyOptions(opts);

    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (isArray$1(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (opts && opts.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = opts.arrayFormat;
    } else if (opts && 'indices' in opts) {
        arrayFormat = opts.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (options.sort) {
        objKeys.sort(options.sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (options.skipNulls && obj[key] === null) {
            continue;
        }
        pushToArray(keys, stringify$1(
            obj[key],
            key,
            generateArrayPrefix,
            options.strictNullHandling,
            options.skipNulls,
            options.encode ? options.encoder : null,
            options.filter,
            options.sort,
            options.allowDots,
            options.serializeDate,
            options.format,
            options.formatter,
            options.encodeValuesOnly,
            options.charset
        ));
    }

    var joined = keys.join(options.delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    if (options.charsetSentinel) {
        if (options.charset === 'iso-8859-1') {
            // encodeURIComponent('&#10003;'), the "numeric entity" representation of a checkmark
            prefix += 'utf8=%26%2310003%3B&';
        } else {
            // encodeURIComponent('✓')
            prefix += 'utf8=%E2%9C%93&';
        }
    }

    return joined.length > 0 ? prefix + joined : '';
};

var utils = utils$2;

var has = Object.prototype.hasOwnProperty;
var isArray = Array.isArray;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    charset: 'utf-8',
    charsetSentinel: false,
    comma: false,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    ignoreQueryPrefix: false,
    interpretNumericEntities: false,
    parameterLimit: 1000,
    parseArrays: true,
    plainObjects: false,
    strictNullHandling: false
};

var interpretNumericEntities = function (str) {
    return str.replace(/&#(\d+);/g, function ($0, numberStr) {
        return String.fromCharCode(parseInt(numberStr, 10));
    });
};

var parseArrayValue = function (val, options) {
    if (val && typeof val === 'string' && options.comma && val.indexOf(',') > -1) {
        return val.split(',');
    }

    return val;
};

// This is what browsers will submit when the ✓ character occurs in an
// application/x-www-form-urlencoded body and the encoding of the page containing
// the form is iso-8859-1, or when the submitted form has an accept-charset
// attribute of iso-8859-1. Presumably also with other charsets that do not contain
// the ✓ character, such as us-ascii.
var isoSentinel = 'utf8=%26%2310003%3B'; // encodeURIComponent('&#10003;')

// These are the percent-encoded utf-8 octets representing a checkmark, indicating that the request actually is utf-8 encoded.
var charsetSentinel = 'utf8=%E2%9C%93'; // encodeURIComponent('✓')

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);
    var skipIndex = -1; // Keep track of where the utf8 sentinel was found
    var i;

    var charset = options.charset;
    if (options.charsetSentinel) {
        for (i = 0; i < parts.length; ++i) {
            if (parts[i].indexOf('utf8=') === 0) {
                if (parts[i] === charsetSentinel) {
                    charset = 'utf-8';
                } else if (parts[i] === isoSentinel) {
                    charset = 'iso-8859-1';
                }
                skipIndex = i;
                i = parts.length; // The eslint settings do not allow break;
            }
        }
    }

    for (i = 0; i < parts.length; ++i) {
        if (i === skipIndex) {
            continue;
        }
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder, charset, 'key');
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder, charset, 'key');
            val = utils.maybeMap(
                parseArrayValue(part.slice(pos + 1), options),
                function (encodedVal) {
                    return options.decoder(encodedVal, defaults.decoder, charset, 'value');
                }
            );
        }

        if (val && options.interpretNumericEntities && charset === 'iso-8859-1') {
            val = interpretNumericEntities(val);
        }

        if (part.indexOf('[]=') > -1) {
            val = isArray(val) ? [val] : val;
        }

        if (has.call(obj, key)) {
            obj[key] = utils.combine(obj[key], val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options, valuesParsed) {
    var leaf = valuesParsed ? val : parseArrayValue(val, options);

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]' && options.parseArrays) {
            obj = [].concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (!options.parseArrays && cleanRoot === '') {
                obj = { 0: leaf };
            } else if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else if (cleanRoot !== '__proto__') {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options, valuesParsed) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = options.depth > 0 && brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while (options.depth > 0 && (segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options, valuesParsed);
};

var normalizeParseOptions = function normalizeParseOptions(opts) {
    if (!opts) {
        return defaults;
    }

    if (opts.decoder !== null && opts.decoder !== undefined && typeof opts.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    if (typeof opts.charset !== 'undefined' && opts.charset !== 'utf-8' && opts.charset !== 'iso-8859-1') {
        throw new TypeError('The charset option must be either utf-8, iso-8859-1, or undefined');
    }
    var charset = typeof opts.charset === 'undefined' ? defaults.charset : opts.charset;

    return {
        allowDots: typeof opts.allowDots === 'undefined' ? defaults.allowDots : !!opts.allowDots,
        allowPrototypes: typeof opts.allowPrototypes === 'boolean' ? opts.allowPrototypes : defaults.allowPrototypes,
        arrayLimit: typeof opts.arrayLimit === 'number' ? opts.arrayLimit : defaults.arrayLimit,
        charset: charset,
        charsetSentinel: typeof opts.charsetSentinel === 'boolean' ? opts.charsetSentinel : defaults.charsetSentinel,
        comma: typeof opts.comma === 'boolean' ? opts.comma : defaults.comma,
        decoder: typeof opts.decoder === 'function' ? opts.decoder : defaults.decoder,
        delimiter: typeof opts.delimiter === 'string' || utils.isRegExp(opts.delimiter) ? opts.delimiter : defaults.delimiter,
        // eslint-disable-next-line no-implicit-coercion, no-extra-parens
        depth: (typeof opts.depth === 'number' || opts.depth === false) ? +opts.depth : defaults.depth,
        ignoreQueryPrefix: opts.ignoreQueryPrefix === true,
        interpretNumericEntities: typeof opts.interpretNumericEntities === 'boolean' ? opts.interpretNumericEntities : defaults.interpretNumericEntities,
        parameterLimit: typeof opts.parameterLimit === 'number' ? opts.parameterLimit : defaults.parameterLimit,
        parseArrays: opts.parseArrays !== false,
        plainObjects: typeof opts.plainObjects === 'boolean' ? opts.plainObjects : defaults.plainObjects,
        strictNullHandling: typeof opts.strictNullHandling === 'boolean' ? opts.strictNullHandling : defaults.strictNullHandling
    };
};

var parse$1 = function (str, opts) {
    var options = normalizeParseOptions(opts);

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options, typeof str === 'string');
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};

var stringify = stringify_1;
var parse = parse$1;
var formats = formats$3;

var lib = {
    formats: formats,
    parse: parse,
    stringify: stringify
};

function noop() {}

/**
 * Logs a warning
 * This is used to log issues in development environment only.
 */
var warn = noop;

/**
 * Logs a warning if the condition is not met.
 * This is used to log issues in development environment only.
 */
var _warning = noop;
if (process.env.NODE_ENV === 'development') {
  warn = function warn(message) {
    // eslint-disable-next-line no-console
    console.warn("[InstantSearch.js]: ".concat(message.trim()));
  };
  _warning = function warning(condition, message) {
    if (condition) {
      return;
    }
    var hasAlreadyPrinted = _warning.cache[message];
    if (!hasAlreadyPrinted) {
      _warning.cache[message] = true;
      process.env.NODE_ENV === 'development' ? warn(message) : void 0;
    }
  };
  _warning.cache = {};
}

// eslint-disable-next-line no-restricted-globals

/**
 * Runs code on browser environments safely.
 */
function safelyRunOnBrowser(callback) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      fallback: function fallback() {
        return undefined;
      }
    },
    fallback = _ref.fallback;
  // eslint-disable-next-line no-restricted-globals
  if (typeof window === 'undefined') {
    return fallback();
  }

  // eslint-disable-next-line no-restricted-globals
  return callback({
    window: window
  });
}

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var setWindowTitle = function setWindowTitle(title) {
  if (title) {
    // This function is only executed on browsers so we can disable this check.
    // eslint-disable-next-line no-restricted-globals
    window.document.title = title;
  }
};
var BrowserHistory = /*#__PURE__*/function () {
  /**
   * Transforms a UI state into a title for the page.
   */

  /**
   * Time in milliseconds before performing a write in the history.
   * It prevents from adding too many entries in the history and
   * makes the back button more usable.
   *
   * @default 400
   */

  /**
   * Creates a full URL based on the route state.
   * The storage adaptor maps all syncable keys to the query string of the URL.
   */

  /**
   * Parses the URL into a route state.
   * It should be symmetrical to `createURL`.
   */

  /**
   * Returns the location to store in the history.
   * @default () => window.location
   */

  /**
   * Indicates if last action was back/forward in the browser.
   */

  /**
   * Indicates whether the history router is disposed or not.
   */

  /**
   * Indicates the window.history.length before the last call to
   * window.history.pushState (called in `write`).
   * It allows to determine if a `pushState` has been triggered elsewhere,
   * and thus to prevent the `write` method from calling `pushState`.
   */

  /**
   * Initializes a new storage provider that syncs the search state to the URL
   * using web APIs (`window.location.pushState` and `onpopstate` event).
   */
  function BrowserHistory(_ref) {
    var _this = this;
    var windowTitle = _ref.windowTitle,
      _ref$writeDelay = _ref.writeDelay,
      writeDelay = _ref$writeDelay === void 0 ? 400 : _ref$writeDelay,
      createURL = _ref.createURL,
      parseURL = _ref.parseURL,
      getLocation = _ref.getLocation,
      start = _ref.start,
      dispose = _ref.dispose,
      push = _ref.push;
    _classCallCheck(this, BrowserHistory);
    _defineProperty(this, "$$type", 'ais.browser');
    _defineProperty(this, "windowTitle", void 0);
    _defineProperty(this, "writeDelay", void 0);
    _defineProperty(this, "_createURL", void 0);
    _defineProperty(this, "parseURL", void 0);
    _defineProperty(this, "getLocation", void 0);
    _defineProperty(this, "writeTimer", void 0);
    _defineProperty(this, "_onPopState", void 0);
    _defineProperty(this, "inPopState", false);
    _defineProperty(this, "isDisposed", false);
    _defineProperty(this, "latestAcknowledgedHistory", 0);
    _defineProperty(this, "_start", void 0);
    _defineProperty(this, "_dispose", void 0);
    _defineProperty(this, "_push", void 0);
    this.windowTitle = windowTitle;
    this.writeTimer = undefined;
    this.writeDelay = writeDelay;
    this._createURL = createURL;
    this.parseURL = parseURL;
    this.getLocation = getLocation;
    this._start = start;
    this._dispose = dispose;
    this._push = push;
    safelyRunOnBrowser(function (_ref2) {
      var window = _ref2.window;
      var title = _this.windowTitle && _this.windowTitle(_this.read());
      setWindowTitle(title);
      _this.latestAcknowledgedHistory = window.history.length;
    });
  }

  /**
   * Reads the URL and returns a syncable UI search state.
   */
  _createClass(BrowserHistory, [{
    key: "read",
    value: function read() {
      return this.parseURL({
        qsModule: lib,
        location: this.getLocation()
      });
    }

    /**
     * Pushes a search state into the URL.
     */
  }, {
    key: "write",
    value: function write(routeState) {
      var _this2 = this;
      safelyRunOnBrowser(function (_ref3) {
        var window = _ref3.window;
        var url = _this2.createURL(routeState);
        var title = _this2.windowTitle && _this2.windowTitle(routeState);
        if (_this2.writeTimer) {
          clearTimeout(_this2.writeTimer);
        }
        _this2.writeTimer = setTimeout(function () {
          setWindowTitle(title);
          if (_this2.shouldWrite(url)) {
            if (_this2._push) {
              _this2._push(url);
            } else {
              window.history.pushState(routeState, title || '', url);
            }
            _this2.latestAcknowledgedHistory = window.history.length;
          }
          _this2.inPopState = false;
          _this2.writeTimer = undefined;
        }, _this2.writeDelay);
      });
    }

    /**
     * Sets a callback on the `onpopstate` event of the history API of the current page.
     * It enables the URL sync to keep track of the changes.
     */
  }, {
    key: "onUpdate",
    value: function onUpdate(callback) {
      var _this3 = this;
      if (this._start) {
        this._start(function () {
          callback(_this3.read());
        });
      }
      this._onPopState = function () {
        if (_this3.writeTimer) {
          clearTimeout(_this3.writeTimer);
          _this3.writeTimer = undefined;
        }
        _this3.inPopState = true;

        // We always read the state from the URL because the state of the history
        // can be incorect in some cases (e.g. using React Router).
        callback(_this3.read());
      };
      safelyRunOnBrowser(function (_ref4) {
        var window = _ref4.window;
        window.addEventListener('popstate', _this3._onPopState);
      });
    }

    /**
     * Creates a complete URL from a given syncable UI state.
     *
     * It always generates the full URL, not a relative one.
     * This allows to handle cases like using a <base href>.
     * See: https://github.com/algolia/instantsearch.js/issues/790
     */
  }, {
    key: "createURL",
    value: function createURL(routeState) {
      var url = this._createURL({
        qsModule: lib,
        routeState: routeState,
        location: this.getLocation()
      });
      if (process.env.NODE_ENV === 'development') {
        try {
          // We just want to check if the URL is valid.
          // eslint-disable-next-line no-new
          new URL(url);
        } catch (e) {
          process.env.NODE_ENV === 'development' ? _warning(false, "The URL returned by the `createURL` function is invalid.\nPlease make sure it returns an absolute URL to avoid issues, e.g: `https://algolia.com/search?query=iphone`.") : void 0;
        }
      }
      return url;
    }

    /**
     * Removes the event listener and cleans up the URL.
     */
  }, {
    key: "dispose",
    value: function dispose() {
      var _this4 = this;
      if (this._dispose) {
        this._dispose();
      }
      this.isDisposed = true;
      safelyRunOnBrowser(function (_ref5) {
        var window = _ref5.window;
        if (_this4._onPopState) {
          window.removeEventListener('popstate', _this4._onPopState);
        }
      });
      if (this.writeTimer) {
        clearTimeout(this.writeTimer);
      }
      this.write({});
    }
  }, {
    key: "start",
    value: function start() {
      this.isDisposed = false;
    }
  }, {
    key: "shouldWrite",
    value: function shouldWrite(url) {
      var _this5 = this;
      return safelyRunOnBrowser(function (_ref6) {
        var window = _ref6.window;
        // We do want to `pushState` if:
        // - the router is not disposed, IS.js needs to update the URL
        // OR
        // - the last write was from InstantSearch.js
        // (unlike a SPA, where it would have last written)
        var lastPushWasByISAfterDispose = !(_this5.isDisposed && _this5.latestAcknowledgedHistory !== window.history.length);
        return (
          // When the last state change was through popstate, the IS.js state changes,
          // but that should not write the URL.
          !_this5.inPopState &&
          // When the previous pushState after dispose was by IS.js, we want to write the URL.
          lastPushWasByISAfterDispose &&
          // When the URL is the same as the current one, we do not want to write it.
          url !== window.location.href
        );
      });
    }
  }]);
  return BrowserHistory;
}();
function historyRouter() {
  var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
    _ref7$createURL = _ref7.createURL,
    createURL = _ref7$createURL === void 0 ? function (_ref8) {
      var qsModule = _ref8.qsModule,
        routeState = _ref8.routeState,
        location = _ref8.location;
      var protocol = location.protocol,
        hostname = location.hostname,
        _location$port = location.port,
        port = _location$port === void 0 ? '' : _location$port,
        pathname = location.pathname,
        hash = location.hash;
      var queryString = qsModule.stringify(routeState);
      var portWithPrefix = port === '' ? '' : ":".concat(port);

      // IE <= 11 has no proper `location.origin` so we cannot rely on it.
      if (!queryString) {
        return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname).concat(hash);
      }
      return "".concat(protocol, "//").concat(hostname).concat(portWithPrefix).concat(pathname, "?").concat(queryString).concat(hash);
    } : _ref7$createURL,
    _ref7$parseURL = _ref7.parseURL,
    parseURL = _ref7$parseURL === void 0 ? function (_ref9) {
      var qsModule = _ref9.qsModule,
        location = _ref9.location;
      // `qs` by default converts arrays with more than 20 items to an object.
      // We want to avoid this because the data structure manipulated can therefore vary.
      // Setting the limit to `100` seems a good number because the engine's default is 100
      // (it can go up to 1000 but it is very unlikely to select more than 100 items in the UI).
      //
      // Using an `arrayLimit` of `n` allows `n + 1` items.
      //
      // See:
      //   - https://github.com/ljharb/qs#parsing-arrays
      //   - https://www.algolia.com/doc/api-reference/api-parameters/maxValuesPerFacet/
      return qsModule.parse(location.search.slice(1), {
        arrayLimit: 99
      });
    } : _ref7$parseURL,
    _ref7$writeDelay = _ref7.writeDelay,
    writeDelay = _ref7$writeDelay === void 0 ? 400 : _ref7$writeDelay,
    windowTitle = _ref7.windowTitle,
    _ref7$getLocation = _ref7.getLocation,
    getLocation = _ref7$getLocation === void 0 ? function () {
      return safelyRunOnBrowser(function (_ref10) {
        var window = _ref10.window;
        return window.location;
      }, {
        fallback: function fallback() {
          throw new Error('You need to provide `getLocation` to the `history` router in environments where `window` does not exist.');
        }
      });
    } : _ref7$getLocation,
    start = _ref7.start,
    dispose = _ref7.dispose,
    push = _ref7.push;
  return new BrowserHistory({
    createURL: createURL,
    parseURL: parseURL,
    writeDelay: writeDelay,
    windowTitle: windowTitle,
    getLocation: getLocation,
    start: start,
    dispose: dispose,
    push: push
  });
}

var RefinementTypeEnum;
(function (RefinementTypeEnum) {
    RefinementTypeEnum["List"] = "List";
    RefinementTypeEnum["Range"] = "Range";
})(RefinementTypeEnum || (RefinementTypeEnum = {}));
var InstantSearchWrapper = function (_a) {
    var _b;
    var searchClient = _a.searchClient, indexName = _a.indexName, hitsPerPage = _a.hitsPerPage, classNamesList = _a.classNamesList, filterableAttributes = _a.filterableAttributes, sortableAttributes = _a.sortableAttributes, renderContent = _a.renderContent, renderHit = _a.renderHit, messages = _a.messages;
    var ref = useRef(null);
    return (jsx("div", { className: classNames(classNamesList === null || classNamesList === void 0 ? void 0 : classNamesList.wrapper, 'grid grid-cols-1 gap-x-12 gap-y-10 md:grid-cols-4'), children: jsxs(InstantSearch, { indexName: indexName, searchClient: searchClient, 
            //@ts-ignore
            routing: {
                router: historyRouter(),
                stateMapping: {
                    stateToRoute: function (uiState) {
                        var indexUiState = uiState[indexName];
                        return __assign(__assign({}, indexUiState.refinementList), { page: indexUiState.page });
                    },
                    routeToState: function (routeState) {
                        var _a;
                        return _a = {},
                            _a[indexName] = { refinementList: __assign({}, routeState), page: routeState.page },
                            _a;
                    }
                }
            }, children: [jsx(Configure //@ts-ignore 
                , { hitsPerPage: hitsPerPage !== null && hitsPerPage !== void 0 ? hitsPerPage : 20 }), filterableAttributes && (jsx(AttributesDesktop, { className: classNamesList === null || classNamesList === void 0 ? void 0 : classNamesList.refinementsWrapper, attributes: filterableAttributes, renderTitle: renderContent === null || renderContent === void 0 ? void 0 : renderContent.renderRefinementsContent, clearFilterLabel: messages && messages.clearFilters })), jsxs("div", { className: classNames((_b = classNamesList === null || classNamesList === void 0 ? void 0 : classNamesList.hits) === null || _b === void 0 ? void 0 : _b.wrapper, 'md:col-span-3'), ref: ref, children: [renderContent === null || renderContent === void 0 ? void 0 : renderContent.renderHitsContent, jsxs("div", { className: "flex items-center mt-4", children: [filterableAttributes && (jsx(AttributesMobile, { attributes: filterableAttributes, renderTitle: renderContent === null || renderContent === void 0 ? void 0 : renderContent.renderRefinementsContent, clearFilterLabel: messages && messages.clearFilters })), sortableAttributes && jsx(SortBy, { items: sortableAttributes.items, settings: sortableAttributes.settings })] }), jsx(Hits, { renderHit: renderHit, hitsClassNames: classNamesList === null || classNamesList === void 0 ? void 0 : classNamesList.hits }), jsx(Pagination, { ref: ref, hitsPerPage: hitsPerPage, classNames: classNamesList === null || classNamesList === void 0 ? void 0 : classNamesList.pager })] })] }) }));
};

export { RefinementTypeEnum, InstantSearchWrapper as default };
