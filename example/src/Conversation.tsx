import React from "react";
import { Text, TextInput, View } from "react-native";

import { createAlertView, isEmpty, jsonFormat, showToast } from "./Util";
import { styles } from "./Style";

import Main from "./Main";
import MyDateTimePicker from "./View/DateTimePicker";
import { RCIMIWConversationType, RCIMIWPushNotificationLevel, RCIMIWTypingStatus } from "@rongcloud/react-native-im-wrapper";



export function registerConversationsListener(main: Main) {
    main.engine?.setOnConversationsLoadedListener((code, conversationTypes, channelId, startTime, count, conversations) => {
        const data = jsonFormat({
            code, conversationTypes, channelId, startTime, count, conversations
        })
        main.addHistory('OnConversationsLoaded', data, code)
    })
    main.engine?.setOnConversationLoadedListener((code, type, targetId, channelId, conversation) => {
        const data = jsonFormat({
            code, type, targetId, channelId, conversation
        })
        main.addHistory('OnConversationLoaded', data, code)
    })
    main.engine?.setOnConversationRemovedListener((code, type, targetId, channelId) => {
        const data = jsonFormat({
            code, type, targetId, channelId
        })
        main.addHistory('OnConversationRemoved', data, code)
    })
    main.engine?.setOnConversationsRemovedListener((code, types, channelId) => {
        const data = jsonFormat({
            code, types, channelId
        })
        main.addHistory('OnConversationsRemoved', data, code)
    })
    main.engine?.setOnDraftMessageSavedListener((code, type, targetId, channelId, draft) => {
        const data = jsonFormat({
            code, type, targetId, channelId, draft
        })
        main.addHistory('OnDraftMessageSaved', data, code)
    })
    main.engine?.setOnDraftMessageLoadedListener((code, type, targetId, channelId, draft) => {
        const data = jsonFormat({
            code, type, targetId, channelId, draft
        })
        main.addHistory('OnDraftMessageLoaded', data, code)
    })
    main.engine?.setOnDraftMessageClearedListener((code, type, targetId, channelId) => {
        const data = jsonFormat({
            code, type, targetId, channelId
        })
        main.addHistory('OnDraftMessageCleared', data, code)
    })

    main.engine?.setOnConversationNotificationLevelChangedListener((code, type, targetId, channelId, level) => {
        const data = jsonFormat({
            code, type, targetId, channelId, level
        })
        main.addHistory('OnConversationNotificationStatusChanged', data, code)
    })

    main.engine?.setOnConversationTypeNotificationLevelChangedListener((code, type, level) => {
        const data = jsonFormat({
            code, type, level
        })
        main.addHistory('OnConversationTypeNotificationLevelChanged', data, code)
    })

    main.engine?.setOnConversationNotificationLevelLoadedListener((code, type, targetId, channelId, level) => {
        const data = jsonFormat({
            code, type, targetId, channelId, level
        })
        main.addHistory('OnConversationNotificationStatusLoaded', data, code)
    })

    main.engine?.setOnConversationTypeNotificationLevelLoadedListener((code, type, level) => {
        const data = jsonFormat({
            code, type, level
        })
        main.addHistory('OnConversationTypeNotificationLevelLoaded', data, code)
    })

    main.engine?.setOnBlockedConversationsLoadedListener((code, types, channelId, conversations) => {
        const data = jsonFormat({
            code, types, channelId, conversations
        })
        main.addHistory('OnBlockedConversationsLoaded', data, code)
    })
    
    main.engine?.setOnConversationTopStatusChangedListener((code, type, targetId, channelId, top) => {
        const data = jsonFormat({
            code, type, targetId, channelId, top
        })
        main.addHistory('OnConversationTopStatusChanged', data, code)
    })

    main.engine?.setOnConversationTopStatusLoadedListener((code, type, targetId, channelId, top) => {
        const data = jsonFormat({
            code, type, channelId, targetId, top
        })
        main.addHistory('OnConversationTopStatusLoaded', data, code)
    })

    main.engine?.setOnConversationReadStatusSyncedListener((code, type, targetId, channelId, timestamp) => {
        const data = jsonFormat({
            code, type, targetId, channelId, timestamp
        })
        main.addHistory('OnConversationReadStatusSynced', data, code)
    })

    main.engine?.setOnConversationsSearchedListener((code, conversationTypes, channelId, messageTypes, keyword, conversations) => {
        const data = jsonFormat({
            code, conversationTypes, channelId, messageTypes, keyword, conversations
        })
        main.addHistory('OnConversationsSearched', data, code)
    })

    main.engine?.setOnMessageCountLoadedListener((code, type, targetId, channelId, count) => {
        const data = jsonFormat({
            code, type, targetId, channelId, count
        })
        main.addHistory('OnMessageCountLoaded', data, code)
    })

    main.engine?.setOnTopConversationsLoadedListener((code, conversationTypes, channelId, conversations) => {
        const data = jsonFormat({
            code, conversationTypes, channelId, conversations
        })
        main.addHistory('OnTopConversationsLoaded', data, code)
    })

    //监听远端置顶
    main.engine?.setOnConversationTopStatusSyncedListener((type: RCIMIWConversationType, targetId: string, channelId: string, top: boolean) => {
        const data = jsonFormat({
            type, targetId, channelId, top
        })
        main.addHistory('OnConversationTopStatusSynced', data, 0)
    })

    //监听远端输入
    main.engine?.setOnTypingStatusChangedListener((type: RCIMIWConversationType, targetId: string, channelId: string,
        userTypingStatus: Array<RCIMIWTypingStatus>) => {
        const data = jsonFormat({
            type, targetId, channelId, userTypingStatus
        })
        main.addHistory('OnTypingStatusChanged', data, 0)
    })

    //监听同步消息未读状态
    main.engine?.setOnConversationReadStatusSyncMessageReceivedListener((type: RCIMIWConversationType, targetId: string, timestamp: number) => {
        const data = jsonFormat({
            type, targetId, timestamp
        })
        main.addHistory('OnConversationReadStatusSyncMessageReceived', data, 0)
    })
}


export function loadConversations(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useCount, setCount] = React.useState('0')
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
                    placeholder="可输入多个，以,分割"
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入查询数量</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='请输入查询数量'
                    defaultValue={useCount}
                    onChangeText={(key) => {
                        setCount(key);
                    }} />

                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择开始时间</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        dateTimePicker = ref
                }}></MyDateTimePicker>
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useCount)) {
                    showToast('请输查询数量')
                    return
                }

                let types = useTypes.split(',').map((s) => Number(s))
                let count = Number(useCount)
                let times = dateTimePicker.getTime()
                let promise = main.engine?.loadConversations(types, useChannelId, times, count)
                promise?.then((code) => {
                    main.addHistory('loadConversations', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadConversation(main: Main) {
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
                let type = Number(useTypes)
                let promise = main.engine?.loadConversation(type, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadConversation', jsonFormat({ code: code }), code)
                })

                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function removeConversation(main: Main) {
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
                let type = Number(useTypes)
                let promise = main.engine?.removeConversation(type, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('removeConversation', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function removeConversations(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
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
                    placeholder="可输入多个，以,分割"
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
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                let types = useTypes.split(',').map((s) => Number(s))
                let promise = main.engine?.removeConversations(types, useChannelId)
                promise?.then((code) => {
                    main.addHistory('removeConversations', jsonFormat({ code: code }), code)
                })

                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function saveDraftMessage(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useDraft, setDraft] = React.useState('')

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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入草稿信息</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入草稿信息'
                    defaultValue={useDraft}
                    onChangeText={(key) => {
                        setDraft(key);
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
                let type = Number(useTypes)
                let promise = main.engine?.saveDraftMessage(type, useTargetId, useChannelId, useDraft)
                promise?.then((code) => {
                    main.addHistory('saveDraftMessage', jsonFormat({ code: code }), code)
                })

                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function loadDraftMessage(main: Main) {
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

                let type = Number(useTypes)
                let promise = main.engine?.loadDraftMessage(type, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadDraftMessage', jsonFormat({ code: code }), code)
                })

                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function clearDraftMessage(main: Main) {
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
                let type = Number(useTypes)
                let promise = main.engine?.clearDraftMessage(type, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('clearDraftMessage', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function changeConversationNotificationLevel(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useLevel, setLevel] = React.useState('')

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
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useTargetId)) {
                    showToast('请输入targetId')
                    return
                }
                if (isEmpty(useLevel)) {
                    showToast('请输入Level')
                    return
                }
                let type = Number(useTypes)
                let level: RCIMIWPushNotificationLevel = Number(useLevel)
                let promise = main.engine?.changeConversationNotificationLevel(type, useTargetId, useChannelId, level)
                promise?.then((code) => {
                    main.addHistory('changeConversationNotificationLevel', jsonFormat({ code: code }), code)
                })

                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadConversationNotificationLevel(main: Main) {
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

                let type = Number(useTypes)
                let promise = main.engine?.loadConversationNotificationLevel(type, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadConversationNotificationLevel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function changeConversationTypeNotificationLevel(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useLevel, setLevel] = React.useState('')

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
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useLevel)) {
                    showToast('请输入Level')
                    return
                }
                let type = Number(useTypes)
                let level: RCIMIWPushNotificationLevel = Number(useLevel)
                let promise = main.engine?.changeConversationTypeNotificationLevel(type,level)
                promise?.then((code) => {
                    main.addHistory('changeConversationTypeNotificationLevel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function loadConversationTypeNotificationLevel(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
      
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
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                let type = Number(useTypes)
                let promise = main.engine?.loadConversationTypeNotificationLevel(type)
                promise?.then((code) => {
                    main.addHistory('loadConversationTypeNotificationLevel', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadBlockedConversations(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
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
                    placeholder="可输入多个，以,分割"
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
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }

                let types = useTypes.split(',').map((s) => Number(s))
                let promise = main.engine?.loadBlockedConversations(types, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadBlockedConversations', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function changeConversationTopStatus(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        let [useTop, setTop] = React.useState('')
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>是否置顶</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0:取消置顶,1:置顶'
                    defaultValue={useTop}
                    onChangeText={(key) => {
                        setTop(key);
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
                if (isEmpty(useTop)) {
                    showToast('请输入targetId')
                    return
                }
                if (useTop != '0' && useTop != '1') {
                    showToast('置顶输入错误')
                    return
                }
                let top = Number(useTop) === 1 ? true : false
                let type = Number(useTypes)
                let promise = main.engine?.changeConversationTopStatus(type, useTargetId, useChannelId, top)
                promise?.then((code) => {
                    main.addHistory('changeConversationTopStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function loadConversationTopStatus(main: Main) {
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
                let type = Number(useTypes)
                let promise = main.engine?.loadConversationTopStatus(type, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadConversationTopStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function syncConversationReadStatus(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let dateTimePicker: MyDateTimePicker
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

                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择开始时间</Text>
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
                let type = Number(useTypes);
                let times = dateTimePicker.getTime()
                let promise = main.engine?.syncConversationReadStatus(type, useTargetId, useChannelId, times)
                promise?.then((code) => {
                    main.addHistory('syncConversationReadStatus', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function searchConversations(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
        let [useChannelId, setChannelId] = React.useState('')
        let [useMessageTypes, setMessageTypes] = React.useState('')
        let [useKeyword, setKeyword] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20 }}>请输入会话类型</Text>
                <Text style={{ fontSize: 18 }}>1:单聊,2:群聊,3:聊天室,4:系统,5:超级群</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="可输入多个，以,分割"
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
                <Text style={{ fontSize: 20 }}>请输入查询的消息类型</Text>
                <Text style={{ fontSize: 18 }}>0:UNKNOWN,1:CUSTOM,2:TEXT,3:VOICE,4:IMAGE,5:FILE,6:SIGHT,7:GIF,8:RECALL,9:REFERENCE,10:COMMAND,11:COMMAND_NOTIFICATION</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="可输入多个，以,分割"
                    defaultValue={useMessageTypes}
                    onChangeText={(key) => {
                        setMessageTypes(key);
                    }} />
                <Text style={{ fontSize: 20 }}>请输入关键字</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder="输入关键字"
                    defaultValue={useKeyword}
                    onChangeText={(key) => {
                        setKeyword(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                if (isEmpty(useMessageTypes)) {
                    showToast('请输入消息类型')
                    return
                }
                if (isEmpty(useKeyword)) {
                    showToast('请输入消息类型')
                    return
                }
                let types = useTypes.split(',').map((s) => Number(s))
                let messageTypes = useMessageTypes.split(',').map((s) => Number(s))
                let promise = main.engine?.searchConversations(types, useChannelId, messageTypes, useKeyword)
                promise?.then((code) => {
                    main.addHistory('searchConversations', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}



export function loadMessageCount(main: Main) {
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
                let type = Number(useTypes)
                let promise = main.engine?.loadMessageCount(type, useTargetId, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadMessageCount', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function loadTopConversations(main: Main) {
    function AlertView(props: any) {
        let [useTypes, setTypes] = React.useState('')
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
                if (isEmpty(useTypes)) {
                    showToast('请输入会话类型')
                    return
                }
                let types = useTypes.split(',').map((s) => Number(s))
                let promise = main.engine?.loadTopConversations(types, useChannelId)
                promise?.then((code) => {
                    main.addHistory('loadTopConversations', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}