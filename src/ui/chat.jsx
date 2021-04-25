import { h, Fragment } from 'preact';

export function Chat() {
  return (
    <>
      <section id="chatbox">
        <ul>
          <li className="chat-text chat-info">INFO: HELLO! There's currently a strange bug where you move super fast on login. Just refresh the page.</li>
        </ul>
      </section>

      <form id="chatbox-field">
        <input type="text" name="chatbox-input" id="chatbox-input" placeholder="Type something..." />
        <input type="submit" value="Send" />
      </form>
    </>
  );
}
