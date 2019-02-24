import React from 'react';
import ReactDOM from 'react-dom';
import { StreamDeckInterface } from './js/libs/streamdeck/streamdeck';
import { INTERFACE_TYPE_PLUGIN } from './js/libs/streamdeck/defines';

let pluginInterface = null;

function connectSocket(inPort, inPluginUUID, inRegisterEvent, inInfo) {
  let newPluginInterface = new StreamDeckInterface({
    interfaceType: INTERFACE_TYPE_PLUGIN,
    port: inPort,
    uuid: inPluginUUID,
    registerEvent: inRegisterEvent,
    info: inInfo,
  });
  newPluginInterface
    .connect()
    .then(() => {
      console.log('((PLUGIN) StreamDeckInterface connect success.');
      pluginInterface = newPluginInterface;
    })
    .catch(error => {
      console.error(error);
      pluginInterface = null;
    });
}

// Note: react will not be used here in deployed version.
ReactDOM.render(
  <div>se.rymdo.streamdeck.plugin.spotify.main</div>,
  document.getElementById('app')
);

module.hot.accept();
