import "./paper.css";

const Links = () => {
  return (
    <>
      <h1>Project Links</h1>
      <p>
        Want to see how its been made? Check out my github profile for a look
        into the code:{" "}
        <a
          href="https://github.com/tastyDanish"
          target="_blank"
          rel="noopener noreferrer">
          https://github.com/tastyDanish
        </a>
      </p>

      <br />
      <h2>Here are some lil projects I've built in my spare time</h2>
      <h3>Custom Lootbox</h3>
      <a
        href="https://www.fortunespalette.com/"
        target="_blank"
        rel="noopener noreferrer">
        https://www.fortunespalette.com/
      </a>
      <p>
        Fortune's Palette is a daily divination experience that blends tarot and
        color. Draw a card, receive your reading, and discover a unique color
        palette—randomly generated as mono, duo, tri, or quadratic—to inspire
        your mood or creativity. Built as a fast, modern Vite + React app,
        styled with Tailwind CSS, and brought to life with smooth Framer Motion
        animations.
      </p>

      <h3>Custom Lootbox</h3>
      <a
        href="https://www.lootboxpicker.com/"
        target="_blank"
        rel="noopener noreferrer">
        https://www.lootboxpicker.com/
      </a>
      <p>
        A playful decision-making tool built with React (Vite) and Framer
        Motion. Users can add their own items to a virtual lootbox and "open" it
        with a satisfying animation to randomly select one. The app uses local
        storage to persist items between sessions, creating a lightweight but
        memorable experience. Ideal for making everyday choices with a sense of
        pride and accomplishment.
      </p>

      <h3>Fantasy Football Picker</h3>
      <a
        href="https://fantasy-picker.netlify.app/"
        target="_blank"
        rel="noopener noreferrer">
        https://fantasy-picker.netlify.app/
      </a>
      <p>
        In order to assist myself in properly evaluating fantasy football
        players, I built this tool that lets choose between two football
        players. Right now its configured for the 2024 season. When 2025 hits,
        there is a python script to create the new rankings.
      </p>
      <p>
        These choices helped update an aggregated list that is persisted in
        localstorage. You can use this tool to determine player rankings and
        help yourself on draft day with features to star favorites or hide those
        that have been picked already.
      </p>
    </>
  );
};

export default Links;
