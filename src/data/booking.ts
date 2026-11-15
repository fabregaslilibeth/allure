/** Bookable start times. Placeholder hours: replace with the clinic's real ones. */
export const timeSlots = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"];

/** How many days ahead (including today) the date picker offers. */
export const bookingWindowDays = 14;

/** Extra option for visitors who don't know which treatment they want yet. */
export const consultationOption = {
  slug: "consultation",
  title: "Skin consultation",
  hint: "Not sure yet? Start here",
};

export const visitExpectations = [
  {
    title: "Arrive 15 minutes early",
    text: "Every visit starts with a short consultation about your skin and what you'd like to achieve.",
  },
  { title: "Bring a valid ID", text: "And wear something comfortable." },
  { title: "We confirm by email", text: "Your slot is held once we've confirmed it with you." },
];
