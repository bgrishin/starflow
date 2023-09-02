import React, { useEffect, useState } from "react";
import "./App.css";
import Starflow from "./components/starflow/Starflow";

function App() {
  // const [lastPrice, setLastPrice] = useState<number | null>(null);
  // const [settings, setSettings] = useState<SettingsType | null>(null);
  // const [showSettings, setShowSettings] = useState(false);
  // const [pause, setPause] = useState(false);

  // useEffect(() => {
  //   const storedSettings = localStorage.getItem("starflow-settings");
  //   if (storedSettings) {
  //     setSettings(JSON.parse(storedSettings));
  //   }
  // }, []);

  return (
    <div>
      <h1>
        STARFLOW
        <a href={"https://bgrishin.me"} target={"_blank"}>
          Made with ❤️
        </a>
      </h1>
      {/*{settings ? (*/}
      {/*  <>*/}
      {/*    <div>*/}
      {/*      <div className={"controls"}>*/}
      {/*        <span>{lastPrice?.toFixed(2)} $</span>*/}
      {/*        {!pause ? (*/}
      {/*          <div*/}
      {/*            onClick={() => {*/}
      {/*              setPause(true);*/}
      {/*              localStorage.setItem("starflow-pause", "true");*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            <PauseIcon />*/}
      {/*          </div>*/}
      {/*        ) : (*/}
      {/*          <div*/}
      {/*            onClick={() => {*/}
      {/*              setPause(false);*/}
      {/*              localStorage.setItem("starflow-pause", "false");*/}
      {/*            }}*/}
      {/*          >*/}
      {/*            <PlayIcon />*/}
      {/*          </div>*/}
      {/*        )}*/}
      {/*        <div onClick={() => setShowSettings(true)}>*/}
      {/*          <SettingsIcon />*/}
      {/*        </div>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*    <Starflow*/}
      {/*      initialCandles={settings.initialCandles}*/}
      {/*      volume={settings.volume}*/}
      {/*      updateSpeed={settings.updateSpeed}*/}
      {/*      initialPrice={settings.initialPrice}*/}
      {/*      direction={settings.direction}*/}
      {/*      setLastPrice={setLastPrice}*/}
      {/*    />*/}
      {/*    {showSettings ? (*/}
      {/*      <Settings*/}
      {/*        setSettings={setSettings}*/}
      {/*        settings={settings}*/}
      {/*        setShowSettings={setShowSettings}*/}
      {/*      />*/}
      {/*    ) : null}*/}
      {/*  </>*/}
      {/*) : (*/}
      {/*  <>*/}
      {/*    <Starflow*/}
      {/*      initialCandles={400}*/}
      {/*      volume={1}*/}
      {/*      updateSpeed={20}*/}
      {/*      initialPrice={1}*/}
      {/*      direction={"both"}*/}
      {/*      setLastPrice={setLastPrice}*/}
      {/*      disableBlock={true}*/}
      {/*    />*/}
      {/*    <Settings*/}
      {/*      setSettings={setSettings}*/}
      {/*      setShowSettings={setShowSettings}*/}
      {/*    />*/}
      {/*  </>*/}
      {/*)}*/}
      <Starflow />
    </div>
  );
}

export default App;
