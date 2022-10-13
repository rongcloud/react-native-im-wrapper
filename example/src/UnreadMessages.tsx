import Main from "./Main";
import React from "react";
import { createAlertView, isConversationType, isEmpty, jsonFormat, showToast } from "./Util";
import { Text, TextInput, View } from "react-native";
import { styles } from "./Style";
import MyDateTimePicker from "./View/DateTimePicker";



export function registerUnreadMessagesListener(main: Main) {
    main.engine?.setOnUnreadCountLoadedListener((code, type, targetId, channelId, count) => {
        const data = jsonFormat({
            code, type, targetId, channelId, count
        })
        main.addHistory('OnUnreadCountLoaded', data, code)
    })

    main.engine?.setOnTotalUnreadCountLoadedListener((code, channelId, count) => {
        const data = jsonFormat({
            code, channelId, count
        })
        main.addHistory('OnTotalUnreadCountLoaded', data, code)
    })

    main.engine?.setOnUnreadCountByConversationTypesLoadedListener((code, types, channelId, contain, count) => {
        const data = jsonFormat({
            code, types, channelId, contain, count
        })
        main.addHistory('OnUnreadCountByConversationTypesLoaded', data, code)
    })

    main.engine?.setOnUnreadMentionedCountLoadedListener((code, type, targetId, channelId, count) => {
        const data = jsonFormat({
            code, type, targetId, channelId, count
        })
        main.addHistory('OnUnreadMentionedCountLoaded', data, code)
    })


    main.engine?.setOnUnreadCountClearedListener((code, type, targetId, channelId, timestamp) => {
        const data = jsonFormat({
            code, type, targetId, channelId, timestamp
        })
        main.addHistory('OnUnreadCountCleared', data, code)
    })
}

export function loadUnreadCount(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='number-pad'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入会话类型"
                    defaultValue={useTypes}
                    onChangeText={(key) => {
                        setTypes(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='仅对超级群生效，其它类型无需赋值'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入targetId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入targetId'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isConversationType(useTypes)) {
                    showToast('您输入的会话类型有误')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                let conversationType = Number(useTypes)
                let promise = main.engine?.loadUnreadCount(conversationType, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadUnreadCount', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function loadTotalUnreadCount(main: Main) {
    function AlertView(props: any) {
        let [useChannelId, setChannelId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='仅对超级群生效，其它类型无需赋值'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
            </View>, () => {
                // if (isEmpty(useChannelId)) {
                //     showToast('请输入ChannelId')
                //     return
                // }
                let promise = main.engine?.loadTotalUnreadCount(useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadTotalUnreadCount', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadUnreadCountByConversationTypes(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useContain, setContain] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='number-pad'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入会话类型,可输入多个,以,分割"
                    defaultValue={useTypes}
                    onChangeText={(key) => {
                        setTypes(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='仅对超级群生效，其它类型无需赋值'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Contain</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Contain,0:False,1:True'
                    defaultValue={useContain}
                    onChangeText={(key) => {
                        setContain(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isConversationType(useTypes)) {
                    showToast('您输入的会话类型有误')
                    return
                }
                if (isEmpty(useContain)) {
                    showToast('请输入Contain')
                    return
                }

                let types = useTypes.split(',')
                let conversationTypes = types.map(v => Number(v))
                let contain = useContain == '1' ? true : false
                let promise = main.engine?.loadUnreadCountByConversationTypes(conversationTypes, useChannelId, contain)
                promise?.then((code) => {
                    main.addHistory('loadUnreadCountByConversationTypes', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadUnreadMentionedCount(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='number-pad'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入会话类型"
                    defaultValue={useTypes}
                    onChangeText={(key) => {
                        setTypes(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='仅对超级群生效，其它类型无需赋值'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入targetId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入targetId'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isConversationType(useTypes)) {
                    showToast('您输入的会话类型有误')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                let conversationType = Number(useTypes)
                let promise = main.engine?.loadUnreadMentionedCount(conversationType, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadUnreadMentionedCount', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}





export function clearUnreadCount(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let dateTimePicker: MyDateTimePicker
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='number-pad'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入会话类型"
                    defaultValue={useTypes}
                    onChangeText={(key) => {
                        setTypes(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='仅对超级群生效，其它类型无需赋值'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入targetId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入targetId'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择时间</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        dateTimePicker = ref
                }}></MyDateTimePicker>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isConversationType(useTypes)) {
                    showToast('您输入的会话类型有误')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                let conversationType = Number(useTypes)
                let time = dateTimePicker.getTime()
                let promise = main.engine?.clearUnreadCount(conversationType, useTargetId, useChannelId, time)
                promise?.then((code) => {
                    main.addHistory('clearUnreadCount', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}