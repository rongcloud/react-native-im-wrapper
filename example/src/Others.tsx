import Main from "./Main";
import React from "react";
import { createAlertView, isEmpty, jsonFormat, showToast } from "./Util";
import { Text, TextInput, View } from "react-native";
import { styles } from "./Style";
import MyDateTimePicker from "./View/DateTimePicker";
import { RCIMIWPushNotificationQuietHoursLevel } from "@rongcloud/react-native-im-wrapper";



export function registerOthersListener(main: Main) {
    main.engine?.setOnBlacklistAddedListener((code: number, userId: string) => {
        const data = jsonFormat({
            code, userId
        })
        main.addHistory('OnBlacklistAdded', data, code)
    })

    main.engine?.setOnBlacklistStatusLoadedListener((code, userId, status) => {
        const data = jsonFormat({
            code, userId, status
        })
        main.addHistory('OnBlacklistStatusLoaded', data, code)
    })

    main.engine?.setOnBlacklistLoadedListener((code, userIds) => {
        const data = jsonFormat({
            code, userIds
        })
        main.addHistory('OnBlacklistLoaded', data, code)
    })

    main.engine?.setOnNotificationQuietHoursChangedListener((code, startTime, spanMins, level) => {
        const data = jsonFormat({
            code, startTime, spanMins, level
        })
        main.addHistory('OnNotificationQuietHoursChanged', data, code)
    })

    main.engine?.setOnNotificationQuietHoursRemovedListener((code) => {
        const data = jsonFormat({
            code
        })
        main.addHistory('OnNotificationQuietHoursRemoved', data, code)
    })

    main.engine?.setOnNotificationQuietHoursLoadedListener((code, startTime, spanMins, level) => {
        const data = jsonFormat({
            code,startTime, spanMins, level
        })
        main.addHistory('OnNotificationQuietHoursLoaded', data, code)
    })

    main.engine?.setOnPushContentShowStatusChangedListener((code, showContent) => {
        const data = jsonFormat({
            code, showContent
        })
        main.addHistory('OnPushContentShowStatusChanged', data, code)
    })

    main.engine?.setOnPushLanguageChangedListener((code, language) => {
        const data = jsonFormat({
            code, language
        })
        main.addHistory('OnPushLanguageChanged', data, code)
    })

    main.engine?.setOnPushReceiveStatusChangedListener((code, receive) => {
        const data = jsonFormat({
            code, receive
        })
        main.addHistory('OnPushReceiveStatusChanged', data, code)
    })
}

export function addToBlacklist(main: Main) {
    function AlertView(props: any) {
        let [useUserId, setUserId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入用户ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入用户ID'
                    defaultValue={useUserId}
                    onChangeText={(key) => {
                        setUserId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useUserId)) {
                    showToast('输入用户ID')
                    return
                }
                let promise = main.engine?.addToBlacklist(useUserId)
                promise?.then((code) => {
                    main.addHistory('addToBlacklist', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function removeFromBlacklist(main: Main) {
    function AlertView(props: any) {
        let [useUserId, setUserId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入用户ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入用户ID'
                    defaultValue={useUserId}
                    onChangeText={(key) => {
                        setUserId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useUserId)) {
                    showToast('输入用户ID')
                    return
                }
                let promise = main.engine?.removeFromBlacklist(useUserId)
                promise?.then((code) => {
                    main.addHistory('removeFromBlacklist', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadBlacklistStatus(main: Main) {
    function AlertView(props: any) {
        let [useUserId, setUserId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入用户ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入用户ID'
                    defaultValue={useUserId}
                    onChangeText={(key) => {
                        setUserId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useUserId)) {
                    showToast('输入用户ID')
                    return
                }
                let promise = main.engine?.loadBlacklistStatus(useUserId)
                promise?.then((code) => {
                    main.addHistory('loadBlacklistStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadBlacklist(main: Main) {
    let promise = main.engine?.loadBlacklist()
    promise?.then((code) => {
        main.addHistory('loadBlacklist', jsonFormat({ code: code }), code)
    })
}



export function changeNotificationQuietHours(main: Main) {
    function AlertView(props: any) {
        let [useSpanMins, setSpanMins] = React.useState('')
        let [useLevel, setLevel] = React.useState('')
        let dateTimePicker: MyDateTimePicker
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择startTime</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        dateTimePicker = ref
                }}></MyDateTimePicker>

                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入spanMins</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入spanMins'
                    defaultValue={useSpanMins}
                    onChangeText={(key) => {
                        setSpanMins(key);
                    }} />

                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Level</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0:NONE,1:MENTION_MESSAGE,2:BLOCKED'
                    defaultValue={useLevel}
                    onChangeText={(key) => {
                        setLevel(key);
                    }} />
            </View>, () => {
                if (isEmpty(useSpanMins)) {
                    showToast('输入spanMins')
                    return
                }
                if (isEmpty(useLevel)) {
                    showToast('输入Level')
                    return
                }
                let date = dateTimePicker.getDate();
                let h = String(date.getHours())
                let m = String(date.getMinutes())
                let s = String(date.getSeconds())

                h = h.padStart(2, '0')
                m = m.padStart(2, '0')
                s = s.padStart(2, '0')

                let spanMins = Number(useSpanMins)
                let level: RCIMIWPushNotificationQuietHoursLevel = Number(useLevel)
                let promise = main.engine?.changeNotificationQuietHours(`${h}:${m}:${s}`, spanMins, level)
                promise?.then((code) => {
                    main.addHistory('changeNotificationQuietHours', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function removeNotificationQuietHours(main: Main) {
    let promise = main.engine?.removeNotificationQuietHours()
    promise?.then((code) => {
        main.addHistory('removeNotificationQuietHours', jsonFormat({ code: code }), code)
    })
}


export function loadNotificationQuietHours(main: Main) {
    let promise = main.engine?.loadNotificationQuietHours()

    promise?.then((code) => {
        main.addHistory('loadNotificationQuietHours', jsonFormat({ code: code }), code)
    })
}

export function changePushContentShowStatus(main: Main) {
    function AlertView(props: any) {
        let [useShowContent, setShowContent] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入ShowContent</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入ShowContent,0:False,1:True'
                    defaultValue={useShowContent}
                    onChangeText={(key) => {
                        setShowContent(key);
                    }} />
            </View>, () => {
                if (isEmpty(useShowContent)) {
                    showToast('输入ShowContent')
                    return
                }
                let showContent = useShowContent == '1' ? true : false
                let promise = main.engine?.changePushContentShowStatus(showContent)
                promise?.then((code) => {
                    main.addHistory('changePushContentShowStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function changePushLanguage(main: Main) {
    function AlertView(props: any) {
        let [useLanguage, setLanguage] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Language</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Language'
                    defaultValue={useLanguage}
                    onChangeText={(key) => {
                        setLanguage(key);
                    }} />
            </View>, () => {
                if (isEmpty(useLanguage)) {
                    showToast('输入Language')
                    return
                }
                
                let promise = main.engine?.changePushLanguage(useLanguage)
                promise?.then((code) => {
                    main.addHistory('changePushLanguage', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function changePushReceiveStatus(main: Main) {
    function AlertView(props: any) {
        let [useReceive, setReceive] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Receive</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Receive,0:False,1:True'
                    defaultValue={useReceive}
                    onChangeText={(key) => {
                        setReceive(key);
                    }} />
            </View>, () => {
                if (isEmpty(useReceive)) {
                    showToast('输入用户ID')
                    return
                }
                let receive = useReceive == '1' ? true : false
                let promise = main.engine?.changePushReceiveStatus(receive)
                promise?.then((code) => {
                    main.addHistory('changePushReceiveStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function changeLogLevel(main: Main) {
    function AlertView(props: any) {
        let [useLogLeve, setLogLeve] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入LogLeve</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:NONE,1:ERROR,2:WARN,3:INFO,4:DEBUG,5:VERBOSE</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入LogLeve'
                    defaultValue={useLogLeve}
                    onChangeText={(key) => {
                        setLogLeve(key);
                    }} />
            </View>, () => {
                if (isEmpty(useLogLeve)) {
                    showToast('输入用户ID')
                    return
                }
                let logLeve = Number(useLogLeve)
                let promise = main.engine?.changeLogLevel(logLeve)
                promise?.then((code) => {
                    main.addHistory('changeLogLevel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}