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
      <h3>Actual Intelligence</h3>
      <a
        href="https://actual-intelligence.netlify.app/"
        target="_blank"
        rel="noopener noreferrer">
        https://actual-intelligence.netlify.app/
      </a>
      <p>
        With the advent of LLM and AI Chatbots, I wanted to create a real,
        authentic experience that mirrors the chat bot. This site lets you act
        as both the User and the AI. As the user you get to make queries and
        converse with the AI (actual Intelligence). Instead of using an LLM
        chat, the user gets to role-play as the LLM!
      </p>
      <p>
        This app utilizes supabase Realtime to broadcast chat messages to users
        and implements a queue for assigning messages to AI users.
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
