import { h, Fragment } from 'preact';

export function Chat() {
  return (
    <>
      <section id="chatbox">
        <ul></ul>
      </section>

      <form id="chatbox-field">
        <input type="text" name="chatbox-input" id="chatbox-input" placeholder="Type something..." />
        <input type="submit" value="Send" />
      </form>
    </>
  );
}
