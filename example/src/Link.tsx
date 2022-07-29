
import { RCIMIWEngine, RCIMIWEngineOptions } from "@rongcloud/react-native-im-wrapper";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

import * as Config from './Config'
import { pushOptions, token } from "./Config";
import Main from "./Main";
import { styles } from "./Style";
import { createAlertView, isEmpty, jsonFormat, post, showToast } from "./Util";


let appKey = Config.key



export function registerLinkListener(main: Main) {
    main.engine?.setOnConnectedListener((code: number, userId: string) => {
        const data = jsonFormat({
            code, userId
        })
        main.addHistory('OnConnected', data, code)
    })
}

export function create(main: Main) {
    function AlertView(props: any) {
        let [useAppKey, setAppKey] = React.useState(appKey)
        let [useNaviServer, setNaviServer] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入AppKey</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入AppKey'
                    defaultValue={useAppKey}
                    onChangeText={(key) => {
                        setAppKey(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入导航地址</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10, flex: 1 }}
                    autoCapitalize='none'
                    placeholder='输入导航地址'
                    defaultValue={useNaviServer}
                    onChangeText={(key) => {
                        setNaviServer(key);
                    }} />

            </View >, () => {
                if (isEmpty(useAppKey)) {
                    showToast('请输入AppKey')
                    return
                }
                let options: RCIMIWEngineOptions = {
                    pushOptions: pushOptions
                }
                if (useNaviServer)
                    options = { ...options, naviServer: useNaviServer }
                appKey = useAppKey
                let engine = RCIMIWEngine.create(useAppKey, options);
                let value
                if (engine) {
                    value = 0
                    main.engine = engine
                }
                else
                    value = -1
                main.addHistory('create', jsonFormat({ code: value, appKey, naviServer: useNaviServer }), value)
                main.hideAlert()
            }, () => { main.hideAlert() })
    }
    main.showAlert(<AlertView />)
}


export function connect(main: Main) {
    function AlertView(props: any) {
        let [useTime, setTime] = React.useState('')

        let [useToken, setToken] = React.useState(token)
        let [useUsetId, setUsetId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入连接时间</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0为一直重连,非0为最多连接多少秒,默认为0'
                    defaultValue={useTime}
                    onChangeText={(key) => {
                        setTime(key);
                    }} />

                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Token</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
                    <TextInput
                        keyboardType='default'
                        placeholderTextColor='grey'
                        style={{ ...styles.input, marginTop: 10, flex: 1 }}
                        autoCapitalize='none'
                        placeholder='输入Token'
                        defaultValue={useToken}
                        onChangeText={(key) => {
                            setToken(key);
                        }} />
                    <TouchableOpacity style={{
                        marginLeft: 5,
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        borderColor: "#dadada",
                        borderRadius: 5,
                        borderWidth: 1,
                        marginTop: 10,
                        alignSelf: 'center'
                    }}
                        onPress={() => {
                            let key = appKey
                            let id = Config.prefix + Date.now();
                            let url = Config.host + 'token/' + id;
                            let params = { key: key };
                            post(url, params, (json) => {
                                let token = json.token;
                                let userId = json.userId
                                setToken(token)
                                setUsetId(userId)
                            }, (error) => {
                                showToast("获取token失败 " + error)
                            });
                        }}
                    >
                        <Text style={{ fontSize: 15 }}>生成</Text>
                    </TouchableOpacity>
                </View>
            </View>, () => {
                let time = useTime == '' ? 0 : Number(useTime)

                if (isEmpty(useToken)) {
                    showToast('请输入Token')
                    return
                }

                let promise = main.engine?.connect(useToken, time)
                promise?.then((value) => {
                    main.addHistory('connect', jsonFormat({ code: value, token: useToken, userId: useUsetId }), value)
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function disconnect(main: Main) {
    function V(props: any) {
        let receive: string = ''
        let [userState, setState] = React.useState(receive)
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>断开后是否接收推送</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0不接收推送,非0接收推送,默认为0'
                    defaultValue={userState}
                    onChangeText={(key) => {
                        setState(key);
                    }} />
            </View>, () => {
                let _receive = false
                if (userState && userState != '0')
                    _receive = true
                let promise = main.engine?.disconnect(_receive)
                promise?.then((value) => main.addHistory('disconnect', jsonFormat({ code: value }), value))
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<V />)
}




export function destroy(main: Main) {
    main.engine?.destroy()
    main.engine = null
    showToast("销毁引擎成功")
}