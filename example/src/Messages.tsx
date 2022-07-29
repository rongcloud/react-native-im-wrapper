import {
    RCIMIWMediaMessage,
    RCIMIWMessage,
    RCIMIWMessageOperationPolicy,
    RCIMIWMessageType,
    RCIMIWReceivedStatus,
    RCIMIWSentStatus,
    RCIMIWTextMessage,
    RCIMIWTimeOrder
} from "@rongcloud/react-native-im-wrapper";
import React from "react";
import { Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import Main from "./Main";
import { styles } from "./Style";
import {
    createAlertView,
    isEmpty,
    jsonFormat,
    showToast
} from "./Util";
import ImagePicker from 'react-native-image-crop-picker';
import MyDateTimePicker from "./View/DateTimePicker";


let sendingMediaMessage: RCIMIWMediaMessage | null = null //正在发送的媒体消息
let downloadingMediaMessage: RCIMIWMediaMessage | null = null //正在发送的媒体消息

export function registerMessagesListener(main: Main) {
    main.engine?.setOnMessageReceivedListener((message, left, offline, hasPackage) => {
        const data = jsonFormat({
            message, left, offline, hasPackage
        })
        main.addHistory('OnMessageReceived', data, 0)
    })

    main.engine?.setOnMessageAttachedListener((message) => {
        const data = jsonFormat({
            message
        })
        main.addHistory('OnMessageAttached', data, 0)
    })

    main.engine?.setOnMessageSentListener((code, message) => {
        const data = jsonFormat({
            code, message
        })
        main.addHistory('OnMessageSent', data, code)
    })

    main.engine?.setOnMediaMessageSendingListener((message, progress) => {
        const data = jsonFormat({
            message, progress
        })
        main.addHistory('OnMediaMessageSending', data, 0)
    })

    main.engine?.setOnMediaMessageAttachedListener((message) => {
        const data = jsonFormat({
            message
        })
        main.addHistory('OnMediaMessageAttached', data, 0)
        sendingMediaMessage = message
    })

    main.engine?.setOnMediaMessageSentListener((code, message) => {
        sendingMediaMessage = null
        const data = jsonFormat({
            code, message
        })
        main.addHistory('OnMediaMessageSent', data, code)
    })

    main.engine?.setOnSendingMediaMessageCanceledListener((code, message) => {
        sendingMediaMessage = null
        const data = jsonFormat({
            code, message
        })
        main.addHistory('OnSendingMediaMessageCanceled', data, code)
    })

    main.engine?.setOnMediaMessageDownloadedListener((code: number, message: RCIMIWMediaMessage) => {
        downloadingMediaMessage = null
        const data = jsonFormat({
            code, message
        })
        main.addHistory('OnMediaMessageDownloaded', data, code)
    })

    main.engine?.setOnMediaMessageDownloadingListener((message, progress) => {
        const data = jsonFormat({
            message, progress
        })
        main.addHistory('OnMediaMessageDownloading', data, 0)
    })

    main.engine?.setOnDownloadingMediaMessageCanceledListener((code, message) => {
        downloadingMediaMessage = null
        const data = jsonFormat({
            code, message
        })
        main.addHistory('OnDownloadingMediaMessageCanceled', data, code)
    })

    main.engine?.setOnMessagesLoadedListener((code, type, targetId, channelId, sentTime, order, messages) => {
        const data = jsonFormat({
            code, type, targetId, channelId, sentTime, order, messages
        })
        main.addHistory('OnMessagesLoaded', data, code)
    })



    main.engine?.setOnFirstUnreadMessageLoadedListener((code, type, targetId, channelId, message) => {
        const data = jsonFormat({
            code, type, targetId, channelId, message
        })
        main.addHistory('OnFirstUnreadMessageLoaded', data, code)
    })

    main.engine?.setOnUnreadMentionedMessagesLoadedListener((code, type, targetId, channelId, messages) => {
        const data = jsonFormat({
            code, type, targetId, channelId, messages
        })
        main.addHistory('OnUnreadMentionedMessages', data, code)
    })

    main.engine?.setOnMessageInsertedListener((code, message) => {
        const data = jsonFormat({
            code, message
        })
        main.addHistory('OnMessageInserted', data, code)
    })

    main.engine?.setOnMessagesInsertedListener((code, message) => {
        const data = jsonFormat({
            code, message
        })
        main.addHistory('OnMessagesInserted', data, code)
    })

    main.engine?.setOnMessageClearedListener((code, type, targetId, channelId, timestamp) => {
        const data = jsonFormat({
            code, type, targetId, channelId, timestamp
        })
        main.addHistory('OnMessageCleared', data, code)
    })

    main.engine?.setOnLocalMessagesDeletedListener((code, messages) => {
        const data = jsonFormat({
            code, messages
        })
        main.addHistory('OnLocalMessagesDeleted', data, code)
    })

    main.engine?.setOnMessagesDeletedListener((code, type, targetId, channelId, messages) => {
        const data = jsonFormat({
            code, type, targetId, channelId, messages
        })
        main.addHistory('OnMessagesDeleted', data, code)
    })

    main.engine?.setOnMessageRecalledListener((code, message) => {
        const data = jsonFormat({
            code, message
        })
        main.addHistory('OnMessageRecalled', data, code)
    })

    main.engine?.setOnPrivateReadReceiptMessageSentListener((code, targetId, channelId, timestamp) => {
        const data = jsonFormat({
            code, targetId, channelId, timestamp
        })
        main.addHistory('OnPrivateReadReceiptMessageSent', data, code)
    })

    main.engine?.setOnPrivateReadReceiptReceivedListener((targetId, channelId, timestamp) => {
        const data = jsonFormat({
            targetId, channelId, timestamp
        })
        main.addHistory('OnPrivateReadReceiptReceived', data, 0)
    })

    main.engine?.setOnGroupReadReceiptRequestSentListener((code, message) => {
        const data = jsonFormat({
            code, message
        })
        main.addHistory('OnGroupReadReceiptRequestSent', data, 0)
    })


    main.engine?.setOnGroupReadReceiptResponseSentListener((code, targetId, channelId, messages) => {
        const data = jsonFormat({
            code, targetId, channelId, messages
        })
        main.addHistory('OnGroupReadReceiptResponseSent', data, 0)
    })

    main.engine?.setOnMessageExpansionUpdatedListener((code, messageUId, expansion) => {
        const data = jsonFormat({
            code, messageUId, expansion: Object.fromEntries(expansion)
        })
        main.addHistory('OnMessageExpansionUpdated', data, code)
    })

    main.engine?.setOnMessageExpansionForKeysRemovedListener((code, messageUId, keys) => {
        const data = jsonFormat({
            code, messageUId, keys
        })
        main.addHistory('OnMessageExpansionForKeys', data, code)
    })

    main.engine?.setOnMessageSentStatusChangedListener((code, messageId) => {
        const data = jsonFormat({
            code, messageId
        })
        main.addHistory('OnMessageSentStatusChanged', data, code)
    })

    main.engine?.setOnMessageReceiveStatusChangedListener((code, messageId) => {
        const data = jsonFormat({
            code, messageId
        })
        main.addHistory('OnMessageReceiveStatusChanged', data, code)
    })

    main.engine?.setOnMessagesSearchedListener((code, type, targetId, channelId, keyword, startTime, count, messages) => {
        const data = jsonFormat({
            code, type, targetId, channelId, keyword, startTime, count, messages
        })
        main.addHistory('OnMessagesSearched', data, code)
    })

    main.engine?.setOnMessagesSearchedByTimeRangeListener((code, type, targetId, channelId, keyword, startTime, endTime, offset, count, messages) => {
        const data = jsonFormat({
            code, type, targetId, channelId, keyword, startTime, endTime, offset, count, messages
        })
        main.addHistory('OnMessagesSearchedByTimeRange', data, 0)
    })


    main.engine?.setOnMessagesSearchedByUserIdListener((code, userId, type, targetId, channelId, startTime, count, messages) => {
        const data = jsonFormat({
            code, userId, type, targetId, channelId, startTime, count, messages
        })
        main.addHistory('OnMessagesSearchedByUserId', data, code)
    })

    main.engine?.setOnGroupMessageToDesignatedUsersAttachedListener((message: RCIMIWMessage) => {
        const data = jsonFormat({
            message
        })
        main.addHistory('OnMessagesSearchedByUserId', data, 0)
    })


    main.engine?.setOnRemoteMessageExpansionUpdatedListener((expansion: Map<string, string>, message: RCIMIWMessage) => {
        const data = jsonFormat({
            message
        })
        main.addHistory('OnRemoteMessageExpansionUpdated', data, 0)
    })
}

export function sendTextMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useText, setText] = React.useState('')
        let [usePushContent, setPushContent] = React.useState('')
        let [usePushData, setPushData] = React.useState('')
        let [useAtType, setAtType] = React.useState('')
        let [useAtUsers, setAtUsers] = React.useState('')
        let [useAtText, setAtText] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入发送文本</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入发送文本'
                    defaultValue={useText}
                    onChangeText={(key) => {
                        setText(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入pushContent</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入pushContent'
                    defaultValue={usePushContent}
                    onChangeText={(key) => {
                        setPushContent(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入pushData</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入pushData'
                    defaultValue={usePushData}
                    onChangeText={(key) => {
                        setPushData(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入@类型</Text>
                <Text style={{ fontSize: 18 }}>1:ALL,2:PART</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入pushData'
                    defaultValue={useAtType}
                    onChangeText={(key) => {
                        setAtType(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入@的用户</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入@的用户,可输入多个，以,分割'
                    defaultValue={useAtUsers}
                    onChangeText={(key) => {
                        setAtUsers(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入@的文本</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入@的文本'
                    defaultValue={useAtText}
                    onChangeText={(key) => {
                        setAtText(key)
                    }} />
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useText)) {
                    showToast('请输入发送文本')
                    return
                }
                let conversationType = Number(useTypes)
                let atType = Number(useAtType)
                let message: RCIMIWTextMessage = {
                    conversationType: conversationType,
                    messageType: RCIMIWMessageType.TEXT,
                    targetId: useTargetId,
                    channelId: useChannelId,
                    mentionedInfo: {
                        type: atType,
                        userIdList: useAtUsers.split(','),
                        mentionedContent: useAtText
                    },
                    pushOptions: {
                        pushContent: usePushContent,
                        pushData: usePushData
                    },
                    text: useText,
                    expansion: { AA: 'BB' }
                }

                let promise = main.engine?.sendMessage(message)
                promise?.then((code) => {
                    main.addHistory('sendMessage', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function sendImageMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useFilePath, setFilePath] = React.useState('null')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择文件</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{useFilePath}</Text>
                    <TouchableOpacity onPress={() => {
                        ImagePicker.openPicker({
                            mediaType: "any",
                            cropping: false,
                            writeTempFile: false,
                            waitAnimationEnd: false,
                        }).then((video) => {
                            let file = video.path
                            if (Platform.OS == 'ios')
                                file = file.replace('file://', '')

                            if (file)
                                setFilePath(file)
                            console.log(file)
                        }).catch(() => { });
                    }}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 18 }}>选择</Text>
                    </TouchableOpacity>
                </View>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (useFilePath == 'null') {
                    showToast('请选择图片')
                    return
                }

                let conversationType = Number(useTypes)
                let promise = main.engine?.createImageMessage(conversationType, useTargetId, useChannelId, useFilePath)
                promise?.then(message => {
                    let promise = main.engine?.sendMediaMessage(message)
                    promise?.then((code) => {
                        main.addHistory('sendMediaMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function sendFileMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useFilePath, setFilePath] = React.useState('null')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择文件</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{useFilePath}</Text>
                    <TouchableOpacity onPress={() => {
                        ImagePicker.openPicker({
                            mediaType: "any",
                            cropping: false,
                            writeTempFile: false,
                            waitAnimationEnd: false,

                        }).then((video) => {
                            let file = video.path
                            if (Platform.OS == 'ios')
                                file = file.replace('file://', '')
                            if (file)
                                setFilePath(file)
                            console.log(file)
                        }).catch(() => { });
                    }}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 18 }}>选择</Text>
                    </TouchableOpacity>
                </View>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (useFilePath == 'null') {
                    showToast('请选择文件')
                    return
                }

                let conversationType = Number(useTypes)
                let promise = main.engine?.createFileMessage(conversationType, useTargetId, useChannelId, useFilePath)
                promise?.then(message => {
                    sendingMediaMessage = message
                    let promise = main.engine?.sendMediaMessage(message)
                    promise?.then((code) => {
                        main.addHistory('sendMediaMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function sendVoiceMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useFilePath, setFilePath] = React.useState('null')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择文件</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{useFilePath}</Text>
                    <TouchableOpacity onPress={() => {
                        ImagePicker.openPicker({
                            mediaType: "any",
                            cropping: false,
                            writeTempFile: false,
                            waitAnimationEnd: false,

                        }).then((video) => {
                            let file = video.path
                            if (Platform.OS == 'ios')
                                file = file.replace('file://', '')
                            if (file)
                                setFilePath(file)
                            console.log(file)
                        }).catch(() => { });
                    }}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 18 }}>选择</Text>
                    </TouchableOpacity>
                </View>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (useFilePath == 'null') {
                    showToast('请选择文件')
                    return
                }

                let conversationType = Number(useTypes)
                let promise = main.engine?.createVoiceMessage(conversationType, useTargetId, useChannelId, useFilePath, 10)
                promise?.then(message => {
                    let promise = main.engine?.sendMediaMessage(message)
                    promise?.then((code) => {
                        main.addHistory('sendMediaMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function sendSightMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useFilePath, setFilePath] = React.useState('null')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择文件</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{useFilePath}</Text>
                    <TouchableOpacity onPress={() => {
                        ImagePicker.openPicker({
                            mediaType: "any",
                            cropping: false,
                            writeTempFile: false,
                            waitAnimationEnd: false,

                        }).then((video) => {
                            let file = video.path
                            if (Platform.OS == 'ios')
                                file = file.replace('file://', '')
                            if (file)
                                setFilePath(file)
                            console.log(file)
                        }).catch(() => { });
                    }}>
                        <Text style={{ textDecorationLine: 'underline', fontSize: 18 }}>选择</Text>
                    </TouchableOpacity>
                </View>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (useFilePath == 'null') {
                    showToast('请选择文件')
                    return
                }

                let conversationType = Number(useTypes)
                let promise = main.engine?.createSightMessage(conversationType, useTargetId, useChannelId, useFilePath, 10)
                promise?.then(message => {
                    let promise = main.engine?.sendMediaMessage(message)
                    promise?.then((code) => {
                        main.addHistory('sendMediaMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function sendReferenceMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useMessageId, setMessageId] = React.useState('')
        let [useMessageText, setMessageText] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20 }}>请输入要引用的消息ID</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入要引用的消息ID"
                    defaultValue={useMessageId}
                    onChangeText={(key) => {
                        setMessageId(key);
                    }} />
                <Text style={{ fontSize: 20 }}>请输入消息内容</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入消息内容"
                    defaultValue={useMessageText}
                    onChangeText={(key) => {
                        setMessageText(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useMessageId)) {
                    showToast('请输消息ID')
                    return
                }
                if (isEmpty(useMessageText)) {
                    showToast('请输消息内容')
                    return
                }
                let messageId = Number(useMessageId)
                let conversationType = Number(useTypes)

                let promise = main.engine?.getMessageById(messageId)
                promise?.then(message => {
                    if (!message) {
                        showToast("引用的消息ID错误")
                        return
                    }

                    promise = main.engine?.createReferenceMessage(conversationType, useTargetId, useChannelId, message, useMessageText)
                    promise?.then(message => {
                        return main.engine?.sendMessage(message!)
                    }).then(code => {
                        main.addHistory('sendReferenceMessage', jsonFormat({ code: code }), code!)
                        main.hideAlert()
                    })
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function sendGifMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useFilePath, setFilePath] = React.useState('null')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择文件</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text>{useFilePath}</Text>
                    <TouchableOpacity onPress={() => {
                        ImagePicker.openPicker({
                            mediaType: "any",
                            cropping: false,
                            writeTempFile: false,
                            waitAnimationEnd: false,

                        }).then((video) => {
                            let file = video.path
                            if (Platform.OS == 'ios')
                                file = file.replace('file://', '')
                            if (file)
                                setFilePath(file)
                            console.log(file)
                        }).catch(() => { });
                    }}>
                        <Text style={{ textDecorationLine: 'underline' }}>选择</Text>
                    </TouchableOpacity>
                </View>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (useFilePath == 'null') {
                    showToast('请选择文件')
                    return
                }

                let conversationType = Number(useTypes)

                let promise = main.engine?.createGIFMessage(conversationType, useTargetId, useChannelId, useFilePath)
                promise?.then(message => {
                    let promise = main.engine?.sendMediaMessage(message)
                    promise?.then((code) => {
                        main.addHistory('sendMediaMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function sendCustomMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [usePushContent, setPushContent] = React.useState('')
        let [usePushData, setPushData] = React.useState('')
        let [usePolicy, setPolicy] = React.useState('')
        let [useIdentifier, setIdentifier] = React.useState('')
        let [useKeys, setKeys] = React.useState('')
        let [useValues, setValues] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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

                <Text style={{ fontSize: 20, marginTop: 10 }}>请输存储策略</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:COMMAND,1:NORMAL,2:STATUS,3:STORAGE</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入存储策略'
                    defaultValue={usePolicy}
                    onChangeText={(key) => {
                        setPolicy(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入标识符</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入标识符'
                    defaultValue={useIdentifier}
                    onChangeText={(key) => {
                        setIdentifier(key)
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
                        setKeys(key)
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
                        setValues(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入pushContent</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入pushContent'
                    defaultValue={usePushContent}
                    onChangeText={(key) => {
                        setPushContent(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入pushData</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入pushData'
                    defaultValue={usePushData}
                    onChangeText={(key) => {
                        setPushData(key)
                    }} />
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(usePolicy)) {
                    showToast('请输入存储策略')
                    return
                }
                if (isEmpty(useIdentifier)) {
                    showToast('请输入标识符')
                    return
                }

                let keys = useKeys.split(',')
                let values = useValues.split(',')
                if (keys.length != values.length) {
                    showToast('Keys和Values长度不一致')
                    return
                }
                let fields: Map<string, string> = new Map()
                for (let i = 0; i < keys.length; i++) {
                    fields.set(keys[i], values[i])
                }

                let conversationType = Number(useTypes)
                let policy = Number(usePolicy)
                let promise = main.engine?.createCustomMessage(conversationType, useTargetId, useChannelId, policy, useIdentifier, fields)
                promise?.then(message => {
                    let promise = main.engine?.sendMessage(message)
                    promise?.then((code) => {
                        main.addHistory('sendMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function cancelSendingMediaMessage(main: Main) {
    if (!sendingMediaMessage) {
        showToast("没有正在发送的多媒体消息")
        return
    }

    let promise = main.engine?.cancelSendingMediaMessage(sendingMediaMessage)
    promise?.then(message => {
        promise?.then((code) => {
            main.addHistory('cancelSendingMediaMessage', jsonFormat({ code: code }), code)
        })
    })
}

export function downloadMediaMessage(main: Main) {
    function AlertView(props: any) {
        let [useMessageId, setMessageId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入要下载的消息ID</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入要下载的消息ID"
                    defaultValue={useMessageId}
                    onChangeText={(key) => {
                        setMessageId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useMessageId)) {
                    showToast('请输消息ID')
                    return
                }

                let messageId = Number(useMessageId)
                let promise = main.engine?.getMessageById(messageId)
                promise?.then(message => {
                    if (!message) {
                        showToast("消息ID错误")
                        return
                    }
                    downloadingMediaMessage = message
                    return main.engine?.downloadMediaMessage(message)
                }).then(code => {
                    main.addHistory('downloadMediaMessage', jsonFormat({ code: code }), code!)
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function cancelDownloadingMediaMessage(main: Main) {
    if (!downloadingMediaMessage) {
        showToast("没有正在下载的消息")
        return
    }

    let promise = main.engine?.cancelDownloadingMediaMessage(downloadingMediaMessage)
    promise?.then((code) => {
        main.addHistory('cancelDownloadingMediaMessage', jsonFormat({ code: code }), code)
    })
}

export function sendTypingStatus(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useCurrentType, setCurrentType] = React.useState('')


        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入状态</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入状态'
                    defaultValue={useCurrentType}
                    onChangeText={(key) => {
                        setCurrentType(key)
                    }} />
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useCurrentType)) {
                    showToast('请输入状态')
                    return
                }

                let conversationType = Number(useTypes)
                let promise = main.engine?.sendTypingStatus(conversationType, useTargetId, useChannelId, useCurrentType)
                promise?.then((code) => {
                    main.addHistory('sendTypingStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}
export function loadMessages(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [usePushContent, setPushContent] = React.useState('')
        let [usePushData, setPushData] = React.useState('')
        let [usePolicy, setPolicy] = React.useState('')
        let [useOrder, setOrder] = React.useState('')
        let [useCount, setCount] = React.useState('')
        let dateTimePicker: MyDateTimePicker
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入sentTime</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        dateTimePicker = ref
                }}></MyDateTimePicker>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入order</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:BEFORE,1:AFTER</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入order'
                    defaultValue={useOrder}
                    onChangeText={(key) => {
                        setOrder(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入加载策略</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:LOCAL,1:REMOTE,2:LOCAL_REMOTE</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入加载策略'
                    defaultValue={usePolicy}
                    onChangeText={(key) => {
                        setPolicy(key)
                    }} />

                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入加载数量</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入加载数量'
                    defaultValue={useCount}
                    onChangeText={(key) => {
                        setCount(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入pushContent</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入pushContent'
                    defaultValue={usePushContent}
                    onChangeText={(key) => {
                        setPushContent(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入pushData</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入pushData'
                    defaultValue={usePushData}
                    onChangeText={(key) => {
                        setPushData(key)
                    }} />
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useOrder)) {
                    showToast('请输入order')
                    return
                }
                if (isEmpty(usePolicy)) {
                    showToast('请输入加载策略')
                    return
                }
                if (isEmpty(useCount)) {
                    showToast('请输入加载数量')
                    return
                }
                let conversationType = Number(useTypes)
                let policy = Number(usePolicy)
                let order = Number(useOrder)
                let count = Number(useCount)
                let times = dateTimePicker.getTime()


                if (policy > RCIMIWMessageOperationPolicy.LOCAL_REMOTE) {
                    showToast('加载策略输入不正确')
                    return
                }
                if (order > RCIMIWTimeOrder.AFTER) {
                    showToast('order输入不正确')
                    return
                }
                let promise = main.engine?.loadMessages(conversationType, useTargetId, useChannelId, times, order, policy, count)
                promise?.then((code) => {
                    main.addHistory('loadMessages', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function getMessageById(main: Main) {
    function AlertView(props: any) {
        let [useId, setId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入消息ID</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入消息ID'
                    defaultValue={useId}
                    onChangeText={(key) => {
                        setId(key)
                    }} />

            </View>, () => {
                if (isEmpty(useId)) {
                    showToast('输入消息ID')
                    return
                }
                let id = Number(useId)
                let promise = main.engine?.getMessageById(id)
                promise?.then((message) => {
                    if (!message) {
                        main.addHistory('getMessageById', jsonFormat({ message: message }), -1)
                    }
                    else {
                        main.addHistory('getMessageById', jsonFormat({ message: message }), 0)
                    }
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function getMessageByUId(main: Main) {
    function AlertView(props: any) {
        let [useId, setId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入MessageUID</Text>

                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入MessageUID'
                    defaultValue={useId}
                    onChangeText={(key) => {
                        setId(key)
                    }} />

            </View>, () => {
                if (isEmpty(useId)) {
                    showToast('输入MessageUID')
                    return
                }

                let promise = main.engine?.getMessageByUId(useId)
                promise?.then((message) => {
                    if (!message) {
                        main.addHistory('getMessageByUId', jsonFormat({ message: message }), -1)
                    }
                    else {
                        main.addHistory('getMessageByUId', jsonFormat({ message: message }), 0)
                    }
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function loadFirstUnreadMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                let conversationType = Number(useTypes)
                let promise = main.engine?.loadFirstUnreadMessage(conversationType, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadFirstUnreadMessage', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadUnreadMentionedMessages(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                let conversationType = Number(useTypes)
                let promise = main.engine?.loadUnreadMentionedMessages(conversationType, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadUnreadMentionedMessages', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function insertMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                let conversationType = Number(useTypes)
                let promise = main.engine?.createTextMessage(conversationType, useTargetId, useChannelId, "插入消息")
                promise?.then(message => {
                    let promise = main.engine?.insertMessage(message)
                    promise?.then((code) => {
                        main.addHistory('insertMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function insertMessages(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                let conversationType = Number(useTypes)
                let promise = main.engine?.createTextMessage(conversationType, useTargetId, useChannelId, "插入消息1")
                promise?.then(message => {
                    let message2 = { ...message }
                    message2.text = '插入消息2'
                    let promise = main.engine?.insertMessages([message, message2])
                    promise?.then((code) => {
                        main.addHistory('insertMessages', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function clearMessages(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [usePolicy, setPolicy] = React.useState('')
        let dateTimePicker: MyDateTimePicker
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入policy</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:LOCAL,1:REMOTE,2:LOCAL_REMOTE</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入policy'
                    defaultValue={usePolicy}
                    onChangeText={(key) => {
                        setPolicy(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择sentTime</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        dateTimePicker = ref
                }}></MyDateTimePicker>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(usePolicy)) {
                    showToast('请输入Policy')
                    return
                }
                let conversationType = Number(useTypes)
                let policy = Number(usePolicy)
                if (policy > RCIMIWMessageOperationPolicy.LOCAL_REMOTE) {
                    showToast('policy输入错误')
                    return
                }

                let times = dateTimePicker.getTime()
                let promise = main.engine?.clearMessages(conversationType, useTargetId, useChannelId, times, policy)
                promise?.then((code) => {
                    main.addHistory('clearMessages', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function deleteLocalMessages(main: Main) {
    function AlertView(props: any) {
        let [useMessagesId, setMessagesId] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入要删除的消息ID</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入要删除的消息ID,可输入多个,以,分割"
                    defaultValue={useMessagesId}
                    onChangeText={(key) => {
                        setMessagesId(key);
                    }} />

            </View>, () => {
                if (isEmpty(useMessagesId)) {
                    showToast('输入要删除的消息ID')
                    return
                }
                let messagesId = useMessagesId.split(',').map(v => Number(v))
                if (messagesId.length == 0) {
                    showToast('要删除的消息ID为空')
                    return
                }

                let promises: Promise<RCIMIWMessage>[] = []

                for (let i of messagesId) {
                    promises.push(main.engine?.getMessageById(i)!)
                }
                Promise.all(promises).then(messages => {
                    messages = messages.filter(message => (message != null && message != undefined))
                    if (messages.length == 0) {
                        showToast("没有能删除的消息")
                        return
                    }

                    let promise = main.engine?.deleteLocalMessages(messages)
                    promise?.then((code) => {
                        main.addHistory('deleteLocalMessages', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function deleteMessages(main: Main) {
    function AlertView(props: any) {
        let [useMessagesId, setMessagesId] = React.useState('')
        let [useTypes, setTypes] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入会话类型"
                    defaultValue={useTypes}
                    onChangeText={(key) => {
                        setTypes(key);
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
                <Text style={{ fontSize: 20 }}>请输入要删除的消息ID</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入要删除的消息ID,可输入多个,以,分割"
                    defaultValue={useMessagesId}
                    onChangeText={(key) => {
                        setMessagesId(key);
                    }} />

            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useMessagesId)) {
                    showToast('输入要删除的消息ID')
                    return
                }
                let messagesId = useMessagesId.split(',').map(v => Number(v))
                if (messagesId.length == 0) {
                    showToast('要删除的消息ID为空')
                    return
                }
                let conversationType = Number(useTypes)
                let promises: Promise<RCIMIWMessage>[] = []

                for (let i of messagesId) {
                    promises.push(main.engine?.getMessageById(i)!)
                }
                Promise.all(promises).then(messages => {
                    messages = messages.filter(message => (message != null && message != undefined))
                    if (messages.length == 0) {
                        showToast("没有能删除的消息")
                        return
                    }

                    let promise = main.engine?.deleteMessages(conversationType, useTargetId, useChannelId, messages)
                    promise?.then((code) => {
                        main.addHistory('deleteMessages', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function recallMessage(main: Main) {
    function AlertView(props: any) {
        let [useMessageId, setMessageId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入要撤回的消息ID</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入撤回的消息ID"
                    defaultValue={useMessageId}
                    onChangeText={(key) => {
                        setMessageId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useMessageId)) {
                    showToast('输入要撤回的消息ID')
                    return
                }
                let messageId = Number(useMessageId)
                let promise = main.engine?.getMessageById(messageId)
                promise?.then(message => {
                    if (!message) {
                        showToast("输入的消息ID错误");
                        return
                    }

                    let promise = main.engine?.recallMessage(message)
                    promise?.then((code) => {
                        main.addHistory('recallMessage', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function sendPrivateReadReceiptMessage(main: Main) {
    function AlertView(props: any) {
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let dateTimePicker: MyDateTimePicker
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入sentTime</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        dateTimePicker = ref
                }}></MyDateTimePicker>
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                let times = dateTimePicker.getTime()
                let promise = main.engine?.sendPrivateReadReceiptMessage(useTargetId, useChannelId, times)
                promise?.then((code) => {
                    main.addHistory('sendPrivateReadReceiptMessage', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function sendGroupReadReceiptRequest(main: Main) {
    function AlertView(props: any) {
        let [useMessageId, setMessageId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入消息ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入消息ID'
                    defaultValue={useMessageId}
                    onChangeText={(key) => {
                        setMessageId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useMessageId)) {
                    showToast('请输入消息ID')
                    return
                }
                let messageId = Number(useMessageId)
                let promise = main.engine?.getMessageById(messageId)
                promise?.then(message => {
                    if (!message) {
                        showToast("消息ID错误")
                        return
                    }
                    return main.engine?.sendGroupReadReceiptRequest(message)
                }).then(code => {
                    main.addHistory('sendGroupReadReceiptRequest', jsonFormat({ code: code }), code!)
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function sendGroupReadReceiptResponse(main: Main) {
    function AlertView(props: any) {
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useMessagesId, setMessagesId] = React.useState('')
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入消息ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入消息ID,可输入多个,以,分割'
                    defaultValue={useMessagesId}
                    onChangeText={(key) => {
                        setMessagesId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useMessagesId)) {
                    showToast('请输入消息ID')
                    return
                }
                let messagesId = useMessagesId.split(',').map(v => Number(v))
                if (messagesId.length == 0) {
                    showToast('消息ID为空')
                    return
                }

                let promises: Promise<RCIMIWMessage>[] = []

                for (let i of messagesId) {
                    promises.push(main.engine?.getMessageById(i)!)
                }
                Promise.all(promises).then(messages => {
                    messages = messages.filter(message => message != undefined && message != null)
                    if (messages.length == 0) {
                        showToast("没有找到对应的消息")
                        return
                    }
                    let promise = main.engine?.sendGroupReadReceiptResponse(useTargetId, useChannelId, messages)
                    promise?.then((code) => {
                        main.addHistory('sendGroupReadReceiptResponse', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function updateMessageExpansion(main: Main) {
    function AlertView(props: any) {
        let [useMessageUId, setMessageUId] = React.useState('')
        let [useKeys, setKeys] = React.useState('')
        let [useValues, setValues] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入MessageUId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入MessageUId"
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
                        setKeys(key)
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
                        setValues(key)
                    }} />
            </View>, () => {
                if (isEmpty(useMessageUId)) {
                    showToast('请输入MessageUId')
                    return
                }

                let keys = useKeys.split(',')
                let values = useValues.split(',')
                if (keys.length != values.length) {
                    showToast('Keys和Values长度不一致')
                    return
                }
                let fields: Map<string, string> = new Map()
                for (let i = 0; i < keys.length; i++) {
                    fields.set(keys[i], values[i])
                }

                let promise = main.engine?.updateMessageExpansion(useMessageUId, fields)
                promise?.then((code) => {
                    main.addHistory('updateMessageExpansion', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function removeMessageExpansionForKeys(main: Main) {
    function AlertView(props: any) {

        let [useMessageUId, setMessageUId] = React.useState('')

        let [useKeys, setKeys] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入MessageUId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入MessageUId"
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
                        setKeys(key)
                    }} />

            </View>, () => {
                if (isEmpty(useMessageUId)) {
                    showToast('请输入MessageUId')
                    return
                }

                let keys = useKeys.split(',')
                if (keys.length == 0) {
                    showToast('请输入要删除的key')
                    return
                }

                let promise = main.engine?.removeMessageExpansionForKeys(useMessageUId, keys)
                promise?.then((code) => {
                    main.addHistory('removeMessageExpansionForKeys', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function changeMessageSentStatus(main: Main) {
    function AlertView(props: any) {

        let [useMessageId, setMessageId] = React.useState('')

        let [useSendStatus, setSendStatus] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入消息Id</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="消息Id"
                    defaultValue={useMessageId}
                    onChangeText={(key) => {
                        setMessageId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入发送状态</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:SENDING,1:FAILED,2:SENT,3:RECEIVED,4:READ,5:DESTROYED,6:CANCELED</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入发送状态'
                    defaultValue={useSendStatus}
                    onChangeText={(key) => {
                        setSendStatus(key)
                    }} />

            </View>, () => {
                if (isEmpty(useMessageId)) {
                    showToast('请输入消息ID')
                    return
                }
                if (isEmpty(useSendStatus)) {
                    showToast('请输入发送状态')
                    return
                }
                let sendStatus = Number(useSendStatus)
                if (sendStatus > RCIMIWSentStatus.CANCELED) {
                    showToast('发送状态输入错误')
                    return
                }
                let messageId = Number(useMessageId)


                let promise = main.engine?.changeMessageSentStatus(messageId, sendStatus)
                promise?.then((code) => {
                    main.addHistory('changeMessageSentStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function changeMessageReceiveStatus(main: Main) {
    function AlertView(props: any) {

        let [useMessageId, setMessageId] = React.useState('')

        let [useSendStatus, setSendStatus] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入消息Id</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="消息Id"
                    defaultValue={useMessageId}
                    onChangeText={(key) => {
                        setMessageId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入接收状态</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0: UNREAD,1:READ,2:LISTENED,3:DOWNLOADED,4:RETRIEVED,5:MULTIPLE_RECEIVE</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入接收状态'
                    defaultValue={useSendStatus}
                    onChangeText={(key) => {
                        setSendStatus(key)
                    }} />

            </View>, () => {
                if (isEmpty(useMessageId)) {
                    showToast('请输入消息ID')
                    return
                }
                if (isEmpty(useSendStatus)) {
                    showToast('请输入接收状态')
                    return
                }
                let receivedStatus = Number(useSendStatus)
                if (receivedStatus > RCIMIWReceivedStatus.MULTIPLE_RECEIVE) {
                    showToast('接收状态输入错误')
                    return
                }
                let messageId = Number(useMessageId)
                let promise = main.engine?.changeMessageReceiveStatus(messageId, receivedStatus)
                promise?.then((code) => {
                    main.addHistory('changeMessageReceiveStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function searchMessages(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')

        let [useKeyword, setKeyword] = React.useState('')
        let [useCount, setCount] = React.useState('')
        let dateTimePicker: MyDateTimePicker
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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

                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入keyword</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入keyword'
                    defaultValue={useKeyword}
                    onChangeText={(key) => {
                        setKeyword(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入加载数量</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入加载数量'
                    defaultValue={useCount}
                    onChangeText={(key) => {
                        setCount(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入sentTime</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        dateTimePicker = ref
                }}></MyDateTimePicker>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useKeyword)) {
                    showToast('请输入Keyword')
                    return
                }

                if (isEmpty(useCount)) {
                    showToast('请输入加载数量')
                    return
                }
                let conversationType = Number(useTypes)

                let count = Number(useCount)
                let times = dateTimePicker.getTime()

                let promise = main.engine?.searchMessages(conversationType, useTargetId, useChannelId, useKeyword, times, count)
                promise?.then((code) => {
                    main.addHistory('searchMessages', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function searchMessagesByTimeRange(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useKeyword, setKeyword] = React.useState('')
        let [useOffset, setOffset] = React.useState('')
        let [useCount, setCount] = React.useState('')
        let startTimePicker: MyDateTimePicker
        let endTimePicker: MyDateTimePicker
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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

                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入keyword</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入keyword'
                    defaultValue={useKeyword}
                    onChangeText={(key) => {
                        setKeyword(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入offset</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入offset'
                    defaultValue={useOffset}
                    onChangeText={(key) => {
                        setOffset(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入加载数量</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入加载数量'
                    defaultValue={useCount}
                    onChangeText={(key) => {
                        setCount(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择开始时间</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        startTimePicker = ref
                }}></MyDateTimePicker>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择结束时间</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        endTimePicker = ref
                }}></MyDateTimePicker>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useKeyword)) {
                    showToast('请输入Keyword')
                    return
                }
                if (isEmpty(useOffset)) {
                    showToast('请输入Offset')
                    return
                }
                if (isEmpty(useCount)) {
                    showToast('请输入加载数量')
                    return
                }
                let conversationType = Number(useTypes)
                let count = Number(useCount)
                let offset = Number(useOffset)
                let startTime = startTimePicker.getTime()
                let endTime = endTimePicker.getTime()
                let promise = main.engine?.searchMessagesByTimeRange(conversationType, useTargetId, useChannelId, useKeyword, startTime, endTime, offset, count)
                promise?.then((code) => {
                    main.addHistory('searchMessagesByTimeRange', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function searchMessagesByUserId(main: Main) {
    function AlertView(props: any) {
        let [useUserId, setUserId] = React.useState('')
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')

        let [useCount, setCount] = React.useState('')
        let startTimePicker: MyDateTimePicker

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输UId</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入UId"
                    defaultValue={useUserId}
                    onChangeText={(key) => {
                        setUserId(key);
                    }} />
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入加载数量</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入加载数量'
                    defaultValue={useCount}
                    onChangeText={(key) => {
                        setCount(key)
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择开始时间</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        startTimePicker = ref
                }}></MyDateTimePicker>

            </View>, () => {
                if (isEmpty(useUserId)) {
                    showToast('请输入Uid')
                    return
                }
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useCount)) {
                    showToast('请输入加载数量')
                    return
                }
                let conversationType = Number(useTypes)
                let count = Number(useCount)

                let startTime = startTimePicker.getTime()

                let promise = main.engine?.searchMessagesByUserId(useUserId, conversationType, useTargetId, useChannelId, startTime, count)
                promise?.then((code) => {
                    main.addHistory('searchMessagesByUserId', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function sendGroupMessageToDesignatedUsers(main: Main) {
    function AlertView(props: any) {
        let [useMessageId, setMessageId] = React.useState('')
        let [useUserIds, setUserIds] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入消息ID</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入消息ID"
                    defaultValue={useMessageId}
                    onChangeText={(key) => {
                        setMessageId(key);
                    }} />
                <Text style={{ fontSize: 20 }}>请输入用户ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入用户ID,可输入多个,以,分割"
                    defaultValue={useUserIds}
                    onChangeText={(key) => {
                        setUserIds(key);
                    }} />
            </View>, () => {
                if (isEmpty(useMessageId)) {
                    showToast('请输入消息ID')
                    return
                }
                if (isEmpty(useUserIds)) {
                    showToast('请输入用户ID')
                    return
                }
                let userIds = useUserIds.split(',')
                let messageId = Number(useMessageId)
                let promise = main.engine?.getMessageById(messageId)
                promise?.then(message => {
                    if (!message) {
                        showToast("消息ID错误")
                        return
                    }
                    let promise = main.engine?.sendGroupMessageToDesignatedUsers(message, userIds)
                    promise?.then((code) => {
                        main.addHistory('sendGroupMessageToDesignatedUsers', jsonFormat({ code: code }), code)
                    })
                    main.hideAlert()
                })
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}