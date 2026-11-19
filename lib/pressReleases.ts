// Press releases at /press (index) and /press/<slug> (one folder per release,
// so each is a static page and adds nothing to the route budget). Newest
// first. Every figure in a release is dated: quote only numbers read from
// live data on that date, and never edit a figure after it is published.

export type PressFigure = { label: string; value: string };

export type PressRelease = {
  slug: string;
  /** YYYY-MM-DD, the day it was published. */
  date: string;
  title: string;
  /** One or two sentences: the card on /press, the meta description and the lede. */
  summary: string;
};

export const PRESS_CONTACT = "john@tigertest.io";

export const PRESS_RELEASES: PressRelease[] = [
  {
    slug: "road-signs-new-drivers-miss",
    date: "2026-11-19",
    title: "Half of learner drivers miss the no-passing sign: the road signs new drivers get wrong most",
    summary:
      "Tigertest's practice data from more than 6,000 learner drivers shows which DMV permit test questions are missed most. The top seven are all about road signs, led by the double-arrow sign, missed in 58% of attempts.",
  },
];

export function pressReleaseUrl(slug: string): string {
  return `/press/${slug}`;
}

export function formatPressDate(date: string): string {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
