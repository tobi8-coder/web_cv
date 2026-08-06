/**
 * Shared motion constants.
 *
 * Kept in `lib` rather than alongside the `Reveal` component so that modules
 * needing only the easing curve do not pull the whole reveal module into their
 * chunk.
 */

/** Gentle "ease-out-expo" curve reused across every entrance in the site. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Curtain easing for the intro overlay — slow start, decisive exit. */
export const EASE_CURTAIN: [number, number, number, number] = [0.76, 0, 0.24, 1];
