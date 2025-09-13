/**
 * @module Component
 */

export const Tag = "pin-component";

/**
 * HTML Attributes available to set
 * @category Metadata: Attributes
 * @enum
 */
export const Attribute = {
  VISIBLE: "visible",
  STATE: "state",
} as const;
/**
 * HTML Attributes available to set
 * @category Metadata: Attributes
 */
export type Attributes = typeof Attribute;

/**
 * @category Metadata: State
 * @enum
 */
export const State = {
  PINNED: "pinned",
  UNPINNED: "unpinned",
} as const;
/**
 * @category Metadata: State
 */
export type States = (typeof State)[keyof typeof State];

/**
 * Attribute only visible when set to NO
 * @category Metadata: State
 * @enum
 */
export const Visible = {
  YES: "yes",
  NO: "no",
} as const;
/**
 * Attribute only visible when set to NO
 * @category Metadata: State
 */
export type Visibility = (typeof Visible)[keyof typeof Visible];

/**
 * @category Metadata: Operations
 * @enum
 */
export const Operation = {
  SHOW: "show",
  HIDE: "hide",
  PIN: "pin",
  UNPIN: "unpin",
  TOGGLE: "toggle",
} as const;

/**
 * @category Metadata: Operations
 */
export type Operations = (typeof Operation)[keyof typeof Operation];

/**
 * @category Metadata: Behavior
 * @enum
 */
export const Event = {
  ONHIDE: "onhide",
  ONSHOW: "onshow",
  ONPIN: "onpin",
  ONUNPIN: "onunpin",
} as const;
/**
 * @category Metadata: Behavior
 */
export type Events = (typeof Event)[keyof typeof Event];

/**
 * @category Metadata: Behavior
 * @enum
 */
export const Gesture = {
  CLICK: "click",
} as const;
/**
 * @category Metadata: Behavior
 */
export type Gestures = (typeof Gesture)[keyof typeof Gesture];

/**
 * Event handler signature
 * @hidden
 */
export type Handler = (...args: any[]) => void;
