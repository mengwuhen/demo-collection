import MQTT, { Message } from 'paho-mqtt'
function * MqttServices(){
    yield console.log('aaa')
    let client = new MQTT.Client('106.14.150.252', 8083, "mqttjs_088fa1e27d");

    console.log(client)

    client.onConnectionLost = (responseObject) =>{
        console.log(responseObject)
        if (responseObject.errorCode !== 0) {
            console.log(responseObject.errorMessage);
        }
    }

    client.onMessageArrived = (message) =>{
        console.log(message.payloadString)
    }

    client.connect({
        userName: 'monitor',
        password: 'moniU(#er3!',
        onSuccess: () =>{
            console.log("onConnect");
            client.subscribe("/World");
        }
    })
}