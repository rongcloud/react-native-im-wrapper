import Main from "./Main";
import React from "react";
import { createAlertView, isEmpty, jsonFormat, showToast } from "./Util";
import { Text, TextInput, View } from "react-native";
import { styles } from "./Style";
import MyDateTimePicker from "./View/DateTimePicker";
import { RCIMIWChatRoomMemberAction, RCIMIWChatRoomStatus } from "@rongcloud/react-native-im-wrapper";

export function registerChatRoomListener(main: Main) {
    main.engine?.setOnChatRoomJoinedListener((code,targetId) => {
        const data = jsonFormat({
            code,targetId
        })
        main.addHistory('OnChatRoomJoined', data, code)
    })

    main.engine?.setOnChatRoomLeftListener((code,targetId) => {
        const data = jsonFormat({
            code,targetId
        })
        main.addHistory('OnChatRoomLeft', data, code)
    })

    main.engine?.setOnChatRoomMessagesLoadedListener((code, targetId, messages, syncTime) => {
        const data = jsonFormat({
            code, targetId, messages, syncTime
        })
        main.addHistory('OnChatRoomMessagesLoaded', data, code)
    })

    main.engine?.setOnChatRoomEntryAddedListener((code, targetId, key) => {
        const data = jsonFormat({
            code, targetId, key
        })
        main.addHistory('OnChatRoomEntryAdded', data, code)
    })

    main.engine?.setOnChatRoomEntriesAddedListener((code, targetId, entries: Map<string, string>, errorEntries: Map<string, number>) => {
        const data = jsonFormat({
            code, targetId, entries: Object.fromEntries(entries), errorEntries: Object.fromEntries(errorEntries)
        })
        main.addHistory('OnChatRoomEntriesAdded', data, code)
    })

    main.engine?.setOnChatRoomEntryLoadedListener((code, targetId, entry: Map<string, string>) => {
        const data = jsonFormat({
            code, targetId, entry: Object.fromEntries(entry)
        })
        main.addHistory('OnChatRoomEntryLoaded', data, code)
    })

    main.engine?.setOnAllChatRoomEntriesLoadedListener((code, targetId, entries: Map<string, string>) => {
        const data = jsonFormat({
            code, targetId, entries: Object.fromEntries(entries)
        })
        main.addHistory('OnAllChatRoomEntriesLoaded', data, code)
    })

    main.engine?.setOnChatRoomEntryRemovedListener((code, targetId, key) => {
        const data = jsonFormat({
            code, targetId, key
        })
        main.addHistory('OnChatRoomEntryRemoved', data, code)
    })

    main.engine?.setOnChatRoomEntriesRemovedListener((code, targetId, keys) => {
        const data = jsonFormat({
            code, targetId, keys
        })
        main.addHistory('OnChatRoomEntriesRemoved', data, code)
    })

    //监听聊天室状态改变
    main.engine?.setOnChatRoomStatusChangedListener((targetId: string, status: RCIMIWChatRoomStatus) => {
        const data = jsonFormat({
            targetId, status
        })
        main.addHistory('OnChatRoomEntriesRemoved', data, 0)
    })

    //聊天室成员变化监听
    main.engine?.setOnChatRoomMemberChangedListener((targetId: string, actions: Array<RCIMIWChatRoomMemberAction>) => {
        const data = jsonFormat({
            targetId, actions
        })
        main.addHistory('OnChatRoomEntriesRemoved', data, 0)
    })
}

export function joinChatRoom(main: Main) {
    function AlertView(props: any) {
        let [useCount, setCount] = React.useState('')
        let [useCreate, setCreate] = React.useState('')
        let [useTargetId, setTargetId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入聊天室房间ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入聊天室房间ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入加入时拉取的历史消息条数</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='加入时拉取的历史消息条数'
                    defaultValue={useCount}
                    onChangeText={(key) => {
                        setCount(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>聊天室不存在时是否自动创建</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0:不创建,1:创建'
                    defaultValue={useCreate}
                    onChangeText={(key) => {
                        setCreate(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入聊天室房间ID')
                    return
                }
                if (isEmpty(useCount)) {
                    showToast('请输入加入时拉取的历史消息条数')
                    return
                }
                if (isEmpty(useCreate)) {
                    showToast('请输入聊天室不存在时是否自动创建')
                    return
                }
                let count = Number(useCount)
                let create = useCreate == '1' ? true : false
                let promise = main.engine?.joinChatRoom(useTargetId, count, create)
                promise?.then((code) => {
                    main.addHistory('joinChatRoom', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function leaveChatRoom(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入聊天室房间ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入聊天室房间ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />

            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入聊天室房间ID')
                    return
                }
                let promise = main.engine?.leaveChatRoom(useTargetId)
                promise?.then((code) => {
                    main.addHistory('leaveChatRoom', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}


export function loadChatRoomMessages(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let timePicker: MyDateTimePicker
        let [useOrder, setOrder] = React.useState('')
        let [useCount, setCount] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入聊天室房间ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入聊天室房间ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请选择时间</Text>
                <MyDateTimePicker ref={(ref) => {
                    if (ref)
                        timePicker = ref
                }}></MyDateTimePicker>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入加载顺序</Text>
                <Text style={{ fontSize: 18, marginTop: 10 }}>0:BEFORE,1:AFTER</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入加载顺序'
                    defaultValue={useOrder}
                    onChangeText={(key) => {
                        setOrder(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入消息条数</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入消息条数'
                    defaultValue={useCount}
                    onChangeText={(key) => {
                        setCount(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入聊天室房间ID')
                    return
                }
                if (isEmpty(useOrder)) {
                    showToast('请输入加载顺序')
                    return
                }
                let time = timePicker.getTime()
                let order = Number(useOrder)
                let count = Number(useCount)
                let promise = main.engine?.loadChatRoomMessages(useTargetId, time, order, count)
                promise?.then((code) => {
                    main.addHistory('loadChatRoomMessages', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function addChatRoomEntry(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useKey, setKey] = React.useState('')
        let [useValue, setValue] = React.useState('')
        let [useDeleteWhenLeft, setDeleteWhenLeft] = React.useState('')
        let [useOverwrite, setOverwrite] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入聊天室房间ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入聊天室房间ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Key</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Key'
                    defaultValue={useKey}
                    onChangeText={(key) => {
                        setKey(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Value</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Value'
                    defaultValue={useValue}
                    onChangeText={(key) => {
                        setValue(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入DeleteWhenLeft</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0:False,1:True'
                    defaultValue={useDeleteWhenLeft}
                    onChangeText={(key) => {
                        setDeleteWhenLeft(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Overwrite</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0:False,1:True'
                    defaultValue={useOverwrite}
                    onChangeText={(key) => {
                        setOverwrite(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入聊天室房间ID')
                    return
                }
                if (isEmpty(useKey)) {
                    showToast('请输Key')
                    return
                }
                if (isEmpty(useValue)) {
                    showToast('请输Value')
                    return
                }
                if (isEmpty(useDeleteWhenLeft)) {
                    showToast('请输DeleteWhenLeft')
                    return
                }
                if (isEmpty(useOverwrite)) {
                    showToast('请输Overwrite')
                    return
                }
                let deleteWhenLeft = useDeleteWhenLeft == '1' ? true : false
                let overwrite = useOverwrite == "1" ? true : false
                let promise = main.engine?.addChatRoomEntry(useTargetId, useKey, useValue, deleteWhenLeft, overwrite)
                promise?.then((code) => {
                    main.addHistory('addChatRoomEntry', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function addChatRoomEntries(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useKeys, setKeys] = React.useState('')
        let [useValues, setValues] = React.useState('')
        let [useDeleteWhenLeft, setDeleteWhenLeft] = React.useState('')
        let [useOverwrite, setOverwrite] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入聊天室房间ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入聊天室房间ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入DeleteWhenLeft</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0:False,1:True'
                    defaultValue={useDeleteWhenLeft}
                    onChangeText={(key) => {
                        setDeleteWhenLeft(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Overwrite</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0:False,1:True'
                    defaultValue={useOverwrite}
                    onChangeText={(key) => {
                        setOverwrite(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入聊天室房间ID')
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
                if (isEmpty(useDeleteWhenLeft)) {
                    showToast('请输DeleteWhenLeft')
                    return
                }
                if (isEmpty(useOverwrite)) {
                    showToast('请输Overwrite')
                    return
                }
                let keys = useKeys.split(',')
                let values = useValues.split(',')
                if (keys.length != values.length) {
                    showToast('Keys和Values长度不一致')
                    return
                }
                let entries: Map<string, string> = new Map()
                for (let i = 0; i < keys.length; i++) {
                    entries.set(keys[i], values[i])
                }

                let deleteWhenLeft = useDeleteWhenLeft == '1' ? true : false
                let overwrite = useOverwrite == "1" ? true : false
                let promise = main.engine?.addChatRoomEntries(useTargetId, entries, deleteWhenLeft, overwrite)
                promise?.then((code) => {
                    main.addHistory('addChatRoomEntries', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function loadChatRoomEntry(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useKey, setKey] = React.useState('')

        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入聊天室房间ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入聊天室房间ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Key</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Key,可输入多个,以,分割'
                    defaultValue={useKey}
                    onChangeText={(key) => {
                        setKey(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入聊天室房间ID')
                    return
                }
                if (isEmpty(useKey)) {
                    showToast('请输Key')
                    return
                }
                let promise = main.engine?.loadChatRoomEntry(useTargetId, useKey)
                promise?.then((code) => {
                    main.addHistory('loadChatRoomEntry', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function loadAllChatRoomEntries(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入聊天室房间ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入聊天室房间ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入聊天室房间ID')
                    return
                }
                let promise = main.engine?.loadAllChatRoomEntries(useTargetId)
                promise?.then((code) => {
                    main.addHistory('loadAllChatRoomEntries', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function removeChatRoomEntry(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useKey, setKey] = React.useState('')
        let [useForce, setForce] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入聊天室房间ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入聊天室房间ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Key</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入Key'
                    defaultValue={useKey}
                    onChangeText={(key) => {
                        setKey(key);
                    }} />
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Force</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0:False,1:True'
                    defaultValue={useForce}
                    onChangeText={(key) => {
                        setForce(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入聊天室房间ID')
                    return
                }
                if (isEmpty(useKey)) {
                    showToast('请输Key')
                    return
                }
                if (isEmpty(useForce)) {
                    showToast('请输Force')
                    return
                }

                let force = useForce == "1" ? true : false
                let promise = main.engine?.removeChatRoomEntry(useTargetId, useKey, force)
                promise?.then((code) => {
                    main.addHistory('removeChatRoomEntry', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}

export function removeChatRoomEntries(main: Main) {
    function AlertView(props: any) {
        let [useTargetId, setTargetId] = React.useState('')
        let [useKeys, setKeys] = React.useState('')
        let [useForce, setForce] = React.useState('')
        return createAlertView(2,
            <View style={{ padding: 15 }}>
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入聊天室房间ID</Text>
                <TextInput
                    keyboardType='default'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='输入聊天室房间ID'
                    defaultValue={useTargetId}
                    onChangeText={(key) => {
                        setTargetId(key);
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
                <Text style={{ fontSize: 20, marginTop: 10 }}>请输入Force</Text>
                <TextInput
                    keyboardType='numbers-and-punctuation'
                    placeholderTextColor='grey'
                    style={{ ...styles.input, marginTop: 10 }}
                    autoCapitalize='none'
                    placeholder='0:False,1:True'
                    defaultValue={useForce}
                    onChangeText={(key) => {
                        setForce(key);
                    }} />
            </View>, () => {
                if (isEmpty(useTargetId)) {
                    showToast('请输入聊天室房间ID')
                    return
                }
                if (isEmpty(useKeys)) {
                    showToast('请输Keys')
                    return
                }
                if (isEmpty(useForce)) {
                    showToast('请输Force')
                    return
                }
                let keys = useKeys.split(',')
                if (keys.length == 0) {
                    showToast('keys输入错误')
                    return
                }
                let force = useForce == "1" ? true : false
                let promise = main.engine?.removeChatRoomEntries(useTargetId, keys, force)
                promise?.then((code) => {
                    main.addHistory('removeChatRoomEntries', jsonFormat({ code: code }), code)
                })
                main.hideAlert()
            }, () => { main.hideAlert() }
        )
    }
    main.showAlert(<AlertView />)
}
