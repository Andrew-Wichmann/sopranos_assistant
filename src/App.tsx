import Chat, { useMessages, Bubble, MessageProps } from "@chatui/core";
import { useAuthenticator } from "@aws-amplify/ui-react";
import '@chatui/core/es/styles/index.less';
import '@chatui/core/dist/index.css';
import styles from './App.module.css';

function App() {
  const { signOut, user } = useAuthenticator()
  const { messages, appendMsg } = useMessages();

  function renderMessage(msg: MessageProps) {
      const { content } = msg
      return <Bubble content={content.text} />
  }

  function handleSend(type: any, val: string) {
      if (type === "text" && val.trim()) {
          appendMsg({
              type: "text",
              content: {text: val},
              position: "right",
          })
      }
  }

  return (
    <main>
      <h1>{user?.signInDetails?.loginId} welcome!</h1>
      <div className={styles.chatApp}>
        <Chat placeholder="Message..." locale="en-us" messages={messages} renderMessageContent={renderMessage} onSend={handleSend}/>
      </div>
      <button onClick={() => signOut()}>Sign out</button>
    </main>
  );
}

export default App;
