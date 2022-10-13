import Main from "./Main";
import React from "react";
import { createAlertView, isConversationType, isEmpty, jsonFormat, showToast } from "./Util";
import { Text, TextInput, View } from "react-native";
import { styles } from "./Style";
import MyDateTimePicker from "./View/DateTimePicker";
import { RCIMIWConversationType, RCIMIWMessage, RCIMIWPushNotificationLevel, RCIMIWUltraGroupTypingStatus, RCIMIWUltraGroupTypingStatusInfo } from "@rongcloud/react-native-im-wrapper";


export function registerUltraGroupListener(main: Main) {
    main.engine?.setOnUltraGroupReadStatusSyncedListener((code, targetId, channelId, timestamp) => {
        const data = jsonFormat({
            code, targetId, channelId, timestamp
        })
        main.addHistory('OnUltraGroupReadStatusSynced', data, code)
    })

    main.engine?.setOnConversationsLoadedForAllChannelListener((code, type, targetId, conversations) => {
        const data = jsonFormat({
            code, type, targetId, conversations
        })
        main.addHistory('OnConversationsLoadedForAllChannel', data, code)
    })

    main.engine?.setOnUltraGroupUnreadMentionedCountLoadedListener((code, targetId, count) => {
        const data = jsonFormat({
            code, targetId, count
        })
        main.addHistory('OnUltraGroupUnreadMentionedCountLoaded', data, code)
    })

    main.engine?.setOnUltraGroupAllUnreadCountLoadedListener((code: number, count: number) => {
        const data = jsonFormat({
            code, count
        })
        main.addHistory('OnUltraGroupAllUnreadCountLoaded', data, code)
    })

    main.engine?.setOnUltraGroupAllUnreadMentionedCountLoadedListener((code: number, count: number) => {
        const data = jsonFormat({
            code, count
        })
        main.addHistory('OnUltraGroupAllUnreadMentionedCountLoaded', data, code)
    })

    main.engine?.setOnUltraGroupUnreadCountLoadedListener((code: number, targetId: string, count: number) => {
        const data = jsonFormat({
            code, targetId, count
        })
        main.addHistory('OnUltraGroupUnreadCountLoaded', data, code)
    })

    main.engine?.setOnUltraGroupMessageModifiedListener((code: number, messageUId: string) => {
        const data = jsonFormat({
            code, messageUId
        })
        main.addHistory('OnUltraGroupMessageModified', data, code)
    })

    main.engine?.setOnUltraGroupMessageRecalledListener((code, message, deleteRemote) => {
        const data = jsonFormat({
            code, message, deleteRemote
        })
        main.addHistory('OnUltraGroupMessageRecalled', data, code)
    })

    main.engine?.setOnUltraGroupMessagesClearedListener((code, targetId, channelId, timestamp, policy) => {
        const data = jsonFormat({
            code, targetId, channelId, timestamp, policy
        })
        main.addHistory('OnUltraGroupMessagesCleared', data, code)
    })

    main.engine?.setOnUltraGroupTypingStatusSentListener((code, targetId, channelId, typingStatus) => {
        const data = jsonFormat({
            code, targetId, channelId, typingStatus
        })
        main.addHistory('OnUltraGroupTypingStatusSent', data, code)
    })

    main.engine?.setOnUltraGroupMessagesClearedForAllChannelListener((code, targetId, timestamp) => {
        const data = jsonFormat({
            code, targetId, timestamp
        })
        main.addHistory('OnUltraGroupMessagesClearedForAllChannel', data, code)
    })

    main.engine?.setOnBatchRemoteUltraGroupMessagesLoadedListener((code, matchedMessages, notMatchedMessages) => {
        const data = jsonFormat({
            code, matchedMessages, notMatchedMessages
        })
        main.addHistory('OnBatchRemoteUltraGroupMessagesLoaded', data, code)
    })

    main.engine?.setOnUltraGroupMessageExpansionUpdatedListener((code, expansion, messageUId) => {
        const data = jsonFormat({
            code, expansion, messageUId
        })
        main.addHistory('OnUltraGroupMessageExpansionUpdated', data, code)
    })

    main.engine?.setOnUltraGroupMessageExpansionRemovedListener((code, messageUId, keys) => {
        const data = jsonFormat({
            code, messageUId, keys
        })
        main.addHistory('OnUltraGroupMessageExpansionRemove', data, code)
    })

    main.engine?.setOnUltraGroupDefaultNotificationLevelChangedListener((code: number, targetId: string, level: RCIMIWPushNotificationLevel) => {
        const data = jsonFormat({
            code, targetId, level
        })
        main.addHistory('OnUltraGroupDefaultNotificationLevelChanged', data, code)
    })


    main.engine?.setOnUltraGroupDefaultNotificationLevelLoadedListener((code: number, targetId: string, level: RCIMIWPushNotificationLevel) => {
        const data = jsonFormat({
            code, targetId, level
        })
        main.addHistory('OnUltraGroupDefaultNotificationLevelLoaded', data, code)
    })

    main.engine?.setOnUltraGroupChannelDefaultNotificationLevelChangedListener((code: number, targetId: string, channelId: string,
        level: RCIMIWPushNotificationLevel) => {
        const data = jsonFormat({
            code, targetId, channelId, level
        })
        main.addHistory('OnUltraGroupDefaultNotificationLevelChanged', data, code)
    })

    main.engine?.setOnUltraGroupChannelDefaultNotificationLevelLoadedListener((code: number, targetId: string, channelId: string,
        level: RCIMIWPushNotificationLevel) => {
        const data = jsonFormat({
            code, targetId, channelId, level
        })
        main.addHistory('OnUltraGroupChannelDefaultNotificationLevelLoaded', data, code)
    })

    //监听远端消息修改
    main.engine?.setOnRemoteUltraGroupMessageModifiedListener((messages: Array<RCIMIWMessage>) => {
        const data = jsonFormat({
            messages
        })
        main.addHistory('OnRemoteUltraGroupMessageModified', data, 0)
    })

    //监听远端消息撤回
    main.engine?.setOnRemoteUltraGroupMessageRecalledListener((messages: Array<RCIMIWMessage>) => {
        const data = jsonFormat({
            messages
        })
        main.addHistory('OnRemoteUltraGroupMessageRecalled', data, 0)
    })

    //监听远端消息扩展更新
    main.engine?.setOnRemoteUltraGroupMessageExpansionUpdatedListener((messages: Array<RCIMIWMessage>) => {
        const data = jsonFormat({
            messages
        })
        main.addHistory('OnRemoteUltraGroupMessageExpansionUpdated', data, 0)
    })

    //监听其他端同步的消息未读状态
    main.engine?.setOnConversationReadStatusSyncMessageReceivedListener((type: RCIMIWConversationType, targetId: string, timestamp: number) => {
        const data = jsonFormat({
            type, targetId, timestamp
        })
        main.addHistory('OnConversationReadStatusSyncMessageReceived', data, 0)
    })

    //监听用户输入状态变化
    main.engine?.setOnUltraGroupTypingStatusChangedListener((info: Array<RCIMIWUltraGroupTypingStatusInfo>) => {
        const data = jsonFormat({
            info
        })
        main.addHistory('OnConversationReadStatusSyncMessageReceived', data, 0)
    })
}

export function syncUltraGroupReadStatus(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let timePicker: MyDateTimePicker
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入ChannelId'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择时间</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        timePicker = ref
                }}></MyDateTimePicker>
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入房间ID')
                    return
                }
                if (isEmpty(useChannelId)) {
                    showToast('请输入ChannelId')
                    return
                }
                let time = timePicker.getTime()
                let promise = main.engine?.syncUltraGroupReadStatus(useTargetId, useChannelId, time)
                promise?.then((code) => {
                    main.addHistory('syncUltraGroupReadStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function loadConversationsForAllChannel(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
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
                    showToast('请输入会话ID')
                    return
                }
                let conversationType = Number(useTypes)
                let promise = main.engine?.loadConversationsForAllChannel(conversationType, useTargetId)
                promise?.then((code) => {
                    main.addHistory('loadConversationListForAllChannel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function loadUltraGroupUnreadMentionedCount(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>

                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入会话ID')
                    return
                }

                let promise = main.engine?.loadUltraGroupUnreadMentionedCount(useTargetId)
                promise?.then((code) => {
                    main.addHistory('loadConversationsForAllChannel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadUltraGroupAllUnreadCount(main: Main) {
    let promise = main.engine?.loadUltraGroupAllUnreadCount()
    promise?.then((code) => {
        main.addHistory('loadUltraGroupAllUnreadCount', jsonFormat({ code: code }), code)
    })
}

export function loadUltraGroupAllUnreadMentionedCount(main: Main) {
    let promise = main.engine?.loadUltraGroupAllUnreadMentionedCount()
    promise?.then((code) => {
        main.addHistory('loadUltraGroupAllUnreadMentionedCount', jsonFormat({ code: code }), code)
    })
}


export function loadUltraGroupUnreadCount(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>

                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入会话ID')
                    return
                }

                let promise = main.engine?.loadUltraGroupUnreadCount(useTargetId)
                promise?.then((code) => {
                    main.addHistory('loadUltraGroupUnreadCount', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function modifyUltraGroupMessage(main: Main) {
    function AlertView(props: any) {
        let [useMessageUId, setMessageUId] = React.useState('')
        let [useMessageText, setMessageText] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入MessageUId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入MessageUId'
                    defaultValue={useMessageUId}
                    onChangeText={(key) => {
                        setMessageUId(key);
                    }} />
                <Text style={{ fontSize: 20 }}>请输入消息</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入消息"
                    defaultValue={useMessageText}
                    onChangeText={(key) => {
                        setMessageText(key);
                    }} />
            </View>, () => {
                if (isEmpty(useMessageUId)) {
                    showToast('请输入MessageUId')
                    return
                }
                if (isEmpty(useMessageText)) {
                    showToast('输入消息')
                    return
                }

                let promise = main.engine?.createTextMessage(RCIMIWConversationType.ULTRA_GROUP, "abc", "", useMessageText)
                promise?.then(message => {
                    let promise = main.engine?.modifyUltraGroupMessage(useMessageUId, message)
                    promise?.then((code) => {
                        main.addHistory('modifyUltraGroupMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function recallUltraGroupMessage(main: Main) {
    function AlertView(props: any) {
        let [useMessageId, setMessageId] = React.useState('')
        let [useDeleteRemote, setDeleteRemote] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入要撤回的消息ID</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入要撤回的消息ID"
                    defaultValue={useMessageId}
                    onChangeText={(key) => {
                        setMessageId(key);
                    }} />

                <Text style={{ fontSize: 20, marginTop: 10 }}>是否删除远端消息</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='1:删除,0:不删除'
                    defaultValue={useDeleteRemote}
                    onChangeText={(key) => {
                        setDeleteRemote(key);
                    }} />
            </View>, () => {
                if (isEmpty(useMessageId)) {
                    showToast('输入要撤回的消息ID')
                    return
                }
                if (isEmpty(useDeleteRemote)) {
                    showToast('输入是否删除远端消息')
                    return
                }
                let messageId = Number(useMessageId)
                if (messageId <= 0) {
                    showToast('消息ID要大于0')
                    return
                }
                let promise = main.engine?.getMessageById(messageId)
                promise?.then(message => {
                    if (!message) {
                        showToast("消息ID错误")
                        return
                    }
                    let deleteRemote = useDeleteRemote == '1' ? true : false
                    let promise = main.engine?.recallUltraGroupMessage(message, deleteRemote)
                    promise?.then((code) => {
                        main.addHistory('recallUltraGroupMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function clearUltraGroupMessages(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [usePolicy, setPolicy] = React.useState('')
        let timePicker: MyDateTimePicker
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入ChannelId'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入policy</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:LOCAL,1:REMOTE,2:LOCAL_REMOTE</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入policy'
                    defaultValue={usePolicy}
                    onChangeText={(key) => {
                        setPolicy(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择时间</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        timePicker = ref
                }}></MyDateTimePicker>
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入房间ID')
                    return
                }
                if (isEmpty(useChannelId)) {
                    showToast('请输入ChannelId')
                    return
                }
                if (isEmpty(usePolicy)) {
                    showToast('请输入policy')
                    return
                }
                let time = timePicker.getTime()
                let policy = Number(usePolicy)
                let promise = main.engine?.clearUltraGroupMessages(useTargetId, useChannelId, time, policy)
                promise?.then((code) => {
                    main.addHistory('clearUltraGroupMessages', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function sendUltraGroupTypingStatus(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTypingStatus, setTypingStatus] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入ChannelId'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入输入状态</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:TEXT</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入输入状态'
                    defaultValue={useTypingStatus}
                    onChangeText={(key) => {
                        setTypingStatus(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入房间ID')
                    return
                }
                if (isEmpty(useChannelId)) {
                    showToast('请输入ChannelId')
                    return
                }
                if (isEmpty(useTypingStatus)) {
                    showToast('请输入输入状态')
                    return
                }
                let typingStatus = Number(useTypingStatus)
                if (typingStatus > RCIMIWUltraGroupTypingStatus.TEXT) {
                    showToast('输入状态错误')
                    return
                }
                let promise = main.engine?.sendUltraGroupTypingStatus(useTargetId, useChannelId, typingStatus)
                promise?.then((code) => {
                    main.addHistory('sendUltraGroupTypingStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function clearUltraGroupMessagesForAllChannel(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let timePicker: MyDateTimePicker
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />


                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择时间</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        timePicker = ref
                }}></MyDateTimePicker>
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入房间ID')
                    return
                }
                let time = timePicker.getTime()
                let promise = main.engine?.clearUltraGroupMessagesForAllChannel(useTargetId, time)
                promise?.then((code) => {
                    main.addHistory('clearUltraGroupMessagesForAllChannel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function loadBatchRemoteUltraGroupMessages(main: Main) {
    function AlertView(props: any) {
        let [useMessagesId, setMessagesId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入要加载的消息ID</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入要加载的消息ID,可输入多个,以,分割"
                    defaultValue={useMessagesId}
                    onChangeText={(key) => {
                        setMessagesId(key);
                    }} />

            </View>, () => {
                if (isEmpty(useMessagesId)) {
                    showToast('输入要加载的消息ID')
                    return
                }
                let messagesId = useMessagesId.split(',').map(v => Number(v))
                if (messagesId.length == 0) {
                    showToast('要加载的消息ID为空')
                    return
                }

                let promises: Promise<RCIMIWMessage>[] = []

                for (let i of messagesId) {
                    promises.push(main.engine?.getMessageById(i)!)
                }
                Promise.all(promises).then(messages => {
                    let promise = main.engine?.loadBatchRemoteUltraGroupMessages(messages)
                    promise?.then((code) => {
                        main.addHistory('loadBatchRemoteUltraGroupMessages', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function updateUltraGroupMessageExpansion(main: Main) {
    function AlertView(props: any) {
        let [useMessageUId, setMessageUId] = React.useState('')

        let [useKeys, setKeys] = React.useState('')
        let [useValues, setValues] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入MessageUId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入MessageUId'
                    defaultValue={useMessageUId}
                    onChangeText={(key) => {
                        setMessageUId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Keys</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Keys,可输入多个,以,分割'
                    defaultValue={useKeys}
                    onChangeText={(key) => {
                        setKeys(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Values</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Values,可输入多个,以,分割'
                    defaultValue={useValues}
                    onChangeText={(key) => {
                        setValues(key);
                    }} />
            </View>, () => {
                if (isEmpty(useMessageUId)) {
                    showToast('请输入MessageUId')
                    return
                }
                if (isEmpty(useKeys)) {
                    showToast('请输Keys')
                    return
                }
                if (isEmpty(useValues)) {
                    showToast('请输Values')
                    return
                }
                let keys = useKeys.split(',')
                let values = useValues.split(',')
                if (keys.length != values.length) {
                    showToast('Keys和Values长度不一致')
                    return
                }
                let expansion: Map<string, string> = new Map()
                for (let i = 0; i < keys.length; i++) {
                    expansion.set(keys[i], values[i])
                }

                let promise = main.engine?.updateUltraGroupMessageExpansion(useMessageUId, expansion)
                promise?.then((code) => {
                    main.addHistory('updateUltraGroupMessageExpansion', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function removeUltraGroupMessageExpansion(main: Main) {
    function AlertView(props: any) {
        let [useMessageUId, setMessageUId] = React.useState('')
        let [useKeys, setKeys] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入MessageUId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入MessageUId'
                    defaultValue={useMessageUId}
                    onChangeText={(key) => {
                        setMessageUId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Keys</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Keys,可输入多个,以,分割'
                    defaultValue={useKeys}
                    onChangeText={(key) => {
                        setKeys(key);
                    }} />
            </View>, () => {
                if (isEmpty(useMessageUId)) {
                    showToast('请输入MessageUId')
                    return
                }
                if (isEmpty(useKeys)) {
                    showToast('请输Keys')
                    return
                }

                let keys = useKeys.split(',')
                if (keys.length == 0) {
                    showToast('Keys为空')
                    return
                }
                let promise = main.engine?.removeUltraGroupMessageExpansion(useMessageUId, keys)
                promise?.then((code) => {
                    main.addHistory('removeUltraGroupMessageExpansion', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function changeUltraGroupDefaultNotificationLevel(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useLevel, setLevel] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入notificationStatus</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:ALL_MESSAGE,1:NONE,2:MENTION,3:MENTION_USERS,4:MENTION_ALL,5:BLOCKEDs</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='请输入Level'
                    defaultValue={useLevel}
                    onChangeText={(key) => {
                        setLevel(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入会话ID')
                    return
                }
                if (isEmpty(useLevel)) {
                    showToast('请输入Level')
                    return
                }
                let level: RCIMIWPushNotificationLevel = Number(useLevel)
                let promise = main.engine?.changeUltraGroupDefaultNotificationLevel(useTargetId, level)
                promise?.then((code) => {
                    main.addHistory('changeUltraGroupDefaultNotificationLevel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadUltraGroupDefaultNotificationLevel(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />

            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入会话ID')
                    return
                }

                let promise = main.engine?.loadUltraGroupDefaultNotificationLevel(useTargetId)
                promise?.then((code) => {
                    main.addHistory('loadUltraGroupDefaultNotificationLevel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}





export function changeUltraGroupChannelDefaultNotificationLevel(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useLevel, setLevel] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入ChannelId'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Level</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:ALL_MESSAGE,1:NONE,2:MENTION,3:MENTION_USERS,4:MENTION_ALL,5:BLOCKEDs</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='请输入Level'
                    defaultValue={useLevel}
                    onChangeText={(key) => {
                        setLevel(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入会话ID')
                    return
                }
                if (isEmpty(useChannelId)) {
                    showToast('请输入ChannelId')
                    return
                }
                if (isEmpty(useLevel)) {
                    showToast('请输入Level')
                    return
                }
                let level: RCIMIWPushNotificationLevel = Number(useLevel)
                let promise = main.engine?.changeUltraGroupChannelDefaultNotificationLevel(useTargetId, useChannelId, level)
                promise?.then((code) => {
                    main.addHistory('changeUltraGroupChannelDefaultNotificationLevel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadUltraGroupChannelDefaultNotificationLevel(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入会话ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入会话ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入channelId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入ChannelId'
                    defaultValue={useChannelId}
                    onChangeText={(key) => {
                        setChannelId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入会话ID')
                    return
                }
                if (isEmpty(useChannelId)) {
                    showToast('请输入ChannelId')
                    return
                }

                let promise = main.engine?.loadUltraGroupChannelDefaultNotificationLevel(useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadUltraGroupChannelDefaultNotificationLevel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}
