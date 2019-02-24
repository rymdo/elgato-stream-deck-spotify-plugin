import {
  INTERFACE_TYPE_UNKNOWN,
  INTERFACE_TYPE_PLUGIN,
  INTERFACE_TYPE_PROPERY_INSPECTOR,
} from './defines';

export class StreamDeckInterface {
  interfaceType = INTERFACE_TYPE_UNKNOWN;
  port = null;
  uuid = null;
  registerEvent = null;
  info = null;
  actionInfo = null;

  websocket = null;
  websocketIsOpen = false;

  registered = false;

  constructor({ interfaceType, port, uuid, registerEvent, info, actionInfo }) {
    this.interfaceType = type;
    this.port = port;
    this.uuid = uuid;
    this.registerEvent = registerEvent;
    this.info = info;
    this.actionInfo = actionInfo;
    console.log(
      `StreamDeckInterface created on port ${port}. Type: ${interfaceType}`
    );
  }

  connect = async () => {
    // Open websocket
    this.websocket = null;
    this.websocketIsOpen = false;
    try {
      this.websocket = await this.websocketConnect(this.port);
      this.websocket.onmessage = this.onMessage;
      this.websocketIsOpen = true;
    } catch (error) {
      this.websocket = null;
      this.websocketIsOpen = false;
      throw new Error('StreamDeckInterface: failed to open websocket.', error);
    }

    // Register interface
    this.registered = false;
    try {
      await this.registerInterface();
      this.registered = true;
    } catch (error) {
      this.websocket = null;
      this.websocketIsOpen = false;
      this.registered = false;
      throw new Error(
        'StreamDeckInterface: failed to register interface.',
        error
      );
    }
  };

  registerInterface = async () => {
    const json = {
      event: this.registerEvent,
      uuid: this.uuid,
    };
    //ToDo: Add promise interface?
    this.websocket.send(JSON.stringify(json));
  };

  websocketConnect = port => {
    return new Promise((resolve, reject) => {
      let websocket = new WebSocket('ws://localhost:' + port);
      websocket.onopen = ev => {
        console.log('websocketConnect: websocket.onopen');
        websocket.onopen = null;
        websocket.onclose = null;
        websocket.onerror = null;
        resolve(websocket);
      };
      websocket.onclose = ev => {
        console.log('websocketConnect: websocket.onclose');
        console.log(ev);
        websocket.onopen = null;
        websocket.onclose = null;
        websocket.onerror = null;
        reject(ev);
      };
      websocket.onerror = ev => {
        console.log('websocketConnect: websocket.onerror');
        console.log(ev);
        websocket.onopen = null;
        websocket.onclose = null;
        websocket.onerror = null;
        reject(ev);
      };
    });
  };

  onMessage = message => {
    console.log({
      type: this.interfaceType,
      message,
    });
  };
}
